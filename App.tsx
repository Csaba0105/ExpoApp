import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";
import Login from "./app/screens/Login";
import Register from "./app/screens/Register";
import { AuthProvider, useAuth } from "./app/context/AuthContext";
import TabNavigator from "./app/(tabs)/_layout";
import ForgetPassword from "./app/screens/ForgetPassword";
import HelpPage from "./app/screens/Help";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          // Alsó navigáció, ha bejelentkezve
          <Stack.Screen
            name="Swing"
            component={TabNavigator}
            options={{
              headerRight: () => <Button onPress={onLogout} title="Sign Out" />
            }}
          />
        ) : (
          <>
            {/* Login és Register stack navigáció */}
            <Stack.Screen name="Login" component={Login} options={{ headerTitleAlign: "center"}}
            />
            <Stack.Screen name="Register" component={Register} options={{ headerTitleAlign: "center" }}
            />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerTitleAlign: "center", title: 'Forget Password'}} />
            <Stack.Screen name="Help" component={HelpPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
