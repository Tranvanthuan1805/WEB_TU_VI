## Why

Cần tạo 2 trang web mới cho portal tử vi: trang User để tra cứu lá số theo ngày sinh/giờ sinh và trang Admin để quản lý nội dung bài viết. Đây là bước đầu xây dựng hệ thống portal tử vi với giao diện theme vàng truyền thống.

## What Changes

- **Tạo trang User (`/user`)**: Trang chính cho người dùng với form nhập liệu ngày sinh/giờ sinh và danh sách bài viết dạng card grid có phân trang
- **Tạo trang Admin (`/admin`)**: Trang quản trị với form đăng nhập và 2 tab (thống kê doanh thu + tạo bài viết mới)
- **Áp dụng theme vàng mùa thu** cho toàn bộ giao diện
- **Thiết kế responsive** cho mobile và desktop

## Capabilities

### New Capabilities

- **user-portal-page**: Trang User với form nhập liệu tử vi và hiển thị bài viết
- **admin-portal-page**: Trang Admin với authentication và quản lý nội dung
- **tuvi-theme**: Theme vàng mùa thu cho Bootstrap 5

### Modified Capabilities

- (Không có - đây là capabilities mới)

## Impact

- Thêm mới: `Web/Web/Components/Pages/User.razor`
- Thêm mới: `Web/Web/Components/Pages/Admin.razor`
- Cập nhật: `Web/Web/Components/Routes.razor` (thêm route)
- Cập nhật: `Web/Web/Components/Layout/NavMenu.razor` (thêm navigation)
- Phụ thuộc: Bootstrap 5 (đã có sẵn trong .NET)
