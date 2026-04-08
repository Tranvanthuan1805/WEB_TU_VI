## ADDED Requirements

### Requirement: Customer can initiate VNPAY payment
The system SHALL allow customers to initiate a VNPAY payment by creating a pending order and redirecting to VNPAY.

#### Scenario: Successful payment initiation with available product
- **WHEN** customer clicks "Thanh toán VNPAY" on a product with available quantity
- **THEN** system creates Order with status PendingPayment
- **AND** system deducts product quantity in the same DB transaction
- **AND** system generates unique TxnRef
- **AND** system builds VNPAY payment URL and redirects customer

#### Scenario: Payment initiation fails due to insufficient quantity
- **WHEN** customer clicks "Thanh toán VNPAY" on a product with zero quantity
- **THEN** system returns error "Sản phẩm đã hết hàng"
- **AND** system does NOT create any Order
- **AND** system does NOT deduct quantity

#### Scenario: Payment initiation with race condition
- **WHEN** two customers simultaneously attempt to pay for a product with quantity = 1
- **THEN** only one customer successfully creates PendingPayment Order
- **AND** the other customer receives "Sản phẩm đã hết hàng" error

### Requirement: IPN endpoint updates order status
The system SHALL process VNPAY IPN requests to update order status and create tickets.

#### Scenario: IPN confirms successful payment
- **WHEN** VNPAY sends valid IPN with vnp_ResponseCode = "00" and vnp_TransactionStatus = "00"
- **AND** signature is valid
- **AND** amount matches order TotalAmount
- **AND** order status is PendingPayment
- **THEN** system updates order status to Paid
- **AND** system creates Ticket and links to Order
- **AND** returns success response to VNPAY

#### Scenario: IPN reports failed payment
- **WHEN** VNPAY sends valid IPN with vnp_ResponseCode != "00"
- **AND** signature is valid
- **AND** order status is PendingPayment
- **THEN** system updates order status to PaymentFailed
- **AND** system restores product quantity
- **AND** returns appropriate response to VNPAY

#### Scenario: IPN for already paid order (idempotent)
- **WHEN** VNPAY sends IPN for order that is already Paid
- **THEN** system returns success response WITHOUT creating duplicate Ticket
- **AND** system does NOT modify existing Order status

#### Scenario: IPN for expired order
- **WHEN** VNPAY sends IPN for order that is already Expired
- **THEN** system returns appropriate response WITHOUT changing status to Paid
- **AND** system does NOT create Ticket

#### Scenario: IPN with invalid signature
- **WHEN** VNPAY sends IPN with invalid signature
- **THEN** system returns error response
- **AND** system does NOT modify any Order

### Requirement: Return URL displays payment status via polling
The system SHALL display payment status on ReturnUrl page using polling to check order status in database.

#### Scenario: ReturnUrl shows pending status initially
- **WHEN** customer returns to ReturnUrl after redirect from VNPAY
- **THEN** page displays "Đang xác nhận thanh toán..."
- **AND** page starts polling /api/orders/status every 2 seconds

#### Scenario: ReturnUrl shows success when order is Paid with Ticket
- **WHEN** polling returns order status = Paid AND Ticket exists
- **THEN** page displays "Thanh toán thành công"
- **AND** page displays Ticket.Code

#### Scenario: ReturnUrl shows failure when order is PaymentFailed
- **WHEN** polling returns order status = PaymentFailed
- **THEN** page displays "Thanh toán thất bại"

#### Scenario: ReturnUrl shows expired when order is Expired
- **WHEN** polling returns order status = Expired
- **THEN** page displays "Đơn thanh toán đã hết hạn" and "Vui lòng đặt lại"

#### Scenario: ReturnUrl shows retry button after timeout
- **WHEN** polling exceeds 60 seconds without final status
- **THEN** page displays "Kiểm tra lại" button

### Requirement: Background service cleans up pending payments
The system SHALL automatically expire and restore quantity for pending orders older than 15 minutes.

#### Scenario: Cleanup service expires old pending orders
- **WHEN** PendingPaymentCleanupService runs
- **AND** finds Order with status PendingPayment created more than 15 minutes ago
- **THEN** system updates order status to Expired
- **AND** system restores product quantity
- **AND** system does NOT create Ticket

#### Scenario: Cleanup service skips recent pending orders
- **WHEN** PendingPaymentCleanupService runs
- **AND** finds Order with status PendingPayment created less than 15 minutes ago
- **THEN** system does NOT modify the Order

#### Scenario: Cleanup service does not affect paid orders
- **WHEN** PendingPaymentCleanupService runs
- **AND** finds Order with status Paid
- **THEN** system does NOT modify the Order