# SPEC: OrderManager.razor - Admin Order Management

## 1. Project Overview

| Item | Value |
|------|-------|
| **Feature** | Quản lý đơn hàng (View-only) |
| **Component** | `Web/Web/Components/Pages/Admin/OrderManager.razor` |
| **Template** | Dựa trên ProductManager.razor |

## 2. UI/UX Specification

### 2.1 Page Structure

```razor
@page "/admin/orders"
@rendermode InteractiveServer
@attribute [StreamRendering]
@attribute [Authorize(Roles = RoleName.Administrator)]
```

### 2.2 Stats Row (5 thống kê)

| # | Label | Icon | CSS Class |
|---|-------|------|-----------|
| 1 | Chờ thanh toán | `hourglass_empty` | - |
| 2 | Đã thanh toán | `check_circle` | - |
| 3 | Thất bại | `error` | warning (màu cam) |
| 4 | Hết hạn | `schedule` | - |
| 5 | Tổng số | `receipt_long` | - |

### 2.3 Filter Controls

**Search Input:**
- Placeholder: "Tìm kiếm theo mã vé, tên sản phẩm..."
- Tìm kiếm trên 3 trường:
  - `Ticket.Code` (mã vé)
  - `Product.Name` (tên sản phẩm)
  - `DateUpdated` (ngày cập nhật - format dd/MM/yyyy)

**Status Dropdown:**
| Value | Text |
|-------|------|
| `""` | Tất cả |
| `"pending"` | Chờ thanh toán |
| `"paid"` | Đã thanh toán |
| `"failed"` | Thất bại |
| `"expired"` | Hết hạn |

### 2.4 Data Table

| # | Column | Sortable | Format |
|---|--------|----------|--------|
| 1 | Mã giao dịch | ✓ | `TxnRef` |
| 2 | Sản phẩm | ✓ | `Product.Name` (link đến `/product/{slug}`) |
| 3 | Mã vé | ✓ | `Ticket.Code` hoặc "-" |
| 4 | Số lượng | ✓ | `Quantity` |
| 5 | Đơn giá | ✓ | `UnitPrice.ToString("N0")₫` |
| 6 | Tổng tiền | ✓ | `TotalAmount.ToString("N0")₫` |
| 7 | Trạng thái | - | Status tag |
| 8 | Mã VNPay | - | `VnpayTransactionNo` hoặc "-" |
| 9 | Ngày tạo | ✓ | `DateCreated.ToString("dd/MM/yyyy HH:mm")` |
| 10 | Ngày cập nhật | ✓ | `DateUpdated.ToString("dd/MM/yyyy HH:mm")` |

**Status Tags:**
| Status | Text | CSS Class |
|--------|------|-----------|
| `PendingPayment` | Chờ thanh toán | `pending` (màu vàng) |
| `Paid` | Đã thanh toán | `paid` (màu xanh) |
| `PaymentFailed` | Thất bại | `failed` (màu đỏ) |
| `Expired` | Hết hạn | `expired` (màu xám) |

**Row Actions:**
- Chỉ có 1 button: "Xem chi tiết" (icon: `visibility`)
- KHÔNG có sửa/xóa

### 2.5 Detail Modal

```
┌─────────────────────────────────────────┐
│ Chi tiết đơn hàng              [X]     │
├─────────────────────────────────────────┤
│ Mã giao dịch: [TxnRef]                  │
│ Sản phẩm: [Product.Name]               │
│ Mã sản phẩm: [Product.ProductId]        │
│ Mã vé: [Ticket.Code hoặc "Không có"]   │
│ Số lượng: [Quantity]                    │
│ Đơn giá: [UnitPrice]                    │
│ Tổng tiền: [TotalAmount]                │
│ Trạng thái: [Status text]               │
│ Mã VNPay: [VnpayTransactionNo]         │
│ Mã phản hồi: [VnpayResponseCode]        │
│ Trạng thái VNPay: [VnpayTransactionStatus] │
│ Ngày tạo: [DateCreated]                 │
│ Ngày cập nhật: [DateUpdated]            │
├─────────────────────────────────────────┤
│                              [Đóng]     │
└─────────────────────────────────────────┘
```

### 2.6 Pagination

Giống ProductManager:
- Page size input
- Showing text: "Hiển thị X-Y của Z đơn hàng"
- Pagination buttons với ellipsis
- Jump to page input

## 3. Functionality Specification

### 3.1 Data Loading

```csharp
// Load orders with Include Product and Ticket
_allOrders = await context.Orders
    .Include(o => o.Product)
    .Include(o => o.Ticket)
    .OrderByDescending(o => o.DateCreated)
    .ToListAsync();
```

### 3.2 Filter Logic

```csharp
// Search filter - tìm kiếm trên 3 trường
Where(o => 
    (string.IsNullOrEmpty(searchQuery) 
        || o.Ticket.Code.Contains(searchQuery)
        || (o.Product != null && o.Product.Name.Contains(searchQuery))
        || o.DateUpdated.ToString("dd/MM/yyyy").Contains(searchQuery))
    && (string.IsNullOrWhiteSpace(_statusFilter)
        || (_statusFilter == "pending" && o.Status == OrderStatus.PendingPayment)
        || (_statusFilter == "paid" && o.Status == OrderStatus.Paid)
        || (_statusFilter == "failed" && o.Status == OrderStatus.PaymentFailed)
        || (_statusFilter == "expired" && o.Status == OrderStatus.Expired))
)
```

### 3.3 Sorting

Sortable columns:
- TxnRef, Product.Name, Ticket.Code, Quantity, UnitPrice, TotalAmount, DateCreated, DateDefault

Sort default: `DateCreated` descending (mới nhất)

### 3.4 Stats Calculation

```csharp
_pendingCount = _allOrders.Count(o => o.Status == OrderStatus.PendingPayment);
_paidCount = _allOrders.Count(o => o.Status == OrderStatus.Paid);
_failedCount = _allOrders.Count(o => o.Status == OrderStatus.PaymentFailed);
_expiredCount = _allOrders.Count(o => o.Status == OrderStatus.Expired);
_totalCount = _allOrders.Count;
```

### 3.5 Detail Modal

- Button "Xem chi tiết" → mở modal hiển thị tất cả thông tin order
- Modal có close button và click outside để đóng

## 4. Code Remove from Template

Loại bỏ các thành phần sau từ ProductManager:
- Add button (dòng 18-21)
- Editor modal (dòng 227-300)
- Tất cả methods liên quan đến create/edit/delete/save

## 5. Acceptance Criteria

- [ ] Page route là `/admin/orders`
- [ ] 5 stats hiển thị đúng số lượng theo từng trạng thái
- [ ] Search tìm được trên mã vé, tên sản phẩm, ngày cập nhật
- [ ] Filter status hoạt động đúng
- [ ] Table hiển thị 10 cột đầy đủ
- [ ] Sort hoạt động trên các cột sortable
- [ ] Button "Xem chi tiết" mở modal với đầy đủ thông tin
- [ ] Pagination hoạt động đầy đủ
- [ ] KHÔNG có button thêm/sửa/xóa
- [ ] Build thành công không lỗi