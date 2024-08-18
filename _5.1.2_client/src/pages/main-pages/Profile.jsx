import axios from "axios";
import { useEffect, useState } from "react";
import cl from "../../utility/cl";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const baseUrl = `http://localhost:3501`;
const secondUrl = `/bms/api/v1`;
const thirdUrl = `/user`;
const mergedUrl = `${baseUrl}${secondUrl}${thirdUrl}`;

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: null,
    email: null,
    role: null,
  });
  const navigate = useNavigate();
  useEffect(() => {
    async function loadProfile() {
      const tokenCookie = Cookies.get("token");
      if (!tokenCookie) {
        // TO DO : Notification with Token Expired
        //navigate("/signin");
        throw new Error("Token not found ");
      }
      //cl("token from cookie", tokenCookie);
      try {
        const dbResponse = await axios.get(`${mergedUrl}/profile`, {
          headers: {
            Authorization: `Bearer ${tokenCookie}`,
          },
          withCredentials: true,
        });
        //cl(dbResponse.data.data);
        if (dbResponse.data.status === "SUCCESS") {
          //const { name, email, role } = dbResponse.data.data;
          //cl(dbResponse.data.data.name);
          //   nameLocal = name;
          //   emailLocal = email;
          //   roleLocal = role;
          setProfile({
            name: dbResponse.data.data.name,
            email: dbResponse.data.data.email,
            role: dbResponse.data.data.role,
          });
        } else {
          throw new Error(
            `Error was thrown during first try rather than going to catch`
          );
        }
      } catch (error) {
        cl(error.response);
      }
    }
    loadProfile();
  }, []);
  return (
    <>
      <div>
        This is my profile page.
        <div>
          <p>{profile.name ?? "No Id retrieved"}</p>
          <p>{profile.email ?? "No Email Retrieved"}</p>
          <p>{profile.role ?? "Could not found the session id"}</p>
        </div>
      </div>
    </>
  );
};

export { ProfilePage };
