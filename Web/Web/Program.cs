
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Web.Components;
using Web.Components.Account;
using Web.Data;
using Web.Models;
using Web.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile("config.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

builder.Services.AddDbContextFactory<AppDBContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DBContext") ?? throw new InvalidOperationException("Connection string 'DBContext' not found.");
    options.UseNpgsql(connectionString);
});

builder.Services.AddControllers();
builder.Services.AddSignalR();
builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();
builder.Services.AddCors(options =>
{
    options.AddPolicy("CamQRCors", policy =>
    {
        policy.AllowAnyHeader()
              .AllowAnyMethod()
              .SetIsOriginAllowed(_ => true)
              .AllowCredentials();
    });
});

builder.Services.AddOpenApi();
// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents()
    .AddInteractiveWebAssemblyComponents()
    .AddAuthenticationStateSerialization(options =>
    {
        // Nếu cần đầy đủ claims thì bật dòng này
        options.SerializeAllClaims = true;
    });

builder.Services.AddCascadingAuthenticationState();

builder.Services.AddScoped<IdentityRedirectManager>();

builder.Services.AddScoped<AuthenticationStateProvider, IdentityRevalidatingAuthenticationStateProvider>();

builder.Services.AddIdentity<User, IdentityRole>(options =>
    {
        options.Stores.SchemaVersion = IdentitySchemaVersions.Version3;

        // Password
        options.Password.RequireDigit = false;
        options.Password.RequireLowercase = false;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireUppercase = false;
        options.Password.RequiredLength = 8;
        options.Password.RequiredUniqueChars = 1;

        // Lockout
        options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
        options.Lockout.MaxFailedAccessAttempts = 5;
        options.Lockout.AllowedForNewUsers = true;

        // User
        options.User.AllowedUserNameCharacters =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
        options.User.RequireUniqueEmail = true;

        // SignIn
        options.SignIn.RequireConfirmedAccount = true;
        options.SignIn.RequireConfirmedEmail = true;
        options.SignIn.RequireConfirmedPhoneNumber = false;
    })
    .AddEntityFrameworkStores<AppDBContext>()
    .AddDefaultTokenProviders();

builder.Services.AddSingleton<IEmailSender<User>, IdentityNoOpEmailSender>();

builder.Services.AddScoped<ToastService>();
builder.Services.AddScoped<ConfirmDialogService>();
builder.Services.AddScoped<VnpayService>();
builder.Services.AddScoped<OrderService>();
builder.Services.AddScoped<TuViExcelService>();
builder.Services.AddScoped<FengShuiService>();

builder.Services.AddHttpContextAccessor();

builder.Services.AddHttpClient();

