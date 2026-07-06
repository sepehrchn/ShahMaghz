import { Hero } from "@/components/home/Hero";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { Bestsellers } from "@/components/home/Bestsellers";
import { BrandStory } from "@/components/home/BrandStory";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryShowcase />
      <Bestsellers />
      <BrandStory />
      <Testimonials />
      <CTASection />
    </>
  );
}
