using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web.Data;
using Web.Models;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/posts")]
    public class PostController : ControllerBase
    {
        private readonly IDbContextFactory<AppDBContext> _dbFactory;

        public PostController(IDbContextFactory<AppDBContext> dbFactory)
        {
            _dbFactory = dbFactory;
        }

        [HttpGet]
        public async Task<IActionResult> GetPosts([FromQuery] string? search, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            using var context = _dbFactory.CreateDbContext();
            var query = context.Posts.AsNoTracking().Where(p => p.Published);

            if (!string.IsNullOrEmpty(search))
            {
                var searchLower = search.ToLower();
                query = query.Where(p => p.Title.ToLower().Contains(searchLower) || p.Description.ToLower().Contains(searchLower));
            }

            var totalCount = await query.CountAsync();
            var posts = await query
                .OrderByDescending(p => p.DateUpdated)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new
            {
                totalCount,
                page,
                pageSize,
                posts
            });
        }

        [HttpGet("recent")]
        public async Task<IActionResult> GetRecentPosts([FromQuery] int limit = 5)
        {
            using var context = _dbFactory.CreateDbContext();
            var posts = await context.Posts.AsNoTracking()
                .Where(p => p.Published)
                .OrderByDescending(p => p.DateUpdated)
                .Take(limit)
                .ToListAsync();

            return Ok(posts);
        }

        [HttpGet("slug/{slug}")]
        public async Task<IActionResult> GetPostBySlug(string slug)
        {
            using var context = _dbFactory.CreateDbContext();
            var post = await context.Posts.AsNoTracking()
                .FirstOrDefaultAsync(p => p.Slug == slug && p.Published);

            if (post == null)
            {
                return NotFound(new { error = "Bài viết không tồn tại" });
            }

            return Ok(post);
        }
    }
}
