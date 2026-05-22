import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>⚡</Text>
      <Text style={styles.title}>Vizehelp</Text>
      <Text style={styles.subtitle}>Help is just a tap away</Text>
      <ActivityIndicator size="large" color={COLORS.white} style={{ marginTop: 40 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  logo: { fontSize: 80 },
  title: { ...FONTS.h1, color: COLORS.white, marginTop: 16, fontSize: 36 },
  subtitle: { ...FONTS.body, color: 'rgba(255,255,255,0.8)', marginTop: 8 },
});
