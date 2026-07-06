"use client";

import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  href?: string;
  trend?: string;
  color?: string;
}

export function StatCard({ label, value, icon: Icon, href, trend, color = "text-gold-400" }: StatCardProps) {
  const content = (
    <div
      className={cn(
        "bg-forest-800/50 border border-forest-600/30 rounded-2xl p-5 transition-all",
        href && "hover:border-gold-400/20 hover:shadow-lg hover:shadow-forest-950/30"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn("w-10 h-10 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center")}>
          <Icon size={18} className={color} />
        </div>
        {trend && (
          <span className="text-xs text-green-400">{trend}</span>
        )}
      </div>
      <p className="text-2xl font-display font-bold text-ivory-50">{value}</p>
      <p className="text-xs text-ivory-400 mt-1">{label}</p>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}
