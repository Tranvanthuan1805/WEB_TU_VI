## ADDED Requirements

### Requirement: Page title and description

The system SHALL provide appropriate page title and description for the horoscope generation page.

#### Scenario: Page title displays correctly
- **WHEN** User/Home.razor page is loaded
- **THEN** the page title SHALL be "Trang chủ | Lá Số Tử Vi"

#### Scenario: Page heading displays
- **WHEN** User/Home.razor page is loaded
- **THEN** the page SHALL display heading "Lập Lá Số Tử Vi"

#### Scenario: Page description displays
- **WHEN** User/Home.razor page is loaded
- **THEN** the page SHALL display description: "Khám phá bản đồ định mệnh của bạn thông qua thuật toán cổ truyền kết hợp trí tuệ số. Hãy nhập chính xác thông tin để khai mở Manuscript."

### Requirement: Three-column layout

The system SHALL provide a three-column layout matching the design.

#### Scenario: Left sidebar displays
- **WHEN** User/Home.razor page is loaded on large screens (lg breakpoint)
- **THEN** a left sidebar SHALL occupy 3 columns (col-lg-3)
- **AND** SHALL contain "Kiến Thức Tử Vi" section with explanations

#### Scenario: Center content displays
- **WHEN** User/Home.razor page is loaded
- **THEN** the center content SHALL occupy 6 columns (col-lg-6)
- **AND** SHALL contain the main form and horoscope placeholder

#### Scenario: Right sidebar displays
- **WHEN** User/Home.razor page is loaded on extra-large screens (xl breakpoint)
- **THEN** a right sidebar SHALL occupy 3 columns (col-lg-3)
- **AND** SHALL contain decorative image and related articles

### Requirement: Birth information form

The system SHALL provide a birth information form with all required fields.

#### Scenario: Full name field displays
- **WHEN** User/Home.razor page is loaded
- **THEN** the form SHALL include a "Họ và tên" (Full Name) text input field
- **AND** SHALL have placeholder "VÍ DỤ: NGUYỄN VĂN A"

#### Scenario: Date of birth field displays
- **WHEN** User/Home.razor page is loaded
- **THEN** the form SHALL include a "Ngày tháng năm sinh" date input field

#### Scenario: Calendar type toggle displays
- **WHEN** User/Home.razor page is loaded
- **THEN** the form SHALL include a calendar type toggle with two options:
  - "Dương Lịch" (Solar) - selected by default
  - "Âm Lịch" (Lunar)

#### Scenario: Birth hour field displays
- **WHEN** User/Home.razor page is loaded
- **THEN** the form SHALL include a "Giờ sinh" (Birth Hour) dropdown
- **AND** SHALL contain 12 traditional Vietnamese hours:
  - Tý (23h - 01h)
  - Sửu (01h - 03h)
  - Dần (03h - 05h)
  - Mão (05h - 07h)
  - Thìn (07h - 09h)
  - Tỵ (09h - 11h)
  - Ngọ (11h - 13h)
  - Mùi (13h - 15h)
  - Thân (15h - 17h)
  - Dậu (17h - 19h)
  - Tuất (19h - 21h)
  - Hợi (21h - 23h)

#### Scenario: Gender field displays
- **WHEN** User/Home.razor page is loaded
- **THEN** the form SHALL include a "Giới tính" (Gender) selection
- **AND** SHALL have options "Nam" (Male) and "Nữ" (Female)

#### Scenario: Submit button displays
- **WHEN** User/Home.razor page is loaded
- **THEN** the form SHALL include a submit button with text "An Lá Số Ngay"
- **AND** SHALL have gradient styling from primary-container to #e9c400
- **AND** SHALL display a flare/star icon

### Requirement: Bagua placeholder section

The system SHALL provide a placeholder section for the horoscope chart.

#### Scenario: Bagua placeholder displays
- **WHEN** User/Home.razor page is loaded
- **THEN** a placeholder section SHALL display below the form
- **AND** SHALL show title "Bản Đồ Mệnh Cách"
- **AND** SHALL show description text explaining the chart will appear after submission

### Requirement: Articles section

The system SHALL display recent articles in the sidebars.

#### Scenario: Articles display in left sidebar
- **WHEN** User/Home.razor page is loaded
- **THEN** the left sidebar SHALL display "Bài Viết Mới Nhất" section
- **AND** SHALL show article cards with title, description, image, and category

#### Scenario: Related articles display in right sidebar
- **WHEN** User/Home.razor page is loaded on xl screens
- **THEN** the right sidebar SHALL display "Bài viết liên quan" section
- **AND** SHALL show links to related articles

#### Scenario: Article cards have correct styling
- **WHEN** User/Home.razor page is loaded
- **AND** article cards SHALL use tuvi-card styling matching the dark theme

### Requirement: Knowledge sidebar section

The system SHALL provide educational content about Tử Vi in the left sidebar.

#### Scenario: Knowledge section displays
- **WHEN** User/Home.razor page is loaded
- **THEN** the left sidebar SHALL display "Kiến Thức Tử Vi" section
- **AND** SHALL explain:
  - Cung (Palaces): 12 palaces representing life aspects
  - Sao (Stars): Main and secondary stars interaction
  - Hạn (Periods): 10-year and annual periods

#### Scenario: Quote displays
- **WHEN** User/Home.razor page is loaded
- **THEN** the left sidebar SHALL display the quote: "Mệnh tốt không bằng Thân tốt, Thân tốt không bằng Hạn tốt."
