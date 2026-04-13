## Why

Reset VNPay config hiện tại đọc từ merged config (IConfiguration) - nếu config.json đã tồn tại, nó sẽ đọc từ config.json thay vì appsettings.json. Cần reset về giá trị mặc định thực sự từ appsettings.json và giữ nguyên các config khác (tương lai mở rộng).

## What Changes

- Tạo helper method đọc appsettings.json trực tiếp (bỏ qua config.json)
- Sửa ResetVnPayConfig: ghi đè config.json với giá trị mặc định từ appsettings, giữ nguyên các section khác
- Sửa SaveVnPayConfig: merge với config.json hiện tại, chỉ update VNPay section

## Capabilities

### New Capabilities
- (không có)

### Modified Capabilities
- admin-vnpay-config: Reset giờ ghi đè với default từ appsettings, giữ nguyên config khác

## Impact

- Sửa: `Web/Web/Components/Pages/Admin/Config.razor` - thêm helper methods và sửa Reset/Save logic