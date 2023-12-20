import { Link, useLocation } from "react-router-dom";
import google from "../../utils/auth";
import Button from "../UI/Button";
import { Controller, useForm } from "react-hook-form";
import RHFInput from "../UI/RHFInput";
import GoogleIcon from "../../Icons/GoogleIcon";
import Loader from "../Loader";
import { useAuth } from "../../context/AuthContext";
import React from "react";

const Signin = () => {
  const { handleSubmit, control, formState } = useForm();
  const onSubmit = async () => {};
  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative max-w-md mx-auto lg:max-w-lg">
          <div className="absolute -inset-2">
            <div
              className="w-full h-full mx-auto rounded-3xl opacity-30 blur-lg filter"
              style={{
                background:
                  "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
              }}
            />
          </div>
          <div className="relative overflow-hidden bg-white shadow-xl rounded-xl">
            <div className="px-4 py-6 sm:px-8">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900 font-pj">
                  Sign in
                </h1>
                <p className="text-base font-normal text-gray-900 font-pj">
                  Don’t have an account?{" "}
                  <Link
                    to={`#`}
                    className="font-bold rounded hover:underline focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    Join now
                  </Link>
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-12">
                <div className="space-y-4">
                  <RHFInput
                    {...{
                      control,
                      Controller,
                      name: "username",
                      placeholder: "Enter username...",
                      label: "Username",
                      // defaultValue:'Name'
                    }}
                  />

                  <RHFInput
                    {...{
                      control,
                      Controller,
                      name: "password",
                      placeholder: "Enter password...",
                      label: "Password",
                      type: "password",
                      // defaultValue:'Name'
                    }}
                  />

                  <div className="relative flex items-center mt-4 justify-between">
                    <div className="flex">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          name="terms"
                          id="terms"
                          className="w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                        />
                      </div>
                      <div className="ml-3 text-base">
                        <label
                          htmlFor="terms"
                          className="font-normal text-gray-900 font-pj"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>

                    <Link
                      to={`#`}
                      className="text-base font-medium text-gray-500 rounded font-pj hover:text-gray-900 hover:underline focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                <Button type="submit" className="bg-gray-900 mt-5">
                  Sign In
                </Button>
                {/* <button
                  type="submit"
                  className=" mt-5 text-base font-bold text-white transition-all duration-200  border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-gray-600"
                >
                  Sign in
                </button> */}
              </form>
              <svg
                className="w-auto h-4 mx-auto mt-8 text-gray-300"
                viewBox="0 0 172 16"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  y1="-0.5"
                  x2="18.0278"
                  y2="-0.5"
                  transform="matrix(-0.5547 0.83205 0.83205 0.5547 11 1)"
                />
                <line
                  y1="-0.5"
                  x2="18.0278"
                  y2="-0.5"
                  transform="matrix(-0.5547 0.83205 0.83205 0.5547 46 1)"
                />
                <line
                  y1="-0.5"
                  x2="18.0278"
                  y2="-0.5"
                  transform="matrix(-0.5547 0.83205 0.83205 0.5547 81 1)"
                />
                <line
                  y1="-0.5"
                  x2="18.0278"
                  y2="-0.5"
                  transform="matrix(-0.5547 0.83205 0.83205 0.5547 116 1)"
                />
                <line
                  y1="-0.5"
                  x2="18.0278"
                  y2="-0.5"
                  transform="matrix(-0.5547 0.83205 0.83205 0.5547 151 1)"
                />
                <line
                  y1="-0.5"
                  x2="18.0278"
                  y2="-0.5"
                  transform="matrix(-0.5547 0.83205 0.83205 0.5547 18 1)"
                />
                <line
                  y1="-0.5"
                  x2="18.0278"
                  y2="-0.5"
                  transform="matrix(-0.5547 0.83205 0.83205 0.5547 53 1)"
                />
                <line
                  y1="-0.5"
                  x2="18.0278"
                  y2="-0.5"
                  transform="matrix(-0.5547 0.83205 0.83205 0.5547 88 1)"
                />
                <line
                  y1="-0.5"
                  x2="18.0278"
                  y2="-0.5"
                  transform="matrix(-0.5547 0.83205 0.83205 0.5547 123 1)"
                />
                <line
                  y1="-0.5"
                  x2="18.0278"
                  y2="-0.5"
                  transform="matrix(-0.5547 0.83205 0.83205 0.5547 158 1)"
                />
                <line
                  y1="-0.5"
                  x2="18.0278"
                  y2="-0.5"
                  transform="matrix(-0.5547 0.83205 0.83205 0.5547 25 1)"
                />
                <line
                  y1="-0.5"
                  x2="18.0278"
                  y2="-0.5"
                  transform="matrix(-0.5547 0.83205 0.83205 0.5547 60 1)"
                />
                <line
                  y1="-0.5"
                  x2="18.0278"
                  y2="-0.5"
                  transform="matrix(-0.5547 0.83205 0.83205 0.5547 95 1)"
                />
                <line
                  y1="-0.5"
                  x2="18.0278"
                  y2="-0.5"
                  transform="matrix(-0.5547 0.83205 0.83205 0.5547 130 1)"
                />
                <line
                  y1="-0.5"
                  x2="18.0278"
                  y2="-0.5"
                  transform="matrix(-0.5547 0.83205 0.83205 0.5547 165 1)"
                />
                <line
                  y1="-0.5"
                  x2="18.0278"
                  y2="-0.5"
                  transform="matrix(-0.5547 0.83205 0.83205 0.5547 32 1)"
                />
                <line
                  y1="-0.5"
                  x2="18.0278"
                  y2="-0.5"
                  transform="matrix(-0.5547 0.83205 0.83205 0.5547 67 1)"
                />
                <line
                  y1="-0.5"
                  x2="18.0278"
                  y2="-0.5"
                  transform="matrix(-0.5547 0.83205 0.83205 0.5547 102 1)"
                />
                <line
                  y1="-0.5"
                  x2="18.0278"
                  y2="-0.5"
                  transform="matrix(-0.5547 0.83205 0.83205 0.5547 137 1)"
                />
                <line
                  y1="-0.5"
                  x2="18.0278"
                  y2="-0.5"
                  transform="matrix(-0.5547 0.83205 0.83205 0.5547 172 1)"
                />
                <line
                  y1="-0.5"
                  x2="18.0278"
                  y2="-0.5"
                  transform="matrix(-0.5547 0.83205 0.83205 0.5547 39 1)"
                />
                <line
                  y1="-0.5"
                  x2="18.0278"
                  y2="-0.5"
                  transform="matrix(-0.5547 0.83205 0.83205 0.5547 74 1)"
                />
                <line
                  y1="-0.5"
                  x2="18.0278"
                  y2="-0.5"
                  transform="matrix(-0.5547 0.83205 0.83205 0.5547 109 1)"
                />
                <line
                  y1="-0.5"
                  x2="18.0278"
                  y2="-0.5"
                  transform="matrix(-0.5547 0.83205 0.83205 0.5547 144 1)"
                />
              </svg>
              <GoogleAuth />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;

export const GoogleAuth = ({ loading }) => {
  const { signinWithGoogle, googleLoading } = useAuth();
  const { hash, pathname } = useLocation();
  React.useEffect(() => {
    if (hash) {
      // && !loading
      const str = hash.slice(1);
      const { access_token, id_token } = Object.fromEntries(
        new URLSearchParams(str).entries()
      );
      if (access_token && id_token) {
        signinWithGoogle({ access_token, id_token });
      }
    }
  }, [hash]);
  return (
    <>
      <Button
        disabled={loading || googleLoading}
        className="px-8 py-4 mt-8 text-base font-bold bg-gray-400 border border-transparent rounded-xl hover:bg-gray-300 focus:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 font-pj"
        role="button"
      >
        <GoogleIcon />{" "}
        <Link
          to={google.getGoogleUrlForIdToken({
            route: pathname,
            uri: window.location.origin,
          })}
        >
          {` `} Sign in with Google {` `}
          {(googleLoading && <Loader />) || ""}
        </Link>
      </Button>
    </>
  );
};
