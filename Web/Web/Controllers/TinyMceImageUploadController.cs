using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Data;

namespace Web.Controllers
{
    [Route("api/tinymce")]
    [ApiController]
    [Authorize(Roles = RoleName.Administrator)]
    public class TinyMceImageUploadController : ControllerBase
    {
        private static readonly string[] AllowedExtensions = { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
        private const long MaxFileSize = 5 * 1024 * 1024; // 5MB

        [HttpPost("upload-image")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new { error = "No file uploaded" });
            }

            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!AllowedExtensions.Contains(extension))
            {
                return BadRequest(new { error = "Invalid file type. Only jpg, jpeg, png, gif, webp are allowed." });
            }

            if (file.Length > MaxFileSize)
            {
                return BadRequest(new { error = "File too large. Maximum size is 5MB." });
            }

            var imgDir = Path.Combine(Directory.GetCurrentDirectory(), "FileServer");
            if (!Directory.Exists(imgDir))
            {
                Directory.CreateDirectory(imgDir);
            }

            var fileName = $"{Guid.NewGuid():N}{extension}";
            var filePath = Path.Combine(imgDir, fileName);

            await using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Ok(new { location = $"/contents/{fileName}" });
        }
    }
}
