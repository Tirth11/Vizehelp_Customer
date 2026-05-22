import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';

export default function ServiceProgressScreen({ navigation, route }) {
  const { service, buddy = { name: 'Alex Johnson' } } = route.params || {};
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setElapsed(e => e + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { label: 'Buddy Arrived', done: true },
    { label: 'Service Started', done: true },
    { label: 'In Progress', done: true },
    { label: 'Completing', done: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.statusChip}><Text style={styles.statusChipText}>● Service In Progress</Text></View>
        <Text style={styles.title}>{service?.name || 'Service'}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.timerCard}>
          <Text style={styles.timerLabel}>Time Elapsed</Text>
          <Text style={styles.timerValue}>{elapsed} min</Text>
          <Text style={styles.timerSub}>Buddy: {buddy.name}</Text>
        </View>

        <View style={styles.stepsCard}>
          {steps.map((s, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={[styles.stepDot, s.done && styles.stepDotDone]}>
                {s.done && <Text style={{ fontSize: 10, color: COLORS.white }}>✓</Text>}
              </View>
              {i < steps.length - 1 && <View style={[styles.stepLine, s.done && styles.stepLineDone]} />}
              <Text style={[styles.stepLabel, s.done && styles.stepLabelDone]}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtn}><Text style={{ fontSize: 18 }}>📞</Text><Text style={styles.actionText}>Call Buddy</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}><Text style={{ fontSize: 18 }}>⚠️</Text><Text style={styles.actionText}>Report Issue</Text></TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.completeBtn} onPress={() => navigation.navigate('ServiceCompletion', { ...route.params })}>
          <Text style={styles.completeBtnText}>Mark as Complete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { padding: SIZES.lg, paddingTop: 50, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: COLORS.border },
  statusChip: { backgroundColor: COLORS.primaryLight, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6, marginBottom: 8 },
  statusChipText: { ...FONTS.bodySm, color: COLORS.primary, fontWeight: '600' },
  title: { ...FONTS.h2, color: COLORS.text },
  content: { flex: 1, padding: SIZES.lg },
  timerCard: { backgroundColor: COLORS.primaryLight, borderRadius: SIZES.radiusLg, padding: SIZES.lg, alignItems: 'center', ...SHADOWS.small },
  timerLabel: { ...FONTS.bodySm, color: COLORS.textLight },
  timerValue: { ...FONTS.h1, color: COLORS.primary, marginVertical: 4 },
  timerSub: { ...FONTS.caption, color: COLORS.textLight },
  stepsCard: { marginTop: 24, backgroundColor: COLORS.background, borderRadius: SIZES.radiusLg, padding: SIZES.lg },
  stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, position: 'relative' },
  stepDot: { width: 24, height: 24, borderRadius: 12, backgroundColor: COLORS.border, justifyContent: 'center', alignItems: 'center' },
  stepDotDone: { backgroundColor: COLORS.success },
  stepLine: { position: 'absolute', left: 11, top: 24, width: 2, height: 20, backgroundColor: COLORS.border },
  stepLineDone: { backgroundColor: COLORS.success },
  stepLabel: { ...FONTS.body, color: COLORS.textLight, marginLeft: 14 },
  stepLabelDone: { color: COLORS.text, fontWeight: '600' },
  actionsRow: { flexDirection: 'row', gap: 12, marginTop: 24 },
  actionBtn: { flex: 1, alignItems: 'center', backgroundColor: COLORS.background, borderRadius: SIZES.radiusLg, padding: 16, ...SHADOWS.small },
  actionText: { ...FONTS.caption, color: COLORS.text, marginTop: 6, fontWeight: '500' },
  footer: { padding: SIZES.lg },
  completeBtn: { backgroundColor: COLORS.success, borderRadius: SIZES.radius, paddingVertical: 16, alignItems: 'center' },
  completeBtnText: { ...FONTS.button, color: COLORS.white },
});
