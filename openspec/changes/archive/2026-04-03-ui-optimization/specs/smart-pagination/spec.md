## ADDED Requirements

### Requirement: Smart 3-3-3 pagination pattern
When total pages exceed 9, the pagination SHALL display a maximum of 9 page numbers in a 3-3-3 pattern: 3 first pages, "..." ellipsis, 3 middle pages (centered on current), "..." ellipsis, 3 last pages. When total pages is 9 or fewer, ALL page numbers SHALL be displayed without ellipsis.

#### Scenario: Total pages ≤ 9 shows all pages
- **WHEN** total pages is 7 and user is on page 4
- **THEN** pagination displays: 1 2 3 4 5 6 7 (no ellipsis)

#### Scenario: Current near start shows first + middle + last
- **WHEN** total pages is 20 and current is 4
- **THEN** pagination displays: 1 2 3 ... 4 5 6 ... 18 19 20

#### Scenario: Current in middle shows first + middle + last
- **WHEN** total pages is 20 and current is 10
- **THEN** pagination displays: 1 2 3 ... 9 10 11 ... 18 19 20

#### Scenario: Current near end shows first + middle + last
- **WHEN** total pages is 20 and current is 18
- **THEN** pagination displays: 1 2 3 ... 15 16 17 ... 18 19 20

#### Scenario: Current at start merges middle with first
- **WHEN** total pages is 10 and current is 3
- **THEN** pagination displays: 1 2 3 ... 8 9 10

#### Scenario: Current at end merges middle with last
- **WHEN** total pages is 10 and current is 10
- **THEN** pagination displays: 1 2 3 ... 8 9 10

### Requirement: Pagination component in admin Manager
The admin Manager page SHALL use the smart 3-3-3 pagination pattern for the post list table. The pagination SHALL replace the current "show all pages" behavior.

#### Scenario: Admin Manager uses smart pagination
- **WHEN** admin views Manager page with 20+ pages of posts
- **THEN** only 9 page numbers plus ellipsis are displayed

### Requirement: Pagination component in public PostList
The public PostList page SHALL use the smart 3-3-3 pagination pattern for the published post list. The pagination SHALL replace the current "show all pages" behavior.

#### Scenario: Public PostList uses smart pagination
- **WHEN** user views PostList page with 20+ pages of posts
- **THEN** only 9 page numbers plus ellipsis are displayed
