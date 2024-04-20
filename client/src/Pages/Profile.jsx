import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../Components/Profile/Sidebar.jsx";
import Card_Profile from "../Components/Profile/Card_Profile.jsx";
function Profile() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const myParam = urlParams.get("pro");
    if (myParam) {
      setTab(myParam);
    }
  }, [location.search]);
  return (
    <div className="md:flex">
      <div>
        <Sidebar />
      </div>
      {tab === "profile" && <Card_Profile />}
    </div>
  );
}

export default Profile;
