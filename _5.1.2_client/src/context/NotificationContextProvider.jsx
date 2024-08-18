import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

// step 1 - create context whatever u need
const notificationsContext = createContext();

// step 2 - better make a custom hook for your context to use directly . this should be called at the location where u need.
export const useNotificationsContext = () => useContext(notificationsContext);

// creating the providers - we can create different for simplicity and its usage. This works like a react Component . so all caps
export const NotificationContextProvider = ({ children }) => {
  const [notificationsList, setNotificationList] = useState([]);

  const handleAddNotification = (newNotification) => {
    //const newNotificationsList = [...notificationsList, newNotification];
    //setNotificationList(newNotificationsList);
    setNotificationList((prevNotificationsList) => {
      const newNotificationsList = [...prevNotificationsList, newNotification];
      return newNotificationsList;
    });
  };

  const handleClearNotifications = () => {
    setNotificationList([]);
  };

  const handleAutoClearNotifications = () => {
    if (notificationsList.length > 0) {
      const filteredNotificationList = notificationsList.filter(
        (element, index) => {
          return !(notificationsList.indexOf(element) === 0);
        }
      );

      setNotificationList(filteredNotificationList);
    }
  };

  return (
    <notificationsContext.Provider
      value={{
        notifications: notificationsList,
        addNotification: handleAddNotification,
        clearNotifications: handleClearNotifications,
        autoClearNotifications: handleAutoClearNotifications,
      }}
    >
      {children}
    </notificationsContext.Provider>
  );
};
