## Context

- **Current state**: Form dùng raw input, không có validation, button Reset không có disabled và text state
- **Yêu cầu**: Chuyển sang EditForm với validation, thêm disabled state cho cả 2 buttons

## Goals / Non-Goals

**Goals:**
- Chuyển sang EditForm với DataAnnotations
- Thêm ValidationMessage cho mỗi field
- Button Reset có disabled và text state

**Non-Goals:**
- Không thay đổi logic save/reset

## Decisions

| Decision | Rationale |
|----------|----------|
| Dùng InputText thay input | Blazor built-in, hỗ trợ @bind-Value tốt hơn |
| Bỏ confirm dialog | EditForm OnValidSubmit handle validation trước |

## Risks / Trade-offs

- **Risk**: EditForm submit không hoạt động → **Mitigation**: Test kỹ sau khi implement