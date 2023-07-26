import Head from "next/head";
import Header from "../components/header";
import HeroContainer from "../components/hero-container";
import AreaPropertiesContainer from "../components/area-properties-container";
import InfoContainer from "../components/info-container";
import LatestPropertiesContainer from "../components/latest-properties-container";
import RentPropertiesContainer from "../components/rent-properties-container";
import ContactUsForm from "../components/contact-us-form";
import Footer from "../components/footer";

const LandingPage = () => {
  return (
    <>
      <Head>
        <title>Real Estate</title>
        <meta name="description" content="Discover your perfect home" />
      </Head>
      <div className="relative bg-gray-white w-full h-[5095.99px] flex flex-col items-center justify-start">
        <Header showHamburger hamburgerMenuIcon={false} />
        <HeroContainer />
        <AreaPropertiesContainer />
        <InfoContainer />
        <LatestPropertiesContainer />
        <RentPropertiesContainer />
        <ContactUsForm />
        <Footer
          imageIds="/houseline1.svg"
          smallImageIds="/social-media-logo.svg"
          mediumImageIds="/social-media-logo1.svg"
          largeImageIds="/social-media-logo2.svg"
          extraSmallImageIds="/social-media-logo3.svg"
          extraExtraSmallImageIds="/social-media-logo4.svg"
        />
      </div>
    </>
  );
};

export default LandingPage;
