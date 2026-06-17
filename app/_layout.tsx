import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { UserDetailContext } from "./../context/userDetailContext";
import { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  useFonts({
    outfit: require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
  });

  const [userDetail, setUserDetail] = useState();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#0f172a" }}
        edges={["bottom"]}
      >
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          ></Stack>
        </UserDetailContext.Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
