## Why

Cần thêm chức năng liên hệ để người dùng có thể góp ý hoặc báo lỗi hệ thống. Admin cần quản lý các liên hệ này với các trạng thái khác nhau.

## What Changes

- **User**: Tạo trang mới `/liên-hệ` với form gồm: loại (góp ý/báo lỗi), nội dung, email, nút gửi
- **User**: Validation form: required cho nội dung + email đúng format
- **User**: Sau khi gửi thành công → redirect về trang chủ
- **Admin**: Sửa ContactManager đổi route thành `/admin/contacts`
- **Admin**: Quản lý 4 trạng thái: Mới, Đã đọc, Đã xử lý, Bỏ qua
- **Admin**: Không có tạo mới - chỉ xem và thay đổi trạng thái
- **DB**: Thêm bảng Contact

## Capabilities

### New Capabilities
- **contact-form**: Trang liên hệ cho người dùng với form và validation
- **contact-management**: Trang admin quản lý liên hệ với 4 trạng thái

### Modified Capabilities
- (không có)

## Impact

- Thêm Model: `Web/Web/Models/Contact.cs`
- Thêm View: `Web/Web/Components/Pages/User/Contact.razor`
- Sửa View: `Web/Web/Components/Pages/Admin/ContactManager.razor`
- Sửa View: `Web/Web.Client/Components/Layout/AdminNavMenu.razor`
- Database: Thêm bảng Contact qua EF migration