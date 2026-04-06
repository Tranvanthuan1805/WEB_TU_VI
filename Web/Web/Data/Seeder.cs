using Microsoft.EntityFrameworkCore;
using Web.Models;
using Web.Utilities;

namespace Web.Data
{
    public static class Seeder
    {
        private const string SeedMarker = "[Seed Data]";

        public static async Task<int> SeedPostsAsync(AppDBContext context)
        {
            await DeleteSeedPostsAsync(context);

            var faker = new Bogus.Faker<Post>()
                .RuleFor(p => p.Title, f => $"{SeedMarker} {f.Lorem.Sentence(4, 6).TrimEnd('.')}")
                .RuleFor(p => p.Content, f => $"<p>{string.Join("</p><p>", f.Lorem.Paragraphs(3))}</p>")
                .RuleFor(p => p.Description, f =>
                {
                    var content = f.Lorem.Paragraph();
                    var plainText = StripHtml(content);
                    return plainText.Length > 300 ? plainText.Substring(0, 300) + "..." : plainText;
                })
                .RuleFor(p => p.Published, f => f.Random.Bool())
                .RuleFor(p => p.DateCreated, _ => DateTime.UtcNow)
                .RuleFor(p => p.DateUpdated, _ => DateTime.UtcNow);

            var posts = faker.Generate(50);

            foreach (var post in posts)
            {
                post.Slug = AppUtilities.GenerateSlug(post.Title);
                post.DateCreated = DateTime.UtcNow;
                post.DateUpdated = DateTime.UtcNow;
            }

            await context.Posts.AddRangeAsync(posts);
            await context.SaveChangesAsync();

            return 50;
        }

        public static async Task<int> DeleteSeedPostsAsync(AppDBContext context)
        {
            var posts = await context.Posts
                .Where(p => p.Title.Contains(SeedMarker))
                .ToListAsync();

            if (posts.Any())
            {
                context.Posts.RemoveRange(posts);
                await context.SaveChangesAsync();
            }

            return posts.Count;
        }

        private static string StripHtml(string html)
        {
            return System.Text.RegularExpressions.Regex.Replace(html, "<.*?>", string.Empty);
        }

        public static async Task<int> SeedProductsAsync(AppDBContext context)
        {
            await DeleteSeedProductsAsync(context);

            var faker = new Bogus.Faker<Product>()
                .RuleFor(p => p.Name, f => $"{SeedMarker} {f.Commerce.ProductName()}")
                .RuleFor(p => p.OriginPrice, f => Math.Round(f.Random.Decimal(100000, 5000000), 0))
                .RuleFor(p => p.Discount, f =>
                {
                    var hasDiscount = f.Random.Double() < 0.6;
                    return hasDiscount ? Math.Round(f.Random.Decimal(1, 50), 0) : 0;
                })
                .RuleFor(p => p.Quantity, f => f.Random.Bool(0.3f) ? -1 : Math.Round(f.Random.Decimal(10, 500), 0))
                .RuleFor(p => p.QuantitySold, f => Math.Round(f.Random.Decimal(0, 100), 0))
                .RuleFor(p => p.NumberofTickets, f => Math.Round(f.Random.Decimal(1, 10), 0))
                .RuleFor(p => p.Published, f => f.Random.Bool(0.7f))
                .RuleFor(p => p.DateCreated, _ => DateTime.UtcNow)
                .RuleFor(p => p.DateUpdated, _ => DateTime.UtcNow);

            var products = faker.Generate(30);

            foreach (var product in products)
            {
                product.Price = Math.Round(product.OriginPrice * (1 - product.Discount / 100), 0);
                product.DateCreated = DateTime.UtcNow;
                product.DateUpdated = DateTime.UtcNow;
            }

            await context.Products.AddRangeAsync(products);
            await context.SaveChangesAsync();

            return 30;
        }

        public static async Task<int> DeleteSeedProductsAsync(AppDBContext context)
        {
            var products = await context.Products
                .Where(p => p.Name.Contains(SeedMarker))
                .ToListAsync();

            if (products.Any())
            {
                context.Products.RemoveRange(products);
                await context.SaveChangesAsync();
            }

            return products.Count;
        }

        public static async Task<int> SeedTicketsAsync(AppDBContext context)
        {
            await DeleteSeedTicketsAsync(context);

            var random = new Random();
            var tickets = new List<Ticket>();

            for (int i = 0; i < 50; i++)
            {
                var quantity = random.Next(50, 1001);
                var quantityUsed = random.Next(0, Math.Min(51, quantity + 1));

                var ticket = new Ticket
                {
                    Code = $"[SEED]-{GenerateRandomCode(random)}",
                    Quantity = quantity,
                    QuantityUsed = quantityUsed,
                    Published = random.NextDouble() < 0.8,
                    DateCreated = DateTime.UtcNow,
                    DateUpdated = DateTime.UtcNow
                };

                tickets.Add(ticket);
            }

            await context.Tickets.AddRangeAsync(tickets);
            await context.SaveChangesAsync();

            return 50;
        }

        public static async Task<int> DeleteSeedTicketsAsync(AppDBContext context)
        {
            const string ticketSeedMarker = "[SEED]";
            var tickets = await context.Tickets
                .Where(t => t.Code.Contains(ticketSeedMarker))
                .ToListAsync();

            if (tickets.Any())
            {
                context.Tickets.RemoveRange(tickets);
                await context.SaveChangesAsync();
            }

            return tickets.Count;
        }

        private static string GenerateRandomCode(Random random)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var code = new char[12];
            for (int i = 0; i < 12; i++)
            {
                code[i] = chars[random.Next(chars.Length)];
            }
            return new string(code);
        }
    }
}
