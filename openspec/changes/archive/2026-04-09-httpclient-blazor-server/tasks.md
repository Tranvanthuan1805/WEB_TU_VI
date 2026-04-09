## 1. Register IHttpClientFactory

- [x] 1.1 Add builder.Services.AddHttpClient() to Program.cs after OrderService registration

## 2. Update Checkout.razor

- [x] 2.1 Replace @inject HttpClient Http with @inject IHttpClientFactory HttpClientFactory
- [x] 2.2 Create a private HttpClient field and initialize via HttpClientFactory.CreateClient() in OnInitializedAsync

## 3. Update VnpayReturn.razor

- [x] 3.1 Replace @inject HttpClient Http with @inject IHttpClientFactory HttpClientFactory
- [x] 3.2 Create a private HttpClient field and initialize via HttpClientFactory.CreateClient() in StartPolling method

## 4. Verify

- [x] 4.1 Build project and verify no errors
- [ ] 4.2 Test checkout flow