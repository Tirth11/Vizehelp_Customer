import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES, SHADOWS, GRADIENTS } from '../constants/theme';
import { PrimaryButton } from '../components/Button';

export default function BuddyArrivalScreen({ navigation, route }) {
  const { buddy = { name: 'Alex Johnson' } } = route.params || {};
  const code = ['4', '8', '2', '7'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <LinearGradient colors={GRADIENTS.success} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.iconCircle}>
          <Text style={{ fontSize: 52 }}>🎉</Text>
        </LinearGradient>
        <Text style={styles.title}>Your Buddy has arrived!</Text>
        <Text style={styles.subtitle}>{buddy.name} is at your location.</Text>

        <View style={styles.otpCard}>
          <Text style={styles.otpLabel}>Share this code to start the service</Text>
          <View style={styles.codeRow}>
            {code.map((d, i) => (
              <View key={i} style={styles.codeBox}><Text style={styles.codeDigit}>{d}</Text></View>
            ))}
          </View>
          <View style={styles.warnBox}>
            <Text style={styles.otpNote}>⚠️ Only share this code once you've confirmed your Buddy in person.</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.85}><Text style={styles.actionIcon}>📞</Text><Text style={styles.actionText}>Call</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.85}><Text style={styles.actionIcon}>💬</Text><Text style={styles.actionText}>Chat</Text></TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <PrimaryButton title="Start service" icon="▶" gradient="success" onPress={() => navigation.navigate('ServiceProgress', { ...route.params })} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: SIZES.lg },
  iconCircle: { width: 104, height: 104, borderRadius: 52, justifyContent: 'center', alignItems: 'center', marginBottom: 24, ...SHADOWS.medium },
  title: { ...FONTS.h1, color: COLORS.text, textAlign: 'center' },
  subtitle: { ...FONTS.body, color: COLORS.textLight, marginTop: 8, textAlign: 'center' },
  otpCard: { backgroundColor: COLORS.background, borderRadius: SIZES.radiusXl, padding: SIZES.lg, alignItems: 'center', marginTop: 30, width: '100%' },
  otpLabel: { ...FONTS.bodySm, color: COLORS.textLight, fontWeight: '600' },
  codeRow: { flexDirection: 'row', gap: 12, marginVertical: 18 },
  codeBox: { width: 54, height: 64, borderRadius: SIZES.radius, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', ...SHADOWS.small },
  codeDigit: { fontSize: 30, fontWeight: '800', color: COLORS.primary },
  warnBox: { backgroundColor: COLORS.errorLight, borderRadius: SIZES.radius, padding: 12 },
  otpNote: { ...FONTS.caption, color: COLORS.error, textAlign: 'center', fontWeight: '600', lineHeight: 18 },
  actionsRow: { flexDirection: 'row', gap: 16, marginTop: 26 },
  actionBtn: { alignItems: 'center', backgroundColor: COLORS.background, borderRadius: SIZES.radiusLg, paddingVertical: 16, paddingHorizontal: 28 },
  actionIcon: { fontSize: 22 },
  actionText: { ...FONTS.caption, color: COLORS.text, marginTop: 6, fontWeight: '600' },
  footer: { padding: SIZES.lg, paddingBottom: 28 },
});
