import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { practiceOption } from "../../constants/Option";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function PracticeSection() {
  const router = useRouter();

  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
        }}
      >
        Latihan
      </Text>

      <View>
        <FlatList
          data={practiceOption}
          numColumns={3}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => router.push("/practice/" + item?.name)}
              key={index + 1}
              style={{
                flex: 1,
                margin: 5,
                aspectRatio: 1,
              }}
            >
              <Image
                source={item?.image}
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: 160,
                  borderRadius: 15,
                }}
              />
              <Text
                style={{
                  position: "absolute",
                  padding: 10,
                  fontFamily: "outfit",
                  fontSize: 12,
                  color: Colors.WHITE,
                }}
              >
                {item?.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
