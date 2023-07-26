import Title from "./title";
import InfoCard from "./info-card";

const InfoContainer = () => {
  return (
    <div className="self-stretch bg-primary-50 flex flex-col py-[70px] px-0 items-center justify-start text-center text-21xl text-primary-800 font-body-large-400">
      <div className="self-stretch flex flex-col pt-[75px] px-0 pb-0 box-border items-center justify-start gap-[54px] max-w-[95%px]">
        <div className="self-stretch flex flex-col py-0 px-[30px] box-border items-center justify-start gap-[24px] max-w-[95%px]">
          <Title title="Properties by Area" />
          <div className="self-stretch relative text-xl leading-[28px] text-lightslategray">
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Proin sodales ultrices nulla blandit
            volutpat.
          </div>
        </div>
        <div className="self-stretch flex flex-row flex-wrap items-center justify-center gap-[86px] text-5xl text-gray-700">
          <InfoCard icon="/icon.svg" sellYourHome="Sell your home" />
          <InfoCard
            icon="/icon1.svg"
            sellYourHome="Rent your home"
            propWidth="312px"
            propTextDecoration="unset"
          />
          <InfoCard
            icon="/icon2.svg"
            sellYourHome="Buy a home"
            propWidth="unset"
            propTextDecoration="underline"
          />
          <InfoCard
            icon="/icon3.svg"
            sellYourHome="Free marketing"
            propWidth="312px"
            propTextDecoration="underline"
          />
        </div>
      </div>
    </div>
  );
};

export default InfoContainer;
