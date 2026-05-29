import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, GRADIENTS } from '../constants/theme';

export default function SplashScreen() {
  return (
    <LinearGradient colors={GRADIENTS.splash} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />

      <View style={styles.center}>
        <View style={styles.logoOuter}>
          <View style={styles.logoCircle}>
            <Text style={styles.logo}>⚡</Text>
          </View>
        </View>
        <Text style={styles.title}>Vizehelp</Text>
        <Text style={styles.subtitle}>Help is just a tap away</Text>
      </View>

      <View style={styles.footer}>
        <ActivityIndicator size="small" color={COLORS.white} />
        <Text style={styles.trust}>🔒 Trusted · Verified · Secure</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  glowOne: { position: 'absolute', top: -60, right: -50, width: 220, height: 220, borderRadius: 110, backgroundColor: 'rgba(255,255,255,0.08)' },
  glowTwo: { position: 'absolute', bottom: 40, left: -70, width: 260, height: 260, borderRadius: 130, backgroundColor: 'rgba(255,255,255,0.06)' },
  center: { alignItems: 'center' },
  logoOuter: { width: 124, height: 124, borderRadius: 36, backgroundColor: 'rgba(255,255,255,0.12)', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  logoCircle: { width: 92, height: 92, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.18)', justifyContent: 'center', alignItems: 'center' },
  logo: { fontSize: 50 },
  title: { fontSize: 40, fontWeight: '800', color: COLORS.white, letterSpacing: -0.5 },
  subtitle: { ...FONTS.body, color: 'rgba(255,255,255,0.9)', marginTop: 8 },
  footer: { position: 'absolute', bottom: 56, alignItems: 'center' },
  trust: { ...FONTS.caption, color: 'rgba(255,255,255,0.85)', marginTop: 14, letterSpacing: 0.5 },
});
