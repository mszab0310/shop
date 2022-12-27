import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "src/components/Navbar";
import { Product } from "src/dto/ProductDTO";
import { getProductById } from "../../ProductApi";
import "./ProductPage.css";
import { NavigationRoutes } from "src/routes/ROUTES";
import { CircularProgress } from "@mui/material";

function ProductPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    getProductById(location.state.id)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        //probably unauthorized
        navigate(NavigationRoutes.PRODUCTS);
      });
  }, []);

  return (
    <>
      <Navbar />
      <CircularProgress />
      <div className="mainContainer">
        <div>{location.state.id}</div>
      </div>
    </>
  );
}

export default ProductPage;
