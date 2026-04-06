# Product & Ticket CRUD - Technical Design

## Context

Currently the admin panel lacks proper Product and Ticket management pages. The existing template files (ProductManager.razor, TicketManager.razor) contain Post CRUD code and need to be converted to proper Product and Ticket management.

## Goals / Non-Goals

**Goals:**
- Implement full CRUD for Product model with price calculation logic
- Implement full CRUD for Ticket model with auto-generate Code
- Create user-facing ProductList with responsive grid/card layout
- Add navigation links to AdminNavMenu
- All table columns sortable

**Non-Goals:**
- Post management (already exists at /admin/posts)
- Payment/integration with external systems
- Image upload for products (use existing FileManager)
- Email/notification for ticket usage

## Decisions

### 1. Price Calculation Logic

**Decision:** Implement bi-directional price/discount calculation in service layer.

**Rationale:** Allows flexible input - user can enter either:
- OriginPrice only → Price = OriginPrice
- Price only → OriginPrice = Price  
- OriginPrice + Price → Calculate Discount
- OriginPrice + Discount → Calculate Price
- Price + Discount → Calculate OriginPrice

**Alternative:** Only allow OriginPrice + Discount input. Rejected - less flexible for users.

### 2. Quantity Logic

**Decision:** Quantity = -1 means unlimited/infinite quantity.

**Rationale:** Common pattern in e-commerce. Display as "∞" or "Không giới hạn".

### 3. Auto-Published Status

**Decision:** Auto-set Published = false when QuantitySold >= Quantity (only when Quantity > 0).

**Rationale:** Prevent overselling. User can manually re-enable if restocked.

### 4. Auto-Generate Ticket Code

**Decision:** Generate 16-character uppercase hex GUID if Code is empty.

**Rationale:** Unique, readable, collision-resistant. Format: "A1B2C3D4E5F6G7H8"

### 5. Sortable Columns

**Decision:** Implement sorting for all numeric and date columns, not just Name/Date.

**Rationale:** Better UX for admin users to find products by price range, quantity, etc.

## Risks / Trade-offs

- **Risk:** Price calculation precision with decimal types
  - **Mitigation:** Use `Math.Round(value, 2)` for 2 decimal places

- **Risk:** Large product lists performance
  - **Mitigation:** Server-side pagination already implemented in template

- **Risk:** Concurrent ticket usage
  - **Mitigation:** Database-level locking if needed; for now optimistic concurrency

## Open Questions

- Should Product have additional fields like Description, Image?
  - **Decision:** Keep scope minimal - add if needed later
- Should Ticket have expiration date?
  - **Decision:** Out of scope for now
