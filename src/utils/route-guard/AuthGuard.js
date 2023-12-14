import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SIGNIN_PATH } from "../../config";
import { useAuth } from "../../context/AuthContext";

// project imports

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(SIGNIN_PATH, { replace: true });
    }
  }, [user, navigate]);

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
