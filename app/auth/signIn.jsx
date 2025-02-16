import Colors from "@/constants/Colors";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { UserDetailContext } from "../../context/userDetailContext";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const onSignInClick = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const user = res.user;
        await getUserDetail();
        setLoading(false);
        router.push({
          pathname: "/(tabs)/home",
          params: { preventBack: true },
        });
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
        ToastAndroid.show(
          "Incorrect email and/or password!",
          ToastAndroid.BOTTOM
        );
      });
  };

  const getUserDetail = async () => {
    const result = await getDoc(doc(db, "users", email));
    setUserDetail(result.data());
  };

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        paddingTop: 100,
        flex: 1,
        backgroundColor: Colors.WHITE,
        padding: 25,
      }}
    >
      {/* <Image
        source={require("./../../assets/images/logo.png")}
        style={{
          width: 180,
          height: 180,
        }}
      /> */}
      <Text
        style={{
          fontSize: 30,
          fontFamily: "outfit-bold",
        }}
      >
        Selamat Datang
      </Text>

      <TextInput
        onChangeText={(value) => setEmail(value)}
        placeholder="E-mail"
        autoCapitalize="none"
        style={styles.textInput}
      />
      <TextInput
        onChangeText={(value) => setPassword(value)}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        style={styles.textInput}
      />
      <TouchableOpacity
        disabled={loading}
        onPress={onSignInClick}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          marginTop: 25,
          width: "100%",
          borderRadius: 10,
        }}
      >
        {!loading ? (
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 20,
              color: Colors.WHITE,
              textAlign: "center",
            }}
          >
            Masuk
          </Text>
        ) : (
          <ActivityIndicator size={"large"} color={Colors.WHITE} />
        )}
      </TouchableOpacity>

      <View
        style={{ display: "flex", flexDirection: "row", gap: 5, marginTop: 20 }}
      >
        <Text style={{ fontFamily: "outfit" }}>Belum punya akun? </Text>
        <Pressable>
          <Text
            onPress={() => router.push("/auth/signUp")}
            style={{ color: Colors.PRIMARY, fontFamily: "outfit-bold" }}
          >
            Daftar di sini
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    width: "100%",
    padding: 15,
    fontSize: 18,
    marginTop: 20,
    borderRadius: 8,
  },
});
