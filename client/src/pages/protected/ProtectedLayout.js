import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ProtectedLayout = ({ children }) => {
  const navigate = useNavigate();
  const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;

  useEffect(() => {
    if (!accessToken) {
      return navigate("/");
    }
  }, [accessToken]);
  return children;
};
