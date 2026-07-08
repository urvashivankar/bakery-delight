import { Hero } from "@/components/Hero";
import { CategoryCards } from "@/components/CategoryCards";
import { SignatureCollection } from "@/components/SignatureCollection";
import { PromoBanner } from "@/components/PromoBanner";
import { MenuGrid } from "@/components/MenuGrid";
import { AboutBakery } from "@/components/AboutBakery";
import { ReviewsGallery } from "@/components/ReviewsGallery";
import { InstagramFeed } from "@/components/InstagramFeed";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <CategoryCards />
      <SignatureCollection />
      <PromoBanner />
      <AboutBakery />
      <InstagramFeed />
      <ReviewsGallery />
    </div>
  );
}
