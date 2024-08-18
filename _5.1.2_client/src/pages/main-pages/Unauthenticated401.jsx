import { Link } from "react-router-dom";
// https://www.creative-tim.com/twcomponents/component/tailwindcss-app-landing-page
// https://www.creative-tim.com/twcomponents/component/tailwind-css-maintenance-page
// https://www.creative-tim.com/twcomponents/component/tailwind-css-500-server-error-full-page

export const UnAuthenticated401Component = () => {
  return (
    <>
      <div className=" flex flex-col text-center mt-6">
        <h1 className="text-7xl font-extrabold text-indigo-600">401</h1>
        <h1 className="text-2xl font-semibold">
          Authentication has been failed.
        </h1>
        <p className="mt-2 text-lg">
          Please{" "}
          <Link to="/signin">
            <span className="text-indigo-700 underline">Signin</span>
          </Link>{" "}
          again with valid credentials. It could be due to session expired or
          invalid credentials.
        </p>
      </div>
    </>
  );
};
