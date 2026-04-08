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

            var version = "2.1.0";
            var command = "pay";
            var currCode = "VND";
            var locale = "vn";
            var orderType = "other";

            var amount = request.Amount * 100;

            var payParams = new SortedDictionary<string, string?>
            {
                { "vnp_Version", version },
                { "vnp_Command", command },
                { "vnp_TmnCode", tmnCode },
                { "vnp_Amount", amount.ToString() },
                { "vnp_CurrCode", currCode },
                { "vnp_OrderInfo", request.OrderInfo },
                { "vnp_OrderType", orderType },
                { "vnp_Locale", locale },
                { "vnp_ReturnUrl", request.ReturnUrl },
                { "vnp_TxnRef", request.TxnRef },
                { "vnp_TransactionId", request.OrderId },
                { "vnp_IpAddr", request.IpAddress },
                { "vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss") }
            };

            var queryString = string.Join("&", payParams.Select(kvp =>
                $"{Uri.EscapeDataString(kvp.Key)}={Uri.EscapeDataString(kvp.Value ?? "")}"));

            var secureHash = ComputeHmacSha256(queryString, vnpayConfig["HashSecret"] ?? "");
            queryString += $"&vnp_SecureHash={secureHash}";

            return $"{paymentUrl}?{queryString}";
        }

        public bool ValidateSignature(IQueryCollection query)
        {
            var vnp_SecureHash = query["vnp_SecureHash"].ToString();
            if (string.IsNullOrEmpty(vnp_SecureHash))
                return false;

            var receivedHash = vnp_SecureHash;

            var excludeParams = new HashSet<string> { "vnp_SecureHash", "vnp_SecureHashType" };
            var payParams = new SortedDictionary<string, string?>();

            foreach (var key in query.Keys)
            {
                if (!excludeParams.Contains(key))
                {
                    payParams[key] = query[key].ToString();
                }
            }

            var queryString = string.Join("&", payParams.Select(kvp =>
                $"{Uri.EscapeDataString(kvp.Key)}={Uri.EscapeDataString(kvp.Value ?? "")}"));

            var computedHash = ComputeHmacSha256(queryString, _configuration["VnPay:HashSecret"] ?? "");

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

        private static string ComputeHmacSha256(string data, string key)
        {
            using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(key));
            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(data));
            return BitConverter.ToString(hash).Replace("-", "").ToLower();
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
