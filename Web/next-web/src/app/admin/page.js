'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  BarChart, Settings, FileText, Tag, Ticket, ShoppingCart, Mail, LogOut, Check, Trash2, Edit, Plus, ArrowLeft, ShieldCheck, RefreshCw
} from 'lucide-react';

export default function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, config, posts, products, tickets, orders, contacts
  const [stats, setStats] = useState(null);

  // States for CRUDs
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Check authentication
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.isAuthenticated && data.roles?.includes('Admin')) {
          setCurrentUser(data);
          setAuthorized(true);
          loadDashboardStats();
        } else {
          router.push('/login');
        }
      })
      .catch(() => router.push('/login'));
  }, [router]);

  useEffect(() => {
    if (!authorized) return;
    if (activeTab === "dashboard") {
      loadDashboardStats();
    } else {
      loadTabItems(activeTab);
    }
    setEditingItem(null);
    setIsAdding(false);
    setFormData({});
  }, [activeTab, authorized]);

  const loadDashboardStats = () => {
    setLoading(true);
    fetch('/api/admin/dashboard')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const loadTabItems = (tab) => {
    setLoading(true);
    fetch(`/api/admin/${tab}`)
      .then(res => res.json())
      .then(data => setItems(data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleLogout = () => {
    fetch('/api/auth/logout', { method: 'POST' })
      .then(() => router.push('/login'))
      .catch(() => router.push('/login'));
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsAdding(false);
    
    // Set form data fields
    if (activeTab === "config") {
      setFormData(item);
    } else {
      setFormData({ ...item });
    }
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingItem(null);
    setFormData({});
  };

  const handleCancel = () => {
    setEditingItem(null);
    setIsAdding(false);
    setFormData({});
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const isEdit = !!editingItem;
    const url = isEdit 
      ? `/api/admin/${activeTab}/${activeTab === "posts" ? editingItem.postId : activeTab === "products" ? editingItem.productId : activeTab === "tickets" ? editingItem.ticketId : editingItem.orderId}`
      : `/api/admin/${activeTab}`;
    const method = isEdit ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => { throw new Error(data.error || "Gặp lỗi khi lưu dữ liệu."); });
        }
        return res.json();
      })
      .then(() => {
        loadTabItems(activeTab);
        setEditingItem(null);
        setIsAdding(false);
        setFormData({});
      })
      .catch(err => {
        alert(err.message);
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa mục này?")) return;
    setLoading(true);

    fetch(`/api/admin/${activeTab}/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error("Gặp lỗi khi xóa.");
        return res.json();
      })
      .then(() => {
        loadTabItems(activeTab);
      })
      .catch(err => alert(err.message))
      .finally(() => setLoading(false));
  };

  const handleResolveContact = (id) => {
    fetch(`/api/admin/contacts/${id}/resolve`, { method: 'PUT' })
      .then(res => {
        if (!res.ok) throw new Error("Không thể cập nhật.");
        return res.json();
      })
      .then(() => {
        loadTabItems(activeTab);
      })
      .catch(err => alert(err.message));
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch('/api/admin/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert(data.message);
        }
      })
      .catch(() => alert("Lỗi lưu cấu hình."))
      .finally(() => setLoading(false));
  };

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800 font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0">
        {/* Brand header */}
        <div className="h-20 bg-slate-950 flex items-center px-6 gap-2">
          <ShieldCheck className="w-6 h-6 text-[#C5A059]" />
          <span className="font-serif italic text-[#C5A059] text-xl font-bold tracking-wider">Tử Vi Admin</span>
        </div>

        {/* User Info card */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/40 text-xs flex justify-between items-center">
          <div>
            <span className="text-slate-500 block">Tài khoản</span>
            <span className="font-semibold text-slate-300">{currentUser?.email}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Đăng Xuất"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-grow p-4 space-y-1">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === "dashboard" ? 'bg-[#C5A059] text-white shadow-md' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart className="w-4 h-4" />
            Tổng Quan
          </button>
          
          <button
            onClick={() => setActiveTab("config")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === "config" ? 'bg-[#C5A059] text-white shadow-md' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            Cấu Hình Web
          </button>

          <button
            onClick={() => setActiveTab("posts")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === "posts" ? 'bg-[#C5A059] text-white shadow-md' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            Bài Viết Blog
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === "products" ? 'bg-[#C5A059] text-white shadow-md' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tag className="w-4 h-4" />
            Gói Dịch Vụ
          </button>

          <button
            onClick={() => setActiveTab("tickets")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === "tickets" ? 'bg-[#C5A059] text-white shadow-md' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Ticket className="w-4 h-4" />
            Mã Vé VIP
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === "orders" ? 'bg-[#C5A059] text-white shadow-md' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            Đơn Hàng
          </button>

          <button
            onClick={() => setActiveTab("contacts")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === "contacts" ? 'bg-[#C5A059] text-white shadow-md' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            Tin Nhắn Liên Hệ
          </button>
        </nav>

        {/* Back to Web */}
        <div className="p-4 border-t border-slate-800">
          <Link 
            href="/" 
            className="flex items-center justify-center gap-2 py-2 px-4 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-xl uppercase tracking-wider text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Về Trang Chủ
          </Link>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-grow p-6 md:p-10 space-y-8 overflow-y-auto max-h-screen">
        
        {/* Loading Indicator */}
        {loading && (
          <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-full flex items-center gap-2 shadow-lg">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Đang tải dữ liệu...</span>
          </div>
        )}

        {/* Tab 1: Dashboard Overview */}
        {activeTab === "dashboard" && stats && (
          <div className="space-y-8">
            <h2 className="text-2xl font-serif font-bold text-slate-800 italic">Báo Cáo Tổng Quan</h2>
            
            {/* Stats Metrics Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              
              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Doanh thu (Paid)</span>
                <span className="text-xl font-bold text-[#C5A059]">{stats.totalRevenue?.toLocaleString('vi-VN')}₫</span>
              </div>
              
              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Tổng đơn hàng</span>
                <span className="text-xl font-bold text-slate-800">{stats.totalOrders}</span>
              </div>

              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Số mã vé VIP</span>
                <span className="text-xl font-bold text-slate-800">{stats.totalTickets}</span>
              </div>

              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Bài viết blog</span>
                <span className="text-xl font-bold text-slate-800">{stats.totalPosts}</span>
              </div>

              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Tin nhắn hỗ trợ</span>
                <span className="text-xl font-bold text-slate-800">{stats.totalContacts}</span>
              </div>

            </div>

            {/* Recent Orders */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-base text-slate-800">Đơn hàng mới gần đây</h3>
              <div className="overflow-x-auto rounded-xl border border-slate-100">
                <table className="min-w-full divide-y divide-slate-100 text-xs text-slate-600 font-light">
                  <thead className="bg-slate-50 font-bold uppercase text-slate-500">
                    <tr>
                      <th className="px-4 py-3 text-left">Đơn hàng</th>
                      <th className="px-4 py-3 text-left">Ngày tạo</th>
                      <th className="px-4 py-3 text-left">Sản phẩm</th>
                      <th className="px-4 py-3 text-left">Tổng tiền</th>
                      <th className="px-4 py-3 text-left">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100/55">
                    {stats.recentOrders?.map(order => (
                      <tr key={order.orderId} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-semibold text-slate-800">{order.txnRef}</td>
                        <td className="px-4 py-3">{new Date(order.createdAt).toLocaleString('vi-VN')}</td>
                        <td className="px-4 py-3 font-medium text-slate-700">{order.product?.name}</td>
                        <td className="px-4 py-3 font-bold text-[#C5A059]">{order.totalAmount?.toLocaleString('vi-VN')}₫</td>
                        <td className="px-4 py-3 font-bold text-xs">
                          <span className={`px-2 py-0.5 rounded-md ${
                            order.status === 1 ? 'bg-green-50 text-green-600' :
                            order.status === 0 ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                          }`}>
                            {order.status === 1 ? "Paid" : order.status === 0 ? "Pending" : "Failed/Expired"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Config Management */}
        {activeTab === "config" && (
          <div className="space-y-6 max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm">
            <h2 className="text-xl font-serif font-bold text-[#C5A059] italic mb-4">Cấu Hình Website</h2>
            
            {formData.dailyFreeLimit !== undefined ? (
              <form onSubmit={handleSaveConfig} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Lượt xem miễn phí mỗi ngày</label>
                  <input
                    type="number"
                    name="dailyFreeLimit"
                    value={formData.dailyFreeLimit}
                    onChange={handleFormChange}
                    className="ivory-input"
                  />
                  <span className="text-[10px] text-slate-400 font-light block">Nhập -1 để cho phép lập lá số không giới hạn</span>
                </div>

                <div className="border-t border-slate-100 pt-5 space-y-4">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Tư vấn Zalo</h3>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-600 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        name="zaloEnabled"
                        checked={formData.zaloEnabled}
                        onChange={handleFormChange}
                      />
                      Bật liên hệ Zalo
                    </label>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Đường dẫn liên hệ Zalo (URL)</label>
                    <input
                      type="text"
                      name="zaloUrl"
                      value={formData.zaloUrl || ""}
                      onChange={handleFormChange}
                      placeholder="https://zalo.me/..."
                      className="ivory-input"
                    />
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-5 space-y-4">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Tư vấn Facebook</h3>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-600 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        name="facebookEnabled"
                        checked={formData.facebookEnabled}
                        onChange={handleFormChange}
                      />
                      Bật liên hệ Facebook
                    </label>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Đường dẫn Messenger/Facebook</label>
                    <input
                      type="text"
                      name="facebookUrl"
                      value={formData.facebookUrl || ""}
                      onChange={handleFormChange}
                      placeholder="https://m.me/..."
                      className="ivory-input"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" className="btn-gold px-6 py-2.5 text-xs font-bold">Lưu cấu hình</button>
                </div>
              </form>
            ) : (
              <button 
                onClick={() => fetch('/api/admin/config').then(res => res.json()).then(data => setFormData(data))}
                className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold uppercase cursor-pointer"
              >
                Nhấp tải cấu hình
              </button>
            )}
          </div>
        )}

        {/* Tab 3: Post Management CRUD */}
        {activeTab === "posts" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-serif font-bold text-[#C5A059] italic">Quản Lý Bài Viết Blog</h2>
              {!isAdding && !editingItem && (
                <button
                  onClick={handleAddNew}
                  className="px-4 py-2 bg-[#C5A059] hover:bg-[#8A6D3B] text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Viết Bài Mới
                </button>
              )}
            </div>

            {/* Form Editor */}
            {(isAdding || editingItem) && (
              <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-5">
                <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider">
                  {isAdding ? "Soạn Thảo Bài Viết Mới" : "Sửa Bài Viết"}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Tiêu Đề Bài Viết</label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title || ""}
                      onChange={handleFormChange}
                      placeholder="Nhập tiêu đề hấp dẫn"
                      className="ivory-input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Slug đường dẫn</label>
                    <input
                      type="text"
                      name="slug"
                      required
                      value={formData.slug || ""}
                      onChange={handleFormChange}
                      placeholder="tieu-de-bai-viet-slug"
                      className="ivory-input"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Mô tả ngắn</label>
                  <textarea
                    rows="3"
                    name="description"
                    value={formData.description || ""}
                    onChange={handleFormChange}
                    placeholder="Mô tả tóm tắt nội dung bài viết..."
                    className="ivory-input resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Nội dung chi tiết (HTML)</label>
                  <textarea
                    rows="10"
                    name="content"
                    required
                    value={formData.content || ""}
                    onChange={handleFormChange}
                    placeholder="Soạn thảo nội dung bài viết bằng mã HTML hoặc văn bản..."
                    className="ivory-input resize-none font-mono text-xs"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="published"
                      checked={formData.published || false}
                      onChange={handleFormChange}
                    />
                    Công khai bài viết này
                  </label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="submit" className="btn-gold px-6 py-2 text-xs font-bold">Lưu lại</button>
                  <button 
                    type="button" 
                    onClick={handleCancel}
                    className="px-6 py-2 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    Hủy bỏ
                  </button>
                </div>
              </form>
            )}

            {/* List Table */}
            {!isAdding && !editingItem && (
              <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
                <table className="min-w-full divide-y divide-slate-100 text-xs text-slate-600 font-light">
                  <thead className="bg-slate-50 font-bold uppercase text-slate-500">
                    <tr>
                      <th className="px-4 py-3 text-left">Tiêu Đề</th>
                      <th className="px-4 py-3 text-left">Slug</th>
                      <th className="px-4 py-3 text-left">Ngày Cập Nhật</th>
                      <th className="px-4 py-3 text-left">Trạng Thái</th>
                      <th className="px-4 py-3 text-center">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100/55">
                    {items.map(post => (
                      <tr key={post.postId} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-semibold text-slate-800 max-w-xs truncate">{post.title}</td>
                        <td className="px-4 py-3 font-mono text-slate-400">{post.slug}</td>
                        <td className="px-4 py-3">{new Date(post.dateUpdated).toLocaleDateString('vi-VN')}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-md ${post.published ? 'bg-green-50 text-green-600 font-bold' : 'bg-slate-100 text-slate-400'}`}>
                            {post.published ? "Công Khai" : "Bản Nháp"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center space-x-2">
                          <button 
                            onClick={() => handleEdit(post)}
                            className="p-1 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-800 cursor-pointer inline-block"
                            title="Sửa"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(post.postId)}
                            className="p-1 hover:bg-slate-100 rounded text-red-500 hover:text-red-700 cursor-pointer inline-block"
                            title="Xóa"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Product Management CRUD */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-serif font-bold text-[#C5A059] italic">Quản Lý Gói Dịch Vụ Luận Giải</h2>
              {!isAdding && !editingItem && (
                <button
                  onClick={handleAddNew}
                  className="px-4 py-2 bg-[#C5A059] hover:bg-[#8A6D3B] text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Thêm Gói Mới
                </button>
              )}
            </div>

            {/* Form Product */}
            {(isAdding || editingItem) && (
              <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-5">
                <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider">
                  {isAdding ? "Tạo Gói Dịch Vụ Mới" : "Sửa Gói Dịch Vụ"}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Tên Gói</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name || ""}
                      onChange={handleFormChange}
                      className="ivory-input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Đơn Giá (VND)</label>
                    <input
                      type="number"
                      name="price"
                      required
                      value={formData.price || 0}
                      onChange={handleFormChange}
                      className="ivory-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Số lượng vé nạp vào</label>
                    <input
                      type="number"
                      name="quantity"
                      required
                      value={formData.quantity || 1}
                      onChange={handleFormChange}
                      className="ivory-input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Thời hạn sử dụng (ngày)</label>
                    <input
                      type="number"
                      name="durationDays"
                      required
                      value={formData.durationDays || 0}
                      onChange={handleFormChange}
                      className="ivory-input"
                    />
                    <span className="text-[10px] text-slate-400 block">Nhập 0 để dùng vé 1 lần không giới hạn hạn sử dụng</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Mô Tả Gói</label>
                  <textarea
                    rows="3"
                    name="description"
                    value={formData.description || ""}
                    onChange={handleFormChange}
                    className="ivory-input resize-none"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="isAvailable"
                      checked={formData.isAvailable || false}
                      onChange={handleFormChange}
                    />
                    Cho phép mua gói này công khai
                  </label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="submit" className="btn-gold px-6 py-2 text-xs font-bold">Lưu lại</button>
                  <button type="button" onClick={handleCancel} className="px-6 py-2 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer">Hủy bỏ</button>
                </div>
              </form>
            )}

            {/* List Table */}
            {!isAdding && !editingItem && (
              <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
                <table className="min-w-full divide-y divide-slate-100 text-xs text-slate-600 font-light">
                  <thead className="bg-slate-50 font-bold uppercase text-slate-500">
                    <tr>
                      <th className="px-4 py-3 text-left">Tên Gói</th>
                      <th className="px-4 py-3 text-left">Đơn Giá</th>
                      <th className="px-4 py-3 text-left">Vé VIP</th>
                      <th className="px-4 py-3 text-left">Thời Hạn</th>
                      <th className="px-4 py-3 text-left">Trạng Thái</th>
                      <th className="px-4 py-3 text-center">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100/55">
                    {items.map(prod => (
                      <tr key={prod.productId} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-semibold text-slate-800">{prod.name}</td>
                        <td className="px-4 py-3 font-bold text-[#C5A059]">{prod.price?.toLocaleString('vi-VN')}₫</td>
                        <td className="px-4 py-3 font-mono text-slate-700">{prod.quantity} vé</td>
                        <td className="px-4 py-3">{prod.durationDays ? `${prod.durationDays} ngày` : 'Mặc định'}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-md ${prod.isAvailable ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                            {prod.isAvailable ? "Công Khai" : "Ẩn"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center space-x-2">
                          <button onClick={() => handleEdit(prod)} className="p-1 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-800 cursor-pointer inline-block" title="Sửa"><Edit className="w-3.5 h-3.5" /></button>
                          <button onClick={() => handleDelete(prod.productId)} className="p-1 hover:bg-slate-100 rounded text-red-500 hover:text-red-700 cursor-pointer inline-block" title="Xóa"><Trash2 className="w-3.5 h-3.5" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Ticket Code Management CRUD */}
        {activeTab === "tickets" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-serif font-bold text-[#C5A059] italic">Quản Lý Vé VIP Luận Giải</h2>
              {!isAdding && !editingItem && (
                <button
                  onClick={handleAddNew}
                  className="px-4 py-2 bg-[#C5A059] hover:bg-[#8A6D3B] text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Thêm Vé Thủ Công
                </button>
              )}
            </div>

            {/* Form Ticket */}
            {(isAdding || editingItem) && (
              <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-5">
                <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider">
                  {isAdding ? "Khởi Tạo Vé Mới" : "Sửa Vé"}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Mã Vé (Code)</label>
                    <input
                      type="text"
                      name="code"
                      required
                      value={formData.code || ""}
                      onChange={handleFormChange}
                      placeholder="Mã vé viết liền, VD: VIP999"
                      className="ivory-input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Giới hạn lượt dùng</label>
                    <input
                      type="number"
                      name="quantityLimit"
                      required
                      value={formData.quantityLimit || 1}
                      onChange={handleFormChange}
                      className="ivory-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Ngày Hết Hạn</label>
                    <input
                      type="datetime-local"
                      name="dateExpired"
                      required
                      value={formData.dateExpired ? formData.dateExpired.substring(0, 16) : ""}
                      onChange={handleFormChange}
                      className="ivory-input"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Ghi Chú</label>
                  <textarea
                    rows="2"
                    name="description"
                    value={formData.description || ""}
                    onChange={handleFormChange}
                    className="ivory-input resize-none"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="isAvailable"
                      checked={formData.isAvailable || false}
                      onChange={handleFormChange}
                    />
                    Kích hoạt hiệu lực vé
                  </label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="submit" className="btn-gold px-6 py-2 text-xs font-bold">Lưu lại</button>
                  <button type="button" onClick={handleCancel} className="px-6 py-2 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer">Hủy bỏ</button>
                </div>
              </form>
            )}

            {/* List Table */}
            {!isAdding && !editingItem && (
              <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
                <table className="min-w-full divide-y divide-slate-100 text-xs text-slate-600 font-light">
                  <thead className="bg-slate-50 font-bold uppercase text-slate-500">
                    <tr>
                      <th className="px-4 py-3 text-left">Mã Vé</th>
                      <th className="px-4 py-3 text-left">Lượt dùng / Giới hạn</th>
                      <th className="px-4 py-3 text-left">Hết Hạn</th>
                      <th className="px-4 py-3 text-left">Trạng Thái</th>
                      <th className="px-4 py-3 text-center">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100/55">
                    {items.map(t => (
                      <tr key={t.ticketId} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-mono font-bold text-slate-800 text-sm">{t.code}</td>
                        <td className="px-4 py-3">{t.quantityUsed} / {t.quantityLimit} lượt</td>
                        <td className="px-4 py-3">{new Date(t.dateExpired).toLocaleDateString('vi-VN')}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-md ${t.isAvailable ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                            {t.isAvailable ? "Hiệu Lực" : "Khóa"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center space-x-2">
                          <button onClick={() => handleEdit(t)} className="p-1 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-800 cursor-pointer inline-block" title="Sửa"><Edit className="w-3.5 h-3.5" /></button>
                          <button onClick={() => handleDelete(t.ticketId)} className="p-1 hover:bg-slate-100 rounded text-red-500 hover:text-red-700 cursor-pointer inline-block" title="Xóa"><Trash2 className="w-3.5 h-3.5" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 6: Orders Management */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-[#C5A059] italic">Danh Sách Hóa Đơn Mua Vé</h2>
            
            {editingItem && (
              <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-5 max-w-md">
                <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider">Cập Nhật Trạng Thái Đơn</h3>
                
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Mã Đơn</label>
                  <input type="text" disabled value={formData.txnRef || ""} className="ivory-input opacity-70" />
                </div>
                
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Chọn Trạng Thái</label>
                  <select
                    name="status"
                    value={formData.status ?? 0}
                    onChange={e => setFormData(prev => ({ ...prev, status: parseInt(e.target.value) }))}
                    className="ivory-input"
                  >
                    <option value={0}>Chờ thanh toán (PendingPayment)</option>
                    <option value={1}>Đã thanh toán (Paid)</option>
                    <option value={2}>Thanh toán thất bại (PaymentFailed)</option>
                    <option value={3}>Đã hết hạn (Expired)</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <button type="submit" className="btn-gold px-6 py-2 text-xs font-bold">Cập Nhật</button>
                  <button type="button" onClick={handleCancel} className="px-6 py-2 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer">Hủy bỏ</button>
                </div>
              </form>
            )}

            {!editingItem && (
              <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
                <table className="min-w-full divide-y divide-slate-100 text-xs text-slate-600 font-light">
                  <thead className="bg-slate-50 font-bold uppercase text-slate-500">
                    <tr>
                      <th className="px-4 py-3 text-left">Đơn Hàng</th>
                      <th className="px-4 py-3 text-left">Gói Dịch Vụ</th>
                      <th className="px-4 py-3 text-left">Tổng Tiền</th>
                      <th className="px-4 py-3 text-left">Ngày Tạo</th>
                      <th className="px-4 py-3 text-left">Trạng Thái</th>
                      <th className="px-4 py-3 text-center">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100/55">
                    {items.map(order => (
                      <tr key={order.orderId} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-semibold text-slate-800">{order.txnRef}</td>
                        <td className="px-4 py-3">{order.product?.name}</td>
                        <td className="px-4 py-3 font-bold text-[#C5A059]">{order.totalAmount?.toLocaleString('vi-VN')}₫</td>
                        <td className="px-4 py-3">{new Date(order.createdAt).toLocaleString('vi-VN')}</td>
                        <td className="px-4 py-3 font-bold">
                          <span className={`px-2 py-0.5 rounded-md ${
                            order.status === 1 ? 'bg-green-50 text-green-600' :
                            order.status === 0 ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                          }`}>
                            {order.status === 1 ? "Paid" : order.status === 0 ? "Pending" : "Failed/Expired"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center space-x-2">
                          <button onClick={() => handleEdit(order)} className="p-1 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-800 cursor-pointer inline-block" title="Sửa"><Edit className="w-3.5 h-3.5" /></button>
                          <button onClick={() => handleDelete(order.orderId)} className="p-1 hover:bg-slate-100 rounded text-red-500 hover:text-red-700 cursor-pointer inline-block" title="Xóa"><Trash2 className="w-3.5 h-3.5" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 7: Contact Messages */}
        {activeTab === "contacts" && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-[#C5A059] italic">Tin Nhắn Hỗ Trợ Độc Giả</h2>
            
            <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
              <table className="min-w-full divide-y divide-slate-100 text-xs text-slate-600 font-light">
                <thead className="bg-slate-50 font-bold uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3 text-left">Khách Hàng</th>
                    <th className="px-4 py-3 text-left">Liên Hệ</th>
                    <th className="px-4 py-3 text-left">Nội Dung</th>
                    <th className="px-4 py-3 text-left">Ngày Gửi</th>
                    <th className="px-4 py-3 text-left">Trạng Thái</th>
                    <th className="px-4 py-3 text-center">Hành Động</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100/55">
                  {items.map(contact => (
                    <tr key={contact.contactId} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-semibold text-slate-800">{contact.fullName}</td>
                      <td className="px-4 py-3 space-y-0.5">
                        <p>{contact.email}</p>
                        <p className="text-slate-400">{contact.phone}</p>
                      </td>
                      <td className="px-4 py-3 max-w-sm font-light leading-relaxed">{contact.message}</td>
                      <td className="px-4 py-3">{new Date(contact.createdAt).toLocaleDateString('vi-VN')}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-md ${contact.isResolved ? 'bg-green-50 text-green-600 font-bold' : 'bg-amber-50 text-amber-600'}`}>
                          {contact.isResolved ? "Đã Xử Lý" : "Mới"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center space-x-2">
                        {!contact.isResolved && (
                          <button 
                            onClick={() => handleResolveContact(contact.contactId)} 
                            className="p-1.5 hover:bg-slate-100 rounded text-[#C5A059] cursor-pointer inline-block" 
                            title="Đánh dấu đã xử lý"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button onClick={() => handleDelete(contact.contactId)} className="p-1 hover:bg-slate-100 rounded text-red-500 hover:text-red-700 cursor-pointer inline-block" title="Xóa"><Trash2 className="w-3.5 h-3.5" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
