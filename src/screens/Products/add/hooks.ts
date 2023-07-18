import { useState } from "react";
import { Product } from "../../../types";

export const ProductsAddHooks = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Partial<Product>>({});

  const onSetProduct = (
    key: "name" | "price" | "photoUrl" | "imei" | "iCloudLogin" | "iCloudPassword" | "description",
    value: any
  ) => {
    let obj = { ...product };
    obj[key] = value;
    setProduct(obj);
  };

  const onSubmit = () => {
    try {
      setLoading(true);

      setTimeout(() => {
        console.log("product: ", product);
        setLoading(false);
      }, 3000);
    } catch (e) {
      console.log("e: ", e);
    }
  };

  return { loading, product, onSetProduct, onSubmit};
};