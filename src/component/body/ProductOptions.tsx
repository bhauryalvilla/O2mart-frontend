import { useEffect, useState } from "react";

import { allPlantsApi, type PlantCard } from "../../api/allPlants";

interface ProductOptionsProps {
  productName?: string;
  onClose: () => void;
}

const ProductOptions: React.FC<ProductOptionsProps> = ({
  productName,
  onClose,
}) => {
  const [plants, setPlants] = useState<PlantCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const categoryMap: Record<string, string> = {
      "Medicinal/Herbal": "Medicinal Herbal",
      "Succulents & Cacti": "Succulents Cacti",
    };

    const fetchPlants = async () => {
      try {
        const backendCategory =
          (categoryMap[productName ?? ""] || productName) ?? "";

        const response: any =
          await allPlantsApi.getPlantsByCategory(backendCategory);
        // ✅ Transform: Full image URLs (same as brands)
        const plantsWithFullUrls = response?.data.map((plant: PlantCard) => ({
          ...plant,
          image: `https://o2mart-backend.vercel.app/uploads${plant.image}`,
        }));
        setPlants(plantsWithFullUrls);
        setVisibleCount(4);

        console.log("All Plants", plantsWithFullUrls);
        // setCards(brandsWithFullUrls as BrandCard[]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (productName) {
      fetchPlants();
    }
  }, [productName]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200; // 200px before bottom

      if (bottom) {
        setVisibleCount((prev) => {
          // don’t go past total plants length
          const next = prev + 4;
          return next > plants.length ? plants.length : next;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [plants.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="text-center py-20">Loading {productName} plants...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Container */}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              <button
                onClick={onClose} // Calls parent's setSelectedBrand(null)
                className="cursor-pointer"
              >
                ←
              </button>
              Sponsored
            </h2>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900">
              {productName || "Select Product"}
            </h1>
          </div>
        </div>

        {/* Variants Grid */}
        {/* <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl hover:border-emerald-300 transition-all cursor-pointer">
              <div className="w-full h-64 bg-gray-200 rounded-xl mb-4"></div>
              <h3 className="font-semibold text-lg mb-2">Variant 1</h3>
              <div className="text-2xl font-bold text-emerald-600 mb-2">
                ₹999
              </div>
            </div>
           
          </div>
        </div> */}

        {/* Footer Actions */}
        {/* <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200 sticky bottom-8 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-emerald-600 hover:to-green-700 transition-all">
              Add to Cart
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center">
              View More Options →
            </button>
          </div>
        </div> */}
      </div>

      <div className="max-w-6xl mx-auto flex sm:flex-row ">
        {/* <div className="rounded-xl">
          <img
            src={outdoor}
            alt="outdoor image"
            style={{ width: "20rem", height: "20rem", borderRadius: ".5rem" }}
          />
        </div> */}
        {/* <div className="ml-4">
          <div className="text-l font-bold text-gray-900 mb-1">Title</div>
          <div className="text-xl font-medium text-gray-900 mb-1">
            Description
          </div>
          <div className="text-xl font-medium text-gray-900 mb-1">
            <sup>₹</sup>999
          </div>
          <div className="text-m font-medium text-gray-900 mb-1">
            FREE delivery Tue, 3 Mar
          </div>
          <div>
            <button className="mt-4 w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-3 px-4 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
              
              Add to Cart
            </button>
          </div>
        </div> */}

        {/* Right: Plants List - Your exact design */}
        <div className="lg:w-full order-1 lg:order-2 flex flex-col gap-6">
          {plants.slice(0, visibleCount).map(
            (
              plant, // Map 4 plants
            ) => (
              <div
                key={plant._id}
                className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl"
              >
                {/* Plant Image */}
                <div className="w-100 h-100 flex-shrink-0 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Plant Details - EXACT your design */}
                <div className="ml-4 flex-1 min-w-0">
                  <div className="text-lg font-bold text-gray-900 mb-1 truncate">
                    {plant.name}
                  </div>
                  <div className="text-xl font-medium text-gray-900 mb-1 line-clamp-2">
                    {plant.description}
                  </div>
                  <div className="text-xl font-medium text-gray-900 mb-1">
                    <sup>₹</sup>
                    {plant.price.replace("₹", "")}
                    {plant.originalPrice && (
                      <span className="text-lg text-gray-500 line-through ml-2">
                        {plant.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-900 mb-4">
                    {plant.deliveryBy} delivery
                  </div>

                  {/* Button - EXACT your gradient */}
                  <div>
                    <button className="mt-4 w-1/3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-3 px-4 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductOptions;
