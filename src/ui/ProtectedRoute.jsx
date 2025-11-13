import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. Load the authenticated user
  const { user, isLoading, isAuthenticated } = useUser();
  // 2. While loading, show a spinner

  // 3. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 4. If there is a user, renderthe app

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
