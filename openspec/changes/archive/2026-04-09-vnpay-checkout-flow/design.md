## Context

Current VNPay checkout flow:
- ProductList.razor displays products without direct purchase option
- Users must navigate to Checkout page, then manually select a product from the list
- VNPay configuration uses HTTP instead of HTTPS (ngrok free provides HTTPS)
- IPN URL is incorrectly set to `/vnpay-ipn` instead of `/api/payments/vnpay/ipn`

## Goals / Non-Goals

**Goals:**
- Fix VNPay sandbox configuration to work with ngrok HTTPS URLs
- Enable direct checkout via URL: `/checkout?productId=X`
- Simplify checkout page to show only selected product details or error message

**Non-Goals:**
- Change payment processing logic (already working)
- Add cart functionality (single product purchase only)
- Modify admin product management

## Decisions

1. **Query parameter approach for direct checkout**
   - Use `productId` query string on checkout page
   - Alternative: URL route like `/checkout/{productId}` - rejected, query string is simpler for backward compatibility

2. **Checkout page behavior**
   - If `productId` exists and valid → show product details + payment form
   - If `productId` missing or invalid → show "Không tìm thấy sản phẩm"

3. **VNPay URLs**
   - Use full ngrok HTTPS URL for ReturnUrl and IpnUrl
   - Point to API endpoints, not pages (IPN must be API, return can be page or API)

## Risks / Trade-offs

- [Risk] ngrok free domain changes on restart → [Mitigation] User uses persistent subdomain (boss-delicate-ox.ngrok-free.app) which stays constant
- [Risk] Product not found / unavailable → [Mitigation] Return error message, user can go back to product list
- [Risk] Payment timeout → [Mitigation] VnpayReturn page handles timeout with retry option