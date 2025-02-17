import { Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function CourseListGrid({ courseList, option }) {
  const router = useRouter();

  const onPress = (course) => {
    router.push({
      pathname: option?.path,
      params: {
        courseParams: JSON.stringify(course),
      },
    });
  };

  return (
    <FlatList
      data={courseList}
      numColumns={2}
      style={{ padding: 20 }}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() => onPress(item)}
          key={index + 1}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 15,
            backgroundColor: Colors.WHITE,
            margin: 7,
            borderRadius: 15,
            elevation: 1,
          }}
        >
          <Image
            source={option?.icon}
            style={{
              width: "100%",
              height: 70,
              objectFit: "contain",
            }}
          />
          <Text
            style={{
              fontFamily: "outfit",
              textAlign: "center",
              marginTop: 7,
              fontSize: 12,
            }}
          >
            {item?.courseTitle}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}
