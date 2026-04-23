# Tasks: Fix VNPay Config Domain Display

## 1. Update appsettings.json

Add `/api/payments/vnpay/return` and `/api/payments/vnpay/ipn` paths to ReturnUrl and IpnUrl.

**File:** `Web/Web/appsettings.json`

```json
"VnPay": {
  "ReturnUrl": "https://example.com/api/payments/vnpay/return",
  "IpnUrl": "https://example.com/api/payments/vnpay/ipn"
}
```

- [x] Done

## 2. Update LoadVnPayConfig()

Update `LoadVnPayConfig()` to strip API paths from full URL when extracting domain for display.

**File:** `Web/Web/Components/Pages/Admin/Config.razor`

Method: `LoadVnPayConfig()` (lines 239-255)

Change:
- Remove unused `ipnUrl` variable
- Rename `ExtractDomain` to `ExtractBaseDomain`
- Update logic to strip `/api/payments/vnpay/return` path from URL

- [x] Done

## 3. Rename ExtractDomain to ExtractBaseDomain

Optional: Rename method for clarity.

- [x] Done (combined with task 2)

## Verification

1. Build: `dotnet build Web/Web/Web.csproj`
2. Test Config page loads and displays domain without paths
3. Save config → verify config.json stores full URLs

- [x] Build succeeded ✓