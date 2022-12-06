import React, { useState } from "react";
import axios from "axios";

function HomePage() {
  const [data, setData] = useState<string>("");
  const getResource = async () => {
    await axios.get("/resource").then((resp: any) => {
      setData(resp.data);
    });
  };
  return (
    <div>
      <button onClick={getResource}>CLIK ME MF</button>
      <div>HomePage + {data}</div>
    </div>
  );
}

export default HomePage;
