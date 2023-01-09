import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

function HomePage() {
  const [data, setData] = useState<string>("");
  const getResource = async () => {
    const token = localStorage.getItem("jwt");
    const header = "Bearer " + token;
    await axios({
      method: "get",
      url: "http://localhost:8080/resource",
      headers: {
        Authorization: header,
      },
    }).then((resp: any) => {
      setData(resp.data);
    });
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
