## Context

The admin Dashboard page at `/admin` had multiple JavaScript interop issues preventing Chart.js from rendering correctly:

1. **JS interop during static rendering**: `JSRuntime.InvokeVoidAsync` was called in `OnInitializedAsync()` which runs during static prerendering, causing "JavaScript interop calls cannot be issued at this time" error.
2. **ES module resolution failure**: Chart.js 4.x uses ES modules with bare specifiers like `@kurkle/color` that browsers cannot resolve without a bundler.
3. **Eval return statement error**: Using inline `JSRuntime.InvokeVoidAsync("eval", ...)` caused "Illegal return statement" because top-level JavaScript cannot have `return` statements.
4. **IAsyncDisposable implementation conflict**: Duplicate code in InitializeChart caused build errors.

## Goals / Non-Goals

**Goals:**
- Fix JavaScript interop for Chart.js to render correctly on Dashboard
- Apply proper data table styling consistent with PostManager
- Ensure chart destroys properly when component disposes

**Non-Goals:**
- Add search/filter functionality to Dashboard table
- Change any data fetching logic or API contracts
- Modify any other admin pages

## Decisions

### 1. Fix JS Interop Timing
**Decision**: Move chart initialization from `OnInitializedAsync()` to `OnAfterRenderAsync()` with a flag to prevent multiple initializations.

**Rationale**: 
- `OnAfterRenderAsync` runs after the component is fully rendered in the browser
- Adding `_chartInitialized` flag ensures chart only initializes once even if `OnAfterRenderAsync` is called multiple times

### 2. Use Chart.js UMD Version
**Decision**: Load Chart.js UMD (Universal Module Definition) version instead of ES module version.

**Rationale**:
- UMD version works as a traditional script tag without requiring a bundler
- Chart.js UMD is already available in the project at `wwwroot/lib/Chart.js/chart.umd.min.js`
- No additional package installation needed

**Implementation**:
```html
<script src="@Assets["lib/Chart.js/chart.umd.min.js"]"></script>
```

### 3. Use Separate JS File with Window Functions
**Decision**: Create a separate JavaScript file `wwwroot/lib/js/chartInterop.js` that defines functions on the `window` object, instead of using inline `eval()`.

**Rationale**:
- Inline `eval()` causes "Illegal return statement" error at top level
- Separate JS file is cleaner and more maintainable
- Functions on `window` object can be called via Blazor's `JSRuntime.InvokeVoidAsync("functionName", ...)`

**Implementation**:
```javascript
// wwwroot/lib/js/chartInterop.js
window.initDashboardChart = function(canvasId, labels, ordersData, revenueData) {
    // Chart.js initialization code
};

window.destroyDashboardChart = function() {
    // Cleanup code
};
```

### 4. Proper IAsyncDisposable Implementation
**Decision**: Use `ValueTask` return type for `DisposeAsync()` to properly implement `IAsyncDisposable`.

**Implementation**:
```csharp
public ValueTask DisposeAsync()
{
    _chartInitialized = false;
    try
    {
        JSRuntime.InvokeVoidAsync("destroyDashboardChart");
    }
    catch { }
    return ValueTask.CompletedTask;
}
```

## Files Changed

| File | Change |
|------|--------|
| `Components/App.razor` | Added Chart.js UMD and chartInterop.js script tags |
| `Components/Pages/Admin/Dashboard.razor` | Fixed JS interop calls, added flag, cleaned up code |
| `wwwroot/lib/js/chartInterop.js` | Created - window functions for chart operations |

## Risks / Trade-offs

- **Risk**: Chart.js UMD might not include all features of ES module version
  - **Mitigation**: UMD version includes all Chart.js core functionality needed for basic bar charts

- **Risk**: Functions on window object might conflict with other scripts
  - **Mitigation**: Using specific naming (`adminTrafficChart`, `initDashboardChart`) reduces collision risk

- **Risk**: Component dispose might not call destroyChart in all scenarios
  - **Mitigation**: `IAsyncDisposable` properly implemented, `DisposeAsync` will be called on component disposal