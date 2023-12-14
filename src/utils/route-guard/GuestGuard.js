import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { DASHBOARD_PATH } from "../../config";

// project imports

// ==============================|| GUEST GUARD ||============================== //

/**
 * Guest guard for routes having no auth required
 */

const GuestGuard = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate(DASHBOARD_PATH, { replace: true });
    } else if (user) {
      // navigate(UNAUTH_PATH, { replace: true });
    }
  }, [user, navigate]);

  return children;
};

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default GuestGuard;
