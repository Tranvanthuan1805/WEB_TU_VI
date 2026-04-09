# httpclient-factory Specification

## Purpose
TBD - created by archiving change httpclient-blazor-server. Update Purpose after archive.
## Requirements
### Requirement: Blazor Server uses IHttpClientFactory for HTTP requests
The system SHALL use IHttpClientFactory for managing HttpClient lifecycle in Blazor Server pages.

#### Scenario: HttpClientFactory is registered in DI container
- **WHEN** application starts
- **THEN** AddHttpClient() registers IHttpClientFactory in service container
- **AND** HttpClient instances can be resolved via IHttpClientFactory

#### Scenario: Checkout page creates HttpClient via factory
- **WHEN** Checkout.razor needs to make API request
- **AND** IHttpClientFactory is injected
- **THEN** HttpClient is obtained via HttpClientFactory.CreateClient()
- **AND** HTTP POST request succeeds

#### Scenario: VnpayReturn page creates HttpClient via factory
- **WHEN** VnpayReturn.razor needs to poll order status
- **AND** IHttpClientFactory is injected
- **THEN** HttpClient is obtained via HttpClientFactory.CreateClient()
- **AND** HTTP GET request succeeds

