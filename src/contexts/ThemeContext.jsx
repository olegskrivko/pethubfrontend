// import React, { createContext, useContext, useState, useEffect } from 'react';

// const ThemeContext = createContext();

// export const ThemeProviderContext = ({ children }) => {
//   const [darkMode, setDarkMode] = useState(() => {
//     return localStorage.getItem('darkMode') === 'true';
//   });

//   useEffect(() => {
//     localStorage.setItem('darkMode', darkMode);
//   }, [darkMode]);

//   const toggleDarkMode = () => setDarkMode((prev) => !prev);

//   return (
//     <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useDarkTheme = () => useContext(ThemeContext);
