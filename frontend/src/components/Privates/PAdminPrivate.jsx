import React, { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

const PAdminPrivate = ({ children }) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      {authContext.userInfos.role === "ADMIN" ? (
        <>{children}</>
      ) : (
        navigate("/login")
      )}
    </>
  );
};

export default PAdminPrivate;
