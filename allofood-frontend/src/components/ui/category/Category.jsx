
import { categoryData } from "../../../constants/services-data";

const Category = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {categoryData.map((item, index) => (
        <div
          key={index}
          className="bg-red-100 flex items-center justify-center rounded-lg p-4 text-center space-x-4"
        >
          <img
            src={item.immageUrl}
            alt={item.display}
            className="w-14 h-14 mb-2"
          />
          <h6 className="font-semibold">{item.display}</h6>
        </div>
      ))}
    </div>
  );
};

export default Category;
