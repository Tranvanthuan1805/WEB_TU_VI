using Microsoft.EntityFrameworkCore;
using Web.Data;
using Web.Models;

namespace Web.Services
{
    public class PendingPaymentCleanupService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly TimeSpan _interval = TimeSpan.FromMinutes(5);
        private readonly TimeSpan _expireAfter = TimeSpan.FromMinutes(15);

        public PendingPaymentCleanupService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                await CleanupExpiredOrdersAsync();
                await Task.Delay(_interval, stoppingToken);
            }
        }

        private async Task CleanupExpiredOrdersAsync()
        {
            using var scope = _serviceProvider.CreateScope();
            var dbFactory = scope.ServiceProvider.GetRequiredService<IDbContextFactory<AppDBContext>>();
            await using var context = dbFactory.CreateDbContext();
            await using var transaction = await context.Database.BeginTransactionAsync();

            try
            {
                var expiryThreshold = DateTime.UtcNow - _expireAfter;
                var expiredOrders = await context.Orders
                    .Include(o => o.Product)
                    .Where(o => o.Status == OrderStatus.PendingPayment && o.DateCreated < expiryThreshold)
                    .ToListAsync();

                foreach (var order in expiredOrders)
                {
                    order.Status = OrderStatus.Expired;
                    order.DateUpdated = DateTime.UtcNow;

                    var product = order.Product;
                    if (product != null && product.Quantity >= 0)
                    {
                        product.Quantity += order.Quantity;
                    }
                }

                if (expiredOrders.Count > 0)
                {
                    await context.SaveChangesAsync();
                }

                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }
}
