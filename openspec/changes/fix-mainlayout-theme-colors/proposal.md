## Why

CamQR/Layout/MainLayout.razor.css chứa các màu cứng (hardcoded colors) cũ không khớp với theme dark + gold đã định nghĩa trong `Web/Web/vite-project/src/css/theme.css`. Điều này gây ra sự không nhất quán về màu sắc giữa các component.

## What Changes

- Loại bỏ các CSS rules không cần thiết trong `CamQR/Layout/MainLayout.razor.css` (sidebar, top-row styles)
- Đảm bảo layout sử dụng đúng màu từ CSS custom properties của theme
- Cập nhật `.page` container để match với background của theme

## Capabilities

### New Capabilities
- `theme-consistency`: Đảm bảo CamQR app sử dụng đúng color palette từ theme.css

### Modified Capabilities
- Không có spec hiện tại bị ảnh hưởng

## Impact

- **Files affected**: `CamQR/Layout/MainLayout.razor.css`
- **Related files**: `Web/Web/vite-project/src/css/theme.css` (đã đúng), `CamQR/Layout/MainLayout.razor.razor` (đã đúng)
- **Theme**: Dark + gold theme cho CamQR app
