import React, { useEffect, useState } from "react";
import { brandsApi, type BrandCard } from "../../api/brands";
import ProductOptions from "./ProductOptions";
import { useAppSelector } from "../../hooks/hooks";

interface BrandCardProps {
  image: string;
  brand: string;
  price: string;
  originalPrice?: string;
}

const BrandCard: React.FC<
  BrandCardProps & { onAddToCart: (brand: BrandCard) => void }
> = ({ image, brand, price, originalPrice, onAddToCart }) => (
  <div
    className={
      "group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-white/50 hover:border-emerald-200"
    }
  >
    {/* Image */}
    <div className="w-full h-48 md:h-52 overflow-hidden rounded-t-2xl">
      <img
        src={image}
        alt={brand}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
    </div>

    {/* Content */}
    <div className="p-4 md:p-6">
      {/* Brand Badge */}
      <span className="inline-block bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs px-2 py-1 rounded-full font-semibold uppercase tracking-wider">
        {brand}
      </span>

      {/* Price */}
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl md:text-3xl font-black text-gray-900">
          {price}
        </span>
        {originalPrice && (
          <span className="text-sm text-gray-500 line-through font-medium">
            {originalPrice}
          </span>
        )}
      </div>

      {/* CTA Button */}
      <button
        className="mt-4 w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-3 px-4 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
        onClick={() =>
          onAddToCart({ _id: "", image, brand, price, originalPrice })
        }
      >
        {/* <ShoppingCartIcon className="w-4 h-4" /> */}
        Add to Cart
      </button>
    </div>
  </div>
);

const BrandOffersGrid = () => {
  const [cards, setCards] = useState<BrandCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<BrandCard | null>(null);
  const { results} = useAppSelector((state) => state.search);

  const handleAddToCart = (brandData: BrandCard) => {
    console.log("Selected brand:", brandData); // Access data here!

    setSelectedBrand(brandData);
  };

  

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await brandsApi.getBrands();
        // Transform: Add full image URLs
        const brandsWithFullUrls = response.data.map((brand) => ({
          ...brand,
          image: `http://localhost:5000${brand.image}`, // Backend URL
        }));
        setCards(brandsWithFullUrls as BrandCard[]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  console.log("Loading", loading);

  results.map((result) => {
    console.log("Results", result.name);
  });

  return (
    <>
      {selectedBrand ? (
        <>
          <ProductOptions
            productName={selectedBrand.brand}
            onClose={() => setSelectedBrand(null)}
          />
        </>
      ) : (
        <section className="py-12 md:py-16 bg-gradient-to-br from-emerald-50 via-white to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-black bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent mb-4">
                Top Brands on Offer
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-600 mx-auto rounded-full" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {cards.map((card) => (
                <BrandCard
                  key={card._id}
                  image={card.image} // Full URL
                  brand={card.brand}
                  price={card.price}
                  originalPrice={card.originalPrice}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BrandOffersGrid;