builder.Services.AddHostedService<PendingPaymentCleanupService>();

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Auto-migrate database on startup
using (var scope = app.Services.CreateScope())
{
    var factory = scope.ServiceProvider.GetRequiredService<IDbContextFactory<AppDBContext>>();
    using var context = factory.CreateDbContext();
    try
    {
        context.Database.EnsureCreated();
        Console.WriteLine("=== Database ensured/created successfully ===");

        // Seed default admin user
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

        Task.Run(async () =>
        {
            if (!await roleManager.RoleExistsAsync("Administrator"))
            {
                await roleManager.CreateAsync(new IdentityRole("Administrator"));
            }

            var adminEmail = "admin@example.com";
            var adminUser = await userManager.FindByEmailAsync(adminEmail);
            if (adminUser == null)
            {
                adminUser = new User
                {
                    UserName = "admin@example.com",
                    Email = adminEmail,
                    EmailConfirmed = true
                };
                var result = await userManager.CreateAsync(adminUser, "Admin@123");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(adminUser, "Administrator");
                    Console.WriteLine("=== Default admin user seeded: admin@example.com / Admin@123 ===");
                }
                else
                {
                    Console.WriteLine("=== Lỗi tạo admin user: " + string.Join(", ", result.Errors.Select(e => e.Description)) + " ===");
                }
            }
            else
            {
                if (!await userManager.IsInRoleAsync(adminUser, "Administrator"))
                {
                    await userManager.AddToRoleAsync(adminUser, "Administrator");
                    Console.WriteLine("=== Added existing admin user to Administrator role ===");
                }
            }
        }).GetAwaiter().GetResult();

        // Seed 10 premium astrology posts with images
        Task.Run(async () =>
        {
            if (!await context.Posts.AnyAsync(p => p.Title.StartsWith("[Seed Data]")))
            {
                var posts = new List<Post>
                {
                    new Post
                    {
                        Title = "[Seed Data] Tìm Hiểu Về 12 Cung Địa Bàn Trong Bản Đồ Tử Vi",
                        Slug = "tim-hieu-ve-12-cung-dia-ban-trong-ban-do-tu-vi",
                        Description = "Khám phá ý nghĩa sâu xa của 12 cung địa bàn, từ Mệnh, Phụ, Phúc đến Điền, Quan, Nô trong tử vi cổ truyền phương Đông.",
                        Content = "<p>Trong Tử vi đẩu số, Bản đồ Tử vi được chia làm 12 cung địa bàn. Mỗi cung đại diện cho một khía cạnh cụ thể của cuộc đời con người. Mệnh cung là trung tâm chỉ ra tính cách bản thể, Phúc Đức chỉ rõ đời sống tinh thần, còn các cung Quan Lộc, Tài Bạch biểu thị công danh tiền tài. Việc thấu hiểu sự tương tác giữa các cung giúp ta định hướng vận mệnh rõ ràng hơn.</p>",
                        CoverImage = "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&auto=format&fit=crop",
                        Published = true,
                        DateCreated = DateTime.UtcNow,
                        DateUpdated = DateTime.UtcNow
                    },
                    new Post
                    {
                        Title = "[Seed Data] Cách Xác Định Cung Mệnh Và Thân Trong Lá Số Tử Vi",
                        Slug = "cach-xac-dinh-cung-menh-va-than-trong-la-so-tu-vi",
                        Description = "Hướng dẫn chi tiết cách lập lá số, xác định vị trí của cung Mệnh và cung Thân để thấu hiểu bản mệnh cuộc đời.",
                        Content = "<p>Cung Mệnh và cung Thân là hai cột trụ quan trọng nhất trong việc luận giải Tử Vi. Mệnh đại diện cho tiên thiên (những gì sinh ra đã có, tính cách bẩm sinh), còn Thân đại diện cho hậu thiên (quá trình rèn luyện, định hướng hành động sau tuổi 30). Bài viết này sẽ hướng dẫn cách tính chính xác cung Thân cư ở đâu dựa trên giờ sinh của bạn.</p>",
                        CoverImage = "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop",
                        Published = true,
                        DateCreated = DateTime.UtcNow,
                        DateUpdated = DateTime.UtcNow
                    },
                    new Post
                    {
                        Title = "[Seed Data] Ý Nghĩa Của Sao Thái Dương Trong Tử Vi Khoa Học",
                        Slug = "y-nghia-cua-sao-thai-duong-trong-tu-vi-khoa-hoc",
                        Description = "Sao Thái Dương tượng trưng cho ánh mặt trời, sự quang minh chính đại. Tìm hiểu sức ảnh hưởng của sao này tại các cung.",
                        Content = "<p>Thái Dương là đệ nhất cát tinh, chủ về quan lộc và danh tiếng. Khi đóng tại các cung ban ngày như Dần, Mão, Thìn, Tỵ, Ngọ, Thái Dương phát huy tối đa ánh sáng, mang lại sự hiển đạt vượt trội cho đương số. Ở chiều ngược lại, nếu hãm địa tại các cung ban đêm, nó cần sự hội tụ của cát tinh để tránh giảm đi độ sáng.</p>",
                        CoverImage = "https://images.unsplash.com/photo-1532690650766-3b58f89db8e8?w=600&auto=format&fit=crop",
                        Published = true,
                        DateCreated = DateTime.UtcNow,
                        DateUpdated = DateTime.UtcNow
                    },
                    new Post
                    {
                        Title = "[Seed Data] Vận Hạn 2026: Làm Thế Nào Để Hóa Giải Thái Tuế?",
                        Slug = "van-han-2026-lam-the-nao-de-hoa-giai-thai-tue",
                        Description = "Tổng hợp các phương pháp dân gian và khoa học phong thủy giúp giảm nhẹ hạn Thái Tuế, mang lại bình an, cát tường.",
                        Content = "<p>Năm 2026 Bính Ngọ sắp tới mang theo nhiều chuyển biến năng lượng mạnh mẽ. Những con giáp phạm Thái Tuế như Ngọ, Tý, Mão, Dậu cần đặc biệt lưu ý về sức khỏe và các quyết định tài chính lớn. Sử dụng các vật phẩm phong thủy cát tường, tu dưỡng tâm tính và phóng sinh là các cách hữu hiệu giúp hóa giải vận hạn.</p>",
                        CoverImage = "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=600&auto=format&fit=crop",
                        Published = true,
                        DateCreated = DateTime.UtcNow,
                        DateUpdated = DateTime.UtcNow
                    },
                    new Post
                    {
                        Title = "[Seed Data] Ngũ Hành Tương Sinh Tương Khắc Và Ứng Dụng Đời Sống",
                        Slug = "ngu-hanh-tuong-sinh-tuong-khac-va-ung-dung-doi-song",
                        Description = "Lý thuyết ngũ hành Kim, Mộc, Thủy, Hỏa, Thổ giúp bạn cân bằng năng lượng, lựa chọn màu sắc và nghề nghiệp phù hợp.",
                        Content = "<p>Mọi vật trong vũ trụ đều được cấu thành từ 5 yếu tố cơ bản: Kim, Mộc, Thủy, Hỏa, Thổ. Hiểu rõ quy luật tương sinh (Mộc sinh Hỏa, Hỏa sinh Thổ...) và tương khắc (Thủy khắc Hỏa, Hỏa khắc Kim...) sẽ giúp bạn ứng dụng hiệu quả vào việc lựa chọn hướng nhà, màu sắc trang phục hay vật phẩm hộ mệnh.</p>",
                        CoverImage = "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format&fit=crop",
                        Published = true,
                        DateCreated = DateTime.UtcNow,
                        DateUpdated = DateTime.UtcNow
                    },
                    new Post
                    {
                        Title = "[Seed Data] Bát Tự Hà Lạc: Khai Phá Tiềm Năng Qua Giờ Sinh",
                        Slug = "bat-tu-ha-lac-khai-pha-tiem-nang-qua-gio-sinh",
                        Description = "Bát tự (Tứ trụ) là bộ môn dự đoán vận mệnh kinh điển. Khám phá cách tính và phân tích bốn trụ năm, tháng, ngày, giờ.",
                        Content = "<p>Bát Tự Hà Lạc sử dụng 8 chữ vàng (năm, tháng, ngày, giờ sinh theo âm lịch) kết hợp với quẻ Dịch để dự đoán chi tiết tiền vận và hậu vận của một đời người. Thông qua đó, đương số biết được thời cơ hành động phù hợp, tránh được rủi ro và phát huy tốt nhất sở trường cá nhân.</p>",
                        CoverImage = "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&auto=format&fit=crop",
                        Published = true,
                        DateCreated = DateTime.UtcNow,
                        DateUpdated = DateTime.UtcNow
                    },
                    new Post
                    {
                        Title = "[Seed Data] Phong Thủy Nhà Ở: Kiêng Kỵ Cần Tránh Bố Trí Bếp",
                        Slug = "phong-thuy-nha-o-kieng-ky-can-tranh-bo-tri-bep",
                        Description = "Bếp lò là kho tài lộc của gia đình. Tránh những lỗi phong thủy phòng bếp phổ biến để gia đạo êm ấm, tài lộc dồi dào.",
                        Content = "<p>Phòng bếp đại diện cho sức khỏe và tiền tài của cả gia đình. Cần tránh đặt bếp đối diện cửa nhà vệ sinh, dưới xà ngang hay tựa lưng vào khoảng trống. Đảm bảo bếp luôn sạch sẽ, thông thoáng để thu hút sinh khí tốt lành, thúc đẩy sự hòa hợp giữa các thành viên.</p>",
                        CoverImage = "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop",
                        Published = true,
                        DateCreated = DateTime.UtcNow,
                        DateUpdated = DateTime.UtcNow
                    },
                    new Post
                    {
                        Title = "[Seed Data] Sao Thiên Phủ: Biểu Tượng Tài Lộc Và Sự Khéo Léo",
                        Slug = "sao-thien-phu-bieu-tuong-tai-loc-va-su-kheo-leo",
                        Description = "Được mệnh danh là 'Thiên kho', sao Thiên Phủ mang lại phú quý và cuộc sống sung túc khi đắc địa.",
                        Content = "<p>Thiên Phủ thuộc chòm Nam Tào, ngũ hành thuộc Thổ. Nó chủ về sự bao dung, quản lý tiền bạc tài sản xuất sắc. Đương số có mệnh cư Thiên Phủ thường có dung mạo đôn hậu, tính tình ôn hòa nhưng mưu trí, hậu vận giàu sang, thích hợp với các lĩnh vực ngân hàng, quản trị kinh doanh.</p>",
                        CoverImage = "https://images.unsplash.com/photo-1532690650766-3b58f89db8e8?w=600&auto=format&fit=crop",
                        Published = true,
                        DateCreated = DateTime.UtcNow,
                        DateUpdated = DateTime.UtcNow
                    },
                    new Post
                    {
                        Title = "[Seed Data] Xem Chỉ Tay Luận Đoán Tình Duyên Sự Nghiệp",
                        Slug = "xem-chi-tay-luan-doan-tinh-duyen-su-nghiep",
                        Description = "Hướng dẫn cơ bản cách xem các đường chỉ tay chính: Sinh đạo, Trí đạo, Tâm đạo và Vận mệnh của nam và nữ.",
                        Content = "<p>Thuật xem chỉ tay là phương pháp dự đoán cổ xưa đầy thú vị. Ba đường chỉ tay chính là Sinh đạo (sức khỏe, tuổi thọ), Trí đạo (khả năng tư duy) và Tâm đạo (tình cảm, hôn nhân). Hình dáng, độ dài và các ký hiệu cắt ngang trên các đường này hé lộ nhiều ngã rẽ vận mệnh quan trọng.</p>",
                        CoverImage = "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format&fit=crop",
                        Published = true,
                        DateCreated = DateTime.UtcNow,
                        DateUpdated = DateTime.UtcNow
                    },
                    new Post
                    {
                        Title = "[Seed Data] Xem Vận Trình Qua Từng Năm",
                        Slug = "xem-van-trinh-qua-tung-nam",
                        Description = "Học cách tự luận đoán vận trình cát hung qua các sao lưu động mỗi năm như Lưu Thái Tuế, Lưu Lộc Tồn, Lưu Thiên Mã.",
                        Content = "<p>Vận trình mỗi năm biến động do các cát tinh và hung tinh chuyển dịch vị trí. Bằng cách định vị Lưu Thái Tuế tại cung địa bàn của năm đó, kết hợp xem xét tam hợp chiếu và nhị hợp, bạn có thể tự mình dự báo được các tháng hanh thông cát lợi cũng như phòng tránh các tháng có nguy cơ hao tài.</p>",
                        CoverImage = "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=600&auto=format&fit=crop",
                        Published = true,
                        DateCreated = DateTime.UtcNow,
                        DateUpdated = DateTime.UtcNow
                    }
                };

                await context.Posts.AddRangeAsync(posts);
                await context.SaveChangesAsync();
                Console.WriteLine("=== Seeded 10 astrology articles with images successfully ===");
            }
        }).GetAwaiter().GetResult();
    }
    catch (Exception ex)
    {
        Console.WriteLine("=== Lỗi tự động migrate database: " + ex.Message + " ===");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseWebAssemblyDebugging();
    app.MapOpenApi(); // mặc định: /openapi/v1.json

}
else
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseStatusCodePagesWithReExecute("/not-found", createScopeForStatusCodePages: true);
app.UseHttpsRedirection();
app.UseCors("CamQRCors");

app.UseAuthentication();
app.UseAuthorization();

app.UseAntiforgery();

var uploadRoot = Path.Combine(builder.Environment.ContentRootPath, "FileServer");
Directory.CreateDirectory(uploadRoot);

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(uploadRoot),
    RequestPath = "/contents"
});

app.MapStaticAssets();
app.MapRazorPages();
app.MapControllers();
app.MapHub<Web.Hubs.CamQRHub>("/camqrhub");
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode()
    .AddInteractiveWebAssemblyRenderMode()
    .AddAdditionalAssemblies(typeof(Web.Client.Components._Imports).Assembly);

app.MapAdditionalIdentityEndpoints();

app.MapFallbackToFile("index.html");

app.Run();
