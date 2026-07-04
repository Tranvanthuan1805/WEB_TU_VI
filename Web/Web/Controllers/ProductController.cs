using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web.Data;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductController : ControllerBase
    {
        private readonly IDbContextFactory<AppDBContext> _dbFactory;

        public ProductController(IDbContextFactory<AppDBContext> dbFactory)
        {
            _dbFactory = dbFactory;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            using var context = _dbFactory.CreateDbContext();
            var products = await context.Products.AsNoTracking()
                .Where(p => p.Price > 0) // active products
                .ToListAsync();

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            using var context = _dbFactory.CreateDbContext();
            var product = await context.Products.AsNoTracking()
                .FirstOrDefaultAsync(p => p.ProductId == id);

            if (product == null)
            {
                return NotFound(new { error = "Sản phẩm không tồn tại" });
            }

            return Ok(product);
        }
    }
}
