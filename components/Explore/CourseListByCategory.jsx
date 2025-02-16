import { ActivityIndicator, View } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import CourseList from "../Home/CourseList";
import Colors from "../../constants/Colors";

export default function CourseListByCategory({ category }) {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCourseListByCategory();
  }, [category]);

  const getCourseListByCategory = async () => {
    setLoading(true);
    setCourseList([]);
    try {
      const q = query(
        collection(db, "courses"),
        where("category", "==", category),
        orderBy("createdOn", "desc")
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
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator
          size={"large"}
          color={Colors.PRIMARY}
          style={{ marginTop: 100 }}
        />
      ) : (
        <CourseList courseList={courseList} heading={category} enroll={true} />
      )}
    </View>
  );
}
