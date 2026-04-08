## ADDED Requirements

### Requirement: Order tracks payment lifecycle
The system SHALL maintain order status throughout the payment lifecycle from creation to completion or expiration.

#### Scenario: Order created with PendingPayment status
- **WHEN** customer initiates payment
- **THEN** Order is created with status = PendingPayment
- **AND** Order.TxnRef is generated as unique value
- **AND** Order.TotalAmount equals Product.Price × Quantity

#### Scenario: Order status changed to Paid
- **WHEN** IPN confirms successful payment
- **THEN** Order status is updated to Paid
- **AND** Order.TicketId is set to created Ticket
- **AND** Order.VnpayTransactionNo is recorded

#### Scenario: Order status changed to PaymentFailed
- **WHEN** IPN reports payment failure
- **THEN** Order status is updated to PaymentFailed
- **AND** Order.VnpayResponseCode is recorded

#### Scenario: Order status changed to Expired
- **WHEN** Cleanup service finds pending order older than 15 minutes
- **THEN** Order status is updated to Expired
- **AND** product quantity is restored

### Requirement: Order links to Product and Ticket
The system SHALL create proper relationships between Order, Product, and Ticket entities.

#### Scenario: Order references Product
- **WHEN** Order is created
- **THEN** Order.ProductId references the purchased Product
- **AND** Order.Quantity and UnitPrice are recorded

#### Scenario: Order references Ticket after successful payment
- **WHEN** Order status becomes Paid
- **THEN** Order.TicketId references the created Ticket
- **AND** Ticket.Code can be retrieved via Order.Ticket.Code