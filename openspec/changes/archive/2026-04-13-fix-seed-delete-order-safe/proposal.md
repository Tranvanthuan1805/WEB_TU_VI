## Why

Khi xóa seed data (products, tickets), nếu có Order tham chiếu đến các seed products/tickets sẽ gây lỗi do ràng buộc foreign key với OnDelete.Restrict. Cần chỉ xóa seed items không có order tham chiếu.

## What Changes

- Đổi `OnDelete(DeleteBehavior.SetNull)` → `OnDelete(DeleteBehavior.Restrict)` cho Order → Ticket relationship (nhất quán với Order → Product)
- Cập nhật `DeleteSeedProductsAsync` trong Seeder.cs: chỉ xóa products không có order tham chiếu
- Cập nhật `DeleteSeedTicketsAsync` trong Seeder.cs: chỉ xóa tickets không có order tham chiếu
- Trả về thông tin số lượng items bị skip (có order tham chiếu) trong kết quả

## Capabilities

### New Capabilities
- (không có)

### Modified Capabilities
- seed-data-management: Chỉ xóa seed items không có order tham chiếu

## Impact

- Sửa: `Web/Web/Data/AppDBContext.cs` - đổi OnDelete cho Ticket
- Sửa: `Web/Web/Data/Seeder.cs` - cập nhật delete logic cho products và tickets
