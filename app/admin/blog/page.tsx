"use client";

import { useState } from "react";
import { Plus, FileText, Pencil, Trash2, Eye, Calendar } from "lucide-react";
import { formatPersianDate, toPersianDigits } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  isPublished: boolean;
  date: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "bp-1",
    slug: "pistachio-benefits",
    title: "خواص بی‌نظیر پسته: از قلب تا پوست",
    excerpt: "پسته، ملکه آجیل‌های ایرانی، سرشار از آنتی‌اکسیدان و چربی‌های سالم است.",
    tags: ["تغذیه", "پسته"],
    isPublished: true,
    date: "2024-12-15",
  },
  {
    id: "bp-2",
    slug: "dried-fruit-storage",
    title: "راهنمای کامل نگه‌داری خشکبار در خانه",
    excerpt: "چگونه انجیر خشک، زردآلو و کشمش را تازه و خوش‌طعم نگه‌داریم؟",
    tags: ["نگه‌داری", "خشکبار"],
    isPublished: true,
    date: "2024-12-10",
  },
  {
    id: "bp-3",
    slug: "saffron-cooking",
    title: "زعفران در آشپزی ایرانی: از زرشک‌پلو به شله‌زرد",
    excerpt: "زعفران نگین چگونه رنگ و عطر می‌دهد؟ مقدار درست و روش دم‌کردن.",
    tags: ["آشپزی", "زعفران"],
    isPublished: true,
    date: "2024-12-05",
  },
  {
    id: "bp-4",
    slug: "yalda-gift-guide",
    title: "هدیه شب یلدا: انتخاب هدیه‌ای فراموش‌نشدنی",
    excerpt: "چگونه با هدیه‌ای لوکس از آجیل و خشکبار، شب یلدا را خاص کنیم؟",
    tags: ["هدیه", "یلدا"],
    isPublished: false,
    date: "2024-12-01",
  },
];

export default function AdminBlogPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-ivory-50">مجله شاه‌مغز</h1>
          <p className="text-sm text-ivory-400 mt-1">{toPersianDigits(blogPosts.length)} مقاله</p>
        </div>
        <Button className="gap-2">
          <Plus size={18} />
          مقاله جدید
        </Button>
      </div>

      {/* Blog posts list */}
      <div className="flex flex-col gap-3">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-5 flex items-start gap-4 hover:border-gold-400/20 transition-all"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-forest-700/60 border border-forest-500/30 flex items-center justify-center shrink-0">
              <FileText size={18} className="text-ivory-400/50" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-medium text-ivory-100 truncate">{post.title}</h3>
                <span className={`text-2xs px-2 py-0.5 rounded-full ${post.isPublished ? "text-green-400 bg-green-400/10" : "text-ivory-400 bg-forest-600/30"}`}>
                  {post.isPublished ? "منتشر شده" : "پیش‌نویس"}
                </span>
              </div>
              <p className="text-xs text-ivory-400 line-clamp-1 mb-2">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-ivory-400/60">
                <span className="flex items-center gap-1">
                  <Calendar size={10} />
                  {formatPersianDate(post.date)}
                </span>
                <span>{post.tags.join("، ")}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
              <a
                href={`/blog/${post.slug}`}
                target="_blank"
                className="p-1.5 rounded-lg text-ivory-400 hover:text-gold-200 hover:bg-forest-600/50 transition-all"
                title="مشاهده"
              >
                <Eye size={14} />
              </a>
              <button className="p-1.5 rounded-lg text-ivory-400 hover:text-gold-200 hover:bg-forest-600/50 transition-all" title="ویرایش">
                <Pencil size={14} />
              </button>
              <button
                onClick={() => setDeleteId(post.id)}
                className="p-1.5 rounded-lg text-ivory-400 hover:text-burgundy-700 hover:bg-burgundy-700/10 transition-all"
                title="حذف"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="حذف مقاله">
        <p className="text-sm text-ivory-300 mb-5">آیا از حذف این مقاله اطمینان دارید؟</p>
        <div className="flex gap-3">
          <Button variant="danger" onClick={() => setDeleteId(null)} className="gap-2">
            <Trash2 size={16} /> بله، حذف کن
          </Button>
          <Button variant="ghost" onClick={() => setDeleteId(null)}>انصراف</Button>
        </div>
      </Modal>
    </div>
  );
}


