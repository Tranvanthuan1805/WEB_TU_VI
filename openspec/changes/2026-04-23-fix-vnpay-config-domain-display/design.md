# Design: Fix VNPay Config Domain Display

## Overview

Store full URLs with API paths in config files. Display only base domain in Config form.

## Implementation

### 1. appsettings.json

```json
"VnPay": {
  "TmnCode": "...",
  "HashSecret": "...",
  "PaymentUrl": "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  "ReturnUrl": "https://example.com/api/payments/vnpay/return",
  "IpnUrl": "https://example.com/api/payments/vnpay/ipn"
}
```

### 2. Config.razor - LoadVnPayConfig()

```csharp
private void LoadVnPayConfig()
{
    var vnpaySection = Configuration.GetSection("VnPay");
    var returnUrl = vnpaySection["ReturnUrl"] ?? "";
    var ipnUrl = vnpaySection["IpnUrl"] ?? "";

    _vnpayConfig = new VnPayConfigModel
    {
        TmnCode = vnpaySection["TmnCode"] ?? "",
        HashSecret = vnpaySection["HashSecret"] ?? "",
        PaymentUrl = vnpaySection["PaymentUrl"] ?? "",
        Domain = ExtractBaseDomain(returnUrl)
    };
}

private string ExtractBaseDomain(string url)
{
    if (string.IsNullOrEmpty(url))
        return "";

    try
    {
        var uri = new Uri(url);
        return $"{uri.Scheme}://{uri.Host}";
    }
    catch
    {
        return url;
    }
}
```

### 3. SaveVnPayConfig() - unchanged

```csharp
var returnUrl = _vnpayConfig.Domain.TrimEnd('/') + "/api/payments/vnpay/return";
var ipnUrl = _vnpayConfig.Domain.TrimEnd('/') + "/api/payments/vnpay/ipn";
```

This already adds paths correctly.

## Result

| Scenario | Stored in Config | Form Displays |
|----------|-----------------|----------------|
| New app (first load) | From appsettings: `https://domain/api/...` | `https://domain` (stripped) |
| After save | Full URLs with paths | Base domain |
| Reset | Full URLs from appsettings | Base domain |

All services reading `IConfiguration["VnPay:ReturnUrl"]` get full URLs ✓