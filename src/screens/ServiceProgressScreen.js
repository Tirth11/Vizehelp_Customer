import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES, SHADOWS, GRADIENTS } from '../constants/theme';
import { PrimaryButton } from '../components/Button';

export default function ServiceProgressScreen({ navigation, route }) {
  const { service, buddy = { name: 'Alex Johnson' } } = route.params || {};
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setElapsed(e => e + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { label: 'Buddy arrived', done: true },
    { label: 'Service started', done: true },
    { label: 'In progress', done: true },
    { label: 'Completing', done: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={GRADIENTS.hero} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
        <View style={styles.liveChip}><Text style={styles.liveText}>● LIVE · Service in progress</Text></View>
        <Text style={styles.headerTitle}>{service?.name || 'Service'}</Text>
        <View style={styles.timerRow}>
          <View style={styles.timerCol}><Text style={styles.timerValue}>{elapsed}</Text><Text style={styles.timerLabel}>min elapsed</Text></View>
          <View style={styles.timerDivider} />
          <View style={styles.timerCol}><Text style={styles.timerValueSm}>{buddy.name}</Text><Text style={styles.timerLabel}>your Buddy</Text></View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.stepsCard}>
          <Text style={styles.stepsTitle}>Progress</Text>
          {steps.map((s, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={styles.stepIconCol}>
                <View style={[styles.stepDot, s.done && styles.stepDotDone]}>
                  {s.done ? <Text style={styles.stepCheck}>✓</Text> : <View style={styles.pulse} />}
                </View>
                {i < steps.length - 1 ? <View style={[styles.stepLine, s.done && styles.stepLineDone]} /> : null}
              </View>
              <Text style={[styles.stepLabel, s.done && styles.stepLabelDone]}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.85}><Text style={styles.actionIcon}>📞</Text><Text style={styles.actionText}>Call Buddy</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.85} onPress={() => navigation.navigate('RaiseIssue', {})}><Text style={styles.actionIcon}>⚠️</Text><Text style={styles.actionText}>Report issue</Text></TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <PrimaryButton title="Mark as complete" icon="✓" gradient="success" onPress={() => navigation.navigate('ServiceCompletion', { ...route.params })} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingTop: 52, paddingBottom: 26, paddingHorizontal: SIZES.lg, alignItems: 'center', borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  liveChip: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 },
  liveText: { ...FONTS.caption, color: COLORS.white, fontWeight: '700' },
  headerTitle: { ...FONTS.h1, color: COLORS.white, marginTop: 10 },
  timerRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: SIZES.radiusLg, paddingVertical: 16, paddingHorizontal: 24, marginTop: 18 },
  timerCol: { alignItems: 'center', flex: 1 },
  timerDivider: { width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.3)' },
  timerValue: { fontSize: 30, fontWeight: '800', color: COLORS.white },
  timerValueSm: { ...FONTS.body, fontWeight: '700', color: COLORS.white },
  timerLabel: { ...FONTS.caption, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  content: { flex: 1, padding: SIZES.lg },
  stepsCard: { backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: SIZES.lg, ...SHADOWS.small },
  stepsTitle: { ...FONTS.h3, color: COLORS.text, marginBottom: 16 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start' },
  stepIconCol: { alignItems: 'center', marginRight: 14 },
  stepDot: { width: 26, height: 26, borderRadius: 13, backgroundColor: COLORS.lightGray, justifyContent: 'center', alignItems: 'center' },
  stepDotDone: { backgroundColor: COLORS.success },
  stepCheck: { fontSize: 12, color: COLORS.white, fontWeight: '800' },
  pulse: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.primary },
  stepLine: { width: 2, height: 26, backgroundColor: COLORS.lightGray, marginVertical: 2 },
  stepLineDone: { backgroundColor: COLORS.success },
  stepLabel: { ...FONTS.body, color: COLORS.textLight, paddingTop: 2 },
  stepLabelDone: { color: COLORS.text, fontWeight: '700' },
  actionsRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  actionBtn: { flex: 1, alignItems: 'center', backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, paddingVertical: 16, ...SHADOWS.small },
  actionIcon: { fontSize: 20 },
  actionText: { ...FONTS.caption, color: COLORS.text, marginTop: 6, fontWeight: '600' },
  footer: { padding: SIZES.lg, paddingBottom: 28 },
});
