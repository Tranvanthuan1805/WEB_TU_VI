'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, ArrowUpDown, Sparkles } from 'lucide-react';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Name");
  const router = useRouter();

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handlePurchase = (productId) => {
    router.push(`/checkout?productId=${productId}`);
  };

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const filteredProducts = products
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "Name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "PriceAsc") {
        return a.price - b.price;
      } else if (sortBy === "PriceDesc") {
        return b.price - a.price;
      } else if (sortBy === "Discount") {
        return b.discount - a.discount;
      } else if (sortBy === "Quantity") {
        return b.quantity - a.quantity;
      }
      return 0;
    });

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center text-slate-500 font-medium">
        Đang tải bảng giá dịch vụ...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="flex-1 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8 md:mb-12">
            <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest mb-1 block">Dịch vụ</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">Sản Phẩm Premium</h1>
            <p className="text-slate-500 mt-2 font-light text-lg">Đăng ký mua vé tra cứu lá số tử vi chuyên sâu và trọn đời.</p>
          </div>

          {/* Search and Sort Filter Bar */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all text-sm shadow-sm" 
                placeholder="Tìm kiếm sản phẩm..." 
              />
            </div>
            
            <div className="flex items-center gap-2.5">
              <label className="text-sm font-semibold text-slate-500 whitespace-nowrap">Sắp xếp:</label>
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="bg-white border border-slate-200 rounded-2xl pl-4 pr-10 py-3 text-sm text-slate-700 font-medium focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all shadow-sm cursor-pointer appearance-none"
                >
                  <option value="Name">Tên</option>
                  <option value="PriceAsc">Giá tăng dần</option>
                  <option value="PriceDesc">Giá giảm dần</option>
                  <option value="Discount">Giảm giá nhiều</option>
                  <option value="Quantity">Số lượng</option>
                </select>
                <ArrowUpDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Grid Products */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-medium">
              Không tìm thấy sản phẩm phù hợp.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => {
                const isDiscounted = product.discount > 0;
                const isOutOfStock = product.quantity >= 0 && product.quantitySold >= product.quantity;

                return (
                  <div 
                    key={product.productId} 
                    className="bg-white border border-slate-100 rounded-3xl p-6 hover:shadow-xl hover:border-amber-200 transition-all flex flex-col group relative overflow-hidden"
                  >
                    {isDiscounted && (
                      <div className="absolute top-0 right-0 bg-red-500 text-white font-extrabold text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-bl-2xl shadow-sm">
                        -{product.discount}%
                      </div>
                    )}
                    
                    <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                      {product.name}
                    </h2>

                    <div className="mb-4 flex items-baseline gap-2 flex-wrap">
                      <span className="text-2xl font-extrabold text-slate-800">
                        {formatPrice(product.price)}
                      </span>
                      {isDiscounted && (
                        <del className="text-sm text-slate-400">
                          {formatPrice(product.originPrice)}
                        </del>
                      )}
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-500 mb-6 border-t border-slate-50 pt-4 flex-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Trạng thái:</span>
                        <span className={`font-semibold ${isOutOfStock ? 'text-red-500' : 'text-green-600'}`}>
                          {isOutOfStock ? 'Hết hàng' : 'Còn hàng'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Còn lại:</span>
                        <span className="font-semibold text-slate-700">
                          {product.quantity < 0 ? '∞ (Không giới hạn)' : Math.max(0, product.quantity - product.quantitySold)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Đã bán:</span>
                        <span className="font-semibold text-slate-700">{product.quantitySold}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Lượt tra cứu/Vé:</span>
                        <span className="font-semibold text-amber-600 flex items-center gap-1 font-mono">
                          <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          {product.numberofTickets} lượt
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handlePurchase(product.productId)}
                      disabled={isOutOfStock}
                      className="w-full py-3.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-900 text-white font-extrabold rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase tracking-widest shadow-md hover:shadow-lg disabled:hover:bg-slate-900 disabled:hover:text-white cursor-pointer"
                    >
                      {isOutOfStock ? 'Hết Hàng' : 'Mua Ngay'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
