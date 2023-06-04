import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  Home,
  Profile,
  Login,
  Settings,
  Talented,
  UserProfile,
  BecomeDriver,
  Orders,
  Hire,
  Chat,
  CompleteProfile,
  CompleteDriverProfile,
  PostRide,
  BookRide,
  Trips,
  TripsHistory,
  PaymentMethods,
} from "../screens";
import { useScreenOptions } from "../hooks";
const Stack = createStackNavigator();
export default () => {
  const screenOptions = useScreenOptions();
  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      <Stack.Screen name="Home" component={Home} options={screenOptions.home} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Talented"
        component={Talented}
        options={screenOptions.profile}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={screenOptions.back}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BecomeDriver"
        component={BecomeDriver}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={screenOptions.profile}
      />
      <Stack.Screen
        name="Hire"
        component={Hire}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={screenOptions.profile}
      />
      <Stack.Screen
        name="CompleteProfile"
        component={CompleteProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CompleteDriverProfile"
        component={CompleteDriverProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostRide"
        component={PostRide}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookRide"
        component={BookRide}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Trips"
        component={Trips}
        options={screenOptions.back}
      />
      <Stack.Screen
        name="TripsHistory"
        component={TripsHistory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PaymentMethods"
        component={PaymentMethods}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
