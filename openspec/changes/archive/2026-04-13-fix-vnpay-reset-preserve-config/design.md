## Context

- **Current state**: Reset chỉ gọi LoadVnPayConfig() → đọc merged config (config.json override appsettings)
- **Yêu cầu**: Reset về appsettings giá trị mặc định, giữ nguyên các config khác trong config.json (cho tương lai mở rộng)

## Goals / Non-Goals

**Goals:**
- Reset = ghi đè config.json VNPay section với giá trị mặc định từ appsettings
- Giữ nguyên các section khác trong config.json (Email, SMS, v.v.)
- Save = chỉ update VNPay section, giữ nguyên others

**Non-Goals:**
- Không tạo service/repository cho config (đơn giản trực tiếp trong razor)
- Không làm phức tạp hóa architecture

## Decisions

| Decision | Rationale |
|----------|----------|
| Đọc appsettings trực tiếp bằng File.ReadAllText + JsonSerializer | Đảm bảo đọc đúng default, không bị config.json override |
| Merge Dictionary trước khi ghi | Giữ nguyên các section khác, chỉ update VNPay |

## Risks / Trade-offs

- **Risk**: appsettings.json format lỗi → **Mitigation**: Try-catch, rollback nếu lỗi