import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { imageAssets } from "../../constants/Option";
import Colors from "../../constants/Colors";
import * as Progress from "react-native-progress";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function CourseProgressCard({ item, width }) {
  const getCompletedChapters = (course) => {
    const completedChapters = course?.completedChapter?.length;
    const percentage = completedChapters / course?.chapters?.length;
    return percentage;
  };
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/courseView/" + item.docId,
          params: {
            courseParams: JSON.stringify(item),
          },
        });
      }}
      style={{
        margin: 7,
        padding: 15,
        backgroundColor: Colors.PRIMARY,
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
            }}
          >
            <Ionicons name="book-outline" size={16} color={Colors.WHITE} />
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 14,
                color: Colors.WHITE,
              }}
            >
              {item?.chapters?.length} bab
            </Text>
          </View>
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
          color={Colors.WHITE}
        />
        <Text
          style={{
            fontFamily: "outfit",
            marginTop: 4,
            color: Colors.WHITE,
          }}
        >
          {item?.completedChapter?.length ?? 0} dari {item?.chapters?.length}{" "}
          bab selesai
        </Text>
      </View>
    </TouchableOpacity>
  );
}
