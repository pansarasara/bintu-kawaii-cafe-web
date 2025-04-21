
import React from "react";
import OrderModal from "@/components/OrderModal";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const DRINKS = [
  {
    name: "Bintu Boba Bliss",
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=facearea&w=400&h=400",
    price: 4.99,
    description: "Chewy pastel boba, sweet cream, and a hint of honey—your new happy place! 💕",
  },
  {
    name: "Marshmallow Latte",
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=facearea&w=400&h=400",
    price: 5.50,
    description: "Creamy, dreamy latte with fluffy marshmallows and a sprinkle of cuteness! ☁️",
  },
  {
    name: "Peachy Pop Soda",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=facearea&w=400&h=400",
    price: 3.75,
    description: "Sparkling peach soda with a pastel twist, topped with a heart straw. 🍑",
  },
  {
    name: "Strawberry Cloud Frappe",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&h=400",
    price: 5.25,
    description: "Fluffy, icy, and packed with love! Strawberries and clouds united. 🍓",
  },
];

const mascot = "/lovable-uploads/8889ca95-1374-4feb-aab0-fe4834275956.png";

const OrderDrinks: React.FC = () => {
  const [selected, setSelected] = React.useState<null | typeof DRINKS[0]>(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleOrderClick = (item: typeof DRINKS[0]) => {
    setSelected(item);
    setModalOpen(true);
  };

  const handleAddToCart = (qty: number) => {
    // TODO: Add to cart logic if/when needed
    // For now, just a placeholder
    console.log(`Added ${qty} ${selected?.name} to cart`);
  };

  return (
    <main className="section-padding min-h-[70vh] bg-gradient-to-br from-[#FFD1F9] via-[#FFF7E6] to-[#E5DEFF]">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
        <div className="flex flex-col gap-2 items-center mt-2">
          <img src={mascot} alt="Bintu mascot holding drink" className="w-20 h-20 drop-shadow-lg mb-2 animate-float" style={{objectFit:'contain'}} />
          <h1 className="font-display text-3xl md:text-4xl text-purple-700 mb-1">Sip & Chill with Bintu!</h1>
          <span className="text-lg text-purple-600 opacity-90 mb-3">Hey friend! Ready to sip something sweet and magical?</span>
        </div>
        <div className="w-full max-w-3xl flex flex-row items-center justify-center my-8">
          <Carousel
            opts={{
              align: "center",
              slidesToScroll: 1,
              dragFree: false,
              loop: true,
            }}
            className="w-full"
          >
            <CarouselPrevious />
            <CarouselContent className="px-2">
              {DRINKS.map((item, i) => (
                <CarouselItem
                  key={item.name}
                  className="basis-1/3 max-w-xs flex-shrink-0"
                >
                  <div
                    className="rounded-2xl card-gradient shadow-lg cursor-pointer transition-transform hover:scale-105 hover:shadow-2xl group relative flex flex-col h-full"
                    onClick={() => handleOrderClick(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded-t-2xl"
                    />
                    <div className="p-4 flex flex-col gap-2 grow">
                      <h2 className="text-xl font-bold text-purple-700">{item.name}</h2>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-lg font-bold text-pink-600">${item.price.toFixed(2)}</span>
                        <Button variant="accent" size="sm" className="rounded-full shadow flex gap-1">
                          Order
                        </Button>
                      </div>
                    </div>
                    <span className="absolute -top-5 -right-5">
                      <img src="https://pngimg.com/d/popcorn_PNG36.png" alt="" className="w-10 h-10 opacity-80" />
                    </span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext />
          </Carousel>
        </div>
        <OrderModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          item={selected}
          onAddToCart={handleAddToCart}
        />
      </div>
    </main>
  );
};

export default OrderDrinks;
