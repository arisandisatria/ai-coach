import Colors from "@/constants/Colors";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";
import { UserDetailContext } from "./../../context/userDetailContext";

export default function SignUp() {
  const router = useRouter();
  const [fullname, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);

  const createNewAccount = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const user = res.user;
        await saveUser(user);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  };

  const saveUser = async (user) => {
    const data = {
      name: fullname,
      email: email,
      member: false,
      uid: user?.uid,
    };

    await setDoc(doc(db, "users", email), data);

    setUserDetail(data);
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
        Buat Akun Baru
      </Text>

      <TextInput
        placeholder="Nama lengkap"
        onChangeText={(value) => setFullName(value)}
        style={styles.textInput}
      />
      <TextInput
        placeholder="E-mail"
        onChangeText={(value) => setEmail(value)}
        autoCapitalize="none"
        style={styles.textInput}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(value) => setPassword(value)}
        secureTextEntry={true}
        autoCapitalize="none"
        style={styles.textInput}
      />
      <TouchableOpacity
        onPress={createNewAccount}
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
        <Text style={{ fontFamily: "outfit" }}>Sudah punya akun? </Text>
        <Pressable>
          <Text
            onPress={() => router.push("/auth/signIn")}
            style={{ color: Colors.PRIMARY, fontFamily: "outfit-bold" }}
          >
            Masuk di sini
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
