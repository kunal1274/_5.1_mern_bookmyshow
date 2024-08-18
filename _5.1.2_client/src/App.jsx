// project/src/App.jsx

//Auth
import SignInComponent from "./pages/main-pages/SignIn";
import SignUpComponent from "./pages/main-pages/SignUp";
import SignUpPageSettings from "./settings/pageSettings/SignUpPageSettings";
import SignInPageSettings from "./settings/pageSettings/SignInPageSettings";
import { ProfilePage } from "./pages/main-pages/Profile";

//library
import { Routes, Route, Link } from "react-router-dom";

// Main Pages and General
import { Home } from "./pages/main-pages/Home";
import { useState } from "react";
import { DashboardPage } from "./pages/main-pages/Dashboard";
import { NotFoundPage } from "./pages/main-pages/NotFound";
import { Navigation } from "./components/Navigation";

// utilities
import cl from "./utility/cl";

// PDF
import PdfDemo from "./pdf/pdfdemo";

// jitsi Meeting
import JitsiMeetComponent from "./pages/jitsu-meeting/Meeting";

// Notifications
import { IoIosNotifications } from "react-icons/io";
import {
  NotificationComponent,
  NotificationProvider,
  useNotificationsHook,
} from "./context/NotificationProvider";

// Customers
import { CustomerComponent } from "./pages/ar/CustomerMaster";
import { CustomerListComponent } from "./pages/ar/CustomerList";

// WYSIWYG
import WYSIWYGEditor from "./wysiwyg/QuillEditor";
import WYSIWYGEditorV1 from "./wysiwyg/QuillEditorv1";
import MonacoCodeEditor from "./code-editor/MonacoEditor";
import { Forbidden403Component } from "./pages/main-pages/Forbidden403";
import { UnAuthenticated401Component } from "./pages/main-pages/Unauthenticated401";
import { ServerError500 } from "./pages/main-pages/ServerError500";

const enableBookMyShowApp = true;

function App() {
  const [isActiveLink, setIsActiveLink] = useState({
    paramId: "1",
    paramValue: true,
  });

  const [menu, toggleMenu] = useState(true);

  const handleToggleMenu = () => {
    toggleMenu(!menu);
  };

  const handleActiveLink = (e) => {
    //cl(e.target.id);
    const newActiveLink = { ...isActiveLink, paramId: e.target.id };

    //cl(newActiveLink);
    setIsActiveLink(newActiveLink);
    // setIsActiveLink({
    //   ...isActiveLink,
    //   paramId: Number(e.target.id),
    // });
  };
  if (enableBookMyShowApp) {
    return (
      <>
        <NotificationProvider>
          <div className=" h-[full] border-2 border-red-600 m-4">
            <div className="flex flex-row justify-between">
              <Navigation
                handleActiveLink={handleActiveLink}
                isActiveLink={isActiveLink}
                menu={menu}
                toggleMenu={handleToggleMenu}
              />

              <div className="mt-4 w-full flex justify-center items-center">
                <NotificationDisplay />
              </div>
            </div>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="signin" element={<SignInComponent />}>
                <Route path="settings" element={<SignInPageSettings />} />
              </Route>
              <Route path="signup" element={<SignUpComponent />}>
                <Route path="settings" element={<SignUpPageSettings />} />
              </Route>
              <Route path="authc" element={<ProfilePage />}>
                <Route path="profile" element={<ProfilePage />} />
                <Route path="dashboard" element={<DashboardPage />}></Route>
              </Route>

              <Route path="customer" element={<CustomerComponent />} />
              <Route path="customerlist" element={<CustomerListComponent />} />

              <Route path="forbidden" element={<Forbidden403Component />} />
              <Route
                path="unauthenticated"
                element={<UnAuthenticated401Component />}
              />
              <Route path="servererror" element={<ServerError500 />} />

              <Route path="pdf" element={<PdfDemo />} />
              <Route path="blog" element={<WYSIWYGEditor />} />
              <Route path="blog/v1" element={<WYSIWYGEditorV1 />} />
              <Route path="meeting" element={<JitsiMeetComponent />} />
              <Route path="monaco" element={<MonacoCodeEditor />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </NotificationProvider>
      </>
    );
  }
}

export default App;

export const NotificationDisplay = () => {
  const notifyApp = useNotificationsHook();
  return (
    <>
      {notifyApp.notifications.length > 0 && (
        <div className="fixed top-20 z-50 pointer-events-none flex justify-center w-1/2">
          <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden pointer-events-auto">
            <div className="flex justify-center items-center bg-gray-100 p-2">
              <IoIosNotifications className="text-xl text-gray-600" />
              {/* <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                {
                  notifyApp.notifications.filter((ele) => ele.type === "red")
                    .length
                }
                {
                  notifyApp.notifications.filter((ele) => ele.type === "green")
                    .length
                }
              </span> */}
              <div className="absolute top-1 right-1 flex space-x-2">
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {
                    notifyApp.notifications.filter((ele) => ele.type === "red")
                      .length
                  }
                </span>
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-blue-100 bg-blue-600 rounded-full">
                  {
                    notifyApp.notifications.filter((ele) => ele.type === "blue")
                      .length
                  }
                </span>
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-100 bg-green-600 rounded-full">
                  {
                    notifyApp.notifications.filter(
                      (ele) => ele.type === "green"
                    ).length
                  }
                </span>
              </div>
            </div>

            <div className="max-h-24 overflow-y-auto">
              {notifyApp.notifications.map((ele, idx) => {
                return (
                  <>
                    {/* <li
                    key={ele.id}
                    className={`text-${ele.type}-600`}
                    onClick={() => notify.removeNotification(ele.id)}
                  >
                    {ele.id} - {ele.type} - {ele.message}
                  </li> */}
                    <NotificationComponent
                      note={{
                        id: ele.id,
                        type: ele.type,
                        message: ele.message,
                      }}
                      dismiss={() => notifyApp.removeNotification(ele.id)}
                    />
                  </>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
