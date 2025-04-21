
import React from "react";
import OrderModal from "@/components/OrderModal";
import { Button } from "@/components/ui/button";

const FOODS = [
  {
    name: "Bintu-noms Cupcake",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=facearea&w=400&h=400",
    price: 3.25,
    description: "Fluffy cupcake with Bintu’s smiling face and pastel sprinkles. 💖",
  },
  {
    name: "Panda Toast Bites",
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=facearea&w=400&h=400",
    price: 2.90,
    description: "Tiny toast nibs shaped like panda pals—soft, warm & sweet!",
  },
  {
    name: "Popcorn Chibi Bag",
    image: "https://pngimg.com/d/popcorn_PNG36.png",
    price: 2.50,
    description: "Mini popcorn pouch for cozy munching. Extra fluffy, extra fun!",
  },
  {
    name: "Cloudy Berry Parfait",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&h=400",
    price: 4.75,
    description: "Sweet berries, whipped cream, little clouds, and lofi vibes 🍓",
  }
];

const mascot = "/lovable-uploads/8889ca95-1374-4feb-aab0-fe4834275956.png";

const OrderFood: React.FC = () => {
  const [selected, setSelected] = React.useState<null | typeof FOODS[0]>(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleOrderClick = (item: typeof FOODS[0]) => {
    setSelected(item);
    setModalOpen(true);
  };

  const handleAddToCart = (qty: number) => {
    // TODO: Add to cart logic if needed
    console.log(`Added ${qty} ${selected?.name} to cart`);
  };

  return (
    <main className="section-padding min-h-[70vh] bg-gradient-to-br from-[#FFF7E6] via-[#FFD1F9] to-[#FDE1D3]">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
        <div className="flex flex-col gap-2 items-center">
          <img src={mascot} alt="Bintu mascot holding cupcake" className="w-20 h-20 drop-shadow-lg mb-2 animate-float" style={{objectFit:'contain'}} />
          <h1 className="font-display text-3xl md:text-4xl text-pink-700 mb-1">Snack Time with Bintu!</h1>
          <span className="text-lg text-pink-600 opacity-90 mb-3">What’s cookin’, cozy companion? Pick a treat!</span>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          {FOODS.map((item) => (
            <div
              key={item.name}
              onClick={() => handleOrderClick(item)}
              className="rounded-2xl card-gradient shadow-lg cursor-pointer transition-transform hover:scale-105 hover:shadow-2xl group relative"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-t-2xl"
              />
              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-xl font-bold text-pink-700">{item.name}</h2>
                <p className="text-muted-foreground text-sm">{item.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-lg font-bold text-purple-600">${item.price.toFixed(2)}</span>
                  <Button variant="accent" size="sm" className="rounded-full shadow flex gap-1">
                    Order Now
                  </Button>
                </div>
              </div>
              <span className="absolute -top-5 -right-5">
                <img src="https://pngimg.com/d/popcorn_PNG36.png" alt="" className="w-10 h-10 opacity-80" />
              </span>
            </div>
          ))}
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

export default OrderFood;
