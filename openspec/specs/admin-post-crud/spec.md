# admin-post-crud Specification

## Purpose
TBD - created by archiving change post-crud. Update Purpose after archive.
## Requirements
### Requirement: Admin can view paginated list of posts
The admin Manager page SHALL display all posts in a table with pagination. Default page size is 10 items. Default sort order is DateUpdated descending. The user SHALL be able to change page size between 10 and 20 items via a numeric input.

#### Scenario: Display posts sorted by DateUpdated descending
- **WHEN** admin navigates to the Manager page
- **THEN** posts are displayed sorted by DateUpdated descending, showing 10 posts per page

#### Scenario: Change page size
- **WHEN** admin enters a value between 10 and 20 in the page size input
- **THEN** the list re-renders with the new page size

#### Scenario: Navigate between pages
- **WHEN** admin clicks a page number or next/previous button
- **THEN** the corresponding page of posts is displayed

### Requirement: Admin can search posts by title
The admin SHALL be able to search posts by entering text in a search input. Search SHALL be case-insensitive and match partial title strings. Search results SHALL reset pagination to page 1.

#### Scenario: Search by title
- **WHEN** admin types "test" in the search input
- **THEN** only posts with titles containing "test" (case-insensitive) are displayed

#### Scenario: Search resets to page 1
- **WHEN** admin is on page 3 and enters a search query
- **THEN** results display starting from page 1

### Requirement: Admin can sort posts by specific fields
The admin SHALL be able to sort posts by Title, DateCreated, or DateUpdated. Each column header SHALL be clickable to toggle ascending/descending order. Default sort is DateUpdated descending.

#### Scenario: Sort by title ascending
- **WHEN** admin clicks the Title column header
- **THEN** posts are sorted by title in ascending alphabetical order

#### Scenario: Toggle sort direction
- **WHEN** admin clicks the same column header again
- **THEN** sort direction toggles between ascending and descending

### Requirement: Admin can filter posts by published status
The admin SHALL be able to filter posts by Published status using a dropdown with options: "All", "Published", "Draft". Filter SHALL reset pagination to page 1.

#### Scenario: Filter to show only published posts
- **WHEN** admin selects "Published" from the status filter dropdown
- **THEN** only posts with Published = true are displayed

#### Scenario: Filter to show only draft posts
- **WHEN** admin selects "Draft" from the status filter dropdown
- **THEN** only posts with Published = false are displayed

### Requirement: Admin can create a new post
The admin SHALL be able to create a new post via a modal form. The form SHALL include fields: Title, Content (TinyMCE rich text editor), Slug (auto-generated but editable), Description (auto-generated but editable), and Published (checkbox). On save: Slug SHALL be auto-generated from Title using AppUtilities.GenerateSlug() if empty; Description SHALL be auto-generated from Content (first 300 characters with HTML stripped, appended with "..."); DateCreated and DateUpdated SHALL be set to DateTime.Now. A confirmation dialog SHALL appear before closing the editor if there are unsaved changes. A toast notification SHALL appear on success or failure.

#### Scenario: Create post with auto-generated slug and description
- **WHEN** admin enters a title "Bài viết mới" and content, leaves slug and description empty, and saves
- **THEN** slug is set to "bai-viet-moi", description is first 300 chars of content + "...", and post is created

#### Scenario: Confirmation on cancel with unsaved changes
- **WHEN** admin has entered data in the create form and clicks Cancel
- **THEN** a confirmation dialog appears asking "Bạn có chắc muốn hủy? Các thay đổi chưa lưu sẽ bị mất."

#### Scenario: Toast on successful create
- **WHEN** admin successfully creates a post
- **THEN** a success toast notification is displayed

### Requirement: Admin can edit an existing post
The admin SHALL be able to edit an existing post via the same modal form pre-populated with current values. On save: DateUpdated SHALL be set to DateTime.Now. Slug SHALL NOT be auto-regenerated if already set. A confirmation dialog SHALL appear before closing the editor if there are unsaved changes. A toast notification SHALL appear on success or failure.

#### Scenario: Edit post preserves existing slug
- **WHEN** admin edits a post with existing slug "my-post" and changes the title
- **THEN** the slug remains "my-post" unless manually changed

#### Scenario: Confirmation on cancel with unsaved changes during edit
- **WHEN** admin has modified data in the edit form and clicks Cancel
- **THEN** a confirmation dialog appears asking "Bạn có chắc muốn hủy? Các thay đổi chưa lưu sẽ bị mất."

#### Scenario: Toast on successful edit
- **WHEN** admin successfully updates a post
- **THEN** a success toast notification is displayed

### Requirement: Admin can delete a post with confirmation
The admin SHALL be able to delete a post. A confirmation dialog MUST appear before deletion with the message "Bạn có chắc muốn xóa bài viết này?". The deletion SHALL only proceed if the admin confirms. A toast notification SHALL appear on success or failure.

#### Scenario: Delete post with confirmation
- **WHEN** admin clicks delete on a post and confirms in the dialog
- **THEN** the post is removed from the database and a success toast is displayed

#### Scenario: Cancel delete
- **WHEN** admin clicks delete but cancels in the confirmation dialog
- **THEN** the post is not deleted and no toast is displayed

#### Scenario: Toast on failed delete
- **WHEN** post deletion fails due to database error
- **THEN** an error toast notification is displayed

