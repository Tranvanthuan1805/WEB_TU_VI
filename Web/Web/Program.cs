
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Web.Components;
using Web.Components.Account;
using Web.Data;
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
builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

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
            if (!await roleManager.RoleExistsAsync("Admin"))
            {
                await roleManager.CreateAsync(new IdentityRole("Admin"));
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
                    await userManager.AddToRoleAsync(adminUser, "Admin");
                    Console.WriteLine("=== Default admin user seeded: admin@example.com / Admin@123 ===");
                }
                else
                {
                    Console.WriteLine("=== Lỗi tạo admin user: " + string.Join(", ", result.Errors.Select(e => e.Description)) + " ===");
                }
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
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode()
    .AddInteractiveWebAssemblyRenderMode()
    .AddAdditionalAssemblies(typeof(Web.Client.Components._Imports).Assembly);

app.MapAdditionalIdentityEndpoints();

app.MapFallbackToFile("index.html");

app.Run();
