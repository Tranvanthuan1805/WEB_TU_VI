## 1. Fix Toast and ConfirmDialog z-index

- [x] 1.1 Change Toast.razor z-index from `z-50` to `z-[9999]`
- [x] 1.2 Change ConfirmDialog.razor z-index from `z-50` to `z-[9999]`

## 2. Add Edit Confirmation in Manager

- [x] 2.1 Modify SavePost() in Manager.razor to show ConfirmDialog before saving when `_isEditing == true`
- [x] 2.2 Create mode (`_isEditing == false`) saves directly without confirmation

## 3. Implement Smart 3-3-3 Pagination

- [x] 3.1 Create `GetVisiblePages()` helper method in Manager.razor returning `IEnumerable<object>` (int or "...")
- [x] 3.2 Replace `for` loop pagination in Manager.razor with `GetVisiblePages()` rendering
- [x] 3.3 Create `GetVisiblePages()` helper method in PostList.razor
- [x] 3.4 Replace `for` loop pagination in PostList.razor with `GetVisiblePages()` rendering

## 4. Add Page Jump Input

- [x] 4.1 Add `_jumpToPage` field and `JumpToPage()` method to Manager.razor with boundary clamping
- [x] 4.2 Add page jump input HTML to Manager.razor table footer
- [x] 4.3 Add `_jumpToPage` field and `JumpToPage()` method to PostList.razor with boundary clamping
- [x] 4.4 Add page jump input HTML to PostList.razor pagination area
