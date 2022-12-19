import React, { useEffect, useState } from "react";
import { UserData } from "../../dto/UserData";
import { getCurrentUser } from "./userApi";

function UserPage() {
  const [userdata, setUserData] = useState<UserData>();

  useEffect(() => {
    getCurrentUser().then((resp) => {
      console.log(resp.data);
      setUserData(resp.data);
    });
  }, []);

  return (
    <div>
      <h1>User</h1>
    </div>
  );
}

export default UserPage;
