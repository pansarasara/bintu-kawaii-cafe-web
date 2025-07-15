
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden py-12 md:py-20 px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-kawaii-pink"></div>
        <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-kawaii-purple"></div>
        <div className="absolute bottom-10 left-1/4 w-20 h-20 rounded-full bg-kawaii-gold"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-display mb-4 text-purple-700">
              Welcome to Bintu's <br/><span className="text-pink-500">Kawaii Cafe!</span>
            </h1>
            <p className="text-lg md:text-xl text-purple-600 mb-8 opacity-90">
              Where tasty treats meet cozy movie seats!<br /> 
              Enjoy our popcorn-scented delights in a fairy-tale atmosphere.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button variant="default" className="group">
                <span>Order Online</span>
                <Sparkles className="ml-2 h-4 w-4 transition-transform group-hover:rotate-12" />
              </Button>
              <Button variant="secondary">
                Book Movie Tickets
              </Button>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-3xl overflow-hidden aspect-[3/4] bg-gradient-to-br from-kawaii-purple/30 to-kawaii-lilac transform -rotate-3 hover:rotate-0 transition-transform">
                <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url('https://images.unsplash.com/photo-1588483977150-9c2127ab7bcc?q=80&w=2070')`}}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-purple-700/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-display">Bintu Bubble Tea</h3>
                    <p className="text-xs opacity-90">with popping boba</p>
                  </div>
                </div>
              </div>
              
              <div className="relative rounded-3xl overflow-hidden aspect-[3/4] bg-gradient-to-br from-kawaii-gold/30 to-kawaii-cream transform rotate-3 translate-y-6 hover:rotate-0 transition-transform">
                <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url('https://images.unsplash.com/photo-1594323713852-9837d066af22?q=80&w=2074')`}}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-amber-700/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-display">Bintu Cupcakes</h3>
                    <p className="text-xs opacity-90">with special frosting</p>
                  </div>
                </div>
              </div>
              
              <div className="relative col-span-2 rounded-3xl overflow-hidden aspect-[16/7] bg-gradient-to-br from-kawaii-pink/30 to-kawaii-cream hover:scale-[1.02] transition-transform">
                <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url('https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2070')`}}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-pink-700/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-display">Movie & Dinner Bundle</h3>
                    <p className="text-xs opacity-90">special weekend offer</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sparkle effect */}
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="sparkle" 
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  opacity: 0.7
                }} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
