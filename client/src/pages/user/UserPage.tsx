import React from "react";

function UserPage() {
  const userData = JSON.parse(localStorage.getItem("userData")!);

  return <div>
    <h1>{userData.username}</h1>
  </div>;
}

export default UserPage;
