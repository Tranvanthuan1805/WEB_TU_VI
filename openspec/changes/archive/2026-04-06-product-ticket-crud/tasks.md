# Product & Ticket CRUD - Implementation Tasks

## 1. ProductManager.razor - CRUD Product

- [ ] 1.1 Update route from `/admin/manager` to `/admin/products`
- [ ] 1.2 Update PageTitle to "Quản lý sản phẩm"
- [ ] 1.3 Change model from Post to Product
- [ ] 1.4 Update stats row: Đã xuất bản, Hết hàng, Tổng số
- [ ] 1.5 Update table columns: Name, OriginPrice, Price, Discount, Quantity, QuantitySold, Published, DateCreated, DateUpdated
- [ ] 1.6 Make all columns sortable
- [ ] 1.7 Update form: Name, OriginPrice, Price, Discount, Quantity, NumberofTickets, Published
- [ ] 1.8 Implement price calculation logic (bi-directional)
- [ ] 1.9 Implement auto-published when out of stock
- [ ] 1.10 Update filter: Published / Hết hàng / Tất cả

## 2. TicketManager.razor - CRUD Ticket

- [ ] 2.1 Update route from `/admin/post` to `/admin/tickets`
- [ ] 2.2 Update PageTitle to "Quản lý vé"
- [ ] 2.3 Change model from Post to Ticket
- [ ] 2.4 Update stats row: Đang hoạt động, Hết lượt, Tổng số
- [ ] 2.5 Update table columns: Code, Quantity, QuantityUsed, Remaining, Published, DateCreated, DateUpdated
- [ ] 2.6 Make all columns sortable
- [ ] 2.7 Update form: Code (auto-generate GUID), Quantity, Published
- [ ] 2.8 Implement auto-generate Code from GUID
- [ ] 2.9 Implement auto-published when all tickets used
- [ ] 2.10 Update filter: Published / Hết lượt / Tất cả

## 3. ProductList.razor - User Product List

- [x] 3.1 Update route from `/bai-viet` to `/san-pham`
- [x] 3.2 Update PageTitle to "Sản Phẩm"
- [x] 3.3 Change data source from Post to Product (filter Published=true)
- [x] 3.4 Implement responsive grid layout (3/2/1 columns)
- [x] 3.5 Create product card: Name, OriginPrice (strikethrough), Price, Discount badge
- [x] 3.6 Display Quantity, QuantitySold, NumberofTickets
- [x] 3.7 Implement sorting by Name, Price, Discount, Quantity
- [x] 3.8 Update search filter

## 4. AdminNavMenu.razor - Navigation

- [ ] 4.1 Add "Sản phẩm" link to /admin/products (desktop + mobile)
- [ ] 4.2 Add "Vé" link to /admin/tickets (desktop + mobile)

## 5. Final Verification

- [ ] 5.1 Build project to check for errors
- [ ] 5.2 Test all CRUD operations for Product
- [ ] 5.3 Test all CRUD operations for Ticket
- [ ] 5.4 Test ProductList responsive layout
- [ ] 5.5 Test sorting on all columns
