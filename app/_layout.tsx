import React from 'react';
import { Slot } from 'expo-router';
import { View } from 'react-native';
import '../global.css';

// Active configuration state modifier token
// Switch this value to: 'hearth' | 'canineCalm' | 'twilight' to shift theme structures instantly
const ACTIVE_APP_PROFILE: 'hearth' | 'canineCalm' | 'twilight' = 'hearth';

const THEME_STYLES = {
  hearth: { '--bg': '#09080D', '--surface': '#1A181F', '--text': '#FDFBF7', '--muted': '#8C8276', '--focus': '#D97A22' },
  canineCalm: { '--bg': '#0A1128', '--surface': '#1C2D5A', '--text': '#F4F7FF', '--muted': '#7A93CB', '--focus': '#FFD700' },
  twilight: { '--bg': '#09080D', '--surface': 'rgba(255, 255, 255, 0.04)', '--text': '#F2F0FF', '--muted': '#8A869E', '--focus': '#5C4DFF' },
};

export default function RootLayout() {
  const inlineThemeVars = THEME_STYLES[ACTIVE_APP_PROFILE] as any;

  return (
    <View style={inlineThemeVars} className="flex-1 bg-tv-bg">
      <Slot />
    </View>
  );
}
