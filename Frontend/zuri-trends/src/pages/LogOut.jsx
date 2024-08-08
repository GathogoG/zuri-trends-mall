import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function LogOut() {
  const navigate = useNavigate();

  useEffect(() => {
  
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("userSession"); 

    toast.success("You have been logged out!");

  
    navigate("/login");
  }, [navigate]);

  return (
    <div className="logout-container">
      <h2>Logging out...</h2>
    </div>
  );
}

export default LogOut;
