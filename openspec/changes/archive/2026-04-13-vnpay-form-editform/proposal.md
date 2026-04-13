## Why

Form VNPay hiện tại dùng raw input elements, không có validation. Cần chuyển sang EditForm để sử dụng DataAnnotations validation, đồng thời thêm disabled state cho button Reset và text state.

## What Changes

- Chuyển form từ raw input sang EditForm với DataAnnotations validation
- Thêm DataAnnotations cho VnPayConfigModel: Required, Url
- Sửa button Reset: thêm disabled state và text state
- Thêm biến _isResetting để track trạng thái reset

## Capabilities

### New Capabilities
- (không có)

### Modified Capabilities
- admin-vnpay-config: Thêm EditForm validation

## Impact

- Sửa: `Web/Web/Components/Pages/Admin/Config.razor`