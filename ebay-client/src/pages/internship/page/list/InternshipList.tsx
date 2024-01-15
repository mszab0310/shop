import React, { useContext } from "react";
import { useState } from "react";
import { Internship } from "../../../../dto/InternshipDTO";
import { useEffect } from "react";
import { getAllProducts } from "../../InternshipApi";
import InternshipCard from "../card/InternshipCard";

import "./InternshipList.css";
import Navbar from "../../../../components/Navbar";
import { AppContext } from "src/context/context";
import { getSearchResult } from "../../InternshipApi";

function InternshipList() {
  const [productList, setProductList] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { searchQuery } = useContext(AppContext);

  useEffect(() => {
    const products: Internship[] = [];
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
    const products: Internship[] = [];

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
          {productList.map((product: Internship) => {
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
