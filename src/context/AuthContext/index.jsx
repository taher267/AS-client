import React from "react";
const initialState = {
  user: null,
  loading: true,
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

  const dataCheck = async () => {
    try {
      const accessToken = await manageAccessToken();
      if (accessToken) {
        dispatch({ type: ACTIONS.LOADING_START });
        const { data } = await axiosPrivate.get("users/mine", {
          headers: { Authorization: accessToken },
        });
        dispatch({ type: ACTIONS.LOGIN, payload: data });
      } else {
        localStoreState.deleteAccessToken();
      }
    } catch (e) {
      console.log(e?.response?.data?.message || e.message);
    } finally {
      dispatch({ type: ACTIONS.LOADING_STOP });
    }
  };

  async function manageAccessToken() {}

  React.useEffect(() => {
    //   const accessToken = localStoreState.getAccessToken();
    //   if (!state.user && accessToken) {
    //     dataCheck();
    //   } else {
    //     dispatch({ type: ACTIONS.LOADING_STOP });
    //   }
  }, []);
  const logout = async () => {};

  const logout2 = () => {
    try {
      localStoreState.removeBoth();
      dispatch({ type: ACTIONS.LOGIN_OUT });
      dispatch({ type: ACTIONS.LOADING_STOP });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <AuthContext.Provider
      value={{ ...state, manageAccessToken, dispatch, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
