import React, {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Navbar from "src/components/Navbar";
import {Product} from "src/dto/ProductDTO";
import {Bid} from "src/dto/BidDto";
import {deleteProduct, getBidForProduct, getProductById} from "../../InternshipApi";
import "./InternshipPage.css";
import {NavigationRoutes} from "src/routes/ROUTES";
import {AlertColor, Button, CircularProgress} from "@mui/material";
import {submitBidForProduct} from "../../InternshipApi";
import {Client} from "@stomp/stompjs";
import {getCurrentUser} from "src/pages/user/userApi";
import {UserData} from "src/dto/UserData";

function InternshipPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [wantToBid, setWantToBid] = useState<boolean>(false);
    const [wantToApply, setWantToApply] = useState<boolean>(false);
    const [bid, setBid] = useState<number>(0);
    const [currentBid, setCurrentBid] = useState<number>(0);
    const [requestStatusMessage, setRequestStatusMessage] = useState<string>("");
    const [status, setStatus] = useState<AlertColor>("success");
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [userdata, setUserData] = useState<UserData | null>(null);
    const [isOwnProduct, setIsOwnProduct] = useState<boolean>(false);

    const clientRef = useRef<Client | null>(null);

    const SOCKET_URL = "ws://localhost:8080/ws-message";

    useEffect(() => {
        getCurrentUser().then((resp) => {
            setUserData(resp.data);
        });

        getProductById(location.state.id)
            .then((res) => {
                setProduct(res.data);
                setImageUrl("https://source.unsplash.com/random/?" + res.data.name.split(" ")[0]);
            })
            .catch((err) => {
                //probably unauthorized
                navigate(NavigationRoutes.INTERNSHIPS);
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (userdata !== null && product !== null) if (userdata?.id === product!.sellerData!.id) setIsOwnProduct(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userdata, product]);

    const enterBiddingButton = () => {
        setWantToBid(true);
        clientRef.current!.activate();
    };

    const startApplying = () => {
        setWantToApply(true);
    }

    const getBid = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBid(+event.target.value);
    };

    const submitBid = () => {
        console.log("Check: ");
        console.log(userdata);
        console.log(product?.sellerData);
        if (userdata!.id === product!.sellerData!.id) {
            setRequestStatusMessage("Cannot bid on own product");
            setStatus("error");
            setShowAlert(true);
        } else {
            if (bid > product!.highestBid && bid > product!.startingPrice) {
                const bidObj: Bid = {bid: bid, productId: location.state.id};
                console.log(bid);
                clientRef.current?.publish({
                    destination: "/product_update/" + location.state.id,
                    body: JSON.stringify(bidObj)
                });
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

    const deleteListing = () => {
        deleteProduct(product!.id)
            .then(() => {
                setRequestStatusMessage("Product deleted");
                setStatus("success");
                setShowAlert(true);
                setTimeout(() => {
                    navigate(NavigationRoutes.USER);
                }, 3000);
            })
            .catch((err: any) => {
                setRequestStatusMessage("Error: " + err.response.data.message);
                setStatus("error");
                setShowAlert(true);
                setIsOwnProduct(false);
            });
    };

    return (
        <>
            <Navbar/>
            <div className="mainContainer">
                <div className="loaderContainer">
                    {product === null ? (
                        <CircularProgress sx={{display: "flex"}}/>
                    ) : (
                        <div className="productContainer">
                            <div className="productHeader">
                                <h1 className="productName"> {product.name} </h1>
                                <img src={imageUrl} alt="img" className="productImage"/>
                            </div>
                            {product.isActive === true ? (
                                <p>Active until {new Date(product.biddingClosesOn).toLocaleString()}</p>
                            ) : (
                                <h1>The listing is no longer active</h1>
                            )}
                            <span>{product.description}</span>
                            {isOwnProduct && (
                                <Button onClick={deleteListing} variant="contained" sx={{mt: 3, mb: 2}}>
                                    Delete Listing
                                </Button>
                            )}
                            <span>Starting price: {product.startingPrice}</span>
                            <Button disabled={!product.isActive} onClick={startApplying} variant="contained"
                                    sx={{mt: 3, mb: 2}}>
                                Apply to this internship
                            </Button>
                            <>
                                {wantToApply ? (
                                    <div>
                                        <div>Personal Information</div>
                                        <p>Curriculum vitae</p>
                                        <input type="file" placeholder={"Curriculum vitae"} title={"Your CV"}
                                               accept={".pdf,.docx"}/>
                                        <p>Cover letter</p>
                                        <input type="file" placeholder={"Cover letter"} title={"Cover letter"}
                                               accept={".pdf,.docx"}/>
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

export default InternshipPage;