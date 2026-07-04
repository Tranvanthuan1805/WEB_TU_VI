import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ShoppingBag, ChevronLeft, CreditCard, ShieldCheck } from 'lucide-react';

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!productId) {
      setError("Không tìm thấy sản phẩm cần thanh toán.");
      setLoading(false);
      return;
    }

    fetch(`/api/products/${productId}`)
      .then(res => {
        if (!res.ok) throw new Error("Sản phẩm không hợp lệ.");
        return res.json();
      })
      .then(data => {
        setProduct(data);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [productId]);

  const handlePay = () => {
    setPaying(true);
    fetch('/api/checkout/create-vnpay-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: parseInt(productId), quantity: 1 })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => { throw new Error(data.error || "Gặp lỗi khi tạo hóa đơn."); });
        }
        return res.json();
      })
      .then(data => {
        if (data.paymentUrl) {
          // Redirect user to VNPAY gateway
          window.location.href = data.paymentUrl;
        } else {
          throw new Error("Không lấy được đường dẫn thanh toán VNPAY.");
        }
      })
      .catch(err => {
        alert(err.message);
        setPaying(false);
      });
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center text-slate-500 font-medium">
        Đang tải thông tin đơn hàng...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <p className="text-red-500 font-bold">{error || "Sản phẩm không hợp lệ."}</p>
        <Link to="/san-pham" className="inline-flex items-center gap-1.5 text-sm text-[#C5A059] font-bold hover:underline">
          <ChevronLeft className="w-4 h-4" /> Quay lại chọn dịch vụ
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8 animate-fade-in">
      <Link 
        to="/san-pham" 
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#C5A059] transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Quay lại
      </Link>

      <div className="bg-white border border-[#E5DDD0]/70 rounded-3xl p-6 md:p-10 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Order Details */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-slate-800 italic border-b border-[#E5DDD0]/40 pb-4">
            Đơn Hàng Của Bạn
          </h2>
          <div className="space-y-4">
            <div>
              <span className="text-[10px] tracking-widest text-[#C5A059] font-bold uppercase block mb-1">Dịch Vụ</span>
              <h3 className="font-bold text-slate-800 text-base">{product.name}</h3>
            </div>
            <div>
              <span className="text-[10px] tracking-widest text-[#C5A059] font-bold uppercase block mb-1">Mô tả gói</span>
              <p className="text-slate-500 text-xs font-light leading-relaxed">{product.description}</p>
            </div>
            {product.durationDays && (
              <div>
                <span className="text-[10px] tracking-widest text-[#C5A059] font-bold uppercase block mb-1">Thời hạn vé</span>
                <p className="text-slate-700 font-semibold text-xs">{product.durationDays} ngày sử dụng</p>
              </div>
            )}
          </div>
        </div>

        {/* Total & Checkout */}
        <div className="bg-[#FDFCF7] border border-[#E5DDD0]/60 p-6 rounded-2xl space-y-6 flex flex-col justify-between h-full">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Tổng Thanh Toán</h3>
            <div className="flex justify-between items-end border-b border-[#E5DDD0]/40 pb-3">
              <span className="text-slate-500 text-xs font-light">Tạm tính</span>
              <span className="text-slate-700 font-bold text-sm">
                {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-slate-800 font-semibold text-sm">Tổng cộng</span>
              <span className="text-[#C5A059] font-bold text-xl font-sans">
                {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </span>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <button
              onClick={handlePay}
              disabled={paying}
              className="btn-gold py-3.5 w-full flex items-center justify-center gap-2 cursor-pointer shadow-sm text-xs font-bold uppercase disabled:opacity-75"
            >
              <CreditCard className="w-4 h-4" />
              <span>{paying ? "Đang tạo thanh toán..." : "Thanh Toán VNPay"}</span>
            </button>
            <div className="flex items-center gap-2 justify-center text-[10px] text-slate-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>Giao dịch an toàn & bảo mật 100%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
