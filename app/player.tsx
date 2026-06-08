import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, SafeAreaView, Animated } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';
import { Play, Pause, ArrowLeft, Sliders, X } from 'lucide-react-native';

export default function PlayerScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [controlsVisible, setControlsVisible] = useState(true);
  
  // Animated opacity reference for self-vanishing TV menus
  const controlsOpacity = useRef(new Animated.Value(1)).current;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Core background loop video assets repository matching track selections
  const videoSource = "https://cloudfront.net"; // Swap with your looping ambient streams

  // Automatically hide player controls after periods of remote inactivity
  const resetControlsTimer = () => {
    setControlsVisible(true);
    Animated.timing(controlsOpacity, { toValue: 1, duration: 250, useNativeDriver: true }).start();

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      Animated.timing(controlsOpacity, { toValue: 0, duration: 500, useNativeDriver: true }).start(() => {
        setControlsVisible(false);
      });
    }, 5000); // 5 Seconds vanishing threshold
  };

  useEffect(() => {
    resetControlsTimer();
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  return (
    <Pressable onPress={resetControlsTimer} className="flex-1 bg-black relative">
      
      {/* Immersive Widescreen Background Media Track Layer */}
      <Video
        source={{ uri: videoSource }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={ResizeMode.COVER}
        shouldPlay={isPlaying}
        isLooping
        className="absolute inset-0 w-full h-full"
      />

      {/* Invisible black shader tinting back media track to guarantee UI typography readability */}
      <View className="absolute inset-0 bg-black/30" />

      {/* Self-Vanishing Interface Overlay Box Wrapper */}
      <Animated.View style={{ opacity: controlsOpacity }} className="absolute inset-0 p-[56px] justify-between z-20">
        
        {/* Top Operational Navigation Ribbon */}
        <View className="flex-row justify-between items-center">
          <Pressable 
            onPress={() => router.back()}
            onPressIn={resetControlsTimer}
            className="p-4 rounded-full bg-tv-surface/40 border border-white/10 flex-row items-center gap-3
                       focus:bg-tv-focus focus:scale-105 transition-all duration-150"
          >
            <ArrowLeft color="#FDFBF7" size={24} />
            <Text className="text-tv-text font-semibold text-lg pr-2">Return to Mantle</Text>
          </Pressable>

          <Text className="text-white/60 text-lg font-medium tracking-wide">
            Track Audio Stream #{id}
          </Text>
        </View>

        {/* Absolute-Centered Player Control Interface Strip */}
        <View className="items-center w-full mb-4">
          <View className="bg-tv-surface/80 border border-white/10 backdrop-blur-xl px-10 py-6 rounded-full flex-row items-center gap-8 shadow-2xl">
            
            {/* Play / Pause Toggle Button Focus Target */}
            <Pressable
              onPress={() => setIsPlaying(!isPlaying)}
              onPressIn={resetControlsTimer}
              className="w-16 h-16 rounded-full bg-tv-focus items-center justify-center shadow-lg
                         focus:scale-110 active:scale-95 transition-all duration-150"
            >
              {isPlaying ? <Pause color="#09080D" size={28} /> : <Play color="#09080D" size={28} />}
            </Pressable>

            {/* Custom Layer Mixer Modal Call Toggle */}
            <Pressable
              onPressIn={resetControlsTimer}
              className="p-4 rounded-full bg-white/10 items-center justify-center border border-white/10
                         focus:bg-tv-focus group transition-all duration-150"
            >
              <Sliders color="#FDFBF7" size={24} />
            </Pressable>
            
          </View>
        </View>

      </Animated.View>
    </Pressable>
  );
}
