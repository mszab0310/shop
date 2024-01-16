import {Alert, AlertColor, Box, Button, Grid, SelectChangeEvent, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import Navbar from "src/components/Navbar";
import {addNewProduct} from "../InternshipApi";
import "./AddNewInternship.css";

function AddNewInternship() {
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [requestStatusMessage, setRequestStatusMessage] = useState<string>("");
    const [status, setStatus] = useState<AlertColor>("success");
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const saveListing = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get("internshipName");
        const description = formData.get("internshipDescription");
        const internshipPositions = formData.get("internshipPositions");
        const product = {
            name: name as string,
            description: description as string,
            companyName: "",
            openPositions: +internshipPositions!,
            listedAt: new Date(Date.now()),
            activeUntil: new Date(selectedDate!),
            isActive: true,
            recruiterData: null,
            id: -1,
            userID: null
        };
        addNewProduct(product)
            .then(() => {
                setRequestStatusMessage("Listing added successfully");
                setStatus("success");
                setShowAlert(true);
            })
            .catch((err: any) => {
                setRequestStatusMessage("Failed to add Listing, please try again! " + err.response.data.message);
                setStatus("error");
                setShowAlert(true);
            });
    };

    const handleDateChange = (event: any) => {
        setSelectedDate(event.target.value);
    };

    return (
        <>
            <Navbar/>
            
                <Box component="form" onSubmit={saveListing} noValidate
                     sx={{mt: 2, ml: "0.5em", mr: "0.5em" }}>
                
                
                <div className="new-internship-data">
                <TextField className="title-new" hiddenLabel name="internshipName" label="Internship Title" id="internshipName"
                                       variant="outlined" size="small"/>
    <div className="info-new">
    <div className="info-left-new">
    <div className="image-new"></div>
      

       <TextField
       className="date-new"
           type="datetime-local"
           InputLabelProps={{
               shrink: true,
           }}
           label="Applications open until"
           onChange={handleDateChange}
       />

           <div className="actions-new">   
           
            <TextField
            sx={{width: "215px"}}
       inputProps={{inputMode: "numeric", pattern: "[0-9]*"}}
       id="internshipPositions"
       label="Positions"
       variant="outlined"
       name="internshipPositions"
        />

       <Button type="submit" variant="contained" sx={{width: "215px"}}>
        Add listing
            </Button>
           
            
            </div>
            <div className=""> {showAlert ? <Alert severity={status}>{requestStatusMessage}</Alert> : <></>}</div>
         </div>
         <div className="info-right-new">
            <TextField id="internshipDescription" label="Description" name="internshipDescription"
    multiline rows={22} variant="outlined" className="description-new"/>
    </div>
 

                </div>
                  
                      </div>
    
                </Box>
          
        </>
    );
}

export default AddNewInternship;


