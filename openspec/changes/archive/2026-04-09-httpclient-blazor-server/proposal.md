## Why

Blazor Server pages (Checkout.razor and VnpayReturn.razor) use @inject HttpClient but this service is not registered by default in Blazor Server, causing InvalidOperationException at runtime. Using IHttpClientFactory with AddHttpClient() is the recommended best practice for managing HttpClient instances.

## What Changes

- Add IHttpClientFactory registration via AddHttpClient() in Program.cs
- Replace @inject HttpClient with @inject IHttpClientFactory in Checkout.razor
- Replace @inject HttpClient with @inject IHttpClientFactory in VnpayReturn.razor
- Update code to use HttpClientFactory.CreateClient() instead of direct HttpClient injection

## Capabilities

### New Capabilities
- **httpclient-factory**: HttpClient lifecycle management via IHttpClientFactory for Blazor Server

### Modified Capabilities
- None

## Impact

- `Web/Web/Program.cs` - Add AddHttpClient() registration
- `Web/Web/Components/Pages/User/Checkout.razor` - Change HttpClient to IHttpClientFactory
- `Web/Web/Components/Pages/User/VnpayReturn.razor` - Change HttpClient to IHttpClientFactory