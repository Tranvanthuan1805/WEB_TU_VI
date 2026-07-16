using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Data;
using Web.Models;

namespace Web.Services
{
    public class SystemLogService
    {
        private readonly IDbContextFactory<AppDBContext> _dbFactory;
        private readonly AuthenticationStateProvider _authStateProvider;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public SystemLogService(
            IDbContextFactory<AppDBContext> dbFactory,
            AuthenticationStateProvider authStateProvider,
            IHttpContextAccessor httpContextAccessor)
        {
            _dbFactory = dbFactory;
            _authStateProvider = authStateProvider;
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// Logs a system or user action.
        /// </summary>
        public async Task LogAsync(string action, string details, string? userEmail = null)
        {
            try
            {
                using var context = _dbFactory.CreateDbContext();

                string email = userEmail ?? "";
                if (string.IsNullOrEmpty(email))
                {
                    try
                    {
                        var authState = await _authStateProvider.GetAuthenticationStateAsync();
                        email = authState.User.Identity?.Name ?? "Hệ thống";
                    }
                    catch
                    {
                        email = "Hệ thống";
                    }
                }

                string ipAddress = "N/A";
                try
                {
                    var httpContext = _httpContextAccessor.HttpContext;
                    if (httpContext != null)
                    {
                        ipAddress = httpContext.Connection?.RemoteIpAddress?.ToString() ?? "N/A";
                    }
                }
                catch {}

                var log = new SystemLog
                {
                    Action = action,
                    Details = details,
                    UserEmail = email,
                    IpAddress = ipAddress,
                    Timestamp = DateTime.UtcNow
                };

                context.SystemLogs.Add(log);
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Lỗi khi ghi log hệ thống: " + ex.Message);
            }
        }
    }
}
