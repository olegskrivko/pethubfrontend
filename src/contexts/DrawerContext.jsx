// import React, { createContext, useState, useContext } from 'react';

// // Create a Context for the Drawer
// const DrawerContext = createContext();

// // Create a Provider component
// export const DrawerProvider = ({ children }) => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   const openDrawer = () => setIsDrawerOpen(true);
//   const closeDrawer = () => setIsDrawerOpen(false);

//   return (
//     <DrawerContext.Provider value={{ isDrawerOpen, openDrawer, closeDrawer }}>
//       {children}
//     </DrawerContext.Provider>
//   );
// };

// // Create a custom hook to use the DrawerContext
// export const useDrawer = () => useContext(DrawerContext);
