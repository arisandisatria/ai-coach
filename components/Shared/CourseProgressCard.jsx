import { View, Text, Image } from "react-native";
import React from "react";
import { imageAssets } from "../../constants/Option";
import Colors from "../../constants/Colors";
import * as Progress from "react-native-progress";

export default function CourseProgressCard({ item, width }) {
  const getCompletedChapters = (course) => {
    const completedChapters = course?.completedChapter?.length;
    const percentage = completedChapters / course?.chapters?.length;
    return percentage;
  };

  return (
    <View
      style={{
        margin: 7,
        padding: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        width: width,
        elevation: 1,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 8,
        }}
      >
        <Image
          source={imageAssets[item?.banner_image]}
          style={{ width: 80, height: 80, borderRadius: 8 }}
        />
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              fontFamily: "outfit-bold",
              fontSize: 16,
              flexWrap: "wrap",
            }}
          >
            {item?.courseTitle}
          </Text>
          <Text style={{ fontFamily: "outfit", fontSize: 14 }}>
            {item?.chapters?.length} bab
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 10,
        }}
      >
        <Progress.Bar
          progress={getCompletedChapters(item)}
          width={width - 30}
        />
        <Text
          style={{
            fontFamily: "outfit",
            marginTop: 2,
          }}
        >
          {item?.completedChapter?.length ?? 0} dari {item?.chapters?.length}{" "}
          bab selesai
        </Text>
      </View>
    </View>
  );
}
