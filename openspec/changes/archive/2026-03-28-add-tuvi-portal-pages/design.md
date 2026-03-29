## Context

- **Project**: Web portal tử vi sử dụng .NET 10 Blazor Server + WebAssembly
- **Tech Stack**: Bootstrap 5, Blazor Components
- **Target**: Tạo 2 pages mới trong `Web/Web/Components/Pages/`
- **Theme**: Vàng mùa thu (#FFB347, #FFA500, #FFD700)

## Goals / Non-Goals

**Goals:**
- Tạo trang User với form nhập liệu ngày sinh/giờ sinh và danh sách bài viết
- Tạo trang Admin với authentication và quản lý nội dung (2 tabs)
- Đảm bảo responsive cho mobile (breakpoint 768px) và desktop
- Áp dụng theme vàng nhất quán

**Non-Goals:**
- Chức năng backend (API, database) - chỉ UI skeleton
- Authentication thực tế - form login UI only
- Xử lý upload ảnh - chỉ UI component

## Decisions

### 1. Cấu trúc Page

| Decision | Rationale |
|----------|-----------|
| Tách User và Admin thành 2 page riêng | Quản lý route và code dễ hơn |
| Sử dụng Bootstrap 5 có sẵn | Không cần cài đặt thêm dependency |

### 2. User Page Layout

| Decision | Rationale |
|----------|-----------|
| Header cố định với tiêu đề | UX chuẩn cho content page |
| Form 3 trường: Date, Select (12 values), Checkbox | Theo yêu cầu |
| Card grid: 2 cột mobile, 3 cột desktop | Responsive chuẩn Bootstrap |
| Pagination component | Theo yêu cầu |

### 3. Admin Page Layout

| Decision | Rationale |
|----------|-----------|
| Login form khi chưa authenticated | UI skeleton cho authentication |
| 2 Tab: Thống kê + Tạo bài viết | Theo yêu cầu |
| Tab thống kê: 3 cards (Hôm nay, Tháng này, Năm nay) | Theo yêu cầu |
| Tab tạo bài: Form với Title, Content, Cover Image | Theo yêu cầu |

### 4. Theme màu vàng

| Color | Hex | Usage |
|-------|-----|-------|
| Vàng chính | #FFB347 | Primary buttons, headers |
| Vàng đậm | #FFA500 | Accents, hover states |
| Vàng nhạt | #FFD700 | Highlights, badges |

## Risks / Trade-offs

- [Risk] Form nhập liệu chưa có validation → [Mitigation] Thêm required attributes sau
- [Risk] Card grid cần mock data → [Mitigation] Tạo sample data tạm
- [Risk] Pagination cần backend → [Mitigation] UI skeleton với mock pagination
