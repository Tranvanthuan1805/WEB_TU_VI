## ADDED Requirements

### Requirement: Payment invoice details display
Khi thanh toán thành công, hệ thống SHALL hiển thị mã vé ở phần trên và chi tiết hóa đơn ở phần dưới. Các trạng thái khác chỉ hiển thị chi tiết hóa đơn.

#### Scenario: Payment successful
- **WHEN** order có trạng thái Paid
- **THEN** hiển thị:
  - Mã vé (Ticket.Code) ở phần trên
  - Chi tiết hóa đơn ở phần dưới bao gồm:
    - Mã đơn hàng (Order.TxnRef)
    - Ngày mua (Order.DateCreated)
    - Tên sản phẩm (Order.Product.Name)
    - Số lượng (Order.Quantity)
    - Đơn giá (Order.UnitPrice)
    - Tổng tiền (Order.TotalAmount)
    - Trạng thái thanh toán (Order.Status)

#### Scenario: Payment failed
- **WHEN** order có trạng thái PaymentFailed, Expired, Cancelled, hoặc Timeout
- **THEN** hiển thị chi tiết hóa đơn (không có mã vé)

#### Scenario: Invoice details display format
- **THEN** các trường thông tin hiển thị theo định dạng:
  - Mã đơn hàng: chuỗi text
  - Ngày mua: định dạng dd/MM/yyyy HH:mm
  - Số tiền: định dạng N0 (có dấu phẩy ngăn cách, kèm ký hiệu ₫)
