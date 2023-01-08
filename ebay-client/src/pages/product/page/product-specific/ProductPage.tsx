import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "src/components/Navbar";
import { Product } from "src/dto/ProductDTO";
import { getProductById } from "../../ProductApi";
import "./ProductPage.css";
import { NavigationRoutes } from "src/routes/ROUTES";
import { Button, CircularProgress } from "@mui/material";
import { submitBidForProduct } from "./../../ProductApi";

function ProductPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [wantToBid, setWantToBid] = useState<boolean>(false);
  const [bid, setBid] = useState<number>(0);

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

  const enterBiddingButton = () => {
    setWantToBid(true);
  };

  const getBid = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBid(+event.target.value);
  };

  const submitBid = () => {
    if (bid > product!.highestBid) {
      submitBidForProduct(product!.id, bid)
        .then(() => alert("Bid sumbitted"))
        .catch(() => {
          alert("bidding failed");
        });
    } else {
      setBid(0);
      alert("Please enter bid bigger then the last bid");
    }
  };

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
                <h1 className="productName"> {product.name} </h1>
                <img src={imageUrl} alt="product" className="productImage" />
              </div>
              {product.isActive === true ? (
                <p>Active until {new Date(product.biddingClosesOn).toLocaleString()}</p>
              ) : (
                <h1>The listing is no longer active</h1>
              )}
              <span>{product.description}</span>
              <Button onClick={enterBiddingButton}>Start bidding</Button>
              <>
                {wantToBid === true ? (
                  <div>
                    <div>Current highest bid</div>
                    <p className="bidBox">{product!.highestBid === 0 ? "No bids yet" : product!.highestBid}</p>
                    <p>Enter your bid here</p>
                    <input type={"number"} onChange={getBid} />
                    <button onClick={submitBid}>Submit bid</button>
                  </div>
                ) : (
                  <></>
                )}
              </>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductPage;
