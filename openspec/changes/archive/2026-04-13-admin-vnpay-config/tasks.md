## 1. Setup Config File

- [X] 1.1 Tạo `Web/Web/config.json` với cấu trúc VnPay section ban đầu

## 2. Update Config.razor

- [X] 2.1 Thêm inject `IWebHostEnvironment` để lấy web root path
- [X] 2.2 Tạo property class `VnPayConfig` với các trường
- [X] 2.3 Implement method `LoadConfig()` - đọc config.json trước, fallback appsettings
- [X] 2.4 Implement method `ExtractDomain()` - lấy domain từ full URL
- [X] 2.5 Thêm form UI với 5 input fields
- [X] 2.6 Implement method `SaveConfig()` - ghi config.json
- [X] 2.7 Implement method `ResetToDefault()` - đọc lại từ appsettings
- [X] 2.8 Thêm nút "Lưu" và "Reset"

## 3. Verify

- [X] 3.1 Build project để kiểm tra lỗi compile
- [ ] 3.2 Test form hiển thị đúng giá trị
- [ ] 3.3 Test nút Lưu ghi đè config.json
- [ ] 3.4 Test nút Reset khôi phục về default
