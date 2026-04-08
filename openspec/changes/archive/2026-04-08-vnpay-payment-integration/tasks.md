## 1. Database Setup

- [ ] 1.1 Create Order entity model (Models/Order.cs)
- [ ] 1.2 Update AppDBContext to add DbSet<Order> and relationships
- [ ] 1.3 Create EF Core migration for Order entity

## 2. Service Layer Implementation

- [ ] 2.1 Implement VnpayService (CreatePaymentUrl, ValidateSignature, ParseResponse)
- [ ] 2.2 Implement OrderService (CreatePendingOrderAsync, MarkPaidAsync, MarkFailedAsync, MarkExpiredAsync, AssignTicketAsync, GetOrderStatusAsync)
- [ ] 2.3 Implement PendingPaymentCleanupService (BackgroundService for cleanup)

## 3. API Endpoints

- [ ] 3.1 Create POST /api/checkout/create-vnpay-payment endpoint
- [ ] 3.2 Create GET /api/payments/vnpay/return endpoint
- [ ] 3.3 Create GET /api/payments/vnpay/ipn endpoint
- [ ] 3.4 Create GET /api/orders/status endpoint

## 4. Blazor Pages

- [ ] 4.1 Create Checkout page (/checkout) with product selection and payment button
- [ ] 4.2 Create VnpayReturn page (/vnpay-return) with polling logic

## 5. Program Configuration

- [ ] 5.1 Register VnpayService and OrderService in DI container
- [ ] 5.2 Register PendingPaymentCleanupService as hosted service
- [ ] 5.3 Update appsettings.json with correct VNPAY URLs for local testing

## 6. Testing & Verification

- [ ] 6.1 Add seed data for Product to test checkout
- [ ] 6.2 Verify build succeeds (dotnet build)
- [ ] 6.3 Test payment flow with VNPAY sandbox