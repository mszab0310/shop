import React, { useContext } from "react";
import { useState } from "react";
import { Product } from "../../../../dto/ProductDTO";
import { useEffect } from "react";
import { getAllProducts } from "../../InternshipApi";
import InternshipCard from "../card/InternshipCard";

import "./InternshipList.css";
import Navbar from "../../../../components/Navbar";
import { AppContext } from "src/context/context";
import { getSearchResult } from "../../InternshipApi";

function InternshipList() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { searchQuery } = useContext(AppContext);

  useEffect(() => {
    const products: Product[] = [];
    if (searchQuery === "") {
      getAllProducts().then((response: any) => {
        response.data.forEach((element: any) => {
          products.push(element);
        });
        setProductList(products);
        setIsLoading(true);
      });
    } else {
      getSearchResult(searchQuery).then((response: any) => {
        response.data.forEach((element: any) => {
          products.push(element);
        });
        setProductList(products);
        setIsLoading(true);
      });
    }
  }, []);

  useEffect(() => {
    const products: Product[] = [];

    console.log("Query is " + searchQuery);
    getSearchResult(searchQuery).then((response: any) => {
      response.data.forEach((element: any) => {
        products.push(element);
      });
      setProductList(products);
      setIsLoading(true);
    });
  }, [searchQuery]);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div className="productListContainer">
          {productList.map((product: Product) => {
            return <InternshipCard key={Math.random()} internship={product} />;
          })}
        </div>
      ) : (
        <h1>Fetching list</h1>
      )}
    </>
  );
}

export default InternshipList;
