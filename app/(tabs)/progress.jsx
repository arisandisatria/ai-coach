import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { UserDetailContext } from "../../context/userDetailContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import CourseProgressCard from "../../components/Shared/CourseProgressCard";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function Progress() {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();

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
      style={{ backgroundColor: Colors.WHITE, flex: 1 }}
      data={[]}
      ListHeaderComponent={
        <View>
          <Image
            source={require("./../../assets/images/wave.png")}
            style={{
              position: "absolute",
              width: "100%",
              height: 700,
            }}
          />
          <View style={{ width: "100%", position: "relative", padding: 20 }}>
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 25,
                color: Colors.WHITE,
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Perkembangan Materi
            </Text>
            {loading ? (
              <ActivityIndicator
                size={"large"}
                color={Colors.WHITE}
                style={{ marginTop: 100 }}
              />
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                onRefresh={() => getCourseList()}
                refreshing={loading}
                data={courseList}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    key={index + 1}
                    onPress={() => {
                      router.push({
                        pathname: "/courseView/" + item.docId,
                        params: {
                          courseParams: JSON.stringify(item),
                        },
                      });
                    }}
                  >
                    <CourseProgressCard item={item} width={"96%"} />
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
      }
    />
  );
}
