## 1. Dashboard.razor - Add Status Display & Empty State

- [x] 1.1 Add status indicator (color-coded dot) to Recent Contacts in Dashboard.razor:83-94 based on Contact.Status
- [x] 1.2 Add empty state message "Không có dữ liệu" when chartData is empty in chart-container (line 65-67)
- [x] 1.3 Add null/empty check before Chart.js initialization in InitializeChart() method to prevent errors
- [x] 1.4 Wrap chart initialization in conditional: only call JS when chartData.Any() == true

## 2. Dashboard.razor.css - Fix view-all-btn & Add Table Styles

- [x] 2.1 Update .view-all-btn CSS: replace `width: 100%` with `display: inline-flex; margin: 2rem auto 0; width: auto;`
- [x] 2.2 Add .table-container CSS style (background, border-radius, overflow, box-shadow)
- [x] 2.3 Add .data-table-wrapper CSS style (overflow-x: auto)
- [x] 2.4 Add .data-table CSS style (width: 100%, border-collapse, th/td padding and colors)
- [x] 2.5 Add .table-footer CSS style (display: flex, justify-content: space-between, padding, background)
- [x] 2.6 Add .pagination CSS style (display: flex, gap)
- [x] 2.7 Add .page-btn CSS style (dimensions, border, radius, background, colors, hover states, disabled state)
- [x] 2.8 Add .showing-text CSS style (font-size, color)
- [x] 2.9 Add .chart-empty CSS style for empty state message (text-align: center, color: var(--secondary), padding)

## 3. Verification

- [x] 3.1 Verify Recent Contacts shows different colored dots based on ContactStatus
- [x] 3.2 Verify chart shows "Không có dữ liệu" when no orders in last 30 days
- [x] 3.3 Verify view-all-btn is centered with margin
- [x] 3.4 Verify Daily Usage Stats table has proper styling matching OrderManager
- [x] 3.5 Build project to verify no compilation errors: `dotnet build Web/Web/Web.csproj`