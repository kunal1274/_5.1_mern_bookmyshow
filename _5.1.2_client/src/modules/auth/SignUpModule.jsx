import { Link, Routes, Route } from "react-router-dom";
import SignUpComponent from "../../pages/main-pages/SignUp";
import SignUpPageSettings from "../../settings/pageSettings/SignUpPageSettings";

const SignUpModule = () => {
  return (
    <div>
      <h1>This is Signup Module</h1>
      <nav>
        <ul>
          <li>
            <Link to="">Sign Up Form</Link>
          </li>
          <li>
            <Link to="settings">Sign Up Settings Page</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<SignUpComponent />} />
        <Route path="/settings" element={<SignUpPageSettings />} />
      </Routes>
    </div>
  );
};

export { SignUpModule };
