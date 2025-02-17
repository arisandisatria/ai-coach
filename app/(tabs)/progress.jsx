import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { UserDetailContext } from "../../context/userDetailContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import CourseProgressCard from "../../components/Shared/CourseProgressCard";
import Colors from "../../constants/Colors";
export default function Progress() {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  useEffect(() => {
    userDetail && getCourseList();
  }, [userDetail]);

  const getCourseList = async () => {
    setLoading(true);
    setCourseList([]);
    const q = query(
      collection(db, "courses"),
      where("createdBy", "==", userDetail?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setCourseList((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };

  return (
    <FlatList
      style={{ backgroundColor: Colors.WHITE, flex: 1, marginBottom: 50 }}
      data={[]}
      ListHeaderComponent={
        <View>
          <View style={{ width: "100%", position: "relative", padding: 20 }}>
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 25,
                color: Colors.BLACK,
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Perkembangan Materi
            </Text>
            {loading ? (
              <ActivityIndicator
                size={"large"}
                color={Colors.PRIMARY}
                style={{ marginTop: 100 }}
              />
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                onRefresh={() => getCourseList()}
                refreshing={loading}
                data={courseList}
                renderItem={({ item, index }) => (
                  <CourseProgressCard
                    key={index + 1}
                    item={item}
                    width={"96%"}
                  />
                )}
              />
            )}
          </View>
        </View>
      }
    />
  );
}
