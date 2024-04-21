import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SidebarDashboard from "../Components/Dashboard/Sidebar-Dashboard";
import AdminDashboard from "./AdminSide/AdminDashboard";
import { useSelector } from "react-redux";
import CreateMenu from "./AdminSide/EditMenu/CreateMenu";
function Profile() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const myParam = urlParams.get("tab");
    if (myParam) {
      setTab(myParam);
    }
  }, [location.search]);
  return (
    <>
      {currentUser.message.user.isAdmin && (
        <div className="md:flex">
          <div>
            <SidebarDashboard />
          </div>

          {tab === "dashboard" && <AdminDashboard />}
          {tab === "createMenu" && <CreateMenu />}
          
        </div>
      )}
    </>
  );
}

export default Profile;
