import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, AlertTriangle, XCircle, Clock, FileText, ChevronRight, Copy, Check } from 'lucide-react';

const ResponseCodeMessages = {
  "07": "Giao dịch bị nghi ngờ gian lận. Vui lòng liên hệ hỗ trợ.",
  "09": "Tài khoản chưa đăng ký InternetBanking.",
  "10": "Xác thực thông tin thẻ không đúng quá 3 lần.",
  "11": "Đơn hàng đã hết hạn thanh toán.",
  "12": "Tài khoản bị khóa.",
  "13": "Mật khẩu xác thực (OTP) không đúng.",
  "24": "Giao dịch đã bị hủy.",
  "51": "Tài khoản không đủ số dư.",
  "65": "Đã vượt quá hạn mức giao dịch trong ngày.",
  "75": "Ngân hàng đang bảo trì.",
  "79": "Nhập sai mật khẩu thanh toán quá số lần quy định.",
  "99": "Lỗi không xác định. Vui lòng thử lại."
};

const TransactionStatusMessages = {
  "01": "Giao dịch chưa hoàn tất.",
  "02": "Giao dịch bị lỗi.",
  "04": "Giao dịch đã được hoàn trả.",
  "05": "Đang xử lý hoàn trả.",
  "06": "Đã gửi yêu cầu hoàn trả.",
  "07": "Giao dịch bị nghi ngờ gian lận.",
  "08": "Hết thời gian thanh toán.",
  "09": "Hoàn trả bị từ chối."
};

