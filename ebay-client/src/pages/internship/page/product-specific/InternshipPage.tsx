import React, {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Navbar from "src/components/Navbar";
import {Internship} from "../../../../dto/InternshipDTO";
import {deleteProduct, getProductById} from "../../InternshipApi";
import "./InternshipPage.css";
import {NavigationRoutes} from "src/routes/ROUTES";
import {AlertColor, Button, CircularProgress} from "@mui/material";
import {Client} from "@stomp/stompjs";
import {getCurrentUser} from "src/pages/user/userApi";
import {UserData} from "src/dto/UserData";

function InternshipPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Internship | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [wantToApply, setWantToApply] = useState<boolean>(false);
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (userdata !== null && product !== null) if (userdata?.id === product!.userID) setIsOwnProduct(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userdata, product]);


    const startApplying = () => {
        setWantToApply(true);
    }

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
                                <p>Active until {new Date(product.activeUntil).toLocaleString()}</p>
                            ) : (
                                <h1>The listing is no longer active</h1>
                            )}
                            <span>{product.description}</span>
                            {isOwnProduct && (
                                <Button onClick={deleteListing} variant="contained" sx={{mt: 3, mb: 2}}>
                                    Delete Listing
                                </Button>
                            )}
                            <span>Open positions: {product.openPositions}</span>
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
