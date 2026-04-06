# Product & Ticket CRUD - Implementation Tasks

## 1. ProductManager.razor - CRUD Product

- [X] 1.1 Update route from `/admin/manager` to `/admin/products`
- [X] 1.2 Update PageTitle to "Quản lý sản phẩm"
- [X] 1.3 Change model from Post to Product
- [X] 1.4 Update stats row: Đã xuất bản, Hết hàng, Tổng số
- [X] 1.5 Update table columns: Name, OriginPrice, Price, Discount, Quantity, QuantitySold, Published, DateCreated, DateUpdated
- [X] 1.6 Make all columns sortable
- [X] 1.7 Update form: Name, OriginPrice, Price, Discount, Quantity, NumberofTickets, Published
- [X] 1.8 Implement price calculation logic (bi-directional)
- [X] 1.9 Implement auto-published when out of stock
- [X] 1.10 Update filter: Published / Hết hàng / Tất cả

## 2. TicketManager.razor - CRUD Ticket

- [X] 2.1 Update route from `/admin/post` to `/admin/tickets`
- [X] 2.2 Update PageTitle to "Quản lý vé"
- [X] 2.3 Change model from Post to Ticket
- [X] 2.4 Update stats row: Đang hoạt động, Hết lượt, Tổng số
- [X] 2.5 Update table columns: Code, Quantity, QuantityUsed, Remaining, Published, DateCreated, DateUpdated
- [X] 2.6 Make all columns sortable
- [X] 2.7 Update form: Code (auto-generate GUID), Quantity, Published
- [X] 2.8 Implement auto-generate Code from GUID
- [X] 2.9 Implement auto-published when all tickets used
- [X] 2.10 Update filter: Published / Hết lượt / Tất cả

## 3. ProductList.razor - User Product List

- [X] 3.1 Update route from `/bai-viet` to `/san-pham`
- [X] 3.2 Update PageTitle to "Sản Phẩm"
- [X] 3.3 Change data source from Post to Product (filter Published=true)
- [X] 3.4 Implement responsive grid layout (3/2/1 columns)
- [X] 3.5 Create product card: Name, OriginPrice (strikethrough), Price, Discount badge
- [X] 3.6 Display Quantity, QuantitySold, NumberofTickets
- [X] 3.7 Implement sorting by Name, Price, Discount, Quantity
- [X] 3.8 Update search filter

## 4. AdminNavMenu.razor - Navigation

- [X] 4.1 Add "Sản phẩm" link to /admin/products (desktop + mobile)
- [X] 4.2 Add "Vé" link to /admin/tickets (desktop + mobile)

## 5. Final Verification

- [X] 5.1 Build project to check for errors
- [ ] 5.2 Test all CRUD operations for Product
- [ ] 5.3 Test all CRUD operations for Ticket
- [ ] 5.4 Test ProductList responsive layout
- [ ] 5.5 Test sorting on all columns
