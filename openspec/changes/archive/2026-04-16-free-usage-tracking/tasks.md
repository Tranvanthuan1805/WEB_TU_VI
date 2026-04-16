## 1. Client-side Anonymous ID

- [x] 1.1 Create `wwwroot/js/anonymous-id.js` with `getOrCreateAnonId()` function
- [x] 1.2 Add JS interop registration in Program.cs or App.razor

## 2. Database Setup

- [x] 2.1 Create `Models/DailyUsageStats.cs` entity
- [x] 2.2 Add `DbSet<DailyUsageStats>` to `AppDBContext.cs`
- [x] 2.3 Create EF Core migration for DailyUsageStats
- [ ] 2.4 Run migration to update database (DB not running - need to run manually)

## 3. Config Integration

- [x] 3.1 Add default `FreeUsageLimit` section to `appsettings.json` (DailyLimit: 5)
- [x] 3.2 Add `FreeUsageLimit` section to existing `config.json`
- [x] 3.3 Add FreeUsageLimit config model class in Config.razor
- [x] 3.4 Create load/save/reset functions for FreeUsageLimit in Config.razor
- [x] 3.5 Add UI form for FreeUsageLimit in Config.razor

## 4. Usage Tracking Logic

- [x] 4.1 Modify `Home.razor` - add JS interop to get anonymous ID
- [x] 4.2 Modify `Home.razor` - add usage count logic when no ticket
- [x] 4.3 Add check for daily limit before allowing free usage
- [x] 4.4 Add toast message when limit exceeded

## 5. Cleanup Feature

- [x] 5.1 Add cleanup method in Config.razor to delete records > 30 days
- [x] 5.2 Add "Xóa dữ liệu > 30 ngày" button in Config.razor
- [x] 5.3 Add success toast with deleted count after cleanup