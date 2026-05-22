import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';

export default function LiveTrackingScreen({ navigation, route }) {
  const { buddy = { name: 'Alex Johnson', eta: '12 min' } } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.back}>← Back</Text></TouchableOpacity>
        <Text style={styles.title}>Live Tracking</Text>
      </View>

      <View style={styles.mapPlaceholder}>
        <Text style={{ fontSize: 48 }}>🗺️</Text>
        <Text style={styles.mapText}>Map View</Text>
        <View style={styles.statusChip}><Text style={styles.statusChipText}>● Buddy is on the way</Text></View>
      </View>

      <View style={styles.bottomSheet}>
        <View style={styles.handle} />
        <View style={styles.buddyRow}>
          <View style={styles.avatar}><Text style={{ fontSize: 28 }}>👤</Text></View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.buddyName}>{buddy.name}</Text>
            <Text style={styles.buddyEta}>Arriving in {buddy.eta}</Text>
          </View>
          <TouchableOpacity style={styles.callBtn}><Text style={{ fontSize: 18 }}>📞</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.callBtn, { marginLeft: 8 }]}><Text style={{ fontSize: 18 }}>💬</Text></TouchableOpacity>
        </View>

        <View style={styles.progressRow}>
          <View style={[styles.dot, styles.dotDone]} /><View style={[styles.line, styles.lineDone]} />
          <View style={[styles.dot, styles.dotDone]} /><View style={styles.line} />
          <View style={styles.dot} />
        </View>
        <View style={styles.stepsRow}>
          <Text style={styles.stepDone}>Confirmed</Text>
          <Text style={styles.stepActive}>On the way</Text>
          <Text style={styles.stepPending}>Arrived</Text>
        </View>

        <TouchableOpacity style={styles.arrivedBtn} onPress={() => navigation.navigate('BuddyArrival', { ...route.params })}>
          <Text style={styles.arrivedBtnText}>Simulate Arrival</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: SIZES.lg, paddingTop: 50, backgroundColor: COLORS.white },
  back: { ...FONTS.body, color: COLORS.primary, marginBottom: 12 },
  title: { ...FONTS.h2, color: COLORS.text },
  mapPlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primaryLight },
  mapText: { ...FONTS.h3, color: COLORS.textLight, marginTop: 10 },
  statusChip: { backgroundColor: COLORS.accent, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, marginTop: 12 },
  statusChipText: { ...FONTS.bodySm, color: COLORS.white, fontWeight: '600' },
  bottomSheet: { backgroundColor: COLORS.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: SIZES.lg, paddingTop: 12, ...SHADOWS.large },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: COLORS.border, alignSelf: 'center', marginBottom: 16 },
  buddyRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 48, height: 48, borderRadius: 16, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center' },
  buddyName: { ...FONTS.body, fontWeight: '600', color: COLORS.text },
  buddyEta: { ...FONTS.bodySm, color: COLORS.primary, marginTop: 2, fontWeight: '600' },
  callBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center' },
  progressRow: { flexDirection: 'row', alignItems: 'center', marginTop: 20, paddingHorizontal: 10 },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.border },
  dotDone: { backgroundColor: COLORS.primary },
  line: { flex: 1, height: 3, backgroundColor: COLORS.border, marginHorizontal: 4 },
  lineDone: { backgroundColor: COLORS.primary },
  stepsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingHorizontal: 4 },
  stepDone: { ...FONTS.caption, color: COLORS.success, fontWeight: '600' },
  stepActive: { ...FONTS.caption, color: COLORS.primary, fontWeight: '600' },
  stepPending: { ...FONTS.caption, color: COLORS.textLight },
  arrivedBtn: { backgroundColor: COLORS.primary, borderRadius: SIZES.radius, paddingVertical: 14, alignItems: 'center', marginTop: 20 },
  arrivedBtnText: { ...FONTS.button, color: COLORS.white },
});
