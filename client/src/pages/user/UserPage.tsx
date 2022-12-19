import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { UserData } from "../../dto/UserData";
import { getCurrentUser } from "./userApi";

function UserPage() {
  const [userdata, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getCurrentUser().then((resp) => {
      console.log(resp.data);
      setUserData(resp.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Navbar />
      {!loading ? (
        <div>
          <h1>Hello {userdata?.username}</h1>
          <h1>
            {userdata?.firstname} {userdata?.lastName}
          </h1>
          <h1>{userdata?.email}</h1>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
}

export default UserPage;
