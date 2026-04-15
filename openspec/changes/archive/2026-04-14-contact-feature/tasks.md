## 1. Database

- [x] 1.1 Create Contact model with enums (ContactType, ContactStatus)
- [x] 1.2 Create EF migration for Contact table
- [x] 1.3 Run migration to update database

## 2. User Contact Page

- [x] 2.1 Create Contact.razor page at /liên-hệ
- [x] 2.2 Implement form with select (Góp ý/Báo lỗi), textarea, email input
- [x] 2.3 Add validation: required content + email format
- [x] 2.4 Implement submit: save to DB, redirect to homepage

## 3. Admin Contact Management

- [x] 3.1 Update ContactManager route to /admin/contacts
- [x] 3.2 Update stats to show 4 statuses (Mới, Đã đọc, Đã xử lý, Bỏ qua)
- [x] 3.3 Update table columns for Contact fields
- [x] 3.4 Add filter by status dropdown
- [x] 3.5 Add search by email/content
- [x] 3.6 Update detail modal to show contact info
- [x] 3.7 Add status change functionality with dropdown

## 4. Admin Navigation

- [x] 4.1 Add "Liên hệ" menu item in AdminNavMenu.razor

## 5. Build & Test

- [x] 5.1 Run dotnet build to verify compilation
- [ ] 5.2 Verify all pages work correctly