export default function VnpayReturn() {
  const [searchParams] = useSearchParams();
  const txnRef = searchParams.get('vnp_TxnRef');
  const responseCode = searchParams.get('vnp_ResponseCode');
  const transactionStatus = searchParams.get('vnp_TransactionStatus');

  const [paymentState, setPaymentState] = useState("Pending"); // Pending, Paid, Failed, Expired, Cancelled, Timeout
  const [errorMessage, setErrorMessage] = useState("");
  const [ticketCode, setTicketCode] = useState("");
  const [orderDetail, setOrderDetail] = useState(null);
  
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!txnRef) {
      setPaymentState("Failed");
      setErrorMessage("Không tìm thấy mã đơn hàng thanh toán.");
      return;
    }

    // Immediate check for standard VNPAY cancel/error codes
    if (responseCode && responseCode !== "00") {
      if (responseCode === "24") {
        setPaymentState("Cancelled");
        setErrorMessage("Giao dịch thanh toán đã bị hủy bởi người dùng.");
      } else if (responseCode === "11") {
        setPaymentState("Expired");
        setErrorMessage("Đơn hàng thanh toán đã quá hạn.");
      } else {
        setPaymentState("Failed");
        setErrorMessage(ResponseCodeMessages[responseCode] || "Giao dịch thanh toán thất bại.");
      }
      fetchOrderStatus(txnRef);
      return;
    }

    if (transactionStatus && transactionStatus !== "00") {
      setPaymentState("Failed");
      setErrorMessage(TransactionStatusMessages[transactionStatus] || "Giao dịch không thành công.");
      fetchOrderStatus(txnRef);
      return;
    }

    // Start polling status
    startPolling(txnRef);
  }, [txnRef, responseCode, transactionStatus]);

  const fetchOrderStatus = (ref) => {
    fetch(`/api/orders/status?txnRef=${ref}`)
      .then(res => res.json())
      .then(data => setOrderDetail(data))
      .catch(() => {});
  };

  const startPolling = (ref) => {
    setPaymentState("Pending");
    let pollingAttempts = 0;
    const maxAttempts = 12; // Poll for 60 seconds (5s interval)
    
    const interval = setInterval(() => {
      pollingAttempts++;
      
      fetch(`/api/orders/status?txnRef=${ref}`)
        .then(res => {
          if (!res.ok) throw new Error("Order not found");
          return res.json();
        })
        .then(data => {
          setOrderDetail(data);
          
          if (data.status === "Paid") {
            setTicketCode(data.ticketCode);
            setPaymentState("Paid");
            clearInterval(interval);
          } else if (data.status === "PaymentFailed") {
            setPaymentState("Failed");
            setErrorMessage("Hệ thống xác định thanh toán thất bại.");
            clearInterval(interval);
          } else if (data.status === "Expired") {
            setPaymentState("Expired");
            clearInterval(interval);
          }
        })
        .catch(() => {
          if (pollingAttempts >= maxAttempts) {
            setPaymentState("Timeout");
            clearInterval(interval);
          }
        });

      if (pollingAttempts >= maxAttempts) {
        setPaymentState("Timeout");
        clearInterval(interval);
      }
    }, 5000);

    return () => clearInterval(interval);
  };

  const handleCopy = () => {
    if (ticketCode) {
      navigator.clipboard.writeText(ticketCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 md:py-20 animate-fade-in">
      <div className="bg-white border border-[#E5DDD0]/70 rounded-3xl p-6 md:p-10 shadow-md text-center space-y-6">
        
        <h1 className="font-serif text-2xl md:text-3xl text-[#C5A059] italic font-semibold">Kết quả thanh toán</h1>

        {/* State Displays */}
        {paymentState === "Pending" && (
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 space-y-4">
            <RefreshCw className="w-12 h-12 text-[#C5A059] animate-spin mx-auto" />
            <p className="text-slate-600 font-medium text-base">Đang kiểm tra và xác nhận giao dịch thanh toán...</p>
          </div>
        )}

        {paymentState === "Paid" && (
          <div className="bg-green-50/50 border border-green-200 rounded-2xl p-8 space-y-6">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
            <div className="space-y-2">
              <h2 className="text-green-800 font-bold text-lg">Thanh Toán Thành Công!</h2>
              <p className="text-slate-500 text-xs font-light">
                Vé VIP của bạn đã được khởi tạo và sẵn sàng sử dụng.
              </p>
            </div>
            
            {ticketCode && (
              <div className="bg-white border border-[#E5DDD0]/60 rounded-xl p-4 max-w-sm mx-auto flex justify-between items-center shadow-sm">
                <div className="text-left space-y-1">
                  <span className="text-[9px] uppercase tracking-widest text-[#C5A059] font-bold block">Mã Vé Của Bạn</span>
                  <span className="font-serif text-xl font-bold text-slate-800 italic">{ticketCode}</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="p-2 border border-slate-100 rounded-lg hover:bg-slate-50 text-[#C5A059] transition-all cursor-pointer"
                  title="Copy Mã Vé"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            )}

            <div className="pt-2">
              <Link 
                to="/" 
                className="btn-gold px-8 py-3 text-xs inline-flex items-center gap-1.5"
              >
                Nhập Lá Số Ngay <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {paymentState === "Failed" && (
          <div className="bg-red-50/50 border border-red-200 rounded-2xl p-8 space-y-4">
            <XCircle className="w-12 h-12 text-red-500 mx-auto" />
            <h2 className="text-red-800 font-bold text-lg">Giao Dịch Thất Bại</h2>
            <p className="text-slate-500 text-xs font-light">{errorMessage}</p>
            <div className="pt-4">
              <Link to="/san-pham" className="text-xs font-bold text-[#C5A059] hover:underline uppercase tracking-wider">
                Chọn gói dịch vụ khác
              </Link>
            </div>
          </div>
        )}

        {paymentState === "Cancelled" && (
          <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-8 space-y-4">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
            <h2 className="text-amber-800 font-bold text-lg">Giao Dịch Bị Hủy</h2>
            <p className="text-slate-500 text-xs font-light">Bạn đã từ chối thực hiện giao dịch này.</p>
            <div className="pt-4">
              <Link to="/san-pham" className="text-xs font-bold text-[#C5A059] hover:underline uppercase tracking-wider">
                Quay lại gói dịch vụ
              </Link>
            </div>
          </div>
        )}

        {paymentState === "Expired" && (
          <div className="bg-red-50/50 border border-red-200 rounded-2xl p-8 space-y-4">
            <Clock className="w-12 h-12 text-red-500 mx-auto" />
            <h2 className="text-red-800 font-bold text-lg">Hóa Đơn Đã Hết Hạn</h2>
            <p className="text-slate-500 text-xs font-light">Đơn hàng thanh toán đã hết hạn chờ. Vui lòng đặt mua lại.</p>
            <div className="pt-4">
              <Link to="/san-pham" className="text-xs font-bold text-[#C5A059] hover:underline uppercase tracking-wider">
                Mua gói mới
              </Link>
            </div>
          </div>
        )}

        {paymentState === "Timeout" && (
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 space-y-4">
            <Clock className="w-12 h-12 text-slate-400 mx-auto" />
            <h2 className="text-slate-800 font-bold text-lg">Quá Thời Gian Chờ</h2>
            <p className="text-slate-500 text-xs font-light">Không thể tải thông tin cập nhật kịp thời. Hãy kiểm tra hòm thư của bạn hoặc liên hệ hỗ trợ.</p>
            <button
              onClick={() => startPolling(txnRef)}
              className="px-6 py-2 border border-[#C5A059] rounded-xl text-xs font-bold uppercase tracking-wider text-[#C5A059] hover:bg-[#C5A059]/5 transition-colors cursor-pointer"
            >
              Kiểm tra lại
            </button>
          </div>
        )}

        {/* Invoice details */}
        {orderDetail && (
          <div className="mt-8 pt-6 border-t border-[#E5DDD0]/50 text-left space-y-4">
            <h3 className="font-serif text-lg text-slate-800 italic font-semibold">Chi tiết hóa đơn</h3>
            <div className="bg-slate-50 rounded-2xl p-5 text-xs text-slate-600 font-light space-y-3">
              <div className="flex justify-between">
                <span>Mã giao dịch:</span>
                <span className="font-semibold text-slate-800">{txnRef}</span>
              </div>
              <div className="flex justify-between">
                <span>Trạng thái đơn:</span>
                <span className="font-semibold text-[#C5A059]">
                  {orderDetail.status === "Paid" ? "Đã thanh toán" :
                   orderDetail.status === "PendingPayment" ? "Chờ thanh toán" :
                   orderDetail.status === "Expired" ? "Hết hạn" : "Thất bại"}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-200/60 pt-2 mt-2 font-medium">
                <span className="text-slate-800 font-semibold">Tổng số tiền:</span>
                <span className="text-[#C5A059] font-bold text-sm">
                  {orderDetail.totalAmount?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Simple internal helper icon
function RefreshCw(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}
