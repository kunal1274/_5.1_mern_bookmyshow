import { createContext, useContext, useState } from "react";
import cl from "../utility/cl";
import { v4 as uuidv4 } from "uuid";
// Notification create context
const NotificationContext = createContext();

// Create hooks
export const useNotificationsHook = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notificationList, setNotificationList] = useState([]);

  const removeNotification = (paramId) => {
    // cl(`removing notifications ${paramId}`);
    setNotificationList((prev) => {
      const filteredNotificationList = prev.filter((note) => {
        return note.id !== paramId;
      });
      //cl(`updated notification list : ${filteredNotificationList}`);
      return filteredNotificationList;
    });
  };
  const addNotification = (newNotification, timer) => {
    //const id = Math.random.toString(36).substring(2, 9);
    const id = uuidv4();
    //cl("notification id : ", id);
    setNotificationList((prev) => {
      const newNotificationList = [...prev, { ...newNotification, id }];
      return newNotificationList;
    });

    setTimeout(() => {
      removeNotification(id);
    }, timer ?? 4000);
  };

  const valueProviders = {
    notifications: notificationList,
    addNotification: addNotification,
    removeNotification: removeNotification,
    setNotificationList: setNotificationList,
  };
  return (
    <NotificationContext.Provider value={valueProviders}>
      {children}
      {/* <div
        className={`sticky top-20 left-10 w-1/2 md:w-1/2 mx-auto bg-white p-6`}
      >
        {notificationList.map((note) => {
          <NotificationComponent
            key={note.id}
            note={note}
            dismiss={() => removeNotification(note.id)}
          />;
        })}
      </div> */}
    </NotificationContext.Provider>
  );
};

export const NotificationComponent = ({ note, dismiss }) => {
  return (
    <>
      <div className="w-full md:w-full mx-auto bg-white p-2">
        <div
          className={`mt-2 flex items-center justify-between p-2 leading-normal  text-${note.type}-600 bg-${note.type}-100 rounded-lg`}
          role="alert"
        >
          <p className="flex-1">
            {note.id.substring(0, 8)}
            {` : `}
            {note.message}
          </p>

          <svg
            onClick={dismiss}
            className="inline w-5 h-5 flex-shrink-0 fill-current ml-2 hover:opacity-80 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM359.5 133.7c-10.11-8.578-25.28-7.297-33.83 2.828L256 218.8L186.3 136.5C177.8 126.4 162.6 125.1 152.5 133.7C142.4 142.2 141.1 157.4 149.7 167.5L224.6 256l-74.88 88.5c-8.562 10.11-7.297 25.27 2.828 33.83C157 382.1 162.5 384 167.1 384c6.812 0 13.59-2.891 18.34-8.5L256 293.2l69.67 82.34C330.4 381.1 337.2 384 344 384c5.469 0 10.98-1.859 15.48-5.672c10.12-8.562 11.39-23.72 2.828-33.83L287.4 256l74.88-88.5C370.9 157.4 369.6 142.2 359.5 133.7z" />
          </svg>
        </div>
      </div>
    </>
  );
};
