# Proposal: Fix VNPay Config Domain Display

## Problem

When first running the app (no config.json exists), VNPay config loads from appsettings.json:
- `ReturnUrl` = `"https://example.com"` (BASE DOMAIN ONLY, NO API PATH)
- `IpnUrl` = `"https://example.com"` (BASE DOMAIN ONLY, NO API PATH)

The Config page's `LoadVnPayConfig()` extracts domain from `ReturnUrl`, so form shows only domain.
When user saves via `SaveVnPayConfig()`, it correctly adds paths:
- `ReturnUrl` = `"https://example.com/api/payments/vnpay/return"`
- `IpnUrl` = `"https://example.com/api/payments/vnpay/ipn"`

**Issue:** The form displays a different value than what's saved. User expects domain to display as-is (no path), but the saved config.json and appsettings should store FULL URLs with API paths for other services to use.

## Solution

1. Update `appsettings.json` to store full URLs with paths from the start
2. Update `LoadVnPayConfig()` to strip `/api/payments/vnpay/return` from ReturnUrl when displaying domain in form

## Changes

| File | Change |
|------|--------|
| `appsettings.json` | ReturnUrl/IpnUrl include `/api/payments/vnpay/...` paths |
| `Config.razor` | Update LoadVnPayConfig to extract base domain from full URL |

## Result

| Location | Value |
|----------|-------|
| appsettings.json | Full URLs with paths |
| config.json | Full URLs with paths |
| Config form display | Base domain only |
| Other services | Full URLs (read directly from config) ✓ |