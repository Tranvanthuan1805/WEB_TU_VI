## Why

Hiện tại cấu hình VNPay được lưu cứng trong `appsettings.json`. Khi cần thay đổi (đổi domain, secret), phải chỉnh sửa file và deploy lại. Cần tạo giao diện admin để quản lý cấu hình VNPay trực tiếp trên web mà không cần deploy.

## What Changes

- Tạo file `config.json` lưu riêng cấu hình VNPay (tách khỏi appsettings.json)
- Thêm form VNPay config trong trang Admin Config
- Form hiển thị 5 trường: TmnCode, HashSecret, PaymentUrl, Domain, IpnUrl
- Domain là một trường duy nhất, hệ thống tự thêm `/api/payments/vnpay/return` và `/api/payments/vnpay/ipn`
- Nút "Lưu" ghi vào config.json
- Nút "Reset" đọc giá trị mặc định từ appsettings.json
- Logic đọc config: ưu tiên config.json, không có thì fallback appsettings.json

## Capabilities

### New Capabilities
- `admin-vnpay-config`: Quản lý cấu hình VNPay từ giao diện admin

### Modified Capabilities
- (không có)

## Impact

- Tạo: `Web/Web/config.json`
- Sửa: `Web/Web/Components/Pages/Admin/Config.razor`
- Không ảnh hưởng VnpayService vì config vẫn đọc từ IConfiguration (fallback tự động)