## 1. Update AppDBContext

- [X] 1.1 Đổi OnDelete cho Order → Ticket thành Restrict (AppDBContext.cs)

## 2. Update Seeder

- [X] 2.1 Update DeleteSeedProductsAsync - chỉ xóa products không có order
- [X] 2.2 Update DeleteSeedTicketsAsync - chỉ xóa tickets không có order
- [X] 2.3 Trả về thêm thông tin số lượng bị skip

## 3. Verify

- [X] 3.1 Build project để kiểm tra lỗi compile
