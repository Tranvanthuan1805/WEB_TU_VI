using Microsoft.AspNetCore.Mvc;
using Web.Services;

namespace Web.Controllers
{
    [Route("api")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly OrderService _orderService;
        private readonly VnpayService _vnpayService;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public PaymentController(
            OrderService orderService,
            VnpayService vnpayService,
            IConfiguration configuration,
            IHttpContextAccessor httpContextAccessor)
        {
            _orderService = orderService;
            _vnpayService = vnpayService;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost("checkout/create-vnpay-payment")]
        public async Task<IActionResult> CreateVnpayPayment([FromBody] CreatePaymentRequest request)
        {
            try
            {
                var order = await _orderService.CreatePendingOrderAsync(request.ProductId, request.Quantity);

                var vnpayConfig = _configuration.GetSection("VnPay");
                var returnUrl = vnpayConfig["ReturnUrl"] ?? "";
                var ipnUrl = vnpayConfig["IpnUrl"] ?? "";
                var ipAddress = _httpContextAccessor.HttpContext?.Connection.RemoteIpAddress?.ToString() ?? "127.0.0.1";

                var paymentUrl = _vnpayService.CreatePaymentUrl(new Services.CreatePaymentRequest
                {
                    Amount = order.TotalAmount,
                    OrderId = order.OrderId.ToString(),
                    TxnRef = order.TxnRef,
                    ReturnUrl = returnUrl,
                    IpAddress = ipAddress,
                    OrderInfo = $"Thanh toán đơn hàng #{order.OrderId}"
                });

                return Ok(new { paymentUrl });
            }
            catch (InvalidOperationException ex) when (ex.Message == "Sản phẩm đã hết hàng")
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("payments/vnpay/ipn")]
        public async Task<IActionResult> VnpayIpn()
        {
            try
            {
                if (!_vnpayService.ValidateSignature(Request.Query))
                {
                    return Ok(new { RspCode = "97", Message = "Invalid signature" });
                }

                var response = _vnpayService.ParseResponse(Request.Query);
                var order = await _orderService.GetOrderStatusAsync(response.Vnp_TxnRef);

                if (order == null)
                {
                    return Ok(new { RspCode = "01", Message = "Order not found" });
                }

                var expectedAmount = (long)(order.TotalAmount * 100);
                if (!long.TryParse(response.Vnp_Amount, out var receivedAmount) || receivedAmount != expectedAmount)
                {
                    return Ok(new { RspCode = "02", Message = "Amount mismatch" });
                }

                if (order.Status != Web.Models.OrderStatus.PendingPayment)
                {
                    return Ok(new { RspCode = "00", Message = "Confirm Success" });
                }

                if (response.Vnp_ResponseCode == "00" && response.Vnp_TransactionStatus == "00")
                {
                    await _orderService.MarkPaidAsync(response.Vnp_TxnRef, response.Vnp_TransactionNo);
                    return Ok(new { RspCode = "00", Message = "Confirm Success" });
                }
                else if (response.Vnp_ResponseCode == "11")
                {
                    await _orderService.MarkExpiredAsync(response.Vnp_TxnRef);
                    return Ok(new { RspCode = "11", Message = "Order expired" });
                }
                else
                {
                    await _orderService.MarkFailedAsync(response.Vnp_TxnRef, response.Vnp_ResponseCode);
                    return Ok(new { RspCode = response.Vnp_ResponseCode, Message = "Payment failed" });
                }
            }
            catch (Exception ex)
            {
                return Ok(new { RspCode = "99", Message = ex.Message });
            }
        }

        [HttpGet("orders/status")]
        public async Task<IActionResult> GetOrderStatus([FromQuery] string txnRef)
        {
            if (string.IsNullOrEmpty(txnRef))
            {
                return BadRequest(new { error = "txnRef is required" });
            }

            var order = await _orderService.GetOrderStatusAsync(txnRef);
            if (order == null)
            {
                return NotFound(new { error = "Order not found" });
            }

            return Ok(new
            {
                status = order.Status.ToString(),
                totalAmount = order.TotalAmount,
                ticketCode = order.Ticket?.Code,
                ticketId = order.TicketId
            });
        }
    }

    public class CreatePaymentRequest
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; } = 1;
    }
}
