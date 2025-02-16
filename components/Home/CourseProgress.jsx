import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import CourseProgressCard from "../Shared/CourseProgressCard";
import { useRouter } from "expo-router";

export default function CourseProgress({ courseList }) {
  const router = useRouter();

  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
          color: Colors.WHITE,
        }}
      >
        Perkembangan Belajar
      </Text>

      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
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
            <CourseProgressCard item={item} width={280} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
