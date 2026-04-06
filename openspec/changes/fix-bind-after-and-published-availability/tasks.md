## 1. ProductManager: @bind:after Migration

- [ ] 1.1 Change OriginPrice input from `@oninput` to `@bind:after`
- [ ] 1.2 Change Price input from `@oninput` to `@bind:after`
- [ ] 1.3 Change Discount input from `@oninput` to `@bind:after`
- [ ] 1.4 Update OnOriginPriceChanged handler to no parameter (read _originPriceInput directly)
- [ ] 1.5 Update OnPriceChanged handler to no parameter (read _priceInput directly)
- [ ] 1.6 Update OnDiscountChanged handler to no parameter (read _editModel.Discount directly)

## 2. ProductManager: Availability Check

- [ ] 2.1 Add IsProductAvailable() helper method
- [ ] 2.2 Add disabled attribute to Published checkbox based on availability
- [ ] 2.3 Add hint text "Không thể xuất bản — sản phẩm đã hết hàng" when disabled
- [ ] 2.4 Update UpdateCounts() to use IsProductAvailable() for _publishedCount

## 3. TicketManager: Availability Check

- [ ] 3.1 Add IsTicketAvailable() helper method
- [ ] 3.2 Add disabled attribute to Published checkbox based on availability
- [ ] 3.3 Add hint text "Không thể xuất bản — vé đã hết lượt" when disabled
- [ ] 3.4 Update UpdateCounts() to use IsTicketAvailable() for _activeCount

## 4. Build and Verification

- [ ] 4.1 Run `dotnet build` to verify no compilation errors
- [ ] 4.2 Verify ProductManager uses @bind:after for all 3 inputs
- [ ] 4.3 Verify TicketManager has disabled Published when out of uses