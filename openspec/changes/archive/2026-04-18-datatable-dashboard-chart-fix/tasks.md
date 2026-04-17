## 1. Copy DataTable from PostManager to Dashboard

- [x] 1.1 Copy table HTML structure (lines 69-140) from PostManager.razor to Dashboard.razor - replace existing users-table-section
- [x] 1.2 Copy pagination logic (lines 142-182 in PostManager) to Dashboard.razor - update for dailyUsageStats
- [x] 1.3 Copy table-related CSS from PostManager.razor.css to Dashboard.razor.css
- [x] 1.4 Verify table displays DailyUsageStats data correctly

## 2. Fix JavaScript Interop Issues

### 2.1 Fix: JS interop calls during static rendering
- [x] 2.1.1 Move `InitializeChart()` call from `OnInitializedAsync()` to `OnAfterRenderAsync()`
- [x] 2.1.2 Add `_chartInitialized` flag to prevent multiple initializations

### 2.2 Fix: Chart.js module resolution error
**Problem**: ES module import failed with "Failed to resolve module specifier '@kurkle/color'"
- [x] 2.2.1 Load Chart.js UMD version instead of ES module
- [x] 2.2.2 Add Chart.js UMD script in App.razor: `<script src="@Assets["lib/Chart.js/chart.umd.min.js"]"></script>`

### 2.3 Fix: JS eval illegal return statement
**Problem**: Using `JSRuntime.InvokeVoidAsync("eval", ...)` caused "Illegal return statement" error
- [x] 2.3.1 Create separate JS file: `wwwroot/lib/js/chartInterop.js`
- [x] 2.3.2 Define functions on `window` object: `initDashboardChart`, `destroyDashboardChart`
- [x] 2.3.3 Load chartInterop.js in App.razor after Chart.js UMD

### 2.4 Fix: IAsyncDisposable implementation error
**Problem**: Component declared `IAsyncDisposable` but DisposeAsync method not properly recognized
- [x] 2.4.1 Clean up duplicate code in InitializeChart (removed leftover eval code)
- [x] 2.4.2 Verify DisposeAsync properly destroys chart

## 3. Testing

- [x] 3.1 Build the project to verify no errors
- [x] 3.2 Test Dashboard page renders correctly
- [x] 3.3 Test chart displays when data exists
- [x] 3.4 Test pagination works on Daily Usage Stats table