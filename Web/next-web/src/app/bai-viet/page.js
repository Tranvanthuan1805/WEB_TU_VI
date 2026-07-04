'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Calendar, ChevronRight } from 'lucide-react';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const pageSize = 9;

  useEffect(() => {
    loadPosts();
  }, [page, search]);

  const loadPosts = () => {
    setLoading(true);
    fetch(`/api/posts?search=${search}&page=${page}&pageSize=${pageSize}`)
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts || []);
        setTotalCount(data.totalCount || 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    loadPosts();
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-[10px] tracking-widest text-[#C5A059] font-bold uppercase block">Blog & Cẩm Nang Kinh Nghiệm</span>
        <h1 className="font-serif text-3xl md:text-4xl italic font-semibold text-[#C5A059]">Kiến Thức Bản Mệnh</h1>
        <p className="text-slate-500 text-sm font-light leading-relaxed">
          Nơi tổng hợp các bài viết nghiên cứu sâu sắc về học thuyết ngũ hành, âm dương, luận giải lá số tử vi và chiêm tinh học ứng dụng.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto relative flex gap-2">
        <input
          type="text"
          placeholder="Tìm kiếm bài viết..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-[#E5DDD0]/70 rounded-2xl text-sm focus:border-[#C5A059] focus:outline-none shadow-sm transition-all"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
      </form>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <article key={post.postId} className="bg-white border border-[#E5DDD0]/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group h-full">
            <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(post.dateUpdated).toLocaleDateString('vi-VN')}</span>
                </div>
                <Link href={`/bai-viet/${post.slug}`}>
                  <h3 className="font-serif text-lg font-bold text-slate-800 group-hover:text-[#C5A059] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                <div 
                  className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-light"
                  dangerouslySetInnerHTML={{ __html: post.description }}
                />
              </div>
              
              <div className="pt-4 border-t border-[#E5DDD0]/30 mt-4">
                <Link 
                  href={`/bai-viet/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#C5A059] hover:underline uppercase tracking-wider"
                >
                  Đọc tiếp <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Empty State */}
      {posts.length === 0 && !loading && (
        <div className="text-center py-20 text-slate-400 italic bg-white border border-[#E5DDD0]/50 rounded-3xl max-w-xl mx-auto shadow-sm">
          Không tìm thấy bài viết nào.
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12 text-slate-400 font-medium">
          Đang tải bài viết...
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-6">
          <button
            type="button"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border border-[#E5DDD0]/70 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-500 hover:border-slate-400 disabled:opacity-50 cursor-pointer"
          >
            Trước
          </button>
          <span className="text-xs font-bold text-slate-500 px-3">
            Trang {page} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border border-[#E5DDD0]/70 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-500 hover:border-slate-400 disabled:opacity-50 cursor-pointer"
          >
            Sau
          </button>
        </div>
      )}

    </div>
  );
}
