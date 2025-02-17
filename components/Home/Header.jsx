import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { UserDetailContext } from "./../../context/userDetailContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 25,
            color: Colors.BLACK,
          }}
        >
          Halo, {userDetail?.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 14,
            color: Colors.BLACK,
          }}
        >
          Ayo mulai belajar!
        </Text>
      </View>
      <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
        <Ionicons name="settings-outline" size={32} color={Colors.BLACK} />
      </TouchableOpacity>
    </View>
  );
}
