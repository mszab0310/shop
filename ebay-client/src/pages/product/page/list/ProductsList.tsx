import React from "react";
import { useState } from "react";
import { Product } from "../../../../dto/ProductDTO";
import { useEffect } from "react";
import { getAllProducts } from "../../ProductApi";
import ProductCard from "../card/ProductCard";

import "./ProductsList.css";
import Navbar from "../../../../components/Navbar";

function ProductsList() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const products: Product[] = [];
    console.log("Fetching products");
    getAllProducts().then((response: any) => {
      response.data.forEach((element: any) => {
        console.log(element);
        products.push(element);
      });
      setProductList(products);
      setIsLoading(true);
    });
  }, []);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div className="productListContainer">
          {productList.map((product: Product) => {
            console.log(product);
            return <ProductCard key={Math.random()} product={product} />;
          })}
        </div>
      ) : (
        <h1>Fetching list</h1>
      )}
    </>
  );
}

export default ProductsList;
