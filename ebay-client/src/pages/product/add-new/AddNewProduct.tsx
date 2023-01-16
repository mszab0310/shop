import { Alert, AlertColor, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "src/components/Navbar";
import { addNewProduct, getProductConditions } from "../ProductApi";
import "./AddNewProduct.css";

function AddNewProduct() {
  const [productCondition, setProductCondition] = useState<string[]>([]);
  const [selectedProductCondition, setSelectedProductCondition] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [requestStatusMessage, setRequestStatusMessage] = useState<string>("");
  const [status, setStatus] = useState<AlertColor>("success");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const saveListing = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("productName");
    const description = formData.get("productDescription");
    const price = formData.get("productPrice");
    const product = {
      name: name as string,
      description: description as string,
      productCondition: selectedProductCondition,
      startingPrice: +price!,
      highestBid: 0,
      listedAt: new Date(Date.now()),
      biddingClosesOn: new Date(selectedDate!),
      isActive: true,
      sellerData: null,
      id: -1,
    };
    addNewProduct(product)
      .then(() => {
        setRequestStatusMessage("Product added successfully");
        setStatus("success");
        setShowAlert(true);
      })
      .catch((err: any) => {
        setRequestStatusMessage("Failed to add product, please try again! " + err.response.data.message);
        setStatus("error");
        setShowAlert(true);
      });
  };

  useEffect(() => {
    getProductConditions()
      .then((resp) => {
        setProductCondition(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleProductCondition = (event: SelectChangeEvent) => {
    setSelectedProductCondition(event.target.value as string);
  };

  const handleDateChange = (event: any) => {
    setSelectedDate(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="newProductPage">
        <Box component="form" onSubmit={saveListing} noValidate sx={{ mt: 4, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Grid container spacing={2} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Grid item xs={12}>
              <TextField hiddenLabel name="productName" label="Product name" id="productName" variant="filled" size="small" />
            </Grid>
            <Grid item xs={12}>
              <TextField id="productDescription" label="Description" name="productDescription" multiline rows={4} variant="filled" />
            </Grid>
            <Grid item xs={18}>
              <TextField
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                id="productPrice"
                label="Price"
                variant="filled"
                name="productPrice"
              />
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1, justifyContent: "space-between" }}>
              <Grid item xs={12} sm={2}>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-label">Condition</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedProductCondition}
                    label="Condition"
                    onChange={handleProductCondition}
                  >
                    {productCondition.map((condition) => (
                      <MenuItem value={condition} key={Math.random()}>
                        {condition}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Listing ends"
                  onChange={handleDateChange}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Add listing
              </Button>
              {showAlert ? <Alert severity={status}>{requestStatusMessage}</Alert> : <></>}
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}

export default AddNewProduct;
