import React, {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Navbar from "src/components/Navbar";
import {Internship} from "../../../../dto/InternshipDTO";
import {deleteProduct, getProductById} from "../../InternshipApi";
import "./InternshipPage.css";
import {NavigationRoutes} from "src/routes/ROUTES";
import {AlertColor, Button, CircularProgress, IconButton, Typography} from "@mui/material";
import {Client} from "@stomp/stompjs";
import {getCurrentUser} from "src/pages/user/userApi";
import {UserData} from "src/dto/UserData";
import { Cancel } from "@material-ui/icons";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from "@emotion/styled";
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
        setWantToApply(!wantToApply);
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

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });
      
    return (
        <>
            <Navbar/>
           
                <div className="loaderContainer">
                    {product === null ? (
                        <CircularProgress sx={{display: "flex"}}/>
                    ) : (
                        <div className="container">
                           
                                <Typography className="title" variant="h3"> {product.name} </Typography>
                               
                         
                            
                            <div className="container-info">
                                <div className="container-left">
                            
                            <div className="image-actions"> <div className="image"><img className="image-src"  src={imageUrl} alt="" /></div>
                             <div className="actions">
                             {wantToApply ? (
                                 <div className="apply-info-open">
                                     <Button className="apply-button" color="error"  onClick={startApplying}  variant="contained"
                                 >
                            Cancel
                         </Button>
                                     <div className="documents">
                                        <Typography sx={{textAlign: "center"}} fontWeight={600} variant="h6">Necessary documents</Typography>
                                    <div className="doc-fields">
                                    <div className="CV-container">
                                  
                                   
                                            <Button color="success" sx={{width: "215px", height:"50px"}} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
      CV
      <VisuallyHiddenInput type="file" accept={".pdf,.docx"} />
    </Button>
                                     </div>
                                     <div className="CL-container"><Button color="info" sx={{width: "215px", height:"50px"}} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
      Cover letter
      <VisuallyHiddenInput type="file" accept={".pdf,.docx"} />
    </Button></div></div>
                                    </div>
                                 </div>
                             ) : (
                                 <Button className="apply-button" disabled={!product.isActive} onClick={startApplying} variant="contained"
                                 >
                             Apply to this internship
                         </Button>
                             )}
                         </div></div>
                             </div>
                         
                         <div className="container-right">
                            <div className="internship-data">  {product.isActive === true ? (
                             <Typography>Active until: <span className="active">{new Date(product.activeUntil).toLocaleString()}</span></Typography>
                         ) : (
                             <h1>The listing is no longer active</h1>
                         )}
                        <Typography>Open positions: <span className="positions">{product.openPositions}</span></Typography></div>
                         {/* {isOwnProduct && (
                             <Button onClick={deleteListing} variant="contained" sx={{mt: 3, mb: 2}}>
                                 Delete Listing
                             </Button>
                         )} */}
                         
                         <div className="description-details">
                        <Typography fontWeight={700} variant="h6">Description</Typography>
                         <Typography>{product.description}</Typography>
                         </div>
                         </div>
                         </div>
                            
                         
                        </div>
                    )}
                </div>
            
        </>
    );
}

export default InternshipPage;
