import { useState, useEffect, useRef } from "react";
import cl from "../../utility/cl";
import bookMyShowLogo from "../../assets/bookmyshow1.png";
import axios from "axios";
import { Link, useNavigate, Routes, Route, Outlet } from "react-router-dom";
import { FaAd, FaBeer, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import SignUpPageSettings from "../../settings/pageSettings/SignUpPageSettings";
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
const roles = [
  { display: "Guest", value: "GUEST" },
  { display: "User", value: "USER" },
  { display: "Contractor", value: "CONTRACTOR" },
  { display: "Employee", value: "EMPLOYEE" },
  { display: "Customer", value: "CUSTOMER" },
  { display: "Vendor", value: "VENDOR" },
  { display: "Admin", value: "ADMIN" },
  { display: "Super Admin", value: "SUPERADMIN" },
];
const baseUrl = `http://localhost:3501`;
const secondUrl = `/bms/api/v1`;
const thirdUrl = `/user`;
const mergedUrl = `${baseUrl}${secondUrl}${thirdUrl}`;

export default function SignUpComponent() {
  const [name, setName] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [count, setCount] = useState(0);
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState("");
  const [isPasswordMatchError, setIsPasswordMatchError] = useState(false);
  const [isTermsAndConditions, setIsTermsAndConditions] = useState(false);
  const [termsAndConditionsMessage, setTermsAndConditionsMessage] =
    useState("");
  const [selectedRole, setSelectedRole] = useState(roles[0].value);
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [outletState, setOutletState] = useState(false);

  const navigate = useNavigate();

  const emailRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);

    //console.log(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // TO DO:
  const LinkToSignIn = () => {
    return <a href="">Sign In</a>;
  };

  const handleBlurEmail = async () => {
    const emailValue = emailRef.current.value;
    //console.log("email use ref value ", emailValue);
    //cl(Boolean(emailValue) === true);
    if (Boolean(emailValue)) {
      try {
        const response = await axios.post(`${mergedUrl}/validateemail`, {
          email: emailValue,
        });

        const isExist = response.data.count;

        if (isExist) {
          setIsErrorEmail(true);
          setEmailMessage(
            `The Email already exists.Please either Sign In or Enter different Email address`
          );
        } else {
          setIsErrorEmail(false);
          setEmailMessage(
            "The Email is new to us.Welcome 😍 You are Good to go"
          );
        }
      } catch (error) {
        setIsErrorEmail(true);
        console.log("An Error occurred while checking the email.");
        if (error.response) {
          console.log(`Validation from API response ${error.response.data}`);
        } else if (error.request) {
          console.log(
            `Request sent but no response received. ${error.request}`
          );
        } else {
          console.log(
            `Something broke! This could be a network issue or glitch or any other kind of server or package error.`
          );
        }
      }
    } else {
      setIsErrorEmail(true);
      setEmailMessage(
        "Email is mandatory.Please enter the valid email address"
      );
    }
  };
  // sending the api request on every change in the email field to see if this is wrong or not.

  const handleChangeName = (e) => {
    const inputName = e.target.value;
    //cl(inputName);
    setName(inputName);
    //console.log(e.target.value);
    //cl(inputName === true);
    if (inputName.length > 0 && inputName.length < 3) {
      setNameMessage("Name must be at least 3 characters ");
    } else {
      setNameMessage("");
    }
  };

  function handleChangePassword(event) {
    const inputPassword = event.target.value;
    setPassword(inputPassword);
    //cl(event.target.value);
    validatePassword(inputPassword);
  }

  const validatePassword = (password) => {
    if (!/(?=.*[a-zA-Z])/.test(password)) {
      setPasswordValidationMessage(
        "Password must contain at least one alphabetic character."
      );
      return;
    }
    if (!/(?=.*\d)/.test(password)) {
      setPasswordValidationMessage("Password must contain at least one digit.");
      return;
    }
    if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) {
      setPasswordValidationMessage(
        "Password must contain at least one special character."
      );
      return;
    }
    if (password.length < 8) {
      setPasswordValidationMessage(
        "Password must be at least 8 characters long."
      );
      return;
    }
    setPasswordValidationMessage(""); // Clear the error message if all conditions are met
  };

  function handleChangeConfirmPassword(e) {
    if (isPasswordMatchError) {
      setConfirmPasswordMessage("");
      setCount(0);
    }
    setConfirmPassword(e.target.value);
    setCount(e.target.value.length);
  }

  function handleBlurConfirmPassword(e) {
    const confirmPasswordValue = confirmPasswordRef.current.value;
    if (Boolean(confirmPasswordValue)) {
      if (password !== confirmPasswordValue) {
        setConfirmPasswordMessage(
          `Passwords don't match. Please check . Count : ${count} `
        );
        setIsPasswordMatchError(true);
        return;
      }
    } else {
      setConfirmPasswordMessage("Confirming the Password is mandatory.");
      setIsPasswordMatchError(true);
    }
  }

  function handleCheckboxTermsAndConditions() {
    const newIsTermsAndConditions = !isTermsAndConditions;
    setIsTermsAndConditions(newIsTermsAndConditions);

    // Set the message based on the new state value
    if (!newIsTermsAndConditions) {
      setTermsAndConditionsMessage(
        "Accepting Terms and Conditions is mandatory"
      );
    } else {
      setTermsAndConditionsMessage("");
    }
  }

  useEffect(() => {
    if (!isTermsAndConditions) {
      setTermsAndConditionsMessage(
        "Please don't forget to accept the terms and Conditions."
      );
    }
  }, []);

  function handleChangeSelectedRole(e) {
    setSelectedRole(e.target.value);
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    //cl(email, password, confirmPassword, isTermsAndConditions, selectedRole);

    const user = {
      name: name,
      email: email,
      password: password,
      termsAndConditions: isTermsAndConditions,
      role: selectedRole,
    };

    try {
      const dbResponse = await axios.post(
        `${baseUrl}/bms/api/v1/user/signup`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(dbResponse.data.status);
      cl(dbResponse.data.message);
      const dbResponseMessage = dbResponse.data.message;
      let messageArray = dbResponseMessage.split(" ");
      const finalMessage = messageArray
        .slice(0, messageArray.indexOf("registered") + 1)
        .join(" ");

      cl(finalMessage);
      cl(dbResponse.data.data);
      // TO DO : Send notifications to users after navigation to sign in page .
      navigate("/signin");
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error(
          `Error Caught in the Book My Show: This is a validation or error from api response for which status is - ${error.response.data.status} and the error message is - ${error.response.data.message}`
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error(
          "Error Caught in the Book My Show: Request was sent but no response received",
          error.request
        );
      } else {
        // Something else caused the error
        console.error(
          "Error Caught in the Book My Show.This is a network error (i.e., Network issue) : ",
          error.message
        );
      }
    }
  };

  //   useEffect(() => {
  //     postSignupData();
  //   }, []);
  //   useEffect(() => {
  //     if (password != confirmPassword) {
  //       setIsError(true);
  //     }
  //     cl(email, password, confirmPassword, isTermsAndConditions, selectedRole);
  //   }, [isTermsAndConditions, selectedRole, confirmPassword]);

  //   const handleModalClose = (x) => {
  //     setIsOpen(x);
  //   };

  //   const hanldeModalOpen = (x) => {
  //     setIsOpen(x);
  //   };

  useEffect(() => {
    if (
      nameMessage ||
      isErrorEmail ||
      passwordValidationMessage ||
      confirmPasswordMessage ||
      !isTermsAndConditions
    ) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [
    isErrorEmail,
    passwordValidationMessage,
    confirmPasswordMessage,
    isTermsAndConditions,
  ]);

  if (outletState) {
    return (
      <SignUpPageSettings
        propsValueOutletState={outletState}
        handleCloseOutlet={() => {
          setOutletState(false);
        }}
      />
    );
  }

  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}

      <div className="sticky top-[8vh] left-3 border border-indigo-100 w-[2vw] h-[10vh] shadow-md bg-slate-50 flex flex-col justify-evenly items-center  m-2 ">
        <FaBeer className="cursor-pointer" />
        <FaAd className="cursor-pointer" />

        <Link to="/signup/settings">
          <IoIosSettings
            onClick={() => setOutletState(true)}
            className="cursor-pointer"
          />
        </Link>
      </div>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src={bookMyShowLogo}
            className="mx-auto h-12 w-auto rounded-md"
          />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to Book My Show
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your Full Name"
                  value={name}
                  onChange={handleChangeName}
                  required
                  autoComplete="name"
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {nameMessage && (
                <p className="text-red-500 text-sm mt-2">{nameMessage}</p>
              )}
            </div>

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
                  placeholder="Your Valid Email Address"
                  value={email}
                  onChange={handleChangeEmail}
                  required
                  autoComplete="email"
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {isErrorEmail ? (
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
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Your Password. Must Contain 8 characters."
                  value={password}
                  onChange={handleChangePassword}
                  required
                  autoComplete="current-password"
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {passwordValidationMessage && (
                <p className="text-red-500 text-sm mt-2">
                  {passwordValidationMessage}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  ref={confirmPasswordRef}
                  onBlur={handleBlurConfirmPassword}
                  placeholder="Confirm your password again"
                  value={confirmPassword}
                  onChange={handleChangeConfirmPassword}
                  required
                  //autoComplete="current-password"
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {isPasswordMatchError && (
                <p className="text-red-500 text-sm mt-2">
                  {confirmPasswordMessage}
                </p>
              )}
            </div>

            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  id="candidates"
                  name="candidates"
                  type="checkbox"
                  value={isTermsAndConditions}
                  onChange={handleCheckboxTermsAndConditions}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
              <div className="text-sm leading-6">
                <label
                  htmlFor="candidates"
                  className="font-medium text-gray-900"
                >
                  Terms and Condition.{" "}
                  <a href="" className="text-indigo-600 hover:text-indigo-500">
                    Click to know more.
                  </a>
                </label>
              </div>
              {termsAndConditionsMessage && (
                <p className="text-red-500 text-sm mt-2">
                  {termsAndConditionsMessage}
                </p>
              )}
            </div>

            <div className="sm:col-span-3 w-full">
              <label
                htmlFor="role"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Role
              </label>
              <div className="mt-2">
                <select
                  id="role"
                  name="role"
                  value={selectedRole}
                  onChange={handleChangeSelectedRole}
                  autoComplete="role-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {roles.map((role) => {
                    return (
                      <option key={role.value} value={role.value}>
                        {role.display}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSignUp}
                disabled={hasError}
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${
                  hasError
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                }`}
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <a
              href="#"
              onClick={() => navigate("/")}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in Over here !
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
