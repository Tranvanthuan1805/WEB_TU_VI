# vnpay-config-fix Specification

## Purpose
TBD - created by archiving change vnpay-checkout-flow. Update Purpose after archive.
## Requirements
### Requirement: VNPay configuration uses HTTPS URLs
The system SHALL configure VNPay sandbox with proper HTTPS URLs for ngrok integration.

#### Scenario: ReturnUrl uses HTTPS
- **WHEN** VNPay payment is created
- **AND** configuration has ReturnUrl starting with `https://`
- **THEN** user is redirected to VNPay sandbox with correct HTTPS callback URL

#### Scenario: IPN URL points to API endpoint
- **WHEN** VNPay sends IPN notification
- **AND** IpnUrl is configured as `/api/payments/vnpay/ipn`
- **THEN** request reaches PaymentController.VnpayIpn endpoint correctly

