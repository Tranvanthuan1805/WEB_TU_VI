## Context

Ticket model (`Web/Web/Models/Ticket.cs`) đã được đặt `Quantity` mặc định là 1 với `[Range(1, int.MaxValue)]`, nghĩa là không hỗ trợ số lượng vô hạn (-1). Tuy nhiên, UI (`TicketManager.razor`) vẫn còn logic kiểm tra `ticket.Quantity == -1` để hiển thị "∞", placeholder và hint text hướng dẫn nhập -1 cho vé vô hạn.

Seeder (`Web/Web/Data/Seeder.cs`) hiện chỉ có seed data cho Post. Product và Ticket chưa có seed data, gây khó khăn khi phát triển và kiểm thử.

## Goals / Non-Goals

**Goals:**
- Đồng bộ UI với model: loại bỏ hoàn toàn khái niệm "vô hạn" (-1) khỏi TicketManager.razor
- Thêm seed data cho Product (30 bản ghi) và Ticket (50 bản ghi)
- Seed data phải thực tế, có giá trị giảm giá tính toán đúng

**Non-Goals:**
- Không thay đổi model Ticket.cs (đã đúng)
- Không thay đổi logic business khác của ticket
- Không thêm tính năng mới ngoài scope

## Decisions

### 1. Ticket Quantity - Loại bỏ logic -1

**Decision**: Sửa trực tiếp trong TicketManager.razor, không tạo migration hay thay đổi database.

**Rationale**: Model đã không cho phép -1 từ đầu (`[Range(1, int.MaxValue)]`), nên database không thể có giá trị -1. Logic -1 trong UI là dead code.

**Alternatives considered**:
- Thêm migration để cho phép -1 → Không phù hợp với business logic thực tế (ticket luôn có số lượng giới hạn)
- Giữ nguyên để tương thích → Gây nhầm lẫn cho người dùng và developer

### 2. Product Seeder - Tính toán giá thực tế

**Decision**: Tính `Price = OriginPrice * (1 - Discount/100)` sau khi generate, làm tròn đến số nguyên.

**Rationale**: Đảm bảo consistency giữa OriginPrice, Discount và Price. 60% sản phẩm có discount (0-50%), 40% không có discount.

### 3. Ticket Seeder - Mã định dạng rõ ràng

**Decision**: Format mã: `[SEED]-XXXXXXXXXXXX` (17 ký tự, dễ nhận biết là seed data).

**Rationale**: Dễ dàng cleanup seed data bằng cách filter theo `[SEED]`. Độ dài >= 8 ký tự, thỏa mãn `[StringLength(255, MinimumLength = 8)]`.

### 4. Delete Methods - Pattern nhất quán

**Decision**: Dùng cùng pattern với Post seeder: query theo SeedMarker trong tên/mã, RemoveRange.

**Rationale**: Nhất quán với code hiện tại, dễ maintain.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| UI hiển thị sai nếu database có quantity = -1 (data cũ) | Không thể xảy ra vì model validation `[Range(1, ...)]` từ đầu |
| Seed data trùng lặp nếu chạy nhiều lần | Delete seed data cũ trước khi tạo mới (pattern hiện tại của Post seeder) |
| Price làm tròn khác với thực tế | Làm tròn đến số nguyên (VNĐ), phù hợp với display format `N0` |
