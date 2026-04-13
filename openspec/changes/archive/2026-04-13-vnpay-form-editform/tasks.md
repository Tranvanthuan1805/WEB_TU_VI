## 1. Update VnPayConfigModel

- [X] 1.1 Thêm DataAnnotations: Required, Url cho các properties

## 2. Update UI

- [X] 2.1 Bọc form trong EditForm
- [X] 2.2 Thay input bằng InputText, InputPassword
- [X] 2.3 Thêm ValidationMessage cho mỗi field
- [X] 2.4 Sửa button Save: type="submit", bỏ @onclick
- [X] 2.5 Sửa button Reset: thêm disabled, thêm text state

## 3. Update Code

- [X] 3.1 Thêm biến _isResetting
- [X] 3.2 Bỏ confirm dialog trong SaveVnPayConfig (vì EditForm đã validate)
- [X] 3.3 Cập nhật ResetVnPayConfig: set _isResetting

## 4. Verify

- [X] 4.1 Build project để kiểm tra lỗi compile
