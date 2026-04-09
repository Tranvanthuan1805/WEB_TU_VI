## 1. Add polling retry limit

- [x] 1.1 Thêm biến `_pollingCount` và `_maxRetries = 3` trong VnpayReturn.razor
- [x] 1.2 Cập nhật logic polling để tăng `_pollingCount` sau mỗi lần gọi API
- [x] 1.3 Khi `_pollingCount >= _maxRetries`: hiển thị message "Không tìm thấy hóa đơn", ẩn nút "Kiểm tra lại"
- [x] 1.4 Cập nhật nút "Kiểm tra lại" chỉ hoạt động khi `_pollingCount < _maxRetries`

## 2. Add invoice details display

- [x] 2.1 Thêm logic để lưu thông tin order vào biến khi thanh toán thành công
- [x] 2.2 Thêm UI hiển thị chi tiết hóa đơn (TxnRef, DateCreated, Product.Name, Quantity, UnitPrice, TotalAmount, Status)
- [x] 2.3 Hiển thị mã vé ở trên, chi tiết hóa đơn ở dưới cho trạng thái Paid
- [x] 2.4 Hiển thị chi tiết hóa đơn (không có vé) cho các trạng thái khác

## 3. Testing

- [x] 3.1 Build và chạy thử nghiệm
- [ ] 3.2 Kiểm tra polling limit hoạt động đúng
- [ ] 3.3 Kiểm tra hiển thị chi tiết hóa đơn đúng các trường
