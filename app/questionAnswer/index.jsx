import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function QuestionAnswer() {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const qaList = course?.qa;
  const [selectedQuestion, setSelectedQuestion] = useState();
  const router = useRouter();

  const onQuestionSelect = (index) => {
    selectedQuestion == index
      ? setSelectedQuestion(null)
      : setSelectedQuestion(index);
  };

  return (
    <FlatList
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

          <View
            style={{
              position: "relative",
              width: "100%",
              padding: 20,
              marginTop: 35,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
              }}
            >
              <Pressable onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={30} color={Colors.WHITE} />
              </Pressable>
              <Text
                style={{
                  fontFamily: "outfit-bold",
                  fontSize: 28,
                  textAlign: "center",
                  color: Colors.WHITE,
                }}
              >
                Q&A
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "outfit",
                color: Colors.WHITE,
                fontSize: 18,
                marginVertical: 10,
              }}
            >
              {course?.courseTitle}
            </Text>

            <FlatList
              data={qaList}
              renderItem={({ item, index }) => (
                <Pressable
                  style={styles.card}
                  onPress={() => onQuestionSelect(index)}
                >
                  <Text style={{ fontFamily: "outfit-bold", fontSize: 16 }}>
                    {item?.question}
                  </Text>
                  {selectedQuestion == index && (
                    <View>
                      <Text
                        style={{
                          fontFamily: "outfit",
                          fontSize: 12,
                          color: Colors.GREEN,
                          marginTop: 5,
                        }}
                      >
                        {item?.answer}
                      </Text>
                    </View>
                  )}
                </Pressable>
              )}
            />
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    backgroundColor: Colors.WHITE,
    marginTop: 15,
    borderRadius: 15,
    elevation: 1,
  },
});
