import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

// step 1 - create context whatever u need

const settingsAppLevelContext = createContext();

// step 2 - better make a custom hook for your context to use directly . this should be called at the location where u need.

export const useSettinsAppLevelContext = () =>
  useContext(settingsAppLevelContext);

// creating the providers - we can create different for simplicity and its usage. This works like a react Component . so all caps
export const SettingsAppLevelContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("Light");
  const [language, setLanguage] = useState("English");

  const handleLanguage = (paramLanguage) => {
    if (["English", "Spanish", "Hindi", "Sanskrit"].includes(paramLanguage)) {
      setLanguage(paramLanguage);
    }
  };

  const handleTheme = (paramTheme) => {
    if (["Light", "Dark", "Sepia"].includes(paramTheme)) {
      setTheme(paramTheme);
    }
  };

  return (
    <notificationsContext.Provider
      value={{
        theme: theme,
        setTheme: handleTheme,
        language: language,
        setLanguage: handleLanguage,
      }}
    >
      {children}
    </notificationsContext.Provider>
  );
};
