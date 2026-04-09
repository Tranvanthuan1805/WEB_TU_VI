## 1. Fix VNPay Configuration

- [x] 1.1 Update appsettings.json: Change VnPay ReturnUrl from HTTP to HTTPS
- [x] 1.2 Update appsettings.json: Fix IpnUrl from `/vnpay-ipn` to `/api/payments/vnpay/ipn`

## 2. Add Direct Checkout to ProductList

- [x] 2.1 Add "Mua ngay" button to ProductList.razor product cards
- [x] 2.2 Configure button to link to `/checkout?productId={ProductId}`

## 3. Modify Checkout Page

- [x] 3.1 Add NavigationManager injection to read query parameter
- [x] 3.2 OnInit: Parse productId from query string
- [x] 3.3 Load product details if productId valid and product available
- [x] 3.4 Display product details + payment form for valid product
- [x] 3.5 Display "Không tìm thấy sản phẩm" message for invalid/missing productId
- [x] 3.6 Remove product list selection UI (keep only payment section)