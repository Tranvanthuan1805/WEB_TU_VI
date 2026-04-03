## ADDED Requirements

### Requirement: Toast notification component
The system SHALL provide a Toast.razor component that displays temporary notifications. The component SHALL support four types: success, error, warning, info. Each toast SHALL auto-dismiss after 3 seconds. Each toast SHALL have a manual close button. Toasts SHALL be positioned at the top-right of the viewport. Toast styling SHALL use theme colors from theme.css (error-container for error, success-related colors for success, etc.).

#### Scenario: Display success toast
- **WHEN** ToastService.ShowSuccess("Post created!") is called
- **THEN** a green-themed toast with the message appears and auto-dismisses after 3 seconds

#### Scenario: Display error toast
- **WHEN** ToastService.ShowError("Delete failed!") is called
- **THEN** a red-themed toast with the message appears and auto-dismisses after 3 seconds

#### Scenario: Manual close
- **WHEN** user clicks the close button on a toast
- **THEN** the toast is immediately removed

### Requirement: Toast service
The system SHALL provide a ToastService that manages toast notifications. The service SHALL expose methods: ShowSuccess(message), ShowError(message), ShowWarning(message), ShowInfo(message). The service SHALL use an event-based pattern to notify the Toast component.

#### Scenario: Service notifies component
- **WHEN** ShowSuccess is called on ToastService
- **THEN** the Toast component receives the notification and displays it

### Requirement: Confirmation dialog component
The system SHALL provide a ConfirmDialog.razor component that displays a modal confirmation dialog. The component SHALL accept a title, message, and optional confirm button text. The confirm button SHALL use error styling for delete actions. The component SHALL return Task<bool> indicating user confirmation. The dialog SHALL have a semi-transparent overlay that closes on click (unless explicitly disabled).

#### Scenario: Confirm delete action
- **WHEN** ConfirmDialog.Show("Xác nhận xóa", "Bạn có chắc muốn xóa bài viết này?", "Xóa", true) is called and user clicks "Xóa"
- **THEN** the method returns true

#### Scenario: Cancel action
- **WHEN** ConfirmDialog.Show is called and user clicks "Hủy" or clicks the overlay
- **THEN** the method returns false
