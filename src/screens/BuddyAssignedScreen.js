import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES, SHADOWS, GRADIENTS } from '../constants/theme';
import { PrimaryButton } from '../components/Button';

export default function BuddyAssignedScreen({ navigation, route }) {
  const buddy = { name: 'Alex Johnson', rating: 4.9, jobs: 234, eta: '12 min' };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={GRADIENTS.hero} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerBadge}>🎉 Buddy assigned</Text>
        <Text style={styles.headerTitle}>You're all set!</Text>
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.buddyCard}>
          <View style={styles.avatar}><Text style={{ fontSize: 40 }}>👤</Text></View>
          <Text style={styles.buddyName}>{buddy.name}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaChip}><Text style={styles.meta}>⭐ {buddy.rating}</Text></View>
            <View style={styles.metaChip}><Text style={styles.meta}>📋 {buddy.jobs} jobs</Text></View>
            <View style={styles.verifiedChip}><Text style={styles.verifiedText}>✓ Verified</Text></View>
          </View>

          <View style={styles.etaCard}>
            <View>
              <Text style={styles.etaLabel}>Estimated arrival</Text>
              <Text style={styles.etaValue}>{buddy.eta}</Text>
            </View>
            <View style={styles.etaBadge}><Text style={styles.etaBadgeText}>On the way</Text></View>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.85}><Text style={styles.actionIcon}>📞</Text><Text style={styles.actionText}>Call</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.85}><Text style={styles.actionIcon}>💬</Text><Text style={styles.actionText}>Chat</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.85}><Text style={styles.actionIcon}>📍</Text><Text style={styles.actionText}>Share trip</Text></TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <PrimaryButton title="Track live" icon="📍" onPress={() => navigation.navigate('LiveTracking', { ...route.params, buddy })} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingTop: 52, paddingBottom: 50, paddingHorizontal: SIZES.lg, alignItems: 'center', borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  backBtn: { position: 'absolute', top: 50, left: SIZES.lg, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  backIcon: { fontSize: 28, color: COLORS.white, marginTop: -4, fontWeight: '700' },
  headerBadge: { ...FONTS.bodySm, color: 'rgba(255,255,255,0.95)', fontWeight: '700', marginTop: 4 },
  headerTitle: { ...FONTS.h1, color: COLORS.white, marginTop: 6 },
  body: { paddingHorizontal: SIZES.lg, marginTop: -32 },
  buddyCard: { backgroundColor: COLORS.white, borderRadius: SIZES.radiusXl, padding: SIZES.lg, alignItems: 'center', ...SHADOWS.medium },
  avatar: { width: 86, height: 86, borderRadius: 28, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center' },
  buddyName: { ...FONTS.h2, color: COLORS.text, marginTop: 12 },
  metaRow: { flexDirection: 'row', gap: 8, marginTop: 10, flexWrap: 'wrap', justifyContent: 'center' },
  metaChip: { backgroundColor: COLORS.background, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 },
  meta: { ...FONTS.bodySm, color: COLORS.text, fontWeight: '600' },
  verifiedChip: { backgroundColor: COLORS.successLight, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 },
  verifiedText: { ...FONTS.bodySm, color: COLORS.success, fontWeight: '700' },
  etaCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.primaryLight, borderRadius: SIZES.radiusLg, padding: SIZES.lg, marginTop: 20, width: '100%' },
  etaLabel: { ...FONTS.bodySm, color: COLORS.textLight },
  etaValue: { ...FONTS.h1, color: COLORS.primary, marginTop: 2 },
  etaBadge: { backgroundColor: COLORS.primary, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 8 },
  etaBadgeText: { ...FONTS.bodySm, color: COLORS.white, fontWeight: '700' },
  actionsRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  actionBtn: { flex: 1, alignItems: 'center', backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, paddingVertical: 16, ...SHADOWS.small },
  actionIcon: { fontSize: 22 },
  actionText: { ...FONTS.caption, color: COLORS.text, marginTop: 6, fontWeight: '600' },
  footer: { padding: SIZES.lg, paddingBottom: 28, marginTop: 'auto' },
});
