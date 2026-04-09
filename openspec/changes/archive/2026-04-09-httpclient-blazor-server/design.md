## Context

Blazor Server does not register HttpClient as a default service. When Checkout.razor and VnpayReturn.razor try to inject HttpClient directly, they fail with InvalidOperationException at runtime. This differs from Blazor WebAssembly where HttpClient is pre-registered.

## Goals / Non-Goals

**Goals:**
- Register IHttpClientFactory in Blazor Server via AddHttpClient()
- Update Checkout.razor to use IHttpClientFactory
- Update VnpayReturn.razor to use IHttpClientFactory

**Non-Goals:**
- Add named clients or typed clients (default client is sufficient)
- Modify any API logic
- Change other components that may use HttpClient

## Decisions

1. **Use AddHttpClient() without named client**
   - Register with `builder.Services.AddHttpClient()` for default client
   - Alternative: Use named client per service - rejected as overkill for this use case

2. **Use CreateClient() for HttpClient retrieval**
   - Use `HttpClientFactory.CreateClient("Default")` or simply `CreateClient()` to get HttpClient
   - This creates a transient HttpClient with proper lifecycle management

3. **BaseAddress handling**
   - For Blazor Server, the HttpClient needs proper base address configured
   - Use NavigationManager.GetBaseUri() to construct correct BaseAddress

## Risks / Trade-offs

- [Risk] HttpClient without BaseAddress → [Mitigation] Configure BaseAddress when creating client or rely on absolute URLs
- [Risk] Connection pool exhaustion → [Mitigation] IHttpClientFactory handles pooling automatically