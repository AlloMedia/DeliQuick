import { servicesData } from "../../../constants/services-data";

const Feature = () => {
  return (
    <div className="grid grid-cols-3 gap-8">
      {servicesData.map(({ imageUrl, title, text }, index) => (
        <div key={index} className="w-9/12 mt-5">
          <div className="text-center px-5 py-3">
            <img
              src={imageUrl}
              alt="service-image"
              className="inline-block mx-auto w-24 mb-3"
            />
            <h5 className="font-semibold text-xl mb-3">{title}</h5>
            <p className="text-gray-600 text-base">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feature;
