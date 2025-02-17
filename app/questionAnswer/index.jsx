import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
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
          <View
            style={{
              position: "relative",
              width: "100%",
              padding: 20,
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
                <Ionicons name="arrow-back" size={30} color={Colors.PRIMARY} />
              </Pressable>
              <Text
                style={{
                  fontFamily: "outfit-bold",
                  fontSize: 28,
                  textAlign: "center",
                  color: Colors.PRIMARY,
                }}
              >
                Q&A
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "outfit",
                color: Colors.PRIMARY,
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
