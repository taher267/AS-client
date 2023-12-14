import toast from "react-hot-toast";
import axios, { axiosPrivate } from "../../api/axios";
import React from "react";
import localStorageState from "../../utils/auth/localStorageState";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

const initialState = {
  user: null,
  loading: true,
  authErr: null,
};

export const ACTIONS = {
  LOGIN: "LOGIN",
  LOGIN_OUT: "LOGIN_OUT",
  LOADING_START: "LOADING_START",
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
        dispatch({ type: ACTIONS.LOGIN, payload: { user: data.data } });
      } else {
        localStorageState.deleteAccessToken();
      }
    } catch (e) {
      localStorageState.deleteAccessToken();////////////////////////////////////////////////REMOVE later
      console.log(e?.response?.data?.message || e.message);
    } finally {
      dispatch({ type: ACTIONS.LOADING_STOP });
    }
  };

  async function manageAccessToken() {
    return localStorageState.getAccessToken();
  }

  const signupWithGoogle = async ({ access_token, id_token }) => {
    try {
      const { data } = await axiosPrivate.post(`auth/register-with-google`, {
        access_token,
        id_token,
      });
      const { accessToken, user } = data?.data || {};
      if (accessToken && user) {
        localStorageState.setAccessToken(accessToken);
        toast.success(data.message, { duration: 2000 });
      } else {
        toast.error(`Something went Wrong!`, {
          position: "bottom-center",
          duration: 2000,
        });
      }
    } catch (e) {
      let msg = e.response?.data?.message || e.message;
      const status = e?.response?.status;
      if (status === 500 && msg !== "Network Error") {
        msg = `Something going Wrong!`;
      }
      toast.error(msg, { position: "bottom-center", duration: 2000 });
      navigate(`${location.pathname}`);
      console.log(e);
      // dispatch({ type: "", payload: e.message });
    }
  };
  React.useEffect(() => {
    const accessToken = localStorageState.getAccessToken();
    if (!state.user && accessToken) {
      dataCheck();
    } else {
      dispatch({ type: ACTIONS.LOADING_STOP });
    }
  }, []);
  const logout = async () => {};

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
      }}
    >
      {state?.loading ? <Loader /> : <>{children}</>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
