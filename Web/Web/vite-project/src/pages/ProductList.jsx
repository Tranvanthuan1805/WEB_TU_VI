import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, CheckCircle, HelpCircle } from 'lucide-react';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handlePurchase = (productId) => {
    navigate(`/checkout?productId=${productId}`);
  };

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center text-slate-500 font-medium">
        Đang tải bảng giá dịch vụ...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-[10px] tracking-widest text-[#C5A059] font-bold uppercase block">Bảng Giá Dịch Vụ Luận Giải</span>
        <h1 className="font-serif text-3xl md:text-4xl italic font-semibold text-[#C5A059]">Mở Khóa Định Mệnh VIP</h1>
        <p className="text-slate-500 text-sm font-light leading-relaxed">
          Lựa chọn các gói vé luận giải tử vi chuyên sâu, vận hạn trọn đời và phong thủy học để nhận được manuscript diễn giải đầy đủ, chi tiết nhất từ chuyên gia.
        </p>
      </div>

      {/* Grid Packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
        {products.map(product => (
          <div 
            key={product.productId} 
            className={`bg-white border border-[#E5DDD0]/70 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#C5A059]/40 transition-all ${
              product.price > 100000 ? 'ring-2 ring-[#C5A059]/20' : ''
            }`}
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <span className="text-[10px] tracking-widest text-[#C5A059] font-bold uppercase block">
                  {product.durationDays ? `Hạn dùng ${product.durationDays} ngày` : 'Sử dụng 1 lần'}
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-800">{product.name}</h3>
                <div className="text-2xl md:text-3xl font-bold text-slate-900 font-sans pt-2">
                  {formatPrice(product.price)}
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-500 text-xs font-light leading-relaxed">
                {product.description}
              </p>

              {/* Features List */}
              <ul className="space-y-3 pt-4 border-t border-[#E5DDD0]/30 text-xs text-slate-600 font-light">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                  <span>Xem luận giải đầy đủ chi tiết về Thể Cách & Mệnh Vị</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                  <span>Giải đoán chi tiết hệ thống Chính tinh & Phụ tinh cát hung</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                  <span>Dự báo vận hạn chi tiết theo đại vận và năm xem</span>
                </li>
                {product.durationDays && (
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                    <span>Lập lá số không giới hạn số lượt trong {product.durationDays} ngày</span>
                  </li>
                )}
              </ul>
            </div>

            {/* CTA */}
            <div className="pt-8">
              <button
                onClick={() => handlePurchase(product.productId)}
                className="btn-gold py-3 w-full flex items-center justify-center gap-2 cursor-pointer shadow-sm text-xs font-bold"
              >
                <span>Mua Vé Luận Giải</span>
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
