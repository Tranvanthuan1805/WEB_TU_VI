## Context

- **Current state**: Chưa có config AdSense trong hệ thống
- **Reference pattern**: VNPay config trong `Config.razor` - save vào `config.json`
- **UI**: MainLayout.razor dùng cho public site

## Goals / Non-Goals

**Goals:**
- Thêm form config AdSense trong `/admin/config`
- Render AdSense script vào `<head>` khi Enabled = true
- Lưu config vào `config.json`

**Non-Goals:**
- AdSense cho AMP pages
- Multiple ad slots (dùng Auto Ads)

## Decisions

1. **Config Storage**: `config.json` dưới section `GoogleAdSense`
   - Alternative: appsettings.json → không recommend vì cần restart app để apply changes

2. **Script Placement**: Sử dụng Blazor `HeadContent` component
   - Alternative: _Host.cshtml / App.razor → không tiện vì cần hot reload

3. **Auto Ads**: Dùng Auto Ads thay vì manual ad units
   - Đơn giản, chỉ cần Publisher ID

## Risks / Trade-offs

- [LOW] Config changes requiring page refresh: Auto Ads cần F5 để apply script mới
- [LOW] AdSense policy violations: Tuân thủ AdSense terms of service

## Migration Plan

1. Thêm model `GoogleAdSenseConfigModel` trong Config.razor
2. Thêm form trong Config.razor (sau VNPay)
3. Thêm HeadContent trong MainLayout.razor
4. Config không có trong config.json → disabled mặc định