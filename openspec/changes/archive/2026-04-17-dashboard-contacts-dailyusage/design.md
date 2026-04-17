## Context

Dashboard admin cần cập nhật để:
1. Thêm PremiumUsageCount vào model (EF Core migration)
2. Thay Active Sessions → Contacts stats  
3. Recent Activity → Recent Contacts list
4. Thêm DailyUsageStats table

Framework: .NET 10 Blazor Server + EF Core + PostgreSQL

## Goals / Non-Goals

**Goals:**
- Thêm PremiumUsageCount column vào DailyUsageStats table
- Thay stat cards để hiển thị contacts data
- Hiển thị recent contacts thực tế
- Thêm DailyUsageStats table với pagination

**Non-Goals:**
- Không thay đổi chart type (vẫn dùng Chart.js)
- Không tạo API mới

## Decisions

1. **PremiumUsageCount**: Thêm int property vào DailyUsageStats model
   - Migration: `dotnet ef migrations add AddPremiumUsageCount`
   - Update DB: `dotnet ef database update`

2. **Contacts Stats**: Sử dụng 30 ngày làm timeframe chuẩn
   - Total Contacts (30d): `Contacts.Where(c => c.DateCreated >= DateTime.Now.AddDays(-30)).Count()`
   - New Contacts (24h): `Contacts.Where(c => c.DateCreated >= DateTime.Now.AddHours(-24)).Count()`

3. **Recent Contacts**: Query 5 records mới nhất
   - `.OrderByDescending(c => c.DateCreated).Take(5)`

4. **DailyUsageStats Table**: Pattern từ OrderManager
   - Pagination: 10 records/page
   - Columns: Date, AnonymousId, FreeUsageCount, PremiumUsageCount, LastUsedAt

5. **Empty Chart Fix**: Thêm check data empty trước khi khởi tạo chart

## Risks / Trade-offs

- [Data empty] → Chart sẽ hiển thị trống nếu không có data → Đã fix với empty check
- [Migration fail] → Rollback bằng `dotnet ef migrations remove` nếu needed

## Migration Plan

1. Thêm property vào DailyUsageStats.cs
2. Tạo migration: `dotnet ef migrations add AddPremiumUsageCount --project Web/Web/Web.csproj`
3. Apply: `dotnet ef database update --project Web/Web/Web.csproj`
4. Update Dashboard.razor để hiển thị contacts data và table
5. Test build và chạy app