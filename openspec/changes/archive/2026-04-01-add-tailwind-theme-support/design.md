## Context

Web app sử dụng Tailwind CSS v4 với theme colors định nghĩa trong CSS custom properties (`:root` cho dark + gold theme, `[data-theme="admin"]` cho admin light theme). Tuy nhiên, Tailwind v4 không tự động map các CSS variables này thành utility classes.

**Current state:**
- `theme.css` định nghĩa ~50+ CSS custom properties cho colors
- Components sử dụng classes như `bg-background`, `text-primary`, `border-outline`
- Các utility classes này không hoạt động vì Tailwind v4 không nhận diện chúng

**Constraints:**
- Tailwind CSS v4 (`@tailwindcss/vite`: ^4.1.18)
- 2 themes: dark + gold (default) và admin light

## Goals / Non-Goals

**Goals:**
- Thêm `@theme` block vào `theme.css` để Tailwind v4 nhận diện tất cả color CSS variables
- Hỗ trợ cả 2 themes (dark + gold và admin)
- Đảm bảo các utility classes hoạt động: `bg-*`, `text-*`, `border-*`

**Non-Goals:**
- Không thay đổi giá trị màu sắc hiện tại
- Không thêm màu mới - chỉ map các màu đã có
- Không thay đổi cấu trúc HTML hay component logic

## Decisions

1. **Thêm `@theme` block trong theme.css**: Tailwind v4 yêu cầu `@theme` block để nhận diện CSS variables làm colors. Sẽ thêm vào đầu file, trước `:root`.

2. **Sử dụng `--color-*` prefix trong @theme**: Tailwind v4 convention là sử dụng `--color-{name}` để map. Ví dụ: `--color-primary: var(--primary)` → cho phép sử dụng `text-primary`.

3. **Map tất cả colors từ cả 2 themes**: Bao gồm primary, surface, on-surface, outline, secondary, tertiary, error, background.

## Risks / Trade-offs

- [Low Risk] Cần verify Tailwind v4 build sau khi thêm @theme → Mitigation: Build project sau khi thay đổi
- [Low Risk] CSS variables có thể không resolve đúng trong production → Mitigation: Sử dụng var() references trong @theme
