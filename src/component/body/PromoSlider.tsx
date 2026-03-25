import { useState, useEffect } from "react";
import { promoSliderApi, type PromoSlide } from "../../api/promoSliderAPI";

const PromoSlider = () => {
  const [slides, setSlides] = useState<PromoSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data } = await promoSliderApi.getPromoSlides();
        setSlides(data);
      } catch (error) {
        console.error("Failed to fetch promo slides:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (autoPlay && !isHovered && slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [currentSlide, autoPlay, isHovered, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  const slide = slides[currentSlide];

  if (loading) {
    return (
      <div className="w-full h-64 md:h-80 bg-gray-200 animate-pulse rounded-xl" />
    );
  }

  // console.log("Slides Data", slides);

  return (
    <div
      className="relative w-full overflow-hidden py-4 md:py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slide */}
      <div className="relative w-full h-64 md:h-80 lg:h-96">
        <img
          src={`http://localhost:5000${slide.image}`}
          alt={slide.title}
          className="w-full h-full object-cover rounded-xl shadow-2xl"
        />
        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black/20 rounded-xl flex flex-col justify-end p-6 md:p-8">
          <h2 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
            {slide.title}
          </h2>
          <p className="text-lg md:text-xl font-semibold text-white/90 drop-shadow-md">
            {slide.desc}
          </p>
          <p className="text-lg md:text-xl font-semibold text-white/90 drop-shadow-md">
            {slide.price}
          </p>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 md:p-4 cursor-pointer"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 md:p-4 cursor-pointer"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125 shadow-lg"
                : "bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoSlider;
