import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { imageAssets } from "./../../constants/Option";
import Colors from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function CourseList({
  courseList,
  heading = "Materi",
  enroll = false,
}) {
  const router = useRouter();

  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
        }}
      >
        {heading}
      </Text>

      {courseList.length == 0 ? (
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 12,
            marginTop: 5,
          }}
        >
          Belum ada materi
        </Text>
      ) : (
        <FlatList
          data={courseList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index + 1}
              onPress={() => {
                router.push({
                  pathname: "/courseView/" + item.docId,
                  params: {
                    courseParams: JSON.stringify(item),
                    enroll: enroll,
                  },
                });
              }}
              style={styles.courseContainer}
            >
              <Image
                source={imageAssets[item.banner_image]}
                style={{ width: "100%", height: 150, borderRadius: 15 }}
              />
              <Text
                style={{
                  fontFamily: "outfit-bold",
                  fontSize: 14,
                  marginTop: 6,
                  color: Colors.WHITE,
                }}
              >
                {item?.courseTitle}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                  marginTop: 4,
                }}
              >
                <Ionicons name="book-outline" size={20} color={Colors.WHITE} />
                <Text
                  style={{
                    fontFamily: "outfit",
                    color: Colors.WHITE,
                  }}
                >
                  {item?.chapters?.length} bab
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  courseContainer: {
    padding: 10,
    backgroundColor: Colors.PRIMARY,
    margin: 6,
    borderRadius: 15,
    width: 280,
    maxHeight: 280,
  },
});
