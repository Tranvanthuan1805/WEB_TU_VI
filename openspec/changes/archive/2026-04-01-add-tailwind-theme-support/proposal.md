## Why

Tailwind CSS v4 không tự động map CSS custom properties (định nghĩa trong theme.css) thành utility classes như `bg-background`, `text-primary`. Điều này khiến các component trong Web app không hiển thị đúng màu sắc từ theme.

## What Changes

- Thêm `@theme` block vào `Web/Web/vite-project/src/css/theme.css` để Tailwind v4 nhận diện tất cả colors
- Map tất cả CSS custom properties từ cả 2 themes (dark + gold và admin light)
- Đảm bảo utility classes hoạt động: `bg-background`, `bg-surface`, `text-primary`, `text-on-surface-variant`, v.v.

## Capabilities

### New Capabilities
- `tailwind-theme-integration`: Tích hợp Tailwind CSS v4 với theme.css để sử dụng CSS variables làm utility classes

### Modified Capabilities
- Không có

## Impact

- **Files affected**: `Web/Web/vite-project/src/css/theme.css`
- **Related files**: `Web/Web/Components/Layout/MainLayout.razor`, `Web/Web/Components/Pages/User/Home.razor`
- **Dependencies**: Tailwind CSS v4 (`@tailwindcss/vite`: ^4.1.18)
