using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/config")]
    public class ConfigController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ConfigController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult GetConfig()
        {
            var consultation = _configuration.GetSection("Consultation");
            var freeUsage = _configuration.GetSection("FreeUsageLimit");

            var fbEnabled = bool.TryParse(consultation["FacebookEnabled"], out var fb) && fb;
            var fbUrl = consultation["FacebookUrl"] ?? string.Empty;
            
            var zaloEnabled = bool.TryParse(consultation["ZaloEnabled"], out var zl) && zl;
            var zaloUrl = consultation["ZaloUrl"] ?? string.Empty;

            var dailyLimit = int.TryParse(freeUsage["DailyLimit"], out var limit) ? limit : 5;

            return Ok(new
            {
                facebookEnabled = fbEnabled,
                facebookUrl = fbUrl,
                zaloEnabled = zaloEnabled,
                zaloUrl = zaloUrl,
                dailyFreeLimit = dailyLimit
            });
        }
    }
}
