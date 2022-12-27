import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "src/components/Navbar";
import { Product } from "src/dto/ProductDTO";
import "./ProductPage.css";

function ProductPage() {
  const location = useLocation();

  useEffect(() => {
    console.log(location.state.id);
  }, []);

  return (
    <>
      <Navbar />
      <div className="mainContainer">
        <div>{location.state.id}</div>
      </div>
    </>
  );
}

export default ProductPage;
