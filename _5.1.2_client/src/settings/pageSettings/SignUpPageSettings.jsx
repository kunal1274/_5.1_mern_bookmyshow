import { IoMdArrowRoundBack } from "react-icons/io";
import cl from "../../utility/cl";
import { Link, Route } from "react-router-dom";

const SignUpPageSettings = ({ propsValueOutletState, handleCloseOutlet }) => {
  //cl(propsValueOutletState, "inside the signup page settings ");
  return (
    <>
      <Link to="/signup">
        <IoMdArrowRoundBack
          className="cursor-pointer"
          onClick={handleCloseOutlet}
        />
      </Link>

      <div>
        This is Signup Page Settings.
        {propsValueOutletState ? (
          <p>Yes I am the Outlet</p>
        ) : (
          <p>
            Once you Click the back arrow , i will be no longer an outlet and
            will be false.
          </p>
        )}
      </div>
    </>
  );
};

export default SignUpPageSettings;
