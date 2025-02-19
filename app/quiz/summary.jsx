import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import dedent from "dedent";
import Colors from "../../constants/Colors";
import Button from "../../components/Shared/Button";
import { generateNewQuizAiModel } from "../../config/AiModel";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

export default function QuizSummary() {
  const { quizResultParam, quizDocId, quizQuiz, quizCourseTitle } =
    useLocalSearchParams();
  const quizResult = JSON.parse(quizResultParam);
  const [correctAns, setCorrectAns] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    quizResult && calculateResult();
  }, [quizResult]);

  const calculateResult = () => {
    const correctAns =
      quizResult &&
      Object.entries(quizResult)?.filter(
        ([key, value]) => value?.isCorrect == true
      );
    const totalQuest = Object.keys(quizResult).length;

    setCorrectAns(correctAns.length);
    setTotalQuestion(totalQuest);
  };

  const getPercentageMark = () => {
    return ((correctAns / totalQuestion) * 100).toFixed(0);
  };

  const regenerateQuiz = async () => {
    setLoading(true);
    const PROMPT = dedent`
    - Buatkan 10 quiz yang berbeda daripada ${quizQuiz}
    - Buat pertanyaan tersebut berdasarkan judul ${quizCourseTitle}
    - Buat juga 4 opsi jawaban yang berbeda
    - Hasilkan outputnya seperti contoh ini: "quiz": [
              {
                "question": "Apa itu variabel?",
                "options": ["Penyimpanan data", "Sebuah fungsi", "Tipe data", "Loop"],
                "correctAns": "Penyimpanan data"
              }
            ],
    `;

    try {
      const regenQuiz = await generateNewQuizAiModel.sendMessage(PROMPT);
      const textResponse = JSON.parse(regenQuiz.response.text());

      await updateDoc(doc(db, "courses", quizDocId), {
        quiz: textResponse.quiz,
      });
      router.replace("/(tabs)/home");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.WHITE,
          }}
        >
          <View
            style={{
              position: "relative",
              width: "100%",
              padding: 35,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "outfit-bold",
                fontSize: 25,
                color: Colors.BLACK,
              }}
            >
              Hasil Quiz
            </Text>
            <View
              style={{
                backgroundColor: Colors.PRIMARY,
                padding: 20,
                borderRadius: 20,
                marginTop: 60,
                display: "flex",
                alignItems: "center",
                elevation: 4,
              }}
            >
              <Image
                source={require("../../assets/images/trophy.png")}
                style={{
                  width: 100,
                  height: 100,
                  marginTop: -60,
                }}
              />
              <Text
                style={{
                  fontFamily: "outfit-bold",
                  fontSize: 24,
                  color: Colors.WHITE,
                }}
              >
                {getPercentageMark() > 60 ? "Selamat!" : "Coba lagi :("}
              </Text>
              <Text
                style={{
                  fontFamily: "outfit",
                  fontSize: 16,
                  color: Colors.WHITE,
                }}
              >
                Jawaban benar {getPercentageMark()}%
              </Text>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <View style={{ padding: 15 }}>
                  <Text style={styles.resultText}>❔: {totalQuestion}</Text>
                </View>
                <View style={{ padding: 15 }}>
                  <Text style={styles.resultText}>✅: {correctAns}</Text>
                </View>
                <View style={{ padding: 15 }}>
                  <Text style={styles.resultText}>
                    ❌: {totalQuestion - correctAns}
                  </Text>
                </View>
              </View>
            </View>

            <Button
              text={"Kembali ke halaman utama"}
              onPress={() => router.replace("/(tabs)/home")}
            />

            <Button
              text={"Perbarui quiz"}
              type="outline"
              loading={loading}
              onPress={() => regenerateQuiz()}
            />

            <View style={{ marginTop: 25, flex: 1 }}>
              <Text style={{ fontFamily: "outfit-bold", fontSize: 22 }}>
                Ringkasan
              </Text>
              <FlatList
                data={Object.entries(quizResult)}
                renderItem={({ item, index }) => {
                  const quizItem = item[1];
                  return (
                    <View
                      style={{
                        padding: 10,
                        borderWidth: 1,
                        marginTop: 8,
                        borderRadius: 15,
                        backgroundColor:
                          quizItem?.isCorrect == true
                            ? Colors.LIGHT_GREEN
                            : Colors.LIGHT_RED,
                        borderColor:
                          quizItem?.isCorrect == true
                            ? Colors.GREEN
                            : Colors.RED,
                      }}
                    >
                      <Text style={{ fontFamily: "outfit", fontSize: 14 }}>
                        {quizItem.question}
                      </Text>
                      <Text style={{ fontFamily: "outfit", fontSize: 12 }}>
                        Jawaban benar: {quizItem?.correctAns}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  resultText: {
    fontFamily: "outfit",
    fontSize: 20,
    color: Colors.WHITE,
  },
});
