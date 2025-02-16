import { View, Text, Image } from "react-native";
import React from "react";
import Button from "../Shared/Button";
import { useRouter } from "expo-router";
import Colors from "../../constants/Colors";

export default function NoCourse() {
  const router = useRouter();

  return (
    <View
      style={{
        marginTop: 40,
        alignItems: "center",
      }}
    >
      <Image
        source={require("./../../assets/images/book.png")}
        style={{
          height: 200,
          width: 200,
        }}
      />
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
          textAlign: "center",
          color: Colors.WHITE,
        }}
      >
        Kamu belum punya materi
      </Text>
      <Button
        text={"+ Buat Materi Baru"}
        onPress={() => router.push("/add-course")}
      />
      <Button
        text={"Jelajah Materi yang Sudah Ada"}
        type="outline"
        onPress={() => router.push("/(tabs)/explore")}
      />
    </View>
  );
}
