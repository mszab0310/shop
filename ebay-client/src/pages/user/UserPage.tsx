import React, {useEffect, useState} from "react";
import Navbar from "../../components/Navbar";
import {UserData} from "../../dto/UserData";
import DataTable from "./DataTable";
import {getCurrentUser, getProductsForUser} from "./userApi";
import "./UserPage.css";
import {Internship} from "../../dto/InternshipDTO";
import {Typography} from "@mui/material";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import {ExpansionPanelDetails, ExpansionPanelSummary} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function UserPage() {
    const [userdata, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<Internship[]>([]);

    useEffect(() => {
        getCurrentUser().then((resp) => {
            console.log(resp.data);
            setUserData(resp.data);
            setLoading(false);
        });
        getProductsForUser().then((res) => {
            setProducts(res.data);
        });

    }, []);

    return (
        <>
            <Navbar/>
            <div className="userPage">
                {!loading ? (
                    <div>
                        <h1>Hello {userdata?.username}</h1>
                        <h1>
                            {userdata?.firstname} {userdata?.lastName} {userdata?.id}
                        </h1>
                        <h1>{userdata?.email}</h1>
                        <h1>{userdata?.role == "ROLE_USER" ? "Student" : "Recruiter"}</h1>
                    </div>
                ) : (
                    <h1>Loading</h1>
                )}
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        // eslint-disable-next-line react/jsx-no-undef
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Your listings</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <DataTable internships={products}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        </>
    );
}

export default UserPage;
