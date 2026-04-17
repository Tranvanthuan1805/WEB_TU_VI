## ADDED Requirements

### Requirement: Dashboard hiển thị Recent Contacts
Dashboard SHALL hiển thị danh sách 5 contacts mới nhất.

#### Scenario: Hiển thị recent contacts
- **WHEN** trang Dashboard được tải
- **THEN** hiển thị danh sách 5 contacts từ `Contacts.OrderByDescending(c => c.DateCreated).Take(5)`

### Requirement: Recent Contacts hiển thị thông tin cơ bản
Mỗi contact trong danh sách SHALL hiển thị: Email, Type, Status, DateCreated.

#### Scenario: Hiển thị thông tin contact
- **WHEN** recent contacts được hiển thị
- **THEN** mỗi item hiển thị email, loại (GopY/BaoLoi), trạng thái, và ngày tạo