import axios from "axios";
import { useEffect } from "react";

const Items = () => {
  useEffect(() => {
    axios
      .get("/allItems")
      .then((response) => {
        const fetchedProducts = response.data.map((item) => {
          return {
            ...item,
            image01: item.imageUrls[0],
            image02: item.imageUrls[1],
            image03: item.imageUrls[2],
          };
        });
        return fetchedProducts;
      })
      .catch((error) => {
        console.error("Error fetching the items:", error);
      });
  }, []);
};

export default Items;
