import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

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
        <Text style={styles.mapSub}>Buddy is on the way</Text>
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
          <TouchableOpacity style={styles.callBtn}><Text style={{ fontSize: 18 }}>💬</Text></TouchableOpacity>
        </View>

        <View style={styles.progressRow}>
          <View style={[styles.dot, styles.dotDone]} /><View style={[styles.line, styles.lineDone]} />
          <View style={[styles.dot, styles.dotDone]} /><View style={styles.line} />
          <View style={styles.dot} />
        </View>
        <View style={styles.stepsRow}>
          <Text style={styles.stepDone}>Confirmed</Text>
          <Text style={styles.stepDone}>On the way</Text>
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
  mapPlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E8F0FE' },
  mapText: { ...FONTS.h3, color: COLORS.gray, marginTop: 10 },
  mapSub: { ...FONTS.bodySm, color: COLORS.gray },
  bottomSheet: { backgroundColor: COLORS.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: SIZES.lg, paddingTop: 12 },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: COLORS.lightGray, alignSelf: 'center', marginBottom: 16 },
  buddyRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  buddyName: { ...FONTS.body, fontWeight: '600', color: COLORS.text },
  buddyEta: { ...FONTS.bodySm, color: COLORS.primary, marginTop: 2 },
  callBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  progressRow: { flexDirection: 'row', alignItems: 'center', marginTop: 20, paddingHorizontal: 10 },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.lightGray },
  dotDone: { backgroundColor: COLORS.primary },
  line: { flex: 1, height: 3, backgroundColor: COLORS.lightGray, marginHorizontal: 4 },
  lineDone: { backgroundColor: COLORS.primary },
  stepsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingHorizontal: 4 },
  stepDone: { ...FONTS.caption, color: COLORS.primary },
  stepPending: { ...FONTS.caption, color: COLORS.gray },
  arrivedBtn: { backgroundColor: COLORS.primary, borderRadius: SIZES.radius, paddingVertical: 14, alignItems: 'center', marginTop: 20 },
  arrivedBtnText: { ...FONTS.button, color: COLORS.white },
});
