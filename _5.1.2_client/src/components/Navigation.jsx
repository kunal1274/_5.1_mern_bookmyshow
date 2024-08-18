import { Link } from "react-router-dom";

{
  /* <svg
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  transform="rotate(90)"
>
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    stroke-linecap="round"
    stroke-linejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    {" "}
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4ZM15 5C15 6.65685 13.6569 8 12 8C10.3431 8 9 6.65685 9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5ZM12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11ZM15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12ZM11 19C11 18.4477 11.4477 18 12 18C12.5523 18 13 18.4477 13 19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19ZM12 22C13.6569 22 15 20.6569 15 19C15 17.3431 13.6569 16 12 16C10.3431 16 9 17.3431 9 19C9 20.6569 10.3431 22 12 22Z"
      fill="#cdff61"
    ></path>{" "}
  </g>
</svg>; */
}

export const MenuIcon = ({
  width = 40,
  height = 40,
  fillColor = "#000000",
  transform = "rotate(0)",
  onClick,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    className="hover:cursor-pointer"
    transform={transform}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4ZM15 5C15 6.65685 13.6569 8 12 8C10.3431 8 9 6.65685 9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5ZM12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11ZM15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12ZM11 19C11 18.4477 11.4477 18 12 18C12.5523 18 13 18.4477 13 19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19ZM12 22C13.6569 22 15 20.6569 15 19C15 17.3431 13.6569 16 12 16C10.3431 16 9 17.3431 9 19C9 20.6569 10.3431 22 12 22Z"
      fill={fillColor} // Use fillColor prop
    />
  </svg>
);

export const Navigation = ({
  handleActiveLink,
  isActiveLink,
  menu,
  toggleMenu,
}) => {
  return (
    <>
      <nav className="fixed top-[40%] right-0 left-0 m-2 flex justify-start ">
        {menu ? (
          // <img
          //   src={MenuIcon}
          //   width={40}
          //   height={40}
          //   alt="menu"
          //   onClick={toggleMenu}
          // />
          <MenuIcon
            width={40}
            height={40}
            fillColor="#000000"
            onClick={toggleMenu}
          />
        ) : (
          <ul className="flex flex-col justify-center items-center space-y-2 border border-gray-400 bg-slate-800 shadow-md h-auto p-3">
            <MenuIcon
              width={40}
              height={40}
              fillColor="#cdff61"
              onClick={toggleMenu}
              transform="rotate(90)"
            />

            <li>
              <Link
                id="1"
                onClick={handleActiveLink}
                className={`${
                  isActiveLink.paramId === "1"
                    ? "text-green-500"
                    : "text-green-100 hover:text-green-300"
                }`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                id="2"
                onClick={handleActiveLink}
                className={`${
                  isActiveLink.paramId === "2"
                    ? "text-green-500"
                    : "text-green-100 hover:text-green-300"
                }`}
                to="signup"
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                id="3"
                onClick={handleActiveLink}
                className={`${
                  isActiveLink.paramId === "3"
                    ? "text-green-500"
                    : "text-green-100 hover:text-green-300"
                }`}
                to="signin"
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                id="4"
                onClick={handleActiveLink}
                className={`${
                  isActiveLink.paramId === "4"
                    ? "text-green-500"
                    : "text-green-100 hover:text-green-300"
                }`}
                to="/authc/profile"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                id="5"
                onClick={handleActiveLink}
                className={`${
                  isActiveLink.paramId === "5"
                    ? "text-green-500"
                    : "text-green-100 hover:text-green-300"
                }`}
                to="/customerlist"
              >
                Customers
              </Link>
            </li>
            <li>
              <Link
                id="6"
                onClick={handleActiveLink}
                className={`${
                  isActiveLink.paramId === "6"
                    ? "text-green-500"
                    : "text-green-100 hover:text-green-300"
                }`}
                to="/customer"
              >
                Customer
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
};
