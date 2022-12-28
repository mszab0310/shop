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

  const [product, setProduct] = useState<Product | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    getProductById(location.state.id)
      .then((res) => {
        setProduct(res.data);
        setImageUrl("https://source.unsplash.com/random/?" + res.data.name.split(" ")[0]);
      })
      .catch((err) => {
        //probably unauthorized
        navigate(NavigationRoutes.PRODUCTS);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <div className="mainContainer">
        <div className="loaderContainer">
          {product === null ? (
            <CircularProgress sx={{ display: "flex" }} />
          ) : (
            <div className="productContainer">
              <div className="productHeader">
                <h1> {product.name} </h1>
                <img src={imageUrl} alt="product" />
              </div>

              <p> {product.description} </p>
              {product.isActive}
              {}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductPage;
