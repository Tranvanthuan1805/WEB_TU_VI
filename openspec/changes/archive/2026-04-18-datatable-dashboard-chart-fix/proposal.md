## Why

Dashboard page has two UI issues that need to be fixed: (1) the data table for Daily Usage Stats needs the same styling as PostManager's data table for consistency, and (2) the Chart.js traffic chart doesn't render despite having data - the chart canvas is empty on page load.

## What Changes

- Copy complete data table structure (HTML + pagination logic) from PostManager.razor to replace existing table in Dashboard.razor
- Copy all table-related CSS from PostManager.razor.css to Dashboard.razor.css
- Fix chart initialization timing - the chart initializes before data is loaded due to async OnInitializedAsync vs sync OnAfterRender race condition

## Capabilities

### New Capabilities
- None - this is a UI consistency and bug fix, no new functionality

### Modified Capabilities
- `admin-dashboard-ui` (existing): Fix chart rendering bug and improve table styling

## Impact

- Modified: `Web/Web/Components/Pages/Admin/Dashboard.razor` - replace table HTML + fix chart timing
- Modified: `Web/Web/Components/Pages/Admin/Dashboard.razor.css` - add table styles
- No API or database changes