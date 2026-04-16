## Context

Hệ thống lá số Tử Vi hiện tại cho phép người dùng gọi lá số miễn phí (không cần nhập mã vé). Tuy nhiên không có cơ chế:
- Nhận diện người dùng (thiết bị)
- Đếm số lần sử dụng miễn phí
- Giới hạn số lần sử dụng

## Goals / Non-Goals

**Goals:**
- Tạo anonymous ID trên client để nhận diện thiết bị
- Tracking số lần gọi lá số miễn phí theo ngày
- Cho phép admin cấu hình giới hạn số lần miễn phí/ngày (-1 = vô hạn)
- Cung cấp nút cleanup dữ liệu > 30 ngày

**Non-Goals:**
- Authentication/authorization
- IP-based tracking
- Đếm unique users chính xác (chỉ ước tính qua anonymous ID)

## Decisions

### 1. Anonymous ID Storage
- **Chọn**: localStorage với UUID v4
- **Lý do**: Đơn giản, không cần server-side storage, persist được qua sessions
- **Alternatives**: SessionStorage (không persist), cookie (bị clear dễ)

### 2. Database Schema
- **Chọn**: Bảng `DailyUsageStats` với composite key (Date, AnonymousId)
- **Lý do**: Query nhanh theo ngày, dễ cleanup theo điều kiện Date
- **Alternatives**: Single record với JSON array (khó query và update)

### 3. Config Storage
- **Chọn**: Merge vào config.json (giống VNPay, GoogleAdSense)
- **Lý do**: Thống nhất cách quản lý config, dễ backup/restore

### 4. Usage Count Logic
- **Chọn**: Upsert - tìm record theo Date + AnonymousId, tạo mới nếu chưa có
- **Lý do**: Đơn giản, tránh race condition với increment

## Risks / Trade-offs

- **[Risk]**: Anonymous ID có thể bị xóa khi user clear cache → user mới
  - **Mitigation**: Chấp nhận là part of design, không có giải pháp hoàn hảo mà không authentication

- **[Risk]**: Multiple tabs có thể tạo multiple requests
  - **Mitigation**: Client-side không đủ context để detect, server-side cần deduplicate

- **[Risk]**: Giới hạn -1 (vô hạn) có thể bị abuse
  - **Mitigation**: Admin có thể điều chỉnh giới hạn bất kỳ lúc nào