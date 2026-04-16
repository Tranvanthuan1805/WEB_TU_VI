## ADDED Requirements

### Requirement: Daily usage count stored per anonymous ID
The system SHALL store a daily usage count for each anonymous ID in the database, with one record per (Date, AnonymousId) combination.

#### Scenario: Record created on first free usage of the day
- **WHEN** user calls lá số without a ticket for the first time on a given day
- **THEN** system creates a new DailyUsageStats record with Date = today, FreeUsageCount = 1

#### Scenario: Existing record incremented on subsequent free usage
- **WHEN** user calls lá số without a ticket and a record exists for today with that anonymous ID
- **THEN** system increments FreeUsageCount by 1

### Requirement: Free usage limit configurable by admin
The system SHALL allow administrators to configure the maximum number of free usages per day via the Config page, where -1 means unlimited.

#### Scenario: Admin sets daily limit to 3
- **WHEN** admin enters "3" in FreeUsageLimit config and saves
- **THEN** users can call lá số for free up to 3 times per day

#### Scenario: Admin sets daily limit to -1 (unlimited)
- **WHEN** admin enters "-1" in FreeUsageLimit config and saves
- **THEN** users can call lá số for free without any limit

#### Scenario: User exceeds daily limit
- **WHEN** user attempts to call lá số without a ticket and has already reached the daily limit
- **THEN** system displays a toast message "Bạn đã sử dụng quá số lần miễn phí hôm nay" and prevents the call

### Requirement: Free usage only counts when no ticket is used
The system SHALL only count towards the daily limit when the user calls lá số WITHOUT entering a valid ticket code.

#### Scenario: With valid ticket - not counted
- **WHEN** user enters a valid ticket code and calls lá số
- **THEN** FreeUsageCount is NOT incremented (ticket is used instead)

#### Scenario: Without ticket - counted
- **WHEN** user leaves ticket code empty and calls lá số
- **THEN** FreeUsageCount is incremented by 1 (if not at limit)

### Requirement: Admin can clean up old usage data
The system SHALL provide a button in the Config page to delete usage records older than 30 days.

#### Scenario: Cleanup button clicked
- **WHEN** admin clicks "Xóa dữ liệu > 30 ngày" button
- **THEN** system deletes all DailyUsageStats records where Date < Today - 30 days
- **AND** displays success toast with count of deleted records

### Requirement: Default limit is 5
The system SHALL have a default value of 5 for the daily free usage limit in appsettings.json.

#### Scenario: Fresh installation
- **WHEN** system starts with default appsettings.json (no FreeUsageLimit config)
- **THEN** DailyLimit defaults to 5