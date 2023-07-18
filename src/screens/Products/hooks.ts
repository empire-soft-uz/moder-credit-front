import { useEffect, useState } from "react";


import { REQUESTS } from "../../api/requests";
import { Product } from "../../types";

export const ProductsHooks = () => {

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  const deleteProduct = async (id: string) => {
    try {
      await REQUESTS.product.delete(id)
    } catch (error) {

    }
  }

  const createProduct = async (product: Partial<Product>) => {
    try {
      await REQUESTS.product.add(product)
    } catch (error) {

    }
  }

  const updateProduct = async (product: Partial<Product>) => {
    try {
      await REQUESTS.product.edit(product)
    } catch (error) {

    }
  }

  const effect = async () => {
    setLoading(true)
    try {
      const res = await REQUESTS.product.get();
      setProducts(res.data.data)
    } catch (e) {
      console.log("e: ", e);
    }
    setLoading(false)
  };

  useEffect(() => {
    effect();
  }, []);

  return {
    data: products,
    loading,
    fetchProducts: effect,
    deleteProduct,
    createProduct,
    updateProduct
  };
};