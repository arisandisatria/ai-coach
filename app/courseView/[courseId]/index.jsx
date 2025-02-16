import { View, FlatList, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Intro from "../../../components/CourseView/Intro";
import Colors from "../../../constants/Colors";
import Chapters from "../../../components/CourseView/Chapters";
import { doc, getDoc } from "firebase/firestore";

export default function CourseView() {
  const { courseParams, courseId, enroll } = useLocalSearchParams();
  const [course, setCourse] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!courseParams || !course) {
      getCourseById();
    } else {
      setCourse(JSON.parse(courseParams));
    }

    const handleBackPress = () => {
      router.replace("/(tabs)/home");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => {
      backHandler.remove();
    };
  }, [courseId]);

  const getCourseById = async () => {
    const docRef = await getDoc(doc(db, "courses", courseId));
    const courseData = docRef.data();

    console.log("Courses ========>", docRef);

    setCourse(courseData);
  };

  return (
    course && (
      <FlatList
        data={[]}
        ListHeaderComponent={
          <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <Intro course={course} enroll={enroll} />
            <Chapters course={course} />
          </View>
        }
      />
    )
  );
}
