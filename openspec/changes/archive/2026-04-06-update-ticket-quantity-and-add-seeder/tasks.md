## 1. TicketManager UI Fixes

- [x] 1.1 Remove `ticket.Quantity == -1 ? "∞"` logic from quantity display cell (line 115)
- [x] 1.2 Remove `ticket.Quantity == -1 ? "∞"` logic from remaining calculation cell (line 121)
- [x] 1.3 Update quantity input placeholder from "-1 cho vô hạn" to "Nhập số lượng..." (line 225)
- [x] 1.4 Update quantity input hint from "-1 cho vé vô hạn" to "Số lượng vé có thể sử dụng" (line 226)
- [x] 1.5 Fix HasUnsavedChanges() to check `Quantity != 1` instead of `Quantity != 0` (line 995)

## 2. Product Seeder Implementation

- [x] 2.1 Add `SeedProductsAsync()` method with Bogus faker for 30 products
- [x] 2.2 Add `DeleteSeedProductsAsync()` method to remove seed products by `[Seed Data]` marker
- [x] 2.3 Implement price calculation: `Price = OriginPrice * (1 - Discount/100)` with rounding
- [x] 2.4 Add discount distribution: 60% with discount (0-50%), 40% no discount

## 3. Ticket Seeder Implementation

- [x] 3.1 Add `SeedTicketsAsync()` method with Bogus faker for 50 tickets
- [x] 3.2 Add `DeleteSeedTicketsAsync()` method to remove seed tickets by `[SEED]` marker
- [x] 3.3 Generate ticket codes in format `[SEED]-XXXXXXXXXXXX` (uppercase alphanumeric, 12 chars)
- [x] 3.4 Ensure QuantityUsed does not exceed Quantity for each seed ticket

## 4. Build and Verification

- [x] 4.1 Run `dotnet build` to verify no compilation errors
- [x] 4.2 Verify TicketManager.razor no longer contains `-1` or `∞` references
- [x] 4.3 Verify Seeder.cs contains all 4 new methods
