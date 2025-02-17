import {
  View,
  Text,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import * as Progress from "react-native-progress";
import Button from "../../components/Shared/Button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

export default function Quiz() {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const quiz = course?.quiz;
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOption, setSelectedOption] = useState();
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getProgress = (currentPage) => {
    const percentage = currentPage / quiz?.length;
    return percentage;
  };

  const onChoiceSelected = (selectedChoice) => {
    setResult((prev) => ({
      ...prev,
      [currentPage]: {
        userChoice: selectedChoice,
        isCorrect: quiz[currentPage]?.correctAns == selectedChoice,
        question: quiz[currentPage]?.question,
        correctAns: quiz[currentPage]?.correctAns,
      },
    }));
  };

  const onQuizFinish = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "courses", course?.docId), {
        quizResult: result,
      });
      setLoading(false);

      router.replace({
        pathname: "/quiz/summary",
        params: {
          quizResultParam: JSON.stringify(result),
        },
      });
    } catch (error) {
      console.log("error:", error);
      setLoading(false);
    }
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
            {currentPage + 1} dari {quiz?.length}
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

        <View
          style={{
            padding: 20,
            backgroundColor: Colors.WHITE,
            marginTop: 30,
            height: Dimensions.get("screen").height * 0.65,
            elevation: 4,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: "outfit-bold",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            {quiz[currentPage]?.question}
          </Text>
          {quiz[currentPage]?.options.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedOption(index);
                onChoiceSelected(item);
              }}
              key={index + 1}
              style={{
                padding: 15,
                borderWidth: 1,
                borderRadius: 15,
                marginTop: 10,
                backgroundColor:
                  selectedOption == index ? Colors.LIGHT_GREEN : null,
                borderColor:
                  selectedOption == index ? Colors.GREEN : Colors.GRAY,
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit",
                  fontSize: 16,
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {selectedOption?.toString() && quiz?.length - 1 > currentPage && (
          <Button
            text={"Selanjutnya"}
            onPress={() => {
              setSelectedOption(null);
              setCurrentPage(currentPage + 1);
            }}
          />
        )}

        {selectedOption?.toString() && quiz?.length - 1 == currentPage && (
          <Button
            loading={loading}
            text={"Selesai"}
            onPress={() => onQuizFinish()}
          />
        )}
      </View>
    </View>
  );
}
