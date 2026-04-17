## Context

Trang `Dashboard.razor` hiện tại sử dụng data hardcoded. Cần chuyển sang dữ liệu thật từ database qua EF Core.

Framework: .NET 10 Blazor Server + EF Core + PostgreSQL
Models: `Order`, `DailyUsageStats`

## Goals / Non-Goals

**Goals:**
- Kết nối 4 stat cards với data thật (Orders, DailyUsageStats)
- Thêm chart hiển thị daily metrics (30 ngày)
- Giữ nguyên layout và UI hiện tại

**Non-Goals:**
- Không thay đổi design/layout
- Không thêm tính năng mới khác
- Không tạo API mới

## Decisions

1. **Data Source**: Sử dụng `IDbContextFactory<AppDBContext>` theo pattern có sẵn trong project
   - Pattern: `using var context = DbFactory.CreateDbContext();`

2. **Queries**: 
   - Total Orders: `Orders.Where(o => o.DateCreated >= DateTime.Now.AddDays(-30)).Count()`
   - Revenue: `Orders.Where(o => o.Status == OrderStatus.Paid && o.DateCreated >= DateTime.Now.AddDays(-30)).Sum(o => o.TotalAmount)`
   - Unique Users: `DailyUsageStats.Where(d => d.Date >= DateOnly.FromDateTime(DateTime.Now.AddDays(-30))).Select(d => d.AnonymousId).Distinct().Count()`
   - Active Sessions: Unique AnonymousId trong 24h qua

3. **Chart Data**: Group Order theo ngày, tính count và revenue

## Risks / Trade-offs

- [Performance] → Chỉ truy vấn cần thiết, không load toàn bộ table
- [Null handling] → Xử lý null cho nullable properties