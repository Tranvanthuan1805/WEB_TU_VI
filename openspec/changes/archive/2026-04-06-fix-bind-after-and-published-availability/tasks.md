## 1. ProductManager: @bind:after Migration

- [x] 1.1 Change OriginPrice input from `@oninput` to `@bind:after`
- [x] 1.2 Change Price input from `@oninput` to `@bind:after`
- [x] 1.3 Change Discount input from `@oninput` to `@bind:after`
- [x] 1.4 Update OnOriginPriceChanged handler to no parameter (read _originPriceInput directly)
- [x] 1.5 Update OnPriceChanged handler to no parameter (read _priceInput directly)
- [x] 1.6 Update OnDiscountChanged handler to no parameter (read _editModel.Discount directly)

## 2. ProductManager: Availability Check

- [x] 2.1 Add IsProductAvailable() helper method
- [x] 2.2 Add disabled attribute to Published checkbox based on availability
- [x] 2.3 Add hint text "Không thể xuất bản — sản phẩm đã hết hàng" when disabled
- [x] 2.4 Update UpdateCounts() to use IsProductAvailable() for _publishedCount

## 3. TicketManager: Availability Check

- [x] 3.1 Add IsTicketAvailable() helper method
- [x] 3.2 Add disabled attribute to Published checkbox based on availability
- [x] 3.3 Add hint text "Không thể xuất bản — vé đã hết lượt" when disabled
- [x] 3.4 Update UpdateCounts() to use IsTicketAvailable() for _activeCount

## 4. Build and Verification

- [x] 4.1 Run `dotnet build` to verify no compilation errors
- [x] 4.2 Verify ProductManager uses @bind:after for all 3 inputs
- [x] 4.3 Verify TicketManager has disabled Published when out of uses