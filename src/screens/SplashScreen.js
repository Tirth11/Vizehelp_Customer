import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoCircle}>
        <Text style={styles.logo}>⚡</Text>
      </View>
      <Text style={styles.title}>Vizehelp</Text>
      <Text style={styles.subtitle}>Help is just a tap away</Text>
      <ActivityIndicator size="large" color={COLORS.white} style={{ marginTop: 40 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  logoCircle: { width: 100, height: 100, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  logo: { fontSize: 56 },
  title: { fontSize: 36, fontWeight: '700', color: COLORS.white, marginTop: 8 },
  subtitle: { ...FONTS.body, color: 'rgba(255,255,255,0.85)', marginTop: 8 },
});
