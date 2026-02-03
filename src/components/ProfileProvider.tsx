"use client";
import { Profile } from "@/lib/types/profile";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
} from "react";

export const ProfileContext = createContext<{
  profile: Profile;
  setProfile: Dispatch<SetStateAction<Profile>>;
}>({
  profile: {} as Profile,
  setProfile: () => {},
});

export const useProfile = () => useContext(ProfileContext);
export function ProfileProvider({
  children,
  profileProp,
}: {
  children: React.ReactNode;
  profileProp: Profile;
}) {
  const [profile, setProfile] = useState<Profile>(profileProp);
  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}
