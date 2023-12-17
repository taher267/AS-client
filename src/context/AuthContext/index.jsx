import toast from "react-hot-toast";
import axios, { axiosPrivate } from "../../api/axios";
import React from "react";
import localStorageState from "../../utils/auth/localStorageState";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { DASHBOARD_PATH, HOME_PATH, SIGNIN_PATH } from "../../config";
import { jwtDecode } from "jwt-decode";

const initialState = {
  user: null,
  loading: true,
  googleLoading: false,
  authErr: null,
  isAuthenticated: false,
};

export const ACTIONS = {
  LOGIN: "LOGIN",
  LOGIN_OUT: "LOGIN_OUT",
  LOADING_START: "LOADING_START",
  GOOGLE_LOADING: "GOOGLE_LOADING",
  GOOGLE_AUTH_LOADING_START: "GOOGLE_AUTH_LOADING_START",
  GOOGLE_AUTH_LOADING_STOP: "GOOGLE_AUTH_LOADING_STOP",
  LOADING_STOP: "LOADING_STOP",
  UPDATE_CREDITS: "UPDATE_CREDITS",
  REDUCE_CREDITS: "REDUCE_CREDITS",
  UPDATE_USER: "UPDATE_USER",
};
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        ...action.payload,
      };

    case ACTIONS.LOADING_START:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.GOOGLE_LOADING:
      return {
        ...state,
        googleLoading: action.payload || false,
      };

    case ACTIONS.LOADING_STOP:
      return {
        ...state,
        loading: false,
      };
    case ACTIONS.GOOGLE_AUTH_LOADING_START:
      return {
        ...state,
        googleAuthLoading: true,
      };
    case ACTIONS.GOOGLE_AUTH_LOADING_STOP:
      return {
        ...state,
        googleAuthLoading: false,
      };
    case ACTIONS.LOGIN_OUT:
      return { ...initialState };

    default:
      return state;
  }
}
export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  console.log(state);
  const navigate = useNavigate();
  const dataCheck = async () => {
    try {
      const accessToken = await manageAccessToken();
      if (accessToken) {
        dispatch({ type: ACTIONS.LOADING_START });
        const { data } = await axiosPrivate.get("users/mine", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch({
          type: ACTIONS.LOGIN,
          payload: { user: data.data, isAuthenticated: true },
        });
      } else {
        localStorageState.deleteAccessToken();
      }
    } catch (e) {
      localStorageState.deleteAccessToken(); ////////////////////////////////////////////////REMOVE later
      console.log(e?.response?.data?.message || e.message);
    } finally {
      dispatch({ type: ACTIONS.LOADING_STOP });
    }
  };
  // const testRefeshToAccess = async () => {
  //   try {
  //     const { data } = await axiosPrivate.get("auth/refresh", {});
  //     console.log(data);
  //     const AT = data?.data?.accessToken;
  //     if (AT) {
  //       localStorageState.setAccessToken(AT);
  //       return AT;
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  async function manageAccessToken() {
    try {
      const localToken = localStorageState.getAccessToken();
      if (localToken) {
        const { exp } = jwtDecode(localToken);
        if (new Date(exp * 1000).valueOf() > Date.now()) {
          return localToken;
        }

        // RefreshToken to accessToken Start
        const { data } = await axiosPrivate.get("auth/refresh", {});
        const AT = data?.data?.accessToken;
        if (AT) {
          localStorageState.setAccessToken(AT);
          return AT;
        }
        // RefreshToken to accessToken End
      }
      console.log("no token");
    } catch (e) {
      console.log(e);
    }
  }
  // Google Signup
  const signupWithGoogle = async ({ access_token, id_token }) => {
    try {
      dispatch({ type: ACTIONS.GOOGLE_LOADING, payload: true });
      const { data } = await axiosPrivate.post(`auth/register-with-google`, {
        access_token,
        id_token,
      });
      const { accessToken, user } = data?.data || {};
      if (accessToken && user) {
        localStorageState.setAccessToken(accessToken);
        dispatch({
          type: ACTIONS.LOGIN,
          payload: { user, isAuthenticated: true },
        });
        toast.success(data.message, { duration: 2000 });
      } else {
        toast.error(`Something went Wrong!`, {
          position: "bottom-center",
          duration: 2000,
        });
      }
      dispatch({ type: ACTIONS.GOOGLE_LOADING });
      navigate(HOME_PATH);
    } catch (e) {
      let msg = e.response?.data?.message || e.message;
      const status = e?.response?.status;
      if (status === 500 && msg !== "Network Error") {
        msg = `Something going Wrong!`;
      }
      toast.error(msg, { position: "bottom-center", duration: 2000 });
      navigate(`${location.pathname}`);
      console.log(e);
      dispatch({ type: ACTIONS.GOOGLE_LOADING });
      // dispatch({ type: "", payload: e.message });
    }
  };
  // Google Signup
  const signinWithGoogle = async ({ access_token, id_token }) => {
    try {
      dispatch({ type: ACTIONS.GOOGLE_LOADING, payload: true });
      const { data } = await axiosPrivate.post(`auth/login-with-google`, {
        access_token,
        id_token,
      });
      const { accessToken, user } = data?.data || {};
      if (accessToken && user) {
        localStorageState.setAccessToken(accessToken);
        dispatch({
          type: ACTIONS.LOGIN,
          payload: { user, isAuthenticated: true },
        });
        toast.success(data.message, { duration: 2000 });
      } else {
        toast.error(`Something went Wrong!`, {
          position: "bottom-center",
          duration: 2000,
        });
      }
      dispatch({ type: ACTIONS.GOOGLE_LOADING });
      navigate(HOME_PATH);
    } catch (e) {
      let msg = e.response?.data?.message || e.message;
      const status = e?.response?.status;
      if (status === 500 && msg !== "Network Error") {
        msg = `Something going Wrong!`;
      }
      toast.error(msg, { position: "bottom-center", duration: 2000 });
      navigate(`${location.pathname}`);
      console.log(e);
      dispatch({ type: ACTIONS.GOOGLE_LOADING });
      // dispatch({ type: "", payload: e.message });
    }
  };

  React.useEffect(() => {
    if (!state.isAuthenticated) {
      manageAccessToken()
        .then(() => {
          dataCheck();
        })
        .catch((e) => {
          console.log(e);
          if (state.loading) {
            dispatch({ type: ACTIONS.LOADING_STOP });
          }
        });
    }
  }, [state.isAuthenticated]);

  const logout = async () => {
    try {
      dispatch({ type: ACTIONS.GOOGLE_LOADING, payload: true });
      const { data } = await axiosPrivate.delete(`auth/logout`);
      toast.success(data.message, {
        position: "bottom-center",
        duration: 2000,
      });
    } catch (e) {
      console.log(e);
    } finally {
      dispatch({ type: ACTIONS.LOGIN_OUT });
      navigate(SIGNIN_PATH);
      localStorageState.deleteAccessToken();
    }
  };

  const logout2 = () => {
    try {
      localStorageState.removeBoth();
      dispatch({ type: ACTIONS.LOGIN_OUT });
      dispatch({ type: ACTIONS.LOADING_STOP });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        manageAccessToken,
        dispatch,
        logout,
        signupWithGoogle,
        signinWithGoogle,
        // testRefeshToAccess,
      }}
    >
      {state?.loading ? (
        <div
          className="flex justify-center items-center h-full"
          style={{ height: "80vh" }}
        >
          <Loader />
        </div>
      ) : (
        <>{children}</>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
