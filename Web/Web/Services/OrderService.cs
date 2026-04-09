using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Web.Data;
using Web.Models;

namespace Web.Services
{
    public class OrderService
    {
        private readonly IDbContextFactory<AppDBContext> _dbFactory;

        public OrderService(IDbContextFactory<AppDBContext> dbFactory)
        {
            _dbFactory = dbFactory;
        }

        public async Task<Order> CreatePendingOrderAsync(int productId, int quantity = 1)
        {
            await using var context = _dbFactory.CreateDbContext();
            await using var transaction = await context.Database.BeginTransactionAsync();
            try
            {
                var product = await context.Products
                    .FromSqlRaw("SELECT * FROM \"Product\" WHERE \"ProductId\" = {0} FOR UPDATE", productId)
                    .FirstOrDefaultAsync();

                if (product == null)
                    throw new InvalidOperationException("Sản phẩm không tồn tại");

                if (!product.IsAvailable)
                    throw new InvalidOperationException("Sản phẩm đã hết hàng");

                if (product.Quantity >= 0 && product.Quantity < quantity + product.QuantitySold)
                    throw new InvalidOperationException("Sản phẩm đã hết hàng");

                product.QuantitySold += quantity;

                var now = DateTime.UtcNow;
                var order = new Order
                {
                    TxnRef = Guid.NewGuid().ToString("N"),
                    ProductId = productId,
                    Quantity = quantity,
                    UnitPrice = product.Price,
                    TotalAmount = product.Price * quantity,
                    Status = OrderStatus.PendingPayment,
                    DateCreated = now,
                    DateUpdated = now
                };

                context.Orders.Add(order);
                await context.SaveChangesAsync();
                await transaction.CommitAsync();

                await using var context2 = _dbFactory.CreateDbContext();
                return await context2.Orders
                    .Include(o => o.Product)
                    .FirstAsync(o => o.OrderId == order.OrderId);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<bool> MarkPaidAsync(string txnRef, string vnpayTransactionNo)
        {
            await using var context = _dbFactory.CreateDbContext();
            await using var transaction = await context.Database.BeginTransactionAsync();
            try
            {
                var order = await context.Orders
                    .Include(o => o.Product)
                    .FirstOrDefaultAsync(o => o.TxnRef == txnRef);

                if (order == null || order.Status != OrderStatus.PendingPayment)
                    return false;

                order.Status = OrderStatus.Paid;
                order.VnpayTransactionNo = vnpayTransactionNo;
                order.DateUpdated = DateTime.UtcNow;

                var product = order.Product;
                var numberOfTickets = product?.NumberofTickets ?? 1;
                var quantity = order.Quantity;

                var ticket = new Ticket
                {
                    Code = Guid.NewGuid().ToString("N")[..16].ToUpper(),
                    DateCreated = DateTime.UtcNow,
                    DateUpdated = DateTime.UtcNow,
                    Quantity = quantity * numberOfTickets,
                    QuantityUsed = 0
                };

                context.Tickets.Add(ticket);
                await context.SaveChangesAsync();

                order.TicketId = ticket.TicketId;
                await context.SaveChangesAsync();
                await transaction.CommitAsync();

                return true;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<bool> MarkFailedAsync(string txnRef, string responseCode)
        {
            await using var context = _dbFactory.CreateDbContext();
            await using var transaction = await context.Database.BeginTransactionAsync();
            try
            {
                var order = await context.Orders
                    .Include(o => o.Product)
                    .FirstOrDefaultAsync(o => o.TxnRef == txnRef);

                if (order == null || order.Status != OrderStatus.PendingPayment)
                    return false;

                order.Status = OrderStatus.PaymentFailed;
                order.VnpayResponseCode = responseCode;
                order.DateUpdated = DateTime.UtcNow;

                var product = order.Product;
                if (product != null)
                    product.QuantitySold -= order.Quantity;

                await context.SaveChangesAsync();
                await transaction.CommitAsync();

                return true;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<bool> MarkExpiredAsync(string txnRef)
        {
            await using var context = _dbFactory.CreateDbContext();
            await using var transaction = await context.Database.BeginTransactionAsync();
            try
            {
                var order = await context.Orders
                    .Include(o => o.Product)
                    .FirstOrDefaultAsync(o => o.TxnRef == txnRef);

                if (order == null || order.Status != OrderStatus.PendingPayment)
                    return false;

                order.Status = OrderStatus.Expired;
                order.DateUpdated = DateTime.UtcNow;

                var product = order.Product;
                if (product != null)
                    product.QuantitySold -= order.Quantity;

                await context.SaveChangesAsync();
                await transaction.CommitAsync();

                return true;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<Order?> GetOrderStatusAsync(string txnRef)
        {
            await using var context = _dbFactory.CreateDbContext();
            return await context.Orders
                .Include(o => o.Product)
                .Include(o => o.Ticket)
                .FirstOrDefaultAsync(o => o.TxnRef == txnRef);
        }
    }
}