## ADDED Requirements

### Requirement: Article Search and Filter
The system SHALL provide search and filter functionality for articles.

#### Scenario: Search filters articles
- **WHEN** user types in search input
- **THEN** table filters to show matching articles by title or author

#### Scenario: Category filter works
- **WHEN** user selects a category from dropdown
- **THEN** table shows only articles in that category

### Requirement: Article Data Table
The system SHALL display articles in a sortable data table.

#### Scenario: Table shows article data
- **WHEN** Manager page loads
- **THEN** displays table with columns: Article Title (with thumbnail), Category, Author, Status, Publish Date, Actions

#### Scenario: Status badges display correctly
- **WHEN** table renders article with status
- **THEN** shows appropriate badge: Published (green), Draft (gray), Pending (orange)

#### Scenario: Table row hover effect
- **WHEN** user hovers over table row
- **THEN** row shows highlight background

#### Scenario: Action buttons
- **WHEN** user clicks View/Edit/Delete buttons
- **THEN** triggers corresponding action (view article, open editor, confirm delete)

### Requirement: Pagination
The system SHALL provide pagination controls.

#### Scenario: Pagination controls display
- **WHEN** articles exceed page limit
- **THEN** shows pagination with page numbers and prev/next buttons

#### Scenario: Page navigation
- **WHEN** user clicks page number
- **THEN** table updates to show that page's data

### Requirement: Create New Article with TinyMCE
The system SHALL provide a form to create new articles with rich text editor.

#### Scenario: Create article form
- **WHEN** user clicks "Add New Article" button
- **THEN** shows form with Title input, TinyMCE editor for content, Cover image upload, Submit button

#### Scenario: TinyMCE editor loads
- **WHEN** create/edit form renders
- **THEN** TinyMCE rich text editor is fully functional with formatting toolbar

### Requirement: Article Categories
The system SHALL support filtering by predefined categories.

#### Scenario: Categories available in filter
- **WHEN** user opens category dropdown
- **THEN** shows options: All Categories, Urbanism, Interiors, Sustainability, Theory