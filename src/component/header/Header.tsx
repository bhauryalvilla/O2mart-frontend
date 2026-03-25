import { useEffect, useState } from "react";
import { MapPinIcon } from "../../assets/image/MapPinIcon";
import SearchForm from "../../utils/SearchForm";
import { ShoppingCartIcon } from "../../assets/image/ShoppingCartIcon";
import O2MartLogo from "../../assets/image/O2MartLogo";
import { useCurrentLocation } from "./UseCurrentLocation";
import LoginModal from "../Modal/LoginModal";

function Header() {
  const [searchValue, setSearchValue] = useState("");
  const { lat, lng, loading, error, getLocation } = useCurrentLocation();
  const [city, setCity] = useState<string | null>(null);
  const [pincode, setPincode] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
    // Your search logic here
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (lat !== null && lng !== null) {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      )
        .then((res) => res.json())
        .then((data) => {
          const cityName =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.state;

          const postalCode = data.address.postcode;
          console.log("Postal Code", postalCode);

          setCity(cityName);
          setPincode(postalCode);
        })
        .catch((err) => console.error(err));
    }
  }, [lat, lng]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
        <div className="text-green-600 font-medium cursor-pointer">
          <O2MartLogo width={100} height={100} />
        </div>
        <div
          className="text-green-600 font-medium cursor-pointer"
          onClick={() => !userEmail && setIsOpen(true)}
        >
          {userEmail ? userEmail : "Login"}
        </div>
        <LoginModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onLoginSuccess={(email) => {
            setUserEmail(email);
            setIsOpen(false);
          }}
        />
        <div className="flex text-green-600 font-medium cursor-pointer">
          <MapPinIcon className="text-green-500" />

          {/* {!loading && lat !== null && lng !== null && (
            <span>
              {lat.toFixed(3)}, {lng.toFixed(3)}
            </span>
          )} */}
          {loading && <span>Getting location...</span>}
          {!loading && (city || pincode) && (
            <span>
              {city} - {pincode}
            </span>
          )}
          {error && <span className="text-red-500">{error}</span>}
        </div>
        <div className="w-full lg:flex-1 lg:min-w-0 px-2 sm:px-4 order-2 lg:order-none mt-3 lg:mt-0">
          <SearchForm
            value={searchValue}
            onChange={setSearchValue}
            onSubmit={handleSearch}
            placeholder="Search products..."
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-11 px-4 transition-all"
          />
        </div>
        <div className="flex gap-1 text-green-600 font-medium cursor-pointer">
          <ShoppingCartIcon className="text-green-500 " /> Cart
        </div>
      </div>
    </>
  );
}

export default Header;
