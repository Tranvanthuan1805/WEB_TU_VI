## Context

Website tử vi/chiêm tinh xây dựng trên .NET 10 Blazor Server với:
- Theme dark với màu vàng (primary: yellow-500/yellow-400)
- Footer component tại `Footer.razor` với placeholder links
- Các trang User nằm trong `Components/Pages/User/`

Dữ liệu thu thập từ người dùng:
- Họ tên, email, ngày sinh, giờ sinh (12 con giáp), nơi sinh, giới tính
- Cookie, analytics data
- Có thể có tài khoản, thanh toán

## Goals / Non-Goals

**Goals:**
- Tạo 3 trang pháp lý đạt chuẩn pháp luật Việt Nam
- Nhất quán phong cách với website tâm linh/tử vi
- Có SEO metadata cho mỗi trang
- Responsive, dễ đọc trên mobile

**Non-Goals:**
- Không tạo chức năng động (form liên hệ, CMS)
- Không tích hợp multi-language (tiếng Việt only)
- Không tạo API endpoints

## Decisions

### 1. Cấu trúc mỗi trang

| Phần | Giải pháp |
|------|----------|
| Page directive | `@page "/chinh-sach-privacy"` |
| SEO title | `<PageTitle>` |
| Meta description | `<meta>` trong Head |
| Last updated | Dòng text + ngày |
| Table of contents | Nav links đến anchor IDs |
| Content sections | H2 với id, H3 với id |

### 2. Style approach

- Dùng Tailwind classes có sẵn trong theme
- Tiêu đề dùng `font-headline` (italic, text-primary)
- Body dùng `font-body` / `font-light`
- Links dùng `text-yellow-400 hover:text-yellow-300`
- Section spacing: `space-y-8` hoặc `py-8`

### 3. Footer links

Cập nhật các placeholder links trong Footer.razor:
- Privacy Policy → `/chinh-sach-privacy`
- Terms of Service → `/dieu-khoan-su-dung`
- Disclaimer → `/tu-choi-trach-nhiem`

## Risks / Trade-offs

- **[Risk]**: Nội dung pháp lý cần chính xác → **Mitigation**: Dùng template chuẩn, người dùng có thể tự điều chỉnh
- **[Risk]**: Layout khác với main content → **Mitigation**: Tạo layout đơn giản, nhất quán với Footer style