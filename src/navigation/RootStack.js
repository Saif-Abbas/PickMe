import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// drawer stack
import DrawerStack from './DrawerStack';

// screens
import ModalHelp from '../screens/ModalHelp';
import ModalQRCode from '../screens/ModalQRCode';
import ModalTutorialBike from '../screens/ModalTutorialBike';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Profile from '../screens/Profile';
import TripHistory from '../screens/TripHistory';
import BecomeDriver from '../screens/BecomeDriver';
import PaymentMethods from '../screens/PaymentMethods';
import About from '../screens/About';
import FAQ from '../screens/FAQ';
import Settings from '../screens/Settings';

const Stack = createNativeStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        presentation: 'fullScreenModal'
      }}
    >
      <Stack.Screen
        name="DrawerStack"
        component={DrawerStack}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="ModalHelp"
        component={ModalHelp}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="TripHistory"
        component={TripHistory}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="BecomeDriver"
        component={BecomeDriver}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="PaymentMethods"
        component={PaymentMethods}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="FAQ"
        component={FAQ}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="ModalQRCode"
        component={ModalQRCode}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="ModalTutorialBike"
        component={ModalTutorialBike}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
