
import React from "react";
import ProductCard, { ProductProps } from "./ProductCard";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface ProductSectionProps {
  title: string;
  subtitle: string;
  products: ProductProps[];
  showMoreLink?: string;
  onProductClick: (product: ProductProps) => void;
}

const ProductSection = ({
  title,
  subtitle,
  products,
  showMoreLink,
  onProductClick,
}: ProductSectionProps) => {
  // Carousel state
  const [idx, setIdx] = React.useState(0);
  const ITEMS_VISIBLE = 3;

  // Loop around for carousel
  const total = products.length;
  function prev() {
    setIdx(i => (i - 1 + total) % total);
  }
  function next() {
    setIdx(i => (i + 1) % total);
  }

  // Carousel display logic
  function getVisible(idx: number) {
    const res = [];
    for (let i = 0; i < ITEMS_VISIBLE; i++) {
      res.push(products[(idx + i) % total]);
    }
    return res;
  }

  // Animate bounce on interaction
  const [bounceDir, setBounceDir] = React.useState<"left" | "right" | null>(null);
  React.useEffect(() => {
    if (!bounceDir) return;
    const timer = setTimeout(() => setBounceDir(null), 350);
    return () => clearTimeout(timer);
  }, [bounceDir]);

  return (
    <section className="py-12 px-4" id={title.toLowerCase().includes("drink") ? "drinks-section" : title.toLowerCase().includes("food") || title.toLowerCase().includes("treat") ? "food-section" : undefined}>
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-display text-purple-700 mb-2">{title}</h2>
          <p className="text-purple-600 opacity-80">{subtitle}</p>
        </div>

        <div className="relative flex justify-center items-center gap-4">
          <button
            aria-label="Prev"
            onClick={() => { prev(); setBounceDir("left"); }}
            className={`absolute left-0 z-10 bg-kawaii-cream p-2 rounded-full border-2 border-kawaii-purple shadow hover:bg-kawaii-lilac transition-all text-2xl font-bold`}
            style={{ top: "40%" }}
          >
            ◀️
          </button>
          <div className={`flex gap-6 w-full max-w-3xl justify-center transition-transform duration-300 ${bounceDir === "left" ? "animate-slide-in-left" : bounceDir === "right" ? "animate-slide-in-right" : ""}`}>
            {getVisible(idx).map(product =>
              <div className="w-72 shrink-0" key={product.id}>
                <ProductCard product={product} onClick={() => onProductClick(product)} />
              </div>
            )}
          </div>
          <button
            aria-label="Next"
            onClick={() => { next(); setBounceDir("right"); }}
            className={`absolute right-0 z-10 bg-kawaii-cream p-2 rounded-full border-2 border-kawaii-purple shadow hover:bg-kawaii-lilac transition-all text-2xl font-bold`}
            style={{ top: "40%" }}
          >
            ▶️
          </button>
        </div>
        {showMoreLink && (
          <div className="mt-10 text-center">
            <Button variant="outline" asChild>
              <a href={showMoreLink}>See More Kawaii Treats</a>
            </Button>
          </div>
        )}
      </div>
      <style>{`
        @keyframes slide-in-left {
          0% { transform: translateX(-30px); opacity:0.7; }
          100% { transform: translateX(0); opacity:1; }
        }
        @keyframes slide-in-right {
          0% { transform: translateX(30px); opacity:0.7; }
          100% { transform: translateX(0); opacity:1; }
        }
        .animate-slide-in-left { animation: slide-in-left 0.33s cubic-bezier(.43,1.39,.51,.92); }
        .animate-slide-in-right { animation: slide-in-right 0.33s cubic-bezier(.43,1.39,.51,.92); }
      `}</style>
    </section>
  );
};

export default ProductSection;
