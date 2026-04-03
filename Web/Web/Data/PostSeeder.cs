using Microsoft.EntityFrameworkCore;
using Web.Models;
using Web.Utilities;

namespace Web.Data
{
    public static class PostSeeder
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
    }
}
