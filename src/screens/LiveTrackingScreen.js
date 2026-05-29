import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES, SHADOWS, GRADIENTS } from '../constants/theme';
import { PrimaryButton } from '../components/Button';

export default function LiveTrackingScreen({ navigation, route }) {
  const { buddy = { name: 'Alex Johnson', eta: '12 min' } } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={GRADIENTS.sky} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.map}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        {/* Simple route illustration */}
        <View style={styles.routeWrap}>
          <View style={styles.pinStart}><Text style={{ fontSize: 20 }}>🧑‍🔧</Text></View>
          <View style={styles.routeLine} />
          <View style={styles.pinEnd}><Text style={{ fontSize: 18 }}>🏠</Text></View>
        </View>

        <View style={styles.statusChip}><Text style={styles.statusChipText}>● Your Buddy is on the way</Text></View>
      </LinearGradient>

      <View style={styles.bottomSheet}>
        <View style={styles.handle} />
        <View style={styles.buddyRow}>
          <View style={styles.avatar}><Text style={{ fontSize: 26 }}>👤</Text></View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.buddyName}>{buddy.name}</Text>
            <Text style={styles.buddyEta}>Arriving in {buddy.eta}</Text>
          </View>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.8}><Text style={{ fontSize: 18 }}>📞</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.iconBtn, { marginLeft: 8 }]} activeOpacity={0.8}><Text style={{ fontSize: 18 }}>💬</Text></TouchableOpacity>
        </View>

        <View style={styles.progressRow}>
          <View style={[styles.dot, styles.dotDone]} /><View style={[styles.line, styles.lineDone]} />
          <View style={[styles.dot, styles.dotActive]} /><View style={styles.line} />
          <View style={styles.dot} />
        </View>
        <View style={styles.stepsRow}>
          <Text style={styles.stepDone}>Confirmed</Text>
          <Text style={styles.stepActive}>On the way</Text>
          <Text style={styles.stepPending}>Arrived</Text>
        </View>

        <PrimaryButton title="Simulate arrival" onPress={() => navigation.navigate('BuddyArrival', { ...route.params })} style={{ marginTop: 22 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  map: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  backBtn: { position: 'absolute', top: 50, left: SIZES.lg, width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', ...SHADOWS.small },
  backIcon: { fontSize: 28, color: COLORS.text, marginTop: -4, fontWeight: '700' },
  routeWrap: { flexDirection: 'row', alignItems: 'center' },
  pinStart: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', ...SHADOWS.medium },
  routeLine: { width: 90, height: 3, backgroundColor: COLORS.white, marginHorizontal: 4, borderRadius: 2, opacity: 0.85 },
  pinEnd: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', ...SHADOWS.medium },
  statusChip: { position: 'absolute', bottom: 24, backgroundColor: COLORS.white, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 9, ...SHADOWS.medium },
  statusChipText: { ...FONTS.bodySm, color: COLORS.primary, fontWeight: '700' },
  bottomSheet: { backgroundColor: COLORS.white, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: SIZES.lg, paddingTop: 12, paddingBottom: 28, ...SHADOWS.large },
  handle: { width: 44, height: 5, borderRadius: 3, backgroundColor: COLORS.border, alignSelf: 'center', marginBottom: 18 },
  buddyRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 16, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center' },
  buddyName: { ...FONTS.body, fontWeight: '700', color: COLORS.text },
  buddyEta: { ...FONTS.bodySm, color: COLORS.primary, marginTop: 2, fontWeight: '700' },
  iconBtn: { width: 42, height: 42, borderRadius: 14, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center' },
  progressRow: { flexDirection: 'row', alignItems: 'center', marginTop: 22, paddingHorizontal: 8 },
  dot: { width: 14, height: 14, borderRadius: 7, backgroundColor: COLORS.lightGray },
  dotDone: { backgroundColor: COLORS.success },
  dotActive: { backgroundColor: COLORS.primary, borderWidth: 3, borderColor: COLORS.primaryLight },
  line: { flex: 1, height: 3, backgroundColor: COLORS.lightGray, marginHorizontal: 4 },
  lineDone: { backgroundColor: COLORS.success },
  stepsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingHorizontal: 2 },
  stepDone: { ...FONTS.caption, color: COLORS.success, fontWeight: '700' },
  stepActive: { ...FONTS.caption, color: COLORS.primary, fontWeight: '700' },
  stepPending: { ...FONTS.caption, color: COLORS.textLight },
});
