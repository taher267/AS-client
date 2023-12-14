import google from "../../utils/auth";
import { Link, useLocation } from "react-router-dom";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { useAuth } from "../../context/AuthContext";
import React from "react";
import Loader from "../Loader";

const Signup = () => {
  const location = useLocation();
  const { loading } = useAuth();
  return (
    <section className="w-full flex justify-center">
      <div className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-sm mx-auto">
            <div className="text-center">
              <img
                className="w-auto h-12 mx-auto"
                src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
                alt=""
              />
              <h1 className="mt-12 text-3xl font-bold text-gray-900">
                Create free account
              </h1>
              <p className="mt-4 text-sm font-medium text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis
                morbi pulvinar venenatis non.
              </p>
            </div>
            <div className="mt-12">
              <GoogleAuth {...{ location, loading }} />
            </div>
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 text-sm text-gray-400 bg-white">
                  {" "}
                  or{" "}
                </span>
              </div>
            </div>
            <form action="#" method="POST" className="mt-4">
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name..."
                />

                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Email address"
                />
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Password (min. 8 character)"
                />

                <div className="relative flex items-center">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      name="remember-password"
                      id="remember-password"
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                    />
                  </div>
                  <div className="ml-3">
                    <label
                      htmlFor="remember-password"
                      className="text-sm font-medium text-gray-900"
                    >
                      {" "}
                      I agree to the{" "}
                      <a
                        href="#"
                        title=""
                        className="text-indigo-600 hover:underline"
                      >
                        Terms &amp; Conditions
                      </a>{" "}
                    </label>
                  </div>
                </div>

                <Button type="submit" className="bg-indigo-600">
                  Sign Up
                </Button>
              </div>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm font-medium text-gray-900">
                Already have an account?{" "}
                <Link className="font-bold hover:underline" to={`/signin`}>
                  Sign In new!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;

export const GoogleAuth = ({ loading }) => {
  const { signupWithGoogle, googleLoading } = useAuth();
  const { hash, pathname } = useLocation();
  React.useEffect(() => {
    if (hash) {
      // && !loading
      const str = hash.slice(1);
      const { access_token, id_token } = Object.fromEntries(
        new URLSearchParams(str).entries()
      );
      if (access_token && id_token) {
        signupWithGoogle({ access_token, id_token });
      }
    }
  }, [hash]);
  return (
    <Button
      // onClick={() => {
      //   const url = ;
      // }}
      disabled={loading || googleLoading}
      className=" text-gray-600  bg-white border border-gray-300 focus:ring-gray-500 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <img
        className="w-5 h-5 mr-2"
        src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/sign-in/1/google-logo.svg"
        alt=""
      />
      <Link
        to={google.getGoogleUrlForIdToken({
          route: pathname,
          uri: window.location.origin,
        })}
      >
        Sign up with Google {` `}
        {(googleLoading && <Loader />) || ""}
      </Link>
    </Button>
  );
};
