import { View, Text, Platform, Image, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Home/Header";
import Colors from "./../../constants/Colors";
import NoCourse from "../../components/Home/NoCourse";
import { db } from "../../config/firebaseConfig";
import { where, query, collection, getDocs } from "firebase/firestore";
import { UserDetailContext } from "../../context/userDetailContext";
import CourseList from "../../components/Home/CourseList";
import PracticeSection from "../../components/Home/PracticeSection";
import CourseProgress from "../../components/Home/CourseProgress";

export default function Home() {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  useEffect(() => {
    getCourseList();
  }, [getCourseList]);

  const getCourseList = async () => {
    if (userDetail) {
      setLoading(true);
      setCourseList([]);
      try {
        const q = query(
          collection(db, "courses"),
          where("createdBy", "==", userDetail?.email)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setCourseList((prev) => [...prev, doc.data()]);
        });
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    }
  };

  return (
    <FlatList
      data={[]}
      style={{ backgroundColor: Colors.WHITE }}
      onRefresh={() => getCourseList()}
      refreshing={loading}
      ListHeaderComponent={
        <View
          style={{
            flex: 1,
          }}
        >
          <Image
            source={require("./../../assets/images/wave.png")}
            style={{
              position: "absolute",
              width: "100%",
              height: 700,
            }}
          />

          <View
            style={{
              padding: 20,
              paddingTop: Platform.OS == "ios" || (Platform.OS == "web" && 45),
            }}
          >
            {courseList?.length == 0 ? (
              <NoCourse />
            ) : (
              <View>
                <Header />
                <CourseProgress courseList={courseList} />
                <PracticeSection />
                <CourseList courseList={courseList} />
              </View>
            )}
          </View>
        </View>
      }
    />
  );
}
