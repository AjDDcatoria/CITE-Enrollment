import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const user = useSelector((state) => state.auth?.userData);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (user.id !== id) {
      return navigate("Error");
    }
  }, [id]);

  return children;
}

export default ProtectedRoutes;
