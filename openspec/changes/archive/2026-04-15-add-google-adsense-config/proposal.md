## Why

Cần thêm Google AdSense để monetite trang web tử vi. Hiện tại chưa có cách để cấu hình và bật/tắt quảng cáo AdSense từ admin panel.

## What Changes

- Thêm form cấu hình Google AdSense trong `/admin/config` với:
  - Toggle bật/tắt AdSense
  - Input Publisher ID (định dạng `ca-pub-XXXXXXXXXXXXXXX`)
- Thêm script AdSense vào `MainLayout.razor` thông qua `HeadContent`
- Lưu cấu hình vào `config.json` dưới section `GoogleAdSense`
- Tương tự cách config VNPay đã implement

## Capabilities

### New Capabilities

- `google-adsense-config`: Cấu hình Google AdSense (enable/disable + Publisher ID) từ admin panel

### Modified Capabilities

- (none)

## Impact

- **Code modified**: `Config.razor`, `MainLayout.razor`
- **Config file**: `config.json` (thêm section `GoogleAdSense`)
- **Pattern**: Theo cấu trúc VNPay config đã có