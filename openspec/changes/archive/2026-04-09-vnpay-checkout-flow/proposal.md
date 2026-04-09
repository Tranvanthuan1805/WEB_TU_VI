## Why

VNPay integration currently has incorrect configuration (HTTP vs HTTPS, wrong IPN URL) making it unusable with ngrok free tier. Additionally, users must navigate through ProductList → Checkout → select product, but the checkout page unnecessarily displays the full product list when a specific product should be purchased directly.

## What Changes

- Fix VNPay configuration in `appsettings.json`: change to HTTPS URL and correct IPN endpoint
- Add "Mua ngay" button to ProductList.razor that links directly to checkout with productId
- Modify Checkout.razor to accept `productId` query parameter:
  - If productId provided → display product details and payment form
  - If no productId → display "Không tìm thấy sản phẩm" message

## Capabilities

### New Capabilities
- **direct-checkout**: Direct checkout flow via URL parameter (`/checkout?productId=X`)
- **vnpay-config-fix**: Correct VNPay sandbox configuration for ngrok HTTPS

### Modified Capabilities
- None

## Impact

- `Web/Web/appsettings.json` - VNPay URLs
- `Web/Web/Components/Pages/User/ProductList.razor` - Add buy button
- `Web/Web/Components/Pages/User/Checkout.razor` - Accept query param, show product details or error