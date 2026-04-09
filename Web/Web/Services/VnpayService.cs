using System.Globalization;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Web.Services
{
    public class VnpayService
    {
        private readonly IConfiguration _configuration;

        public VnpayService(IConfiguration configuration)
        {
            _configuration = configuration;
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

            // VNPAY yêu cầu amount là số nguyên sau khi nhân 100
            var amount = Convert.ToInt64(
                Math.Round(request.Amount * 100m, 0, MidpointRounding.AwayFromZero)
            );

            var payParams = new SortedDictionary<string, string?>(StringComparer.Ordinal)
            {
                { "vnp_Version", "2.1.0" },
                { "vnp_Command", "pay" },
                { "vnp_TmnCode", tmnCode },
                { "vnp_Amount", amount.ToString(CultureInfo.InvariantCulture) },
                { "vnp_CurrCode", "VND" },
                { "vnp_OrderInfo", SanitizeOrderInfo(request.OrderInfo) },
                { "vnp_OrderType", "other" },
                { "vnp_Locale", "vn" },
                { "vnp_ReturnUrl", request.ReturnUrl },
                { "vnp_TxnRef", request.TxnRef },
                { "vnp_IpAddr", request.IpAddress },
                { "vnp_CreateDate", nowVn.ToString("yyyyMMddHHmmss") },
                { "vnp_ExpireDate", nowVn.AddMinutes(15).ToString("yyyyMMddHHmmss") }
            };

            var queryString = BuildQueryString(payParams);
            var secureHash = ComputeHmacSha512(queryString, hashSecret);

            return $"{paymentUrl}?{queryString}&vnp_SecureHash={secureHash}";
        }

        public bool ValidateSignature(IQueryCollection query)
        {
            var receivedHash = query["vnp_SecureHash"].ToString();
            if (string.IsNullOrWhiteSpace(receivedHash))
                return false;

            var payParams = new SortedDictionary<string, string?>(StringComparer.Ordinal);

            foreach (var key in query.Keys)
            {
                // Chỉ lấy params bắt đầu bằng vnp_
                if (!key.StartsWith("vnp_", StringComparison.Ordinal))
                    continue;

                // Bỏ params chữ ký
                if (key.Equals("vnp_SecureHash", StringComparison.OrdinalIgnoreCase) ||
                    key.Equals("vnp_SecureHashType", StringComparison.OrdinalIgnoreCase))
                    continue;

                var value = query[key].ToString();
                if (!string.IsNullOrWhiteSpace(value))
                {
                    payParams[key] = value;
                }
            }

            var rawData = BuildQueryString(payParams);
            var computedHash = ComputeHmacSha512(rawData, _configuration["VnPay:HashSecret"] ?? "");

            return string.Equals(receivedHash, computedHash, StringComparison.OrdinalIgnoreCase);
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