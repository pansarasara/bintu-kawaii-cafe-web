
import React from "react";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import ProductSection from "@/components/ProductSection";
import CinemaSection from "@/components/CinemaSection";
import Footer from "@/components/Footer";
import { ProductProps } from "@/components/ProductCard";

const Index = () => {
  // Featured drinks products
  const featuredDrinks: ProductProps[] = [
    {
      id: "drink1",
      name: "Bintu Bubble Tea",
      price: 5.99,
      imageSrc: "https://images.unsplash.com/photo-1588483977150-9c2127ab7bcc?q=80&w=2070",
      category: "Drinks",
      description: "Sweet taro milk tea with popping boba pearls, topped with cream.",
    },
    {
      id: "drink2",
      name: "Pink Cloud Latte",
      price: 4.99,
      imageSrc: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=2035",
      category: "Drinks",
      description: "Strawberry latte with fluffy cloud-like cream and rainbow sprinkles.",
    },
    {
      id: "drink3",
      name: "Golden Honey Tea",
      price: 4.50,
      imageSrc: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=2070",
      category: "Drinks",
      description: "Soothing jasmine tea with local honey and golden star-shaped jellies.",
    },
    {
      id: "drink4",
      name: "Berry Sparkle Soda",
      price: 3.99,
      imageSrc: "https://images.unsplash.com/photo-1553530979-31b9d4b9dbc3?q=80&w=2071",
      category: "Drinks",
      description: "Fizzy berry soda with sparkle jelly and a scoop of vanilla ice cream.",
    },
  ];

  // Featured food products
  const featuredFoods: ProductProps[] = [
    {
      id: "food1",
      name: "Bintu Cupcakes",
      price: 4.99,
      imageSrc: "https://images.unsplash.com/photo-1594323713852-9837d066af22?q=80&w=2074",
      category: "Desserts",
      description: "Adorable cupcakes decorated to look like our mascot Bintu.",
    },
    {
      id: "food2",
      name: "Kawaii Toast Box",
      price: 7.99,
      imageSrc: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2074",
      category: "Breakfast",
      description: "Colorful fruit toast box with honey yogurt and character-shaped sides.",
    },
    {
      id: "food3",
      name: "Popcorn Parfait",
      price: 6.50,
      imageSrc: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=2127",
      category: "Snacks",
      description: "Layered sweet and salty parfait with caramel popcorn and cream.",
    },
    {
      id: "food4",
      name: "Rainbow Macarons",
      price: 8.99,
      imageSrc: "https://images.unsplash.com/photo-1558326567-98166bdfedf1?q=80&w=2129",
      category: "Desserts",
      description: "Box of six colorful macarons in pastel colors with cute animal faces.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroBanner />
        
        <ProductSection
          title="Kawaii Drinks"
          subtitle="Sip on something sweet and kawaii!"
          products={featuredDrinks}
          showMoreLink="/drinks"
        />
        
        <ProductSection
          title="Cute Treats"
          subtitle="Adorable snacks that are almost too cute to eat!"
          products={featuredFoods}
          showMoreLink="/food"
        />
        
        <CinemaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
