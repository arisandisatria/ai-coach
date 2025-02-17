import {
  View,
  Text,
  Pressable,
  Dimensions,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import * as Progress from "react-native-progress";
import FlipCard from "react-native-flip-card";

export default function FlashCards() {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const flashcards = course?.flashcards;
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);

  const getProgress = (currentPage) => {
    const percentage = currentPage / flashcards?.length;
    return percentage;
  };

  const onScroll = (event) => {
    const index = Math.round(
      event?.nativeEvent?.contentOffset.x / Dimensions.get("screen").width
    );
    setCurrentPage(index);
  };

  return (
    <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <View style={{ position: "absolute", width: "100%", padding: 25 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.PRIMARY} />
          </Pressable>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 18,
              color: Colors.PRIMARY,
            }}
          >
            {currentPage + 1} dari {flashcards?.length}
          </Text>
        </View>

        <View
          style={{
            marginTop: 20,
          }}
        >
          <Progress.Bar
            progress={getProgress(currentPage)}
            width={Dimensions.get("screen").width * 0.87}
            color={Colors.PRIMARY}
            height={10}
          />
        </View>

        <FlatList
          data={flashcards}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={onScroll}
          renderItem={({ item, index }) => (
            <View
              key={index + 1}
              style={{
                height: 500,
                marginVertical: 60,
              }}
            >
              <FlipCard style={styles.flipCard}>
                <View style={styles.frontCard}>
                  <Text
                    style={{
                      fontFamily: "outfit-bold",
                      fontSize: 26,
                      width: Dimensions.get("screen").width * 0.78,
                      padding: 20,
                      textAlign: "center",
                    }}
                  >
                    {item?.front}
                  </Text>
                </View>
                <View style={styles.backCard}>
                  <Text
                    style={{
                      width: Dimensions.get("screen").width * 0.78,
                      fontFamily: "outfit-bold",
                      fontSize: 26,
                      padding: 20,
                      textAlign: "center",
                      color: Colors.WHITE,
                    }}
                  >
                    {item?.back}
                  </Text>
                </View>
              </FlipCard>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flipCard: {
    width: Dimensions.get("screen").width * 0.78,
    height: "100%",
    backgroundColor: Colors.WHITE,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginHorizontal: Dimensions.get("screen").width * 0.05,
    elevation: 4,
  },
  frontCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: 20,
  },
  backCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: 20,
    backgroundColor: Colors.PRIMARY,
  },
});
