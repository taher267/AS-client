import { Link } from "react-router-dom";

import Button from "../UI/Button";
import { Controller, useForm } from "react-hook-form";
import RHFInput from "../UI/RHFInput";

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
              <Button
                className="
                      px-8
                      py-4
                      mt-8
                      text-base
                      font-bold
                      bg-gray-400
                      border border-transparent
                      rounded-xl
                      hover:bg-gray-300
                      focus:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200
                      font-pj
                  "
                role="button"
              >
                <svg
                  className="w-5 h-5 mr-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.2436 8.26113L11.0858 8.26074C10.7256 8.26074 10.4336 8.5527 10.4336 8.91293V11.519C10.4336 11.8791 10.7256 12.1712 11.0858 12.1712H15.6798C15.1767 13.4767 14.2378 14.57 13.0399 15.2647L14.9988 18.6557C18.1411 16.8384 19.9988 13.6497 19.9988 10.0803C19.9988 9.57203 19.9613 9.20871 19.8864 8.79961C19.8295 8.48879 19.5596 8.26113 19.2436 8.26113Z"
                    fill="#167EE6"
                  />
                  <path
                    d="M9.99957 16.0871C7.75137 16.0871 5.78871 14.8587 4.73461 13.041L1.34375 14.9955C3.06934 17.9862 6.30191 20.0001 9.99957 20.0001C11.8135 20.0001 13.5251 19.5117 14.9996 18.6606V18.6559L13.0407 15.2649C12.1447 15.7846 11.1078 16.0871 9.99957 16.0871Z"
                    fill="#12B347"
                  />
                  <path
                    d="M15 18.6603V18.6557L13.0411 15.2646C12.1451 15.7843 11.1083 16.0868 10 16.0868V19.9998C11.8139 19.9998 13.5256 19.5114 15 18.6603Z"
                    fill="#0F993E"
                  />
                  <path
                    d="M3.91305 10.0002C3.91305 8.89207 4.21547 7.85531 4.73504 6.95934L1.34418 5.00488C0.488359 6.47469 0 8.18164 0 10.0002C0 11.8188 0.488359 13.5258 1.34418 14.9956L4.73504 13.0411C4.21547 12.1452 3.91305 11.1084 3.91305 10.0002Z"
                    fill="#FFD500"
                  />
                  <path
                    d="M9.99957 3.91305C11.4656 3.91305 12.8123 4.43398 13.8641 5.30051C14.1236 5.51426 14.5007 5.49883 14.7384 5.26113L16.5849 3.41465C16.8546 3.14496 16.8354 2.70352 16.5473 2.45359C14.785 0.924726 12.492 0 9.99957 0C6.30191 0 3.06934 2.01395 1.34375 5.00465L4.73461 6.9591C5.78871 5.14141 7.75137 3.91305 9.99957 3.91305Z"
                    fill="#FF4B26"
                  />
                  <path
                    d="M13.8645 5.30051C14.124 5.51426 14.5012 5.49883 14.7389 5.26113L16.5854 3.41465C16.855 3.14496 16.8358 2.70352 16.5477 2.45359C14.7854 0.924688 12.4925 0 10 0V3.91305C11.466 3.91305 12.8127 4.43398 13.8645 5.30051Z"
                    fill="#D93F21"
                  />
                </svg>
                Sign in with Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
