import React from 'react';
import { View, Text } from 'react-native';

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold">HallMark</Text>
      <Text className="text-gray-600 mt-2">Welcome</Text>
    </View>
  );
}
