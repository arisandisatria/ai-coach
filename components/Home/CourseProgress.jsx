import { View, Text, FlatList } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import CourseProgressCard from "../Shared/CourseProgressCard";

export default function CourseProgress({ courseList }) {
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
          color: Colors.BLACK,
        }}
      >
        Perkembangan Belajar
      </Text>

      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={courseList}
        renderItem={({ item, index }) => (
          <CourseProgressCard
            key={index + 1}
            item={item}
            width={280}
            height={300}
          />
        )}
      />
    </View>
  );
}
