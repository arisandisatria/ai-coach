import { View, Text, Image } from "react-native";
import React, { useContext } from "react";
import Colors from "../../constants/Colors";
import { UserDetailContext } from "../../context/userDetailContext";
import Button from "../../components/Shared/Button";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

export default function Profile() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();

  const onLogout = async () => {
    await signOut(auth);
    setUserDetail(null);
    router.replace("/");
  };

  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        flex: 1,
        alignItems: "center",
        padding: 25,
        gap: 20,
      }}
    >
      <Image
        source={require("./../../assets/images/profile.jpg")}
        style={{ width: 300, height: 200 }}
      />

      <Text style={{ fontFamily: "outfit-bold", fontSize: 24 }}>
        {userDetail?.name}
      </Text>

      <View style={{ width: "100%" }}>
        <Button
          text={"+ Buat Materi Baru"}
          type="outline"
          onPress={() => router.push("/add-course")}
        />
        <Button
          text={"Log Out"}
          type="fill"
          onPress={() => onLogout()}
          style={{ backgroundColor: Colors.RED, borderColor: Colors.RED }}
        />
      </View>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 12,
          position: "absolute",
          bottom: 30,
        }}
      >
        Dibuat oleh Arisandi Satria Jeujanan
      </Text>
    </View>
  );
}
