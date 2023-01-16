import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "src/components/Navbar";
import { Product } from "src/dto/ProductDTO";
import { Bid } from "src/dto/BidDto";
import { getBidForProduct, getProductById } from "../../ProductApi";
import "./ProductPage.css";
import { NavigationRoutes } from "src/routes/ROUTES";
import { Alert, AlertColor, Button, CircularProgress } from "@mui/material";
import { submitBidForProduct } from "./../../ProductApi";
import { useInterval } from "usehooks-ts";
import { Client } from "@stomp/stompjs";
import axios, { Axios } from "axios";

function ProductPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [wantToBid, setWantToBid] = useState<boolean>(false);
  const [bid, setBid] = useState<number>(0);
  const [currentBid, setCurrentBid] = useState<number>(0);
  const [requestStatusMessage, setRequestStatusMessage] = useState<string>("");
  const [status, setStatus] = useState<AlertColor>("success");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const clientRef = useRef<Client | null>(null);

  const SOCKET_URL = "ws://localhost:8080/ws-message";

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

    getBidForProduct(location.state.id)
      .then((response) => {
        setCurrentBid(response.data);
      })
      .catch((err) => {
        console.log(err);
        setCurrentBid(0);
      });

    clientRef.current = new Client({
      brokerURL: SOCKET_URL,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: onConnected,
      onDisconnect: onDisconnected,
    });
    clientRef.current.activate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useInterval(
  //   () => {
  //     getBidForProduct(product!.id)
  //       .then((response) => {
  //         setCurrentBid(response.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setCurrentBid(0);
  //       });
  //   },
  //   wantToBid ? 3000 : null
  // );

  const enterBiddingButton = () => {
    setWantToBid(true);
  };

  const getBid = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBid(+event.target.value);
  };

  const submitBid = () => {
    if (bid > product!.highestBid && bid > product!.startingPrice) {
      const bidObj: Bid = { bid: bid, productId: location.state.id };
      console.log(bid);
      clientRef.current?.publish({ destination: "/product_update/" + location.state.id, body: JSON.stringify(bidObj) });
      submitBidForProduct(bidObj)
        .then(() => {
          setRequestStatusMessage("Bid submitted successfully");
          setStatus("success");
          setShowAlert(true);
        })
        .catch((err: any) => {
          setRequestStatusMessage("Bid failed: " + err.response.data.message);
          setStatus("error");
          setShowAlert(true);
        });
    } else {
      setBid(0);
      setRequestStatusMessage("Please enter a bid bigger than the curren bid");
      setCurrentBid(product!.highestBid);
      setStatus("error");
      setShowAlert(true);
    }
  };

  const onConnected = () => {
    console.log("Connected!!");
    clientRef.current?.subscribe(`/product_update/${location.state.id}`, (msg) => {
      if (msg.body) {
        console.log("Price:" + JSON.parse(msg.body).bid);
        setCurrentBid(JSON.parse(msg.body).bid);
      }
    });
  };

  const onDisconnected = () => {
    console.log("Disconnected!!");
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
              <span>Starting price: {product.startingPrice}</span>
              <Button disabled={!product.isActive} onClick={enterBiddingButton} variant="contained" sx={{ mt: 3, mb: 2 }}>
                Start bidding
              </Button>
              <>
                {wantToBid === true ? (
                  <div>
                    <div>Current highest bid</div>
                    <p className="bidBox">{currentBid === 0 ? "No bids yet" : currentBid}</p>
                    <p>Enter your bid here</p>
                    <input type={"number"} onChange={getBid} />
                    <Button onClick={submitBid} variant="contained" sx={{ m: 3, mb: 2 }}>
                      Submit bid
                    </Button>
                    {showAlert ? <Alert severity={status}>{requestStatusMessage}</Alert> : <></>}
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
