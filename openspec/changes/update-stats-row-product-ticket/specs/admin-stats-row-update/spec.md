## ADDED Requirements

### Requirement: Admin stats row displays correct counts
The admin stats row in ProductManager and TicketManager SHALL display counts that match the status column in the data table.

#### Scenario: ProductManager stats row shows correct published count
- **WHEN** a product is marked as Published in the database and is not out of stock
- **THEN** the "Đã xuất bản" stat in the stats row SHALL increment by 1

#### Scenario: ProductManager stats row shows correct draft count
- **WHEN** a product is not Published but is still available (not out of stock)
- **THEN** the "Nháp" stat in the stats row SHALL increment by 1

#### Scenario: ProductManager stats row shows correct out of stock count
- **WHEN** a product has Quantity > 0 and QuantitySold >= Quantity
- **THEN** the "Hết hàng" stat in the stats row SHALL increment by 1

#### Scenario: ProductManager stats row shows correct total
- **WHEN** products exist in the database
- **THEN** the "Tổng số" stat in the stats row SHALL equal the total product count

#### Scenario: TicketManager stats row shows correct active count
- **WHEN** a ticket is marked as Published in the database and has remaining quantity
- **THEN** the "Đang hoạt động" stat in the stats row SHALL increment by 1

#### Scenario: TicketManager stats row shows correct inactive count
- **WHEN** a ticket is not Published but still has remaining quantity
- **THEN** the "Không hoạt động" stat in the stats row SHALL increment by 1

#### Scenario: TicketManager stats row shows correct used up count
- **WHEN** a ticket has Quantity > 0 and QuantityUsed >= Quantity
- **THEN** the "Hết lượt" stat in the stats row SHALL increment by 1

#### Scenario: TicketManager stats row shows correct total
- **WHEN** tickets exist in the database
- **THEN** the "Tổng số" stat in the stats row SHALL equal the total ticket count