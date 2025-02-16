import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
} from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { UserDetailContext } from "@/context/userDetailContext";

export default function Index() {
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  useEffect(() => {
    const handleBackPress = () => {
      router.replace("/");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    const unAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const result = await getDoc(doc(db, "users", user?.email));
        setUserDetail(result.data());
        router.replace("/(tabs)/home");
      }
    });

    return () => {
      backHandler.remove();
      unAuth();
    };
  }, [auth, router, setUserDetail]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Image
        style={{
          width: "100%",
          height: 300,
          marginTop: 70,
        }}
        source={require("./../assets/images/landing.png")}
      />

      <View
        style={{
          padding: 25,
          backgroundColor: Colors.PRIMARY,
          height: "100%",
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
            color: Colors.WHITE,
            fontFamily: "outfit-bold",
          }}
        >
          Selamat datang di AI Coach
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: Colors.WHITE,
            marginTop: 20,
            textAlign: "center",
            fontFamily: "outfit",
          }}
        >
          Wujudkan idemu secara mudah, cepat, dan akurat dengan AI 📚🤖
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/auth/signUp")}
          style={styles.button}
        >
          <Text style={[styles.buttonText, { color: Colors.PRIMARY }]}>
            Mulai Sekarang
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/auth/signIn")}
          style={[
            styles.button,
            {
              backgroundColor: Colors.PRIMARY,
              borderWidth: 1,
              borderColor: Colors.WHITE,
            },
          ]}
        >
          <Text style={[styles.buttonText, { color: Colors.WHITE }]}>
            Sudah punya akun?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "outfit",
  },
});
