## Context

Trang Config.razor hiện tại:
- Seed buttons dùng chung `_isSeeding` boolean
- SaveVnPayConfig chưa có ConfirmDialog xác nhận

## Goals / Non-Goals

**Goals:**
- Tách seed button states thành 2 biến riêng biệt
- Disable cả 2 buttons khi 1 trong 2 đang hoạt động
- Thêm ConfirmDialog cho SaveVnPayConfig

**Non-Goals:**
- Không thay đổi logic nghiệp vụ khác
- Không thêm tính năng mới

## Decisions

1. **Tách seed state**: Thay `_isSeeding` thành `_isCreatingSeed` và `_isDeletingSeed`
2. **Disable logic**: `disabled="@(_isCreatingSeed || _isDeletingSeed)"` cho cả 2 buttons
3. **ConfirmDialog**: Thêm async confirm dialog trước khi gọi SaveVnPayConfig

## Risks / Trade-offs

- [Low] Đây là thay đổi UI state đơn giản, không có risks đáng kể