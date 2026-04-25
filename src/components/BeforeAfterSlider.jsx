import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";

const BeforeAfterSlider = ({ 
  beforeImg = "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000", 
  afterImg = "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000",
  beforeLabel = "Natural",
  afterLabel = "Glamour"
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!isDragging && e.type !== "mousemove" && e.type !== "touchmove") return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    
    if (position >= 0 && position <= 100) {
      setSliderPos(position);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/5] md:aspect-video rounded-3xl overflow-hidden cursor-ew-resize select-none shadow-2xl"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* After Image (Background) */}
      <img 
        src={afterImg} 
        alt="After" 
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      
      {/* Before Image (Clip) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img 
          src={beforeImg} 
          alt="Before" 
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Slider Line */}
      <div 
        className="absolute inset-y-0 w-1 bg-white/80 backdrop-blur-sm z-10"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
          <MoveHorizontal className="w-6 h-6 text-primary animate-pulse" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-primary/40 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest">
        {afterLabel}
      </div>

      {/* Helper text */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white text-[10px] font-medium uppercase tracking-[0.2em] whitespace-nowrap pointer-events-none">
        Drag to see transformation
      </div>
    </div>
  );
};

export default BeforeAfterSlider;