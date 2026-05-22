import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

export default function BuddyArrivalScreen({ navigation, route }) {
  const { buddy = { name: 'Alex Johnson' } } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <View style={styles.iconCircle}><Text style={{ fontSize: 56 }}>🎉</Text></View>
        <Text style={styles.title}>Buddy Has Arrived!</Text>
        <Text style={styles.subtitle}>{buddy.name} is at your location</Text>

        <View style={styles.otpCard}>
          <Text style={styles.otpLabel}>Share this OTP with your Buddy</Text>
          <Text style={styles.otpCode}>4 8 2 7</Text>
          <Text style={styles.otpNote}>Do not share with anyone else</Text>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtn}><Text style={{ fontSize: 20 }}>📞</Text><Text style={styles.actionText}>Call</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}><Text style={{ fontSize: 20 }}>💬</Text><Text style={styles.actionText}>Chat</Text></TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.startBtn} onPress={() => navigation.navigate('ServiceProgress', { ...route.params })}>
          <Text style={styles.startBtnText}>Start Service</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: SIZES.lg },
  iconCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#FEF3C7', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  title: { ...FONTS.h1, color: COLORS.text },
  subtitle: { ...FONTS.body, color: COLORS.gray, marginTop: 8 },
  otpCard: { backgroundColor: COLORS.background, borderRadius: SIZES.radius, padding: SIZES.lg, alignItems: 'center', marginTop: 30, width: '100%' },
  otpLabel: { ...FONTS.bodySm, color: COLORS.gray },
  otpCode: { ...FONTS.h1, color: COLORS.primary, letterSpacing: 8, marginVertical: 12, fontSize: 36 },
  otpNote: { ...FONTS.caption, color: COLORS.error },
  actionsRow: { flexDirection: 'row', gap: 20, marginTop: 30 },
  actionBtn: { alignItems: 'center', backgroundColor: COLORS.background, borderRadius: SIZES.radius, padding: 16, width: 80 },
  actionText: { ...FONTS.caption, color: COLORS.text, marginTop: 6 },
  footer: { padding: SIZES.lg },
  startBtn: { backgroundColor: COLORS.success, borderRadius: SIZES.radius, paddingVertical: 16, alignItems: 'center' },
  startBtnText: { ...FONTS.button, color: COLORS.white },
});
