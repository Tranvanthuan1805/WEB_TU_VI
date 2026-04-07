## 1. ProductManager.razor Updates

- [x] 1.1 Add `_draftCount` variable declaration
- [x] 1.2 Update `UpdateCounts()` method to count: published (Published=true), draft (!Published && IsAvailable), out of stock
- [x] 1.3 Update stats-row HTML to add 4th column for "Nháp"
- [x] 1.4 Update CSS grid from 3 to 4 columns

## 2. TicketManager.razor Updates

- [x] 2.1 Add `_inactiveCount` variable declaration
- [x] 2.2 Update `UpdateCounts()` method to count: active (Published=true), inactive (!Published && IsAvailable), used up
- [x] 2.3 Update stats-row HTML to add 4th column for "Không hoạt động"
- [x] 2.4 Update CSS grid from 3 to 4 columns