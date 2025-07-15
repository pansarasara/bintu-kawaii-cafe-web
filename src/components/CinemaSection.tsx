
import React, { useState } from "react";
import { Calendar, Clock, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Movie {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  times: string[];
  dates: string[];
}

const movies: Movie[] = [
  {
    id: "movie1",
    title: "Bintu's Magical Adventure",
    imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925",
    description: "Join Bintu on a magical journey through the Popcorn Forest!",
    times: ["12:30 PM", "3:00 PM", "5:30 PM", "8:00 PM"],
    dates: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  {
    id: "movie2",
    title: "Kawaii Castle Dreams",
    imageUrl: "https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?q=80&w=2036",
    description: "Bintu builds a magical castle made of sweet treats!",
    times: ["1:00 PM", "4:30 PM", "7:00 PM", "9:30 PM"],
    dates: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  {
    id: "movie3",
    title: "Starlight Symphony",
    imageUrl: "https://images.unsplash.com/photo-1529798856831-427dfd0a1ab1?q=80&w=1974",
    description: "Bintu and friends discover the power of music under the stars!",
    times: ["11:00 AM", "2:30 PM", "6:00 PM", "8:30 PM"],
    dates: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  }
];

const CinemaSection = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie>(movies[0]);
  const [selectedDate, setSelectedDate] = useState<string>(movies[0].dates[0]);
  const [selectedTime, setSelectedTime] = useState<string>(movies[0].times[0]);
  
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-kawaii-lilac to-kawaii-cream">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-purple-700 mb-2 relative inline-block">
            Bintu-Reel Cinema
            <div className="absolute -top-4 -right-8 w-6 h-6 bg-kawaii-pink rounded-full animate-float opacity-70"></div>
            <div className="absolute -bottom-2 -left-4 w-4 h-4 bg-kawaii-gold rounded-full animate-float opacity-70" style={{ animationDelay: "1s" }}></div>
          </h2>
          <p className="text-purple-600 opacity-80 max-w-2xl mx-auto">
            Enjoy the cutest movies in town with Bintu! Our cozy theater features comfy seats, 
            tasty treats, and the most adorable movie experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Selection */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="font-display text-2xl text-purple-700 mb-4">Current Features</h3>
            
            <div className="space-y-4">
              {movies.map((movie) => (
                <Card 
                  key={movie.id}
                  className={`cursor-pointer transition-all ${selectedMovie.id === movie.id ? 'border-kawaii-purple border-2' : 'border-transparent hover:border-kawaii-purple/50'}`}
                  onClick={() => setSelectedMovie(movie)}
                >
                  <div className="flex gap-4">
                    <div className="w-24 h-32 overflow-hidden rounded-l-2xl">
                      <img 
                        src={movie.imageUrl} 
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="py-3 pr-3">
                      <h4 className="font-display text-lg text-purple-700">{movie.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {movie.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Theater Preview */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border-4 border-kawaii-purple relative">
              <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${selectedMovie.imageUrl})` }}></div>
              <div className="relative px-6 py-8">
                <div className="mb-8 text-center">
                  <h3 className="font-display text-3xl text-purple-700">{selectedMovie.title}</h3>
                  <p className="text-purple-600 mt-2">{selectedMovie.description}</p>
                </div>
                
                {/* Booking interface */}
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold flex items-center gap-2 mb-3 text-purple-700">
                        <Calendar className="h-4 w-4" /> Select Date
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMovie.dates.map((date) => (
                          <Button 
                            key={date}
                            variant={selectedDate === date ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedDate(date)}
                          >
                            {date}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold flex items-center gap-2 mb-3 text-purple-700">
                        <Clock className="h-4 w-4" /> Select Time
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMovie.times.map((time) => (
                          <Button 
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button className="w-full sm:w-auto">
                      <Ticket className="mr-2 h-4 w-4" /> Book Tickets Now
                    </Button>
                  </div>
                </div>
                
                {/* Theatre decoration */}
                <div className="mt-8 relative">
                  <div className="h-4 bg-kawaii-pink rounded-t-3xl"></div>
                  <div className="h-2 bg-kawaii-purple"></div>
                  <div className="absolute top-full left-0 right-0 flex justify-center">
                    <div className="w-12 h-1 bg-kawaii-gold"></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinemaSection;
