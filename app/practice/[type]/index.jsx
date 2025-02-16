import {
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { practiceOption } from "../../../constants/Option";
import Colors from "../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { query, collection, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import { UserDetailContext } from "../../../context/userDetailContext";
import CourseListGrid from "../../../components/Practice/CourseListGrid";

export default function PracticeTypeHomeScreen() {
  const { type } = useLocalSearchParams();
  const option = practiceOption.find((item) => item.name == type);
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    userDetail && getCourseList();
  }, [userDetail]);

  const getCourseList = async () => {
    setLoading(true);
    setCourseList([]);

    try {
      const q = query(
        collection(db, "courses"),
        where("createdBy", "==", userDetail.email),
        orderBy("createdOn", "desc")
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) =>
        setCourseList((prev) => [...prev, doc.data()])
      );
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View>
          <Image source={option.image} style={{ height: 200, width: "100%" }} />

          <View
            style={{
              position: "absolute",
              padding: 25,
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Pressable onPress={() => router.back()}>
              <Ionicons
                name="arrow-back"
                size={24}
                color="black"
                style={{
                  backgroundColor: Colors.WHITE,
                  padding: 8,
                  borderRadius: 10,
                }}
              />
            </Pressable>
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 24,
                color: Colors.WHITE,
              }}
            >
              {type}
            </Text>
          </View>

          {loading ? (
            <ActivityIndicator
              size={"large"}
              color={Colors.PRIMARY}
              style={{ marginTop: 150 }}
            />
          ) : (
            <CourseListGrid courseList={courseList} option={option} />
          )}
        </View>
      }
    />
  );
}
