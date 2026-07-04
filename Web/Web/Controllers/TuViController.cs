using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web.Data;
using Web.Models;
using Web.Services;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/tuvi")]
    public class TuViController : ControllerBase
    {
        private readonly TuViExcelService _tuViExcelService;
        private readonly IDbContextFactory<AppDBContext> _dbFactory;
        private readonly IConfiguration _configuration;

        public TuViController(
            TuViExcelService tuViExcelService,
            IDbContextFactory<AppDBContext> dbFactory,
            IConfiguration configuration)
        {
            _tuViExcelService = tuViExcelService;
            _dbFactory = dbFactory;
            _configuration = configuration;
        }

        [HttpGet("free-usage")]
        public async Task<IActionResult> GetFreeUsage([FromQuery] string anonymousId)
        {
            if (string.IsNullOrEmpty(anonymousId))
            {
                return BadRequest(new { error = "anonymousId is required" });
            }

            try
            {
                using var context = _dbFactory.CreateDbContext();
                var today = DateOnly.FromDateTime(DateTime.UtcNow);

                var dailyLimitSection = _configuration.GetSection("FreeUsageLimit");
                var dailyFreeLimit = int.TryParse(dailyLimitSection["DailyLimit"], out var limit) ? limit : 5;

                var usageStats = await context.DailyUsageStats
                    .FirstOrDefaultAsync(s => s.Date == today && s.AnonymousId == anonymousId);

                var currentFreeUsage = usageStats?.FreeUsageCount ?? 0;

                return Ok(new
                {
                    currentFreeUsage,
                    dailyFreeLimit,
                    hint = dailyFreeLimit == -1 
                        ? $"Xem miễn phí: {currentFreeUsage}/∞ lượt/ngày"
                        : $"Xem miễn phí: {currentFreeUsage}/{dailyFreeLimit} lượt/ngày"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("profiles")]
        public async Task<IActionResult> GetExcelProfiles()
        {
            try
            {
                var list = await _tuViExcelService.GetProfilesFromExcelAsync();
                return Ok(list);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPost("calculate")]
        public async Task<IActionResult> Calculate([FromBody] TuViCalculateRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                using var context = _dbFactory.CreateDbContext();
                bool ticketValid = false;

                // Check ticket first if provided
                if (!string.IsNullOrWhiteSpace(request.TicketCode))
                {
                    var ticket = await context.Tickets.FirstOrDefaultAsync(t => t.Code == request.TicketCode);
                    if (ticket != null && ticket.IsAvailable)
                    {
                        ticket.QuantityUsed += 1;
                        ticketValid = true;

                        // Track premium usage
                        var today = DateOnly.FromDateTime(DateTime.UtcNow);
                        var usageStats = await context.DailyUsageStats
                            .FirstOrDefaultAsync(s => s.Date == today && s.AnonymousId == request.AnonymousId);

                        if (usageStats != null)
                        {
                            usageStats.PremiumUsageCount += 1;
                            usageStats.LastUsedAt = DateTime.UtcNow;
                        }
                        else
                        {
                            context.DailyUsageStats.Add(new DailyUsageStats
                            {
                                Date = today,
                                AnonymousId = request.AnonymousId,
                                PremiumUsageCount = 1,
                                LastUsedAt = DateTime.UtcNow
                            });
                        }

                        await context.SaveChangesAsync();
                    }
                }

                var dailyLimitSection = _configuration.GetSection("FreeUsageLimit");
                var dailyFreeLimit = int.TryParse(dailyLimitSection["DailyLimit"], out var limit) ? limit : 5;

                // If ticket is not valid, verify free usage limit
                if (!ticketValid)
                {
                    if (string.IsNullOrEmpty(request.AnonymousId))
                    {
                        return BadRequest(new { error = "anonymousId is required for free calculations" });
                    }

                    var today = DateOnly.FromDateTime(DateTime.UtcNow);
                    var usageStats = await context.DailyUsageStats
                        .FirstOrDefaultAsync(s => s.Date == today && s.AnonymousId == request.AnonymousId);

                    if (usageStats != null)
                    {
                        if (dailyFreeLimit != -1 && usageStats.FreeUsageCount >= dailyFreeLimit)
                        {
                            return Ok(new
                            {
                                limitReached = true,
                                message = "Bạn đã hết lượt xem miễn phí hôm nay. Vui lòng mua vé để tiếp tục xem.",
                                dailyFreeLimit,
                                currentFreeUsage = usageStats.FreeUsageCount
                            });
                        }
                        usageStats.FreeUsageCount += 1;
                        usageStats.LastUsedAt = DateTime.UtcNow;
                    }
                    else
                    {
                        if (dailyFreeLimit != -1 && 1 > dailyFreeLimit)
                        {
                            return Ok(new
                            {
                                limitReached = true,
                                message = "Bạn đã hết lượt xem miễn phí hôm nay. Vui lòng mua vé để tiếp tục xem.",
                                dailyFreeLimit,
                                currentFreeUsage = 0
                            });
                        }
                        context.DailyUsageStats.Add(new DailyUsageStats
                        {
                            Date = today,
                            AnonymousId = request.AnonymousId,
                            FreeUsageCount = 1,
                            LastUsedAt = DateTime.UtcNow
                        });
                    }

                    await context.SaveChangesAsync();
                }

                // Run calculation via excel service
                var input = new TuViInput
                {
                    Gender = request.Gender,
                    Day = request.BirthDay,
                    Month = request.BirthMonth,
                    Year = request.BirthYear,
                    Hour = ticketValid ? request.BirthHour24.ToString() : request.BirthHour,
                    Use24HourFormat = ticketValid,
                    ViewYear = request.ViewYear
                };

                var result = await _tuViExcelService.CalculateTuViAsync(input);

                // Fetch new free usage details
                var todayDate = DateOnly.FromDateTime(DateTime.UtcNow);
                var finalUsageStats = await context.DailyUsageStats
                    .FirstOrDefaultAsync(s => s.Date == todayDate && s.AnonymousId == request.AnonymousId);
                var currentFreeUsage = finalUsageStats?.FreeUsageCount ?? 0;

                return Ok(new
                {
                    success = true,
                    theCachHtml = result.TheCachHtml,
                    tuViHtml = result.TuViHtml,
                    usedTicket = ticketValid,
                    currentFreeUsage,
                    dailyFreeLimit
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Có lỗi xảy ra trong quá trình tính toán: " + ex.Message });
            }
        }
    }

    public class TuViCalculateRequest
    {
        public string SelectedOption { get; set; } = "1";
        public string TicketCode { get; set; } = string.Empty;
        public int BirthDay { get; set; }
        public int BirthMonth { get; set; }
        public int BirthYear { get; set; }
        public int BirthHour24 { get; set; }
        public string BirthHour { get; set; } = "Ty";
        public string Gender { get; set; } = "Nam";
        public int ViewYear { get; set; }
        public string AnonymousId { get; set; } = string.Empty;
    }
}
