import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import Button from "../../components/Shared/Button";
import {
  generateCourseAiModel,
  generateTopicsAiModel,
} from "../../config/AiModel";
import Prompt from "../../constants/Prompt";
import { setDoc, doc } from "firebase/firestore";
import { db } from "./../../config/firebaseConfig";
import { useContext } from "react";
import { UserDetailContext } from "../../context/userDetailContext";
import { useRouter } from "expo-router";

export default function AddCourse() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState();
  const [topics, setTopics] = useState();
  const [selectedTopics, setSelectedTopics] = useState([]);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const router = useRouter();

  const onGenerateTopic = async () => {
    if (userInput.trim() && userInput.length > 0) {
      setLoading(true);
      const PROMPT = userInput + Prompt.IDEA;
      const aiRes = await generateTopicsAiModel.sendMessage(PROMPT);
      const topicIdea = JSON.parse(aiRes.response.text());
      setTopics(topicIdea);
      setLoading(false);
    } else {
      ToastAndroid.show("Please fill the topic", ToastAndroid.BOTTOM);
    }
  };

  const onTopicSelect = (topic) => {
    const isTopicSelected = selectedTopics.find((item) => item == topic);

    if (!isTopicSelected) {
      setSelectedTopics((prev) => [...prev, topic]);
    } else {
      const topics = selectedTopics.filter((item) => item !== topic);
      setSelectedTopics(topics);
    }
  };

  const isTopicSelected = (topic) => {
    const selected = selectedTopics.find((item) => item == topic);
    return selected ? true : false;
  };

  const onGenerateCourse = async () => {
    setLoading(true);
    const PROMPT = selectedTopics + Prompt.COURSE;

    try {
      const aiRes = await generateCourseAiModel.sendMessage(PROMPT);
      console.log("AI Raw Response:", aiRes);

      const textResponse = aiRes.response.text();

      const resArray = JSON.parse(textResponse);

      console.log(resArray);

      if (
        !Array.isArray(resArray) ||
        resArray.length === 0 ||
        !resArray[0].courses
      ) {
        throw new Error("Response does not contain valid courses");
      }

      const courses = resArray[0].courses;

      for (const course of courses) {
        const docId = Date.now().toString();
        await setDoc(doc(db, "courses", docId), {
          ...course,
          createdOn: new Date(),
          createdBy: userDetail.email,
          docId: docId,
        });
      }

      router.push("/(tabs)/home");
    } catch (error) {
      console.log("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        padding: 25,
        backgroundColor: Colors.WHITE,
        flex: 1,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 30,
          }}
        >
          Buat Materi Baru
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 16,
          }}
        >
          Apa yang mau kamu pelajari hari ini?
        </Text>

        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 12,
            marginTop: 8,
            color: Colors.GRAY,
          }}
        >
          Materi apa yang mau kamu buat? (cth. Learn python, Digital Marketing,
          10th Science Chapters, dll...)
        </Text>

        <TextInput
          onChangeText={(value) => setUserInput(value)}
          placeholder="Learn Python, Learn React, etc..."
          style={styles.textInput}
          multiline={true}
          numberOfLines={3}
        />

        <Button
          text={"Buat Topik"}
          type="outline"
          onPress={() => onGenerateTopic()}
          loading={loading}
        />

        <View
          style={{
            marginVertical: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 6,
            }}
          >
            {topics && (
              <Text
                style={{
                  fontFamily: "outfit",
                  fontSize: 16,
                }}
              >
                Pilih topik yang akan ditambahkan ke materi
              </Text>
            )}
            {topics?.map((topic, index) => (
              <Pressable
                key={index + 1}
                disabled={loading}
                onPress={() => onTopicSelect(topic)}
              >
                <Text
                  style={{
                    padding: 7,
                    borderWidth: 0.4,
                    borderRadius: 99,
                    paddingHorizontal: 15,
                    borderColor: Colors.PRIMARY,
                    backgroundColor: isTopicSelected(topic)
                      ? Colors.PRIMARY
                      : null,
                    color: isTopicSelected(topic)
                      ? Colors.WHITE
                      : Colors.PRIMARY,
                  }}
                >
                  {topic}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {selectedTopics?.length > 0 && (
          <Button
            style={{
              marginBottom: 15,
            }}
            text={"Buat Materi"}
            onPress={() => onGenerateCourse()}
            loading={loading}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    height: 100,
    marginTop: 10,
    alignItems: "flex-start",
    fontSize: 16,
  },
});
