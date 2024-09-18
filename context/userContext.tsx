"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface UserContextType {
  userId: number | null;
  userRole: string | null;
  setUser: (userId: number | null, userRole: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Set the state to store userId and userRole
  const [userId, setUserId] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Create a function to update the userId and userRole together
  const setUser = (userId: number | null, userRole: string | null) => {
    setUserId(userId);
    setUserRole(userRole);
  };

  return (
    <UserContext.Provider value={{ userId, userRole, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
