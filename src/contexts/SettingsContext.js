import React, { createContext, useState, useMemo } from "react"

export const SettingsContext = createContext()

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({ minValue: 0, maxValue: 9999999, debounce: false });

  // Memoized version
  const store = useMemo(() => ({settings, setSettings}), [settings])

  return (
    <SettingsContext.Provider value={store}>
      {children}
    </SettingsContext.Provider>
  );
};