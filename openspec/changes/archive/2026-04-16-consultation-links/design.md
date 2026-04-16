## Context

Thêm section "Liên hệ tư vấn" vào MainLayout sidebar và form cấu hình trong Admin Config. Đây là feature nhỏ, không có cross-cutting changes hay external dependencies mới.

## Goals / Non-Goals

**Goals:**
- Hiển thị link Facebook/Zalo trong left sidebar
- Cho phép admin bật/tắt từng link riêng biệt
- Lưu cấu hình vào config.json

**Non-Goals:**
- Thêm tính năng chat trực tiếp
- Tích hợp với API bên thứ ba

## Decisions

- **Config storage**: Dùng config.json (pattern hiện có của GoogleAdSense, VNPay)
- **UI Pattern**: Dùng Material Symbols icon (facebook, chat)
- **Link behavior**: target="_blank" để mở tab mới

## Risks / Trade-offs

- Không có