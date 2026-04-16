## ADDED Requirements

### Requirement: Hiển thị link tư vấn trong sidebar
MainLayout SHALL display consultation links (Facebook, Zalo) in the left sidebar when enabled.

#### Scenario: Both links enabled
- **WHEN** FacebookEnabled = true AND ZaloEnabled = true AND both URLs are not empty
- **THEN** both links are displayed in the sidebar

#### Scenario: Only Facebook enabled
- **WHEN** FacebookEnabled = true AND ZaloEnabled = false
- **THEN** only Facebook link is displayed

#### Scenario: Only Zalo enabled
- **WHEN** FacebookEnabled = false AND ZaloEnabled = true
- **THEN** only Zalo link is displayed

#### Scenario: Both disabled
- **WHEN** FacebookEnabled = false AND ZaloEnabled = false
- **THEN** no consultation section is displayed

### Requirement: Admin có thể cấu hình từng link
Admin SHALL be able to enable/disable each link independently and enter the URL in Config page.

#### Scenario: Enable Facebook link
- **WHEN** admin toggles FacebookEnabled checkbox to true and enters FacebookUrl
- **THEN** Facebook link appears in public sidebar

#### Scenario: Enable Zalo link
- **WHEN** admin toggles ZaloEnabled checkbox to true and enters ZaloUrl
- **THEN** Zalo link appears in public sidebar

#### Scenario: Save configuration
- **WHEN** admin clicks Save in Consultation config section
- **THEN** configuration is persisted to config.json

### Requirement: Link mở tab mới
Consultation links SHALL open in a new browser tab when clicked.

#### Scenario: Click Facebook link
- **WHEN** user clicks Facebook link in sidebar
- **THEN** Facebook page opens in a new tab

#### Scenario: Click Zalo link
- **WHEN** user clicks Zalo link in sidebar
- **THEN** Zalo page opens in a new tab