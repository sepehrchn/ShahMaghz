import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { formatPersianDate } from "@/lib/format";
import { HandDrawnDivider } from "@/components/ui/BrandMotifs";
import { prisma } from "@/lib/prisma";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await prisma.blog_posts.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await prisma.blog_posts.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-forest-950 min-h-screen text-ivory-50">
      <div className="bg-forest-900 bg-kraft-texture py-12 lg:py-16">
        <div className="container-brand">
          <Link
            href="/blog"
            className="text-gold-400 hover:text-gold-200 flex items-center gap-2 mb-6 transition-colors"
          >
            <ArrowRight size={18} />
            بازگشت به مجله
          </Link>
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-ivory-50 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-ivory-400 mb-6">
            <Calendar size={16} className="text-gold-400" />
            <span>{formatPersianDate(post.publishedAt?.toISOString() || post.createdAt.toISOString())}</span>
            {(post.tags || []).map((tag: string) => (
              <span
                key={tag}
                className="text-xs text-gold-200/70 bg-gold-400/10 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              width={1200}
              height={675}
              className="w-full h-auto rounded-lg mb-8 shadow-lg"
            />
          )}
        </div>
      </div>

      <div className="container-brand py-12 lg:py-16 prose prose-invert max-w-none prose-p:text-ivory-200 prose-li:text-ivory-200 prose-strong:text-ivory-50 prose-headings:text-ivory-50 prose-a:text-gold-400 hover:prose-a:text-gold-200">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      <div className="container-brand">
        <HandDrawnDivider />
      </div>
    </div>
  );
}