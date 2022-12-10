import React, { useState } from "react";
import axios from "axios";
import Navbar from "./../../components/Navbar/Navbar";
const Stomp = require("react-stomp");

function HomePage() {
  var url = "http://localhost:8080/websocket-test/";
  var client = Stomp.client(url);

  const [data, setData] = useState<string>("");
  const jtw = localStorage.getItem("jwt");
  const authHeader = "Bearer " + jtw;

  var connect_callback = function () {
    // called back after the client is connected and authenticated to the STOMP server
    alert("connected");
  };

  var error_callback = function (error: any) {
    // display the error's message header:
    alert(error.headers.message);
  };

  var headers = {
    Authorization: authHeader,
  };
  const connectStomp = () => {
    client.connect(headers, connect_callback, error_callback);
  };

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
  return (
    <div>
      <Navbar />
      <button onClick={getResource}>CLIK ME MF</button>
      <button onClick={connectStomp}>Connect</button>
      <div>HomePage + {data}</div>
    </div>
  );
}

export default HomePage;
