import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function Chapters({ course }) {
  const router = useRouter();

  const isChapterCompleted = (index) => {
    const isCompletedChapter = course?.completedChapter?.find(
      (item) => item == index
    );
    return isCompletedChapter ? true : false;
  };

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>Bab</Text>

      <FlatList
        data={course?.chapters}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index + 1}
            onPress={() =>
              router.push({
                pathname: "/chapter-view",
                params: {
                  chapterParams: JSON.stringify(item),
                  docId: course?.docId,
                  chapterIndex: index,
                },
              })
            }
            style={{
              padding: 14,
              borderWidth: 0.5,
              borderRadius: 15,
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                width: "80%",
              }}
            >
              <Text style={styles.chapterText}>{index + 1}.</Text>
              <Text style={styles.chapterText}>{item.chapterName}</Text>
            </View>
            {isChapterCompleted(index) ? (
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={Colors.GREEN}
              />
            ) : (
              <Ionicons name="play" size={24} color={Colors.PRIMARY} />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chapterText: {
    fontFamily: "outfit",
    fontSize: 14,
  },
});
