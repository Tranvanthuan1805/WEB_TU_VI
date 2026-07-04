using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using Web.Data;
using Web.Models;

namespace Web.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/admin")]
    public class AdminController : ControllerBase
    {
        private readonly IDbContextFactory<AppDBContext> _dbFactory;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public AdminController(
            IDbContextFactory<AppDBContext> dbFactory,
            IConfiguration configuration,
            IWebHostEnvironment env)
        {
            _dbFactory = dbFactory;
            _configuration = configuration;
            _env = env;
        }

        #region Dashboard Stats
        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboardStats()
        {
            using var context = _dbFactory.CreateDbContext();
            
            var totalPosts = await context.Posts.CountAsync();
            var totalProducts = await context.Products.CountAsync();
            var totalTickets = await context.Tickets.CountAsync();
            var totalOrders = await context.Orders.CountAsync();
            var totalContacts = await context.Contacts.CountAsync();
            
            var totalRevenue = await context.Orders
                .Where(o => o.Status == OrderStatus.Paid)
                .SumAsync(o => o.TotalAmount);

            var recentOrders = await context.Orders
                .Include(o => o.Product)
                .OrderByDescending(o => o.DateCreated)
                .Take(5)
                .ToListAsync();

            return Ok(new
            {
                totalPosts,
                totalProducts,
                totalTickets,
                totalOrders,
                totalContacts,
                totalRevenue,
                recentOrders
            });
        }
        #endregion

        #region Config Management
        [HttpGet("config")]
        public IActionResult GetConfig()
        {
            var consultation = _configuration.GetSection("Consultation");
            var freeUsage = _configuration.GetSection("FreeUsageLimit");

            return Ok(new
            {
                facebookEnabled = bool.TryParse(consultation["FacebookEnabled"], out var fb) && fb,
                facebookUrl = consultation["FacebookUrl"] ?? string.Empty,
                zaloEnabled = bool.TryParse(consultation["ZaloEnabled"], out var zl) && zl,
                zaloUrl = consultation["ZaloUrl"] ?? string.Empty,
                dailyFreeLimit = int.TryParse(freeUsage["DailyLimit"], out var limit) ? limit : 5
            });
        }

        [HttpPost("config")]
        public async Task<IActionResult> SaveConfig([FromBody] SaveConfigRequest request)
        {
            try
            {
                var filePath = Path.Combine(_env.ContentRootPath, "config.json");
                
                var configData = new
                {
                    VnPay = _configuration.GetSection("VnPay").Get<Dictionary<string, string>>(),
                    GoogleAdSense = _configuration.GetSection("GoogleAdSense").Get<Dictionary<string, string>>(),
                    FreeUsageLimit = new
                    {
                        DailyLimit = request.DailyFreeLimit
                    },
                    Consultation = new
                    {
                        FacebookEnabled = request.FacebookEnabled.ToString().ToLower(),
                        FacebookUrl = request.FacebookUrl ?? string.Empty,
                        ZaloEnabled = request.ZaloEnabled.ToString().ToLower(),
                        ZaloUrl = request.ZaloUrl ?? string.Empty
                    }
                };

                var jsonOptions = new JsonSerializerOptions { WriteIndented = true };
                var jsonString = JsonSerializer.Serialize(configData, jsonOptions);
                await System.IO.File.WriteAllTextAsync(filePath, jsonString);

                if (_configuration is IConfigurationRoot root)
                {
                    root.Reload();
                }

                return Ok(new { success = true, message = "Lưu cấu hình thành công!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Không thể lưu cấu hình: " + ex.Message });
            }
        }

        public class SaveConfigRequest
        {
            public bool FacebookEnabled { get; set; }
            public string? FacebookUrl { get; set; }
            public bool ZaloEnabled { get; set; }
            public string? ZaloUrl { get; set; }
            public int DailyFreeLimit { get; set; }
        }
        #endregion

        #region Post CRUD
        [HttpGet("posts")]
        public async Task<IActionResult> GetPosts()
        {
            using var context = _dbFactory.CreateDbContext();
            var posts = await context.Posts.OrderByDescending(p => p.DateUpdated).ToListAsync();
            return Ok(posts);
        }

        [HttpPost("posts")]
        public async Task<IActionResult> CreatePost([FromBody] Post model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            using var context = _dbFactory.CreateDbContext();
            
            if (await context.Posts.AnyAsync(p => p.Slug == model.Slug))
            {
                return BadRequest(new { error = "Đường dẫn Slug đã tồn tại." });
            }

            model.DateCreated = DateTime.UtcNow;
            model.DateUpdated = DateTime.UtcNow;

            context.Posts.Add(model);
            await context.SaveChangesAsync();
            return Ok(model);
        }

        [HttpPut("posts/{id}")]
        public async Task<IActionResult> UpdatePost(int id, [FromBody] Post model)
        {
            if (id != model.PostId) return BadRequest(new { error = "Mã bài viết không khớp." });
            if (!ModelState.IsValid) return BadRequest(ModelState);

            using var context = _dbFactory.CreateDbContext();
            var post = await context.Posts.FindAsync(id);
            if (post == null) return NotFound(new { error = "Bài viết không tồn tại." });

            if (await context.Posts.AnyAsync(p => p.Slug == model.Slug && p.PostId != id))
            {
                return BadRequest(new { error = "Đường dẫn Slug đã tồn tại." });
            }

            post.Title = model.Title;
            post.Description = model.Description;
            post.Slug = model.Slug;
            post.Content = model.Content;
            post.Published = model.Published;
            post.DateUpdated = DateTime.UtcNow;

            await context.SaveChangesAsync();
            return Ok(post);
        }

        [HttpDelete("posts/{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            using var context = _dbFactory.CreateDbContext();
            var post = await context.Posts.FindAsync(id);
            if (post == null) return NotFound(new { error = "Bài viết không tồn tại." });

            context.Posts.Remove(post);
            await context.SaveChangesAsync();
            return Ok(new { success = true });
        }
        #endregion

        #region Product CRUD
        [HttpGet("products")]
        public async Task<IActionResult> GetProducts()
        {
            using var context = _dbFactory.CreateDbContext();
            var list = await context.Products.ToListAsync();
            return Ok(list);
        }

        [HttpPost("products")]
        public async Task<IActionResult> CreateProduct([FromBody] Product model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            using var context = _dbFactory.CreateDbContext();
            model.DateCreated = DateTime.UtcNow;
            model.DateUpdated = DateTime.UtcNow;
            model.QuantitySold = 0;

            context.Products.Add(model);
            await context.SaveChangesAsync();
            return Ok(model);
        }

        [HttpPut("products/{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product model)
        {
            if (id != model.ProductId) return BadRequest(new { error = "Mã sản phẩm không khớp." });
            if (!ModelState.IsValid) return BadRequest(ModelState);

            using var context = _dbFactory.CreateDbContext();
            var prod = await context.Products.FindAsync(id);
            if (prod == null) return NotFound(new { error = "Sản phẩm không tồn tại." });

            prod.Name = model.Name;
            prod.Price = model.Price;
            prod.OriginPrice = model.OriginPrice;
            prod.Discount = model.Discount;
            prod.Quantity = model.Quantity;
            prod.NumberofTickets = model.NumberofTickets;
            prod.Published = model.Published;
            prod.DateUpdated = DateTime.UtcNow;

            await context.SaveChangesAsync();
            return Ok(prod);
        }

        [HttpDelete("products/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            using var context = _dbFactory.CreateDbContext();
            var prod = await context.Products.FindAsync(id);
            if (prod == null) return NotFound(new { error = "Sản phẩm không tồn tại." });

            context.Products.Remove(prod);
            await context.SaveChangesAsync();
            return Ok(new { success = true });
        }
        #endregion

        #region Ticket CRUD
        [HttpGet("tickets")]
        public async Task<IActionResult> GetTickets()
        {
            using var context = _dbFactory.CreateDbContext();
            var list = await context.Tickets.OrderByDescending(t => t.TicketId).ToListAsync();
            return Ok(list);
        }

        [HttpPost("tickets")]
        public async Task<IActionResult> CreateTicket([FromBody] Ticket model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            using var context = _dbFactory.CreateDbContext();
            if (await context.Tickets.AnyAsync(t => t.Code == model.Code))
            {
                return BadRequest(new { error = "Mã vé này đã tồn tại." });
            }

            model.QuantityUsed = 0;
            model.DateCreated = DateTime.UtcNow;
            model.DateUpdated = DateTime.UtcNow;

            context.Tickets.Add(model);
            await context.SaveChangesAsync();
            return Ok(model);
        }

        [HttpPut("tickets/{id}")]
        public async Task<IActionResult> UpdateTicket(int id, [FromBody] Ticket model)
        {
            if (id != model.TicketId) return BadRequest(new { error = "Mã vé không khớp." });
            if (!ModelState.IsValid) return BadRequest(ModelState);

            using var context = _dbFactory.CreateDbContext();
            var t = await context.Tickets.FindAsync(id);
            if (t == null) return NotFound(new { error = "Vé không tồn tại." });

            if (await context.Tickets.AnyAsync(tc => tc.Code == model.Code && tc.TicketId != id))
            {
                return BadRequest(new { error = "Mã vé này đã tồn tại." });
            }

            t.Code = model.Code;
            t.Quantity = model.Quantity;
            t.Published = model.Published;
            t.DateUpdated = DateTime.UtcNow;

            await context.SaveChangesAsync();
            return Ok(t);
        }

        [HttpDelete("tickets/{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            using var context = _dbFactory.CreateDbContext();
            var t = await context.Tickets.FindAsync(id);
            if (t == null) return NotFound(new { error = "Vé không tồn tại." });

            context.Tickets.Remove(t);
            await context.SaveChangesAsync();
            return Ok(new { success = true });
        }
        #endregion

        #region Order CRUD
        [HttpGet("orders")]
        public async Task<IActionResult> GetOrders()
        {
            using var context = _dbFactory.CreateDbContext();
            var list = await context.Orders
                .Include(o => o.Product)
                .Include(o => o.Ticket)
                .OrderByDescending(o => o.DateCreated)
                .ToListAsync();
            return Ok(list);
        }

        [HttpPut("orders/{id}")]
        public async Task<IActionResult> UpdateOrder(int id, [FromBody] Order model)
        {
            using var context = _dbFactory.CreateDbContext();
            var order = await context.Orders.FindAsync(id);
            if (order == null) return NotFound(new { error = "Đơn hàng không tồn tại." });

            order.Status = model.Status;
            order.DateUpdated = DateTime.UtcNow;

            await context.SaveChangesAsync();
            return Ok(order);
        }

        [HttpDelete("orders/{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            using var context = _dbFactory.CreateDbContext();
            var order = await context.Orders.FindAsync(id);
            if (order == null) return NotFound(new { error = "Đơn hàng không tồn tại." });

            context.Orders.Remove(order);
            await context.SaveChangesAsync();
            return Ok(new { success = true });
        }
        #endregion

        #region Contact CRUD
        [HttpGet("contacts")]
        public async Task<IActionResult> GetContacts()
        {
            using var context = _dbFactory.CreateDbContext();
            var list = await context.Contacts.OrderByDescending(c => c.DateCreated).ToListAsync();
            return Ok(list);
        }

        [HttpPut("contacts/{id}/resolve")]
        public async Task<IActionResult> ResolveContact(int id)
        {
            using var context = _dbFactory.CreateDbContext();
            var contact = await context.Contacts.FindAsync(id);
            if (contact == null) return NotFound(new { error = "Không tìm thấy liên hệ này." });

            contact.Status = ContactStatus.DaXuLy;
            contact.DateUpdated = DateTime.UtcNow;
            
            await context.SaveChangesAsync();
            return Ok(contact);
        }

        [HttpDelete("contacts/{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            using var context = _dbFactory.CreateDbContext();
            var contact = await context.Contacts.FindAsync(id);
            if (contact == null) return NotFound(new { error = "Không tìm thấy liên hệ này." });

            context.Contacts.Remove(contact);
            await context.SaveChangesAsync();
            return Ok(new { success = true });
        }
        #endregion
    }
}
