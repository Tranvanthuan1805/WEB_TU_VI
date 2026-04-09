## MODIFIED Requirements

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
- **WHEN** VNPAY sends valid IPN with vnp_ResponseCode != "00" AND != "11"
- **AND** signature is valid
- **AND** order status is PendingPayment
- **THEN** system updates order status to PaymentFailed
- **AND** system restores product quantity
- **AND** returns appropriate response to VNPAY

#### Scenario: IPN reports expired order (NEW)
- **WHEN** VNPAY sends valid IPN with vnp_ResponseCode = "11"
- **AND** signature is valid
- **AND** order status is PendingPayment
- **THEN** system updates order status to Expired
- **AND** system restores product quantity
- **AND** returns response with RspCode = "11" and Message = "Order expired"

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
- **AND** page starts polling every 2 seconds using direct service call
- **AND** page displays elapsed seconds counter (MODIFIED: was just static message)

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
- **THEN** page displays "Quá thời gian chờ." with "Kiểm tra lại" button