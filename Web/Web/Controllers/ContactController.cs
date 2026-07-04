using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using Web.Data;
using Web.Models;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/contacts")]
    public class ContactController : ControllerBase
    {
        private readonly IDbContextFactory<AppDBContext> _dbFactory;

        public ContactController(IDbContextFactory<AppDBContext> dbFactory)
        {
            _dbFactory = dbFactory;
        }

        [HttpPost]
        public async Task<IActionResult> CreateContact([FromBody] ContactSubmitRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                using var context = _dbFactory.CreateDbContext();
                
                // Map fields into existing Content model structure
                var contact = new Contact
                {
                    Email = request.Email,
                    Content = $"Họ tên: {request.FullName}\nSĐT: {request.Phone ?? "N/A"}\nTin nhắn: {request.Message}",
                    Type = ContactType.GopY,
                    Status = ContactStatus.Moi,
                    DateCreated = DateTime.UtcNow,
                    DateUpdated = DateTime.UtcNow
                };

                context.Contacts.Add(contact);
                await context.SaveChangesAsync();

                return Ok(new { success = true, message = "Thông tin liên hệ của bạn đã được gửi thành công!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Không thể gửi liên hệ: " + ex.Message });
            }
        }
    }

    public class ContactSubmitRequest
    {
        [Required(ErrorMessage = "Vui lòng nhập Họ tên")]
        [StringLength(100, ErrorMessage = "Họ tên tối đa 100 ký tự")]
        public string FullName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Vui lòng nhập Email")]
        [EmailAddress(ErrorMessage = "Email không hợp lệ")]
        public string Email { get; set; } = string.Empty;

        public string? Phone { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập nội dung tin nhắn")]
        [StringLength(1000, ErrorMessage = "Tin nhắn tối đa 1000 ký tự")]
        public string Message { get; set; } = string.Empty;
    }
}
