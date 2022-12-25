import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "src/components/Navbar";
import { Product } from "src/dto/ProductDTO";
import { getProductConditions } from "./ProductApi";

function AddNewProduct() {
  const [productCondition, setProductCondition] = useState<string[]>([]);
  const [selectedProductCondition, setSelectedProductCondition] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>();

  const saveListing = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("productName");
    const description = formData.get("productDescription");
    const price = formData.get("productPrice");
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
    console.log(event.target.value as Date);
    setSelectedDate(event.target.value);
  };

  return (
    <div>
      <Navbar />
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
          <Grid container spacing={2} sx={{ justifyContent: "center", mt: 1 }}>
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
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default AddNewProduct;
