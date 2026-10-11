import { createContext, useContext } from "react";

// { db, user, uploadSettings, setUploadSettings, notify }
export const AdminContext = createContext(null);

export const useAdmin = () => useContext(AdminContext);

export const newId = (prefix = "item") =>
  `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
