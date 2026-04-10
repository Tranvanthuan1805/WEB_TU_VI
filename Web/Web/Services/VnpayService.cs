using System.Globalization;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Web.Utilities;

namespace Web.Services
{
    public class VnpayService
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public VnpayService(IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        public string CreatePaymentUrl(CreatePaymentRequest request)
        {
            var vnpayConfig = _configuration.GetSection("VnPay");
            var tmnCode = vnpayConfig["TmnCode"] ?? "";
            var paymentUrl = vnpayConfig["PaymentUrl"] ?? "";
            var hashSecret = vnpayConfig["HashSecret"] ?? "";

            var vnTimeZone = TimeZoneInfo.FindSystemTimeZoneById(
                OperatingSystem.IsWindows() ? "SE Asia Standard Time" : "Asia/Ho_Chi_Minh");
            var nowVn = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, vnTimeZone);

            var amount = Convert.ToInt64(
                Math.Round(request.Amount * 100m, 0, MidpointRounding.AwayFromZero)
            );

            var vnpay = new VnPayLibrary(_httpContextAccessor);

            vnpay.AddRequestData("vnp_Version", VnPayLibrary.VERSION);
            vnpay.AddRequestData("vnp_Command", "pay");
            vnpay.AddRequestData("vnp_TmnCode", tmnCode);
            vnpay.AddRequestData("vnp_Amount", amount.ToString(CultureInfo.InvariantCulture));
            vnpay.AddRequestData("vnp_CurrCode", "VND");
            vnpay.AddRequestData("vnp_OrderInfo", SanitizeOrderInfo(request.OrderInfo));
            vnpay.AddRequestData("vnp_OrderType", "other");
            vnpay.AddRequestData("vnp_Locale", "vn");
            vnpay.AddRequestData("vnp_ReturnUrl", request.ReturnUrl);
            vnpay.AddRequestData("vnp_TxnRef", request.TxnRef);
            vnpay.AddRequestData("vnp_IpAddr", request.IpAddress);
            vnpay.AddRequestData("vnp_CreateDate", nowVn.ToString("yyyyMMddHHmmss"));
            vnpay.AddRequestData("vnp_ExpireDate", nowVn.AddMinutes(15).ToString("yyyyMMddHHmmss"));

            return vnpay.CreateRequestUrl(paymentUrl, hashSecret);
        }

        public bool ValidateSignature(IQueryCollection query)
        {
            var receivedHash = query["vnp_SecureHash"].ToString();
            if (string.IsNullOrWhiteSpace(receivedHash))
                return false;

            var vnpay = new VnPayLibrary();

            foreach (var key in query.Keys)
            {
                if (!key.StartsWith("vnp_", StringComparison.Ordinal))
                    continue;

                if (key.Equals("vnp_SecureHash", StringComparison.OrdinalIgnoreCase) ||
                    key.Equals("vnp_SecureHashType", StringComparison.OrdinalIgnoreCase))
                    continue;

                var value = query[key].ToString();
                if (!string.IsNullOrWhiteSpace(value))
                {
                    vnpay.AddResponseData(key, value);
                }
            }

            var secretKey = _configuration["VnPay:HashSecret"] ?? "";
            return vnpay.ValidateSignature(receivedHash, secretKey);
        }

        public VnpayResponse ParseResponse(IQueryCollection query)
        {
            return new VnpayResponse
            {
                Vnp_TxnRef = query["vnp_TxnRef"].ToString(),
                Vnp_Amount = query["vnp_Amount"].ToString(),
                Vnp_ResponseCode = query["vnp_ResponseCode"].ToString(),
                Vnp_TransactionStatus = query["vnp_TransactionStatus"].ToString(),
                Vnp_TransactionNo = query["vnp_TransactionNo"].ToString(),
                Vnp_SecureHash = query["vnp_SecureHash"].ToString()
            };
        }

        private static string BuildQueryString(SortedDictionary<string, string?> data)
        {
            return string.Join("&", data
                .Where(kvp => !string.IsNullOrWhiteSpace(kvp.Value))
                .Select(kvp => $"{UrlEncodeVnp(kvp.Key)}={UrlEncodeVnp(kvp.Value!)}"));
        }

        private static string UrlEncodeVnp(string value)
        {
            // Đồng bộ kiểu application/x-www-form-urlencoded
            // để tránh lệch space giữa + và %20
            return WebUtility.UrlEncode(value).Replace("%20", "+");
        }

        private static string ComputeHmacSha512(string data, string key)
        {
            using var hmac = new HMACSHA512(Encoding.UTF8.GetBytes(key));
            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(data));
            return Convert.ToHexString(hash).ToLowerInvariant();
        }

        private static string SanitizeOrderInfo(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
                return "Thanh toan don hang";

            // Bạn có thể thay bằng hàm bỏ dấu đầy đủ hơn nếu muốn
            var normalized = value.Normalize(NormalizationForm.FormD);
            var sb = new StringBuilder();

            foreach (var c in normalized)
            {
                var uc = System.Globalization.CharUnicodeInfo.GetUnicodeCategory(c);
                if (uc != System.Globalization.UnicodeCategory.NonSpacingMark)
                {
                    if (char.IsLetterOrDigit(c) || c == ' ' || c == ':' || c == '-' || c == '_')
                        sb.Append(c);
                }
            }

            return sb.ToString().Normalize(NormalizationForm.FormC);
        }
    }

    public class CreatePaymentRequest
    {
        public decimal Amount { get; set; }
        public string OrderId { get; set; } = "";
        public string TxnRef { get; set; } = "";
        public string ReturnUrl { get; set; } = "";
        public string IpAddress { get; set; } = "";
        public string OrderInfo { get; set; } = "";
    }

    public class VnpayResponse
    {
        public string Vnp_TxnRef { get; set; } = "";
        public string Vnp_Amount { get; set; } = "";
        public string Vnp_ResponseCode { get; set; } = "";
        public string Vnp_TransactionStatus { get; set; } = "";
        public string Vnp_TransactionNo { get; set; } = "";
        public string Vnp_SecureHash { get; set; } = "";
    }
}