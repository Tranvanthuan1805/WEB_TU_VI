## 1. Cấu hình mặc định

- [x] 1.1 Thêm default config Consultation vào appsettings.json

## 2. Admin Config

- [x] 2.1 Thêm section "Liên hệ tư vấn" vào Config.razor
- [x] 2.2 Thêm model ConsultationConfigModel với FacebookEnabled, FacebookUrl, ZaloEnabled, ZaloUrl
- [x] 2.3 Implement LoadConsultationConfig(), SaveConsultationConfig(), ResetConsultationConfig()
- [x] 2.4 Implement MergeAndSaveConsultationConfig()

## 3. MainLayout

- [x] 3.1 Thêm properties _facebookEnabled, _facebookUrl, _zaloEnabled, _zaloUrl
- [x] 3.2 Gọi LoadConsultationConfig() trong OnInitializedAsync()
- [x] 3.3 Thêm section "Liên hệ tư vấn" vào left sidebar (sau Hạn)
- [x] 3.4 Render link Facebook và Zalo với target="_blank"