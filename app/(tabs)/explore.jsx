import { View, Text, FlatList } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { courseCategory } from "../../constants/Option";
import CourseListByCategory from "../../components/Explore/CourseListByCategory";

export default function Explore() {
  return (
    <FlatList
      data={[]}
      style={{ flex: 1, backgroundColor: Colors.WHITE }}
      ListHeaderComponent={
        <View
          style={{
            padding: 25,
            backgroundColor: Colors.WHITE,
            flex: 1,
          }}
        >
          <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
            Materi Lainnya
          </Text>

          {courseCategory.map((category, index) => (
            <View
              key={index + 1}
              style={{
                marginTop: 10,
              }}
            >
              <CourseListByCategory category={category} />
            </View>
          ))}
        </View>
      }
    />
  );
}
