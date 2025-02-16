import { View, Text, Image, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { imageAssets } from "../../constants/Option";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Button from "../Shared/Button";
import { useRouter } from "expo-router";
import { UserDetailContext } from "../../context/userDetailContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

export default function Intro({ course, enroll }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const onEnrollCourse = async () => {
    setLoading(true);

    try {
      const data = {
        ...course,
        createdBy: userDetail?.email,
        createdOn: new Date(),
        enrolled: true,
      };
      const docId = Date.now().toString();
      await updateDoc(doc(db, "courses", docId), data);
      router.replace({
        pathname: "/courseView/" + docId,
        params: {
          courseParams: JSON.stringify(data),
          enroll: false,
        },
      });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <View>
      <Pressable
        onPress={() => router.replace("/home")}
        style={{
          position: "absolute",
          margin: 20,
          zIndex: 2,
        }}
      >
        <Ionicons name="arrow-back" size={34} color={Colors.WHITE} />
      </Pressable>
      <Image
        source={imageAssets[course?.banner_image]}
        style={{
          width: "100%",
          height: 280,
        }}
      />
      <View style={{ padding: 20 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
          {course?.courseTitle}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Ionicons name="book-outline" size={20} color={Colors.PRIMARY} />
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 14,
              color: Colors.PRIMARY,
            }}
          >
            {course?.chapters?.length} bab
          </Text>
        </View>
        <Text
          style={{ fontFamily: "outfit-bold", fontSize: 18, marginTop: 10 }}
        >
          Deskripsi
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 14,
            color: Colors.GRAY,
            textAlign: "justify",
          }}
        >
          {course?.description}
        </Text>
        {enroll == "true" && (
          <Button
            text={"Ikuti materi"}
            loading={loading}
            onPress={() => onEnrollCourse()}
          />
        )}
      </View>
    </View>
  );
}
