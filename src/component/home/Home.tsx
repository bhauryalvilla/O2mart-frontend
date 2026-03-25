import BrandOffersGrid from "../body/BrandOffersGrid";
import Container from "../body/Container";
import PromoSlider from "../body/PromoSlider";
import Test from "../body/test";
import Footer from "../footer/Footer";
import Header from "../header/Header";

function Home() {
  return (
    <>
      <div className="p-4">
        <Header />
      </div>
      <hr className="w-full border-t border-gray-300 mx-0 my-2" />
      <PromoSlider />
      <BrandOffersGrid />
      <hr className="w-full border-t border-gray-300 mx-0 my-2" />
      <Footer />
      {/* <Test /> */}
      {/* <Container /> */}
    </>
  );
}

export default Home;
