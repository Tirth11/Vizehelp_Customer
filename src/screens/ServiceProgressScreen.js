import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

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
        <Text style={styles.title}>Service In Progress</Text>
        <Text style={styles.subtitle}>{service?.name || 'Service'}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.timerCard}>
          <Text style={styles.timerLabel}>Time Elapsed</Text>
          <Text style={styles.timerValue}>{elapsed} min</Text>
          <Text style={styles.timerSub}>Buddy: {buddy.name}</Text>
        </View>

        <View style={styles.stepsContainer}>
          {steps.map((s, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={[styles.stepDot, s.done && styles.stepDotDone]}><Text style={{ fontSize: 10, color: s.done ? COLORS.white : COLORS.gray }}>{s.done ? '✓' : ''}</Text></View>
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
  header: { padding: SIZES.lg, paddingTop: 50, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: COLORS.lightGray },
  title: { ...FONTS.h2, color: COLORS.text },
  subtitle: { ...FONTS.bodySm, color: COLORS.gray, marginTop: 4 },
  content: { flex: 1, padding: SIZES.lg },
  timerCard: { backgroundColor: '#EBF4FF', borderRadius: SIZES.radius, padding: SIZES.lg, alignItems: 'center' },
  timerLabel: { ...FONTS.bodySm, color: COLORS.gray },
  timerValue: { ...FONTS.h1, color: COLORS.primary, marginVertical: 4 },
  timerSub: { ...FONTS.caption, color: COLORS.gray },
  stepsContainer: { marginTop: 30 },
  stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, position: 'relative' },
  stepDot: { width: 24, height: 24, borderRadius: 12, backgroundColor: COLORS.lightGray, justifyContent: 'center', alignItems: 'center' },
  stepDotDone: { backgroundColor: COLORS.success },
  stepLine: { position: 'absolute', left: 11, top: 24, width: 2, height: 20, backgroundColor: COLORS.lightGray },
  stepLineDone: { backgroundColor: COLORS.success },
  stepLabel: { ...FONTS.body, color: COLORS.gray, marginLeft: 14 },
  stepLabelDone: { color: COLORS.text, fontWeight: '600' },
  actionsRow: { flexDirection: 'row', gap: 16, marginTop: 30 },
  actionBtn: { flex: 1, alignItems: 'center', backgroundColor: COLORS.background, borderRadius: SIZES.radius, padding: 16 },
  actionText: { ...FONTS.caption, color: COLORS.text, marginTop: 6 },
  footer: { padding: SIZES.lg },
  completeBtn: { backgroundColor: COLORS.success, borderRadius: SIZES.radius, paddingVertical: 16, alignItems: 'center' },
  completeBtnText: { ...FONTS.button, color: COLORS.white },
});
