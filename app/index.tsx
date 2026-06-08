import React from 'react';
import { Text, View, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

const SOUNDSCAPES = [
  { id: '1', title: 'Rain on Windowpane', subtitle: 'Infinite Studio Loop' },
  { id: '2', title: 'Crackling Cabin Hearth', subtitle: 'True Spatial Audio' },
  { id: '3', title: 'Autumn Forest Winds', subtitle: '432Hz Binaural Mix' },
  { id: '4', title: 'Deep Cosmic Synth Drone', subtitle: 'Atmospheric Layer' },
];

export default function ResponsiveHomeMantleScreen() {
  const router = useRouter();

  return (
    // 'p-[5vw]' creates a fluid 5% overscan margin padding around the master container canvas
    <SafeAreaView className="flex-1 bg-tv-bg p-[5vw] justify-center">
      
      {/* Responsive Left-Aligned Fixed Brand Block */}
      <View className="mb-[4vh]">
        <Text className="text-tv-text text-[4.5vw] font-extrabold tracking-tight leading-none">
          Ambient Ecosystem
        </Text>
        <Text className="text-tv-muted text-[1.5vw] mt-[1vh] font-medium">
          Navigate using your Smart TV hardware remote D-pad control array
        </Text>
      </View>

      {/* Responsive Carousel Grid System Track Wrapper */}
      <View className="mt-[2vh] flex-col">
        <Text className="text-tv-text text-[1.8vw] font-bold mb-[2vh] tracking-wide">
          Curated Atmospheres
        </Text>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 24, paddingVertical: 16, paddingHorizontal: 4 }}
        >
          {SOUNDSCAPES.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => router.push(`/player?id=${item.id}`)}
              // Mapped container measurements to viewport width (vw) and height (vh) units
              // This forces structural elements to scale automatically between 1080p, 4K, and 8K TV displays
              className="w-[20vw] h-[22vh] bg-tv-surface shadow-lg rounded-2xl p-[1.8vw] justify-end border-3 border-transparent 
                         focus:border-tv-focus focus:scale-105 active:scale-98 relative overflow-hidden transition-all duration-150"
            >
              {/* Inner Typography Layout Container */}
              <View className="z-10">
                <Text className="text-tv-text text-[1.4vw] font-bold tracking-tight leading-snug">
                  {item.title}
                </Text>
                <Text className="text-tv-muted text-[1.1vw] mt-[0.5vh] font-medium">
                  {item.subtitle}
                </Text>
              </View>

              {/* Dynamic Remote Target Color Accenter Bar */}
              <View className="absolute bottom-0 left-0 right-0 h-[0.8vh] bg-transparent focus:bg-tv-focus" />
            </Pressable>
          ))}
        </ScrollView>
      </View>

    </SafeAreaView>
  );
}
