## 1. Model Update

- [x] 1.1 Thêm PremiumUsageCount property vào DailyUsageStats.cs
- [x] 1.2 Tạo EF Core migration: `dotnet ef migrations add AddPremiumUsageCount`
- [x] 1.3 Apply migration: `dotnet ef database update`

## 2. Dashboard Update

- [x] 2.1 Thay stat cards: Active Sessions → Total Contacts (30d) và New Contacts (24h)
- [x] 2.2 Thêm contacts queries vào LoadDataAsync()
- [x] 2.3 Thay Recent Activity → Recent Contacts list
- [x] 2.4 Fix chart empty data check

## 3. DailyUsageStats Table

- [x] 3.1 Thêm table DailyUsageStats vào Dashboard.razor
- [x] 3.2 Thêm pagination logic
- [x] 3.3 Thêm CSS styles (reuse từ OrderManager.razor.css)

## 4. Testing

- [x] 4.1 Verify build thành công
- [x] 4.2 Verify migration applied
- [x] 4.3 Verify dashboard hiển thị đúng