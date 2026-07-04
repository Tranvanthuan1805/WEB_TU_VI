'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, ChevronLeft, User } from 'lucide-react';

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError("");
    fetch(`/api/posts/slug/${slug}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Không tìm thấy bài viết này.");
        }
        return res.json();
      })
      .then(data => {
        setPost(data);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center text-slate-500 font-medium">
        Đang tải bài viết...
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <p className="text-red-500 font-bold">{error || "Bài viết không khả dụng."}</p>
        <Link href="/bai-viet" className="inline-flex items-center gap-1.5 text-sm text-[#C5A059] font-bold hover:underline">
          <ChevronLeft className="w-4 h-4" /> Quay lại danh sách bài viết
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
      
      {/* Back Button */}
      <Link 
        href="/bai-viet" 
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#C5A059] transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Quay lại blog
      </Link>

      {/* Header Info */}
      <header className="space-y-4 border-b border-[#E5DDD0]/50 pb-6">
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-800 leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.dateUpdated).toLocaleDateString('vi-VN')}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            Tác giả: Chuyên gia Tử Vi
          </span>
        </div>
      </header>

      {/* Description / Summary */}
      {post.description && (
        <div 
          className="text-base text-slate-500 font-serif italic border-l-4 border-[#C5A059] pl-6 py-1 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.description }}
        />
      )}

      {/* Rich Text Body */}
      <div 
        className="prose prose-slate max-w-none prose-sm sm:prose-base prose-headings:font-serif prose-headings:text-slate-800 prose-p:leading-relaxed prose-p:font-light prose-a:text-[#C5A059] hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
    </article>
  );
}
