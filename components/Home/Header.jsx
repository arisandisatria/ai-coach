import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { UserDetailContext } from "./../../context/userDetailContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/Colors";

export default function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

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
            color: Colors.WHITE,
          }}
        >
          Halo, {userDetail?.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 14,
            color: Colors.WHITE,
          }}
        >
          Ayo mulai belajar!
        </Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="settings-outline" size={32} color={Colors.WHITE} />
      </TouchableOpacity>
    </View>
  );
}
