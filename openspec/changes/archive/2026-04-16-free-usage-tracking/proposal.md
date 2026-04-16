## Why

Hiện tại hệ thống không tracking số lần người dùng gọi lá số miễn phí (không nhập mã vé). Điều này dẫn đến:
- Không biết được số lượng người dùng thực sự hàng ngày
- Không kiểm soát được việc lạm dụng tính năng miễn phí

Cần thêm cơ chế đếm lượt sử dụng miễn phí với giới hạn có thể cấu hình được từ admin.

## What Changes

1. **Tạo Anonymous ID trên client**: Lưu vào localStorage để nhận diện thiết bị
2. **Tạo bảng DailyUsageStats**: Lưu trữ số lần sử dụng miễn phí theo ngày + anonymous ID
3. **Thêm Config FreeUsageLimit trong admin**: Cho phép cấu hình số lần miễn phí/ngày (-1 = vô hạn)
4. **Thêm nút xóa dữ liệu cũ**: Xóa records > 30 ngày từ trang Config
5. **Sửa logic Home.razor**: Khi gọi lá số không có vé → kiểm tra và tăng usage count

## Capabilities

### New Capabilities
- **anonymous-id**: Tạo và quản lý anonymous ID trên client browser
- **free-usage-tracking**: Tracking số lần sử dụng miễn phí theo ngày với giới hạn có cấu hình

## Impact

- **Database**: Thêm bảng `DailyUsageStats`
- **Config**: Thêm section `FreeUsageLimit` trong config.json
- **Pages**: 
  - `Home.razor` - thêm logic kiểm tra limit
  - `Config.razor` - thêm form cấu hình và nút cleanup
- **Static files**: Thêm `wwwroot/js/anonymous-id.js`