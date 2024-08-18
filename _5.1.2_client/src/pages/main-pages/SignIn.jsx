import { useNavigate, Link } from "react-router-dom";
import bookMyShowLogo from "../../assets/bookmyshow1.png";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import cl from "../../utility/cl";
import { FaAd, FaBeer, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import Cookies from "js-cookie";
import { useNotificationsHook } from "../../context/NotificationProvider";
import "./SignIn.css";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const baseUrl = `http://localhost:3501`;
const secondUrl = `/bms/api/v1`;
const thirdUrl = `/user`;
const mergedUrl = `${baseUrl}${secondUrl}${thirdUrl}`;

const validateEmail = (email, regex) => {
  return regex.test(email);
};

export const LoadingComponent = () => {
  const svgStyle = {
    animation: "spin 1s linear infinite",
    width: "40",
    height: "40",
  };
  const keyFrames = `@keyframes spin {
  0% {transform : rotate(0deg);}
  100% {transform : rotate (360deg);}
  }`;
  return (
    <>
      <svg
        className="spin"
        width={`40`}
        height={`40`}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M7.706 0.290 C 7.484 0.362,7.356 0.490,7.294 0.699 C 7.259 0.816,7.253 1.088,7.253 2.508 C 7.253 4.389,7.251 4.365,7.443 4.557 C 7.700 4.813,8.300 4.813,8.557 4.557 C 8.749 4.365,8.747 4.389,8.747 2.508 C 8.747 0.688,8.744 0.656,8.596 0.480 C 8.472 0.333,8.339 0.284,8.040 0.276 C 7.893 0.272,7.743 0.278,7.706 0.290 M2.753 2.266 C 2.595 2.338,2.362 2.566,2.281 2.728 C 2.197 2.897,2.193 3.085,2.269 3.253 C 2.343 3.418,4.667 5.750,4.850 5.843 C 5.109 5.976,5.375 5.911,5.643 5.649 C 5.907 5.391,5.977 5.111,5.843 4.850 C 5.750 4.667,3.418 2.343,3.253 2.269 C 3.101 2.200,2.901 2.199,2.753 2.266 M12.853 2.282 C 12.730 2.339,12.520 2.536,11.518 3.541 C 10.597 4.464,10.316 4.762,10.271 4.860 C 10.195 5.025,10.196 5.216,10.272 5.378 C 10.342 5.528,10.572 5.764,10.727 5.845 C 10.884 5.927,11.117 5.926,11.280 5.843 C 11.447 5.757,13.757 3.447,13.843 3.280 C 13.926 3.118,13.927 2.884,13.846 2.729 C 13.764 2.572,13.552 2.364,13.392 2.283 C 13.213 2.192,13.048 2.192,12.853 2.282 M0.699 7.292 C 0.404 7.385,0.258 7.620,0.258 7.999 C 0.259 8.386,0.403 8.618,0.698 8.706 C 0.816 8.741,1.079 8.747,2.508 8.747 C 3.997 8.747,4.196 8.742,4.318 8.702 C 4.498 8.644,4.644 8.498,4.702 8.318 C 4.788 8.053,4.745 7.677,4.608 7.491 C 4.578 7.451,4.492 7.384,4.417 7.343 L 4.280 7.267 2.547 7.261 C 1.152 7.257,0.791 7.263,0.699 7.292 M11.745 7.278 C 11.622 7.308,11.452 7.411,11.392 7.492 C 11.255 7.677,11.212 8.053,11.298 8.318 C 11.356 8.498,11.502 8.644,11.682 8.702 C 11.804 8.742,12.003 8.747,13.492 8.747 C 14.921 8.747,15.184 8.741,15.302 8.706 C 15.597 8.618,15.741 8.386,15.742 7.999 C 15.742 7.614,15.595 7.383,15.290 7.291 C 15.187 7.260,14.864 7.254,13.496 7.256 C 12.578 7.258,11.790 7.268,11.745 7.278 M4.853 10.282 C 4.730 10.339,4.520 10.536,3.518 11.541 C 2.597 12.464,2.316 12.762,2.271 12.860 C 2.195 13.025,2.196 13.216,2.272 13.378 C 2.342 13.528,2.572 13.764,2.727 13.845 C 2.884 13.927,3.117 13.926,3.280 13.843 C 3.447 13.757,5.757 11.447,5.843 11.280 C 5.926 11.118,5.927 10.884,5.846 10.729 C 5.764 10.572,5.552 10.364,5.392 10.283 C 5.213 10.192,5.048 10.192,4.853 10.282 M10.753 10.266 C 10.595 10.338,10.362 10.566,10.281 10.728 C 10.197 10.897,10.193 11.085,10.269 11.253 C 10.343 11.418,12.667 13.750,12.850 13.843 C 13.109 13.976,13.375 13.911,13.643 13.649 C 13.907 13.391,13.977 13.111,13.843 12.850 C 13.750 12.667,11.418 10.343,11.253 10.269 C 11.101 10.200,10.901 10.199,10.753 10.266 M7.745 11.277 C 7.620 11.309,7.451 11.412,7.392 11.492 C 7.254 11.678,7.253 11.691,7.253 13.489 C 7.253 14.921,7.259 15.184,7.294 15.302 C 7.382 15.597,7.615 15.741,8.000 15.741 C 8.385 15.741,8.618 15.597,8.706 15.302 C 8.768 15.090,8.767 11.875,8.704 11.690 C 8.644 11.514,8.575 11.430,8.420 11.346 C 8.310 11.286,8.246 11.271,8.057 11.264 C 7.930 11.259,7.790 11.265,7.745 11.277 "
            stroke="none"
            fillRule="evenodd"
            fill="#3949ab"
          ></path>
        </g>
      </svg>
    </>
  );
};

export default function SignInComponent() {
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isErrorOnVerifyEmail, setIsErrorOnVerifyEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [isErrorOnVerifyPassword, setIsErrorOnVerifyPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [status, setStatus] = useState("IDLE");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const notify = useNotificationsHook();
  const emailRef = useRef(null);

  useEffect(() => {
    if (isErrorOnVerifyEmail || status === "SUBMITTING") {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [isErrorOnVerifyEmail, status]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChangeEmail = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    if (!validateEmail(inputEmail, emailRegex)) {
      setIsErrorOnVerifyEmail(true);
      setEmailMessage("Email format is not valid");
    } else {
      setIsErrorOnVerifyEmail(false);
      setEmailMessage("");
    }
    // if (!verifyEmail(inputEmail)) {
    //   setIsErrorOnVerifyEmail(true);
    //   setEmailMessage(
    //     "Email Id is not in our system. Please sign up or use forgot password in case u forgot your password"
    //   );
    // } else {
    //   setIsErrorOnVerifyEmail(false);
    //   setEmailMessage(
    //     `Welcome 🥰 We are glad to see you again. Hope you are good.`
    //   );
    // }
  };

  const handleBlurEmail = async () => {
    const emailValue = emailRef.current.value;
    try {
      const dbResponse = await axios.post(`${mergedUrl}/validateemail`, {
        email: emailValue,
      });

      const doesExist = dbResponse.data.count;
      if (doesExist) {
        setIsErrorOnVerifyEmail(false);
        setEmailMessage(
          `Welcome 🥰 Glad to see you here again !!! Hope you are doing good.`
        );
      } else {
        setIsErrorOnVerifyEmail(true);
        setEmailMessage(
          "Email Id is not in our system. Please sign up or use forgot password in case u forgot your password"
        );
      }
    } catch (error) {
      if (error.response) {
        setEmailMessage(
          `Error while verifying the email .Validation from API response ${error.response.data}`
        );
        setIsErrorOnVerifyEmail(true);
      } else if (error.request) {
        setEmailMessage(
          `Error while verifying the emailRequest sent but no response received. ${error.request}`
        );
        setIsErrorOnVerifyEmail(true);
      } else {
        setEmailMessage(
          `Something broke! Error while verifying the email .This could be a network issue or glitch or any other kind of server or package error.`
        );
        setIsErrorOnVerifyEmail(true);
      }
    }
  };

  const handleChangePassword = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
  };

  const handleSignIn = async (e) => {
    //const token = "NA";
    setErrorMessage("");
    e.preventDefault();
    setStatus("SUBMITTING");

    const userBody = {
      email: email,
      password: password,
    };
    const configSignInAxios = {
      url: `${mergedUrl}/signin`,
      method: "POST",
      data: userBody,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    try {
      // cl("inside try before making request ", email, password);
      const dbResponse = await axios(configSignInAxios);
      // cl("Day 15.1", dbResponse);
      // if (!dbResponse) {
      //   throw new Error({
      //     message: ` 500 server . Connection is refused or Server is unavailable.`,
      //   });
      // }
      if (dbResponse.data) {
        const now = new Date();
        const expiresInSeconds = 60 * 60;
        now.setTime(now.getTime() + expiresInSeconds * 1000);
        Cookies.set("token", dbResponse.data.tokenInfo, {
          expires: now,
          path: "/",
        });
        //cl("Cookies token inside signin", Cookies.get("token"));
        cl("expiring time", now);
      }
      //cl(dbResponse.data);
      const emitSuccessNotification = {
        type: "green",
        message: `Signin has been successful.`,
      };
      notify.addNotification(emitSuccessNotification, 5000);
      navigate("/authc/profile");
    } catch (error) {
      if (error.response) {
        // Server responded with a status code out of the range of 2xx
        const statusCode = error.response.status;

        if (statusCode >= 400 && statusCode < 500) {
          // Handle client-side errors (4xx status codes)
          setErrorMessage(
            `Client Error: ${error.response.data.message} . Please re-enter or correct the credentials or use Forgot Password.`
          );
          const emitFailedNotification = {
            type: "red",
            message: `Client Error: ${error.response.data.message} . Please re-enter or correct the credentials or use Forgot Password.`,
          };
          notify.addNotification(emitFailedNotification, 300000);
        } else if (statusCode >= 500) {
          // Handle server-side errors (5xx status codes)
          setErrorMessage(
            `Server Error: ${error.response.data.message} . Please try again later.`
          );
          const emitFailedNotification = {
            type: "red",
            message: `Server Error: ${error.response.data.message} . Please try again later.`,
          };
          notify.addNotification(emitFailedNotification, 300000);
        }

        navigate("/signin");
        setHasError(false); // Trigger error state
        setStatus("IDLE");
      } else if (error.request) {
        // Request was made but no response was received

        setErrorMessage(
          <>
            Network Error: Could not reach the server. Please check your network
            connection or try again later or Please check if the server is
            running or not. <br />
            {`Status : ${error.request.status}`}. Here , 0 means the server is
            unreachable.
            <br />
            {`Status Text : ${
              error.request.statusText
                ? error.request.statusText
                : " No Status Text for this "
            }`}{" "}
            . In case the server is unreachable , the status text will be empty.
          </>
        );

        const emitFailedNotification = {
          type: "red",
          message: `Network Error: Could not reach the server. Please check your network
            connection or try again later or Please check if the server is
            running or not. Status : ${error.request.status}, Status Text : ${error.request.statusText}`,
        };
        notify.addNotification(emitFailedNotification, 300000);

        setHasError(false);
        setStatus("IDLE");
      } else {
        // Something else happened while setting up the request
        setErrorMessage(
          `Unexpected Error: ${error.message}. This could be due to a network or server issue.`
        );
        const emitFailedNotification = {
          type: "red",
          message: `Unexpected Error: ${error.message}. This could be due to a network or server issue.`,
        };
        notify.addNotification(emitFailedNotification, 300000);
        setHasError(false);
        setStatus("IDLE");
      }
    }
  };

  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      <div className="relative top-2 left-3 border border-indigo-100 w-[2vw] h-[10vh] shadow-md bg-slate-50 flex flex-col justify-evenly items-center  m-2 ">
        <FaBeer className="cursor-not-allowed" />
        <FaAd className="cursor-not-allowed" />
        <Link to="/signin/settings">
          <IoIosSettings className="cursor-pointer" />
        </Link>
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src={bookMyShowLogo}
            className="mx-auto h-10 w-auto rounded-md"
          />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          {status === "SUBMITTING" && (
            <div className="flex justify-center">
              <LoadingComponent />
            </div>
          )}
          <form action="" method="" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  ref={emailRef}
                  onBlur={handleBlurEmail}
                  value={email}
                  onChange={handleChangeEmail}
                  required
                  autoComplete="email"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {isErrorOnVerifyEmail ? (
                <p className="text-red-500 text-sm mt-2">{emailMessage}</p>
              ) : (
                <p className="text-green-500 text-sm mt-2">{emailMessage}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2 flex flex-row justify-between items-center relative">
                <input
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChangePassword}
                  type={passwordVisible ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={hasError || status === "SUBMITTING"}
                onClick={handleSignIn}
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm 
                  ${
                    hasError || status === "SUBMITTING"
                      ? "bg-gray-500 hover:bg-gray-400 hover:cursor-not-allowed"
                      : " bg-indigo-600 hover:bg-indigo-500 hover:cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  }`}
              >
                Sign in
              </button>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              onClick={() => navigate("/signup")}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
