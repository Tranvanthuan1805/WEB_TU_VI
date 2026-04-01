## Context

CamQR app sử dụng Blazor WebAssembly với MainLayout.razor.css chứa các hardcoded colors từ template gốc:
- `.sidebar`: `linear-gradient(180deg, rgb(5, 39, 103) 0%, #3a0647 70%)` (blue/purple)
- `.top-row`: `#f7f7f7` và `#d6d5d5` (light gray)

Trong khi đó, theme dark + gold định nghĩa trong `theme.css`:
- `--background: #131013`
- `--surface: #131013`
- `--surface-container: #201f1f`
- `--outline-variant: #4d4732`

## Goals / Non-Goals

**Goals:**
- Loại bỏ các hardcoded colors không dùng trong MainLayout.razor.css
- Đảm bảo layout sử dụng CSS custom properties từ theme
- Giữ nguyên cấu trúc layout cơ bản

**Non-Goals:**
- Không thay đổi cấu trúc HTML của layout
- Không tạo responsive styles mới (giữ nguyên hiện tại)
- Không thay đổi theme chính (vẫn là dark + gold)

## Decisions

1. **Loại bỏ unused CSS rules**: `.sidebar` và `.top-row` không được sử dụng trong MainLayout.razor.html hiện tại → xóa để tránh confusion

2. **Giữ flexbox layout cơ bản**: `.page` và `main` structure giữ nguyên vì cần thiết cho content

3. **Thêm theme-aware styles**: Thêm background color sử dụng CSS custom properties

## Risks / Trade-offs

- [Low Risk] CSS có thể bị breaking nếu theme CSS chưa được load → Mitigation: Verify theme.css được import trước MainLayout.razor.css
