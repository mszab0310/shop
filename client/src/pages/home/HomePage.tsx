import React, { useState } from "react";
import axios from "axios";
import Navbar from "./../../components/Navbar/Navbar";
import { Box, Button, Grid, TextField } from "@mui/material";

function HomePage() {
  const [data, setData] = useState<string>("");
  const getResource = async () => {
    const token = localStorage.getItem("jwt");
    const header = "Bearer " + token;
    await axios
      .get("/resource", {
        headers: {
          Authorization: header,
        },
      })
      .then((resp: any) => {
        setData(resp.data);
      });
  };

  const saveListing = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const token = localStorage.getItem("jwt");
    const header = "Bearer " + token;
    const name = formData.get("productName");
    const desrpition = formData.get("productDescription");
    const price = formData.get("productPrice");
    axios
      .post(
        "/api/private/products/new",
        { name: name, description: desrpition, startingPrice: price },
        {
          headers: {
            Authorization: header,
          },
        }
      )
      .then(() => console.log("Product added"))
      .catch((error) => console.log(error.message));
  };

  return (
    <div>
      <Navbar />
      <button onClick={getResource}>CLIK ME </button>
      <div>HomePage {data}</div>
      <Box component="form" onSubmit={saveListing} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField hiddenLabel name="productName" label="Product name" id="productName" variant="filled" size="small" />
          </Grid>
          <Grid item xs={12}>
            <TextField id="productDescription" label="Description" name="productDescription" multiline rows={4} variant="filled" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              id="productPrice"
              label="Price"
              variant="filled"
              name="productPrice"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Add listing
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default HomePage;
