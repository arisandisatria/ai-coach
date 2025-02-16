import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Progress from "react-native-progress";
import Colors from "../../constants/Colors";
import Button from "../../components/Shared/Button";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

export default function ChapterView() {
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { chapterParams, docId, chapterIndex } = useLocalSearchParams();
  const chapters = JSON.parse(chapterParams);

  const getProgress = (currentPage) => {
    const percentage = currentPage / chapters?.content?.length;
    return percentage;
  };

  const onChapterCompleted = async () => {
    setLoading(true);
    await updateDoc(doc(db, "courses", docId), {
      completedChapter: arrayUnion(chapterIndex),
    });
    setLoading(false);
    router.back();
  };
  return (
    <View
      style={{
        padding: 25,
        backgroundColor: Colors.WHITE,
        flex: 1,
      }}
    >
      <Progress.Bar
        progress={getProgress(currentPage)}
        width={Dimensions.get("screen").width * 0.85}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 20 }}
      >
        <Text style={{ fontFamily: "outfit-bold", fontSize: 18 }}>
          {chapters?.content[currentPage]?.topic}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 14,
            marginTop: 7,
            textAlign: "justify",
          }}
        >
          {chapters?.content[currentPage]?.explain}
        </Text>

        {chapters?.content[currentPage]?.code && (
          <View
            style={{
              marginTop: 10,
              display: "flex",
              gap: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 16,
              }}
            >
              Contoh Kode
            </Text>

            <Text
              style={[
                styles.codeExampleText,
                { backgroundColor: Colors.BLACK, color: Colors.WHITE },
              ]}
            >
              {chapters?.content[currentPage]?.code}
            </Text>
          </View>
        )}

        {chapters?.content[currentPage]?.example && (
          <View
            style={{
              marginTop: 15,
              display: "flex",
              gap: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 16,
              }}
            >
              Contoh
            </Text>

            <Text style={styles.codeExampleText}>
              {chapters?.content[currentPage]?.example}
            </Text>
          </View>
        )}
      </ScrollView>

      <View
        style={{
          position: "relative",
          width: "50%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
            gap: 5,
          }}
        >
          {currentPage > 0 && (
            <Button
              type="outline"
              text={"Sebelumnya"}
              onPress={() => setCurrentPage(currentPage - 1)}
            />
          )}
          {chapters?.content?.length - 1 != currentPage ? (
            <Button
              text={"Selanjutnya"}
              onPress={() => setCurrentPage(currentPage + 1)}
            />
          ) : (
            <Button
              text={"Selesai"}
              onPress={() => onChapterCompleted()}
              loading={loading}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  codeExampleText: {
    padding: 15,
    backgroundColor: Colors.BG_GRAY,
    borderRadius: 15,
    fontFamily: "outfit",
    fontSize: 14,
  },
});
