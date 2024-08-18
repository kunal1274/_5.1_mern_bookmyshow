import { Link } from "react-router-dom";

const NotFoundPage1 = () => {
  return (
    <>
      <div className=" flex flex-col text-center mt-6">
        <h1 className="text-7xl font-extrabold text-indigo-600">404</h1>
        <h1 className="text-2xl font-semibold">Error ! Not Found</h1>
        <p className="mt-2 text-lg">
          Please Check with Url and system administrator if there is a bad
          response. Go to{" "}
          <Link to="/">
            <span className="text-indigo-700 underline">Home</span>
          </Link>
        </p>
      </div>
    </>
  );
};

const NotFoundPage = () => {
  return (
    <>
      <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">
          404
        </h1>
        <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>
        <button className="mt-5">
          <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
              <Link to="/">Go Home</Link>
            </span>
          </a>
        </button>
      </main>
    </>
  );
};

export { NotFoundPage };
