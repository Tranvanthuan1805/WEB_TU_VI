## 1. Config Model

- [x] 1.1 Add GoogleAdSenseConfigModel class in Config.razor @code block (Enabled: bool, PublisherId: string)
- [x] 1.2 Add Required + RegularExpression validation for PublisherId

## 2. Config Form UI

- [x] 2.1 Add new card section "Google AdSense" in Config.razor (after VNPay)
- [x] 2.2 Add EditForm with Model: GoogleAdSenseConfigModel
- [x] 2.3 Add checkbox/toggle for Enabled
- [x] 2.4 Add InputText for PublisherId (disabled when Enabled = false)
- [x] 2.5 Add Save and Reset buttons

## 3. Config Methods

- [x] 3.1 Implement LoadGoogleAdSenseConfig() method
- [x] 3.2 Implement SaveGoogleAdSenseConfig() with confirm dialog
- [x] 3.3 Implement ResetGoogleAdSenseConfig() with confirm dialog
- [x] 3.4 Implement MergeAndSaveGoogleAdSenseConfig() helper

## 4. MainLayout HeadContent

- [x] 4.1 Inject IConfiguration in MainLayout.razor
- [x] 4.2 Add HeadContent component with AdSense script
- [x] 4.3 Load Enabled and PublisherId from config
- [x] 4.4 Conditionally render script when Enabled = true

## 5. Verify

- [x] 5.1 Test /admin/config shows AdSense form
- [x] 5.2 Test save config to config.json
- [x] 5.3 Test AdSense script renders in page source (when enabled)
- [x] 5.4 Test no script when disabled