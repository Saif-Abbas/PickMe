import React, { useCallback, useContext, useEffect, useState } from "react";
import Storage from "@react-native-async-storage/async-storage";

import { IUseData, ITheme, IUser } from "../constants/types";

import { light, dark } from "../constants";
import appData from "../../app.json";

export const DataContext = React.createContext({});
export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState<ITheme>(light);
  const [user, setUser] = useState<IUser>();
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [locationSelected, setLocationSelected] = useState(false);
  const [mapRegion, setMapRegion] = useState<any>(null);

  // get isDark mode from storage
  const getIsDark = useCallback(async () => {
    // get preference from storage
    const isDarkJSON = await Storage.getItem("isDark");
    if (isDarkJSON !== null) {
      // set isDark / compare if has updated
      setIsDark(JSON.parse(isDarkJSON));
    }
  }, [setIsDark]);

  // handle isDark mode
  const handleIsDark = useCallback(
    (payload: boolean) => {
      // set isDark / compare if has updated
      setIsDark(payload);
      payload
        ? (appData.expo.splash.backgroundColor = "#000")
        : (appData.expo.splash.backgroundColor = "#fff");
      // save preference to storage
      Storage.setItem("isDark", JSON.stringify(payload));
    },
    [setIsDark]
  );

  // handle users / profiles
  const handleUsers = useCallback(() => {}, []);

  // handle user
  const handleUser = useCallback(
    (user: IUser) => {
      // set user / compare if has updated
      setUser(user);
    },
    [setUser]
  );

  // get initial data for: isDark & language
  useEffect(() => {
    getIsDark();
  }, [getIsDark]);

  const handleSelectedLocation = useCallback(
    (lat: any, lng: any) => {
      console.log(lat, lng);
      setMapRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setSelectedLocation({
        latitude: lat,
        longitude: lng,
      });
      setLocationSelected(true);
    },
    [selectedLocation]
  );

  // change theme based on isDark updates
  useEffect(() => {
    setTheme(isDark ? dark : light);
  }, [isDark]);

  const contextValue = {
    isDark,
    handleIsDark,
    theme,
    setTheme,
    user,
    handleUsers,
    handleUser,
    selectedLocation,
    setSelectedLocation,
    locationSelected,
    setLocationSelected,
    handleSelectedLocation,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext) as IUseData;
