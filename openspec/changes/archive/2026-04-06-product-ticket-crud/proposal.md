# Product & Ticket CRUD Implementation

## Why

Currently the admin panel lacks proper Product and Ticket management. PostManager.razor was incorrectly used as template for Product and Ticket pages but contains Post-specific code. Need to implement full CRUD for Product and Ticket models with proper business logic.

## What Changes

- **ProductManager.razor**: Full CRUD for Product model
  - Route: `/admin/manager` → `/admin/products`
  - Stats: Đã xuất bản, Hết hàng, Tổng số
  - Table columns: Tên, Giá gốc, Giá bán, Giảm giá, Số lượng, Đã bán, Trạng thái, Ngày tạo, Ngày cập nhật
  - Form: Tên, Giá gốc, Giá bán, % Giảm giá, Số lượng, Số vé/sp, Xuất bản
  - Logic: Auto-calculate Price/OriginPrice/Discount, auto-set Published when out of stock

- **TicketManager.razor**: Full CRUD for Ticket model
  - Route: `/admin/post` → `/admin/tickets`
  - Stats: Đang hoạt động, Hết lượt, Tổng số
  - Table columns: Mã, Số lượng, Đã sử dụng, Còn lại, Trạng thái, Ngày tạo, Ngày cập nhật
  - Form: Mã (auto-generate via GUID if empty), Số lượng, Xuất bản
  - Logic: Auto-set Published when all tickets used

- **ProductList.razor**: User-facing product listing
  - Route: `/bai-viet` → `/san-pham`
  - Layout: Responsive grid (3 cols desktop, 2 tablet, 1 mobile card)
  - Display: Name, OriginPrice (strikethrough), Price, Discount badge, Quantity, QuantitySold, NumberofTickets

- **AdminNavMenu.razor**: Add navigation links for Products and Tickets

- All table columns sortable
- Price display format: Vietnamese Dong (₫)

## Capabilities

### New Capabilities

- **product-crud**: Full CRUD operations for Product model with price calculation logic
- **ticket-crud**: Full CRUD operations for Ticket model with auto-generate Code
- **product-list**: User-facing product listing with grid/card layout

### Modified Capabilities

- **post-manager**: No changes to Post management

## Impact

- Files modified: ProductManager.razor, TicketManager.razor, ProductList.razor, AdminNavMenu.razor
- No new dependencies required
- Uses existing DbSet<Product> and DbSet<Ticket> in AppDBContext
