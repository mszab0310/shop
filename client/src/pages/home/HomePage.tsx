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
      .get("http://localhost:8080/resource", {
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
        "http://localhost:8080/api/private/products/new",
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
    </div>
  );
}

export default HomePage;
