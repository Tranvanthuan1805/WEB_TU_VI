## 1. Fix VnpayIpn - Handle Expired Response Code

- [x] 1.1 Add `MarkExpiredAsync` call for response code "11" in PaymentController.cs VnpayIpn method
- [x] 1.2 Keep `MarkFailedAsync` for other failure response codes

## 2. Fix VnpayReturn - Direct Service Call + Elapsed Time

- [x] 2.1 Replace `@inject IHttpClientFactory` with `@inject OrderService`
- [x] 2.2 Remove `_httpClient` field and related code
- [x] 2.3 Replace HTTP API call in polling loop with `OrderService.GetOrderStatusAsync(txnRef)`
- [x] 2.4 Add `_elapsedSeconds` field for elapsed time counter
- [x] 2.5 Update elapsed counter in StartPolling loop
- [x] 2.6 Add elapsed time display in Pending state UI