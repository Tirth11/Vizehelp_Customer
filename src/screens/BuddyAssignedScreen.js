import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';

export default function BuddyAssignedScreen({ navigation, route }) {
  const buddy = { name: 'Alex Johnson', rating: 4.9, jobs: 234, eta: '12 min' };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.back}>← Back</Text></TouchableOpacity>
        <Text style={styles.title}>Buddy Assigned!</Text>
      </View>

      <View style={styles.center}>
        <View style={styles.avatar}><Text style={{ fontSize: 48 }}>👤</Text></View>
        <Text style={styles.buddyName}>{buddy.name}</Text>
        <View style={styles.metaRow}>
          <View style={styles.metaChip}><Text style={styles.meta}>⭐ {buddy.rating}</Text></View>
          <View style={styles.metaChip}><Text style={styles.meta}>📋 {buddy.jobs} jobs</Text></View>
        </View>

        <View style={styles.etaCard}>
          <Text style={styles.etaLabel}>Estimated Arrival</Text>
          <Text style={styles.etaValue}>{buddy.eta}</Text>
          <View style={styles.etaBadge}><Text style={styles.etaBadgeText}>On the way</Text></View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtn}><Text style={{ fontSize: 20 }}>📞</Text><Text style={styles.actionText}>Call</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}><Text style={{ fontSize: 20 }}>💬</Text><Text style={styles.actionText}>Chat</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}><Text style={{ fontSize: 20 }}>📍</Text><Text style={styles.actionText}>Share</Text></TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.trackBtn} onPress={() => navigation.navigate('LiveTracking', { ...route.params, buddy })}>
          <Text style={styles.trackBtnText}>Track Live</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { padding: SIZES.lg, paddingTop: 50 },
  back: { ...FONTS.body, color: COLORS.primary, marginBottom: 12 },
  title: { ...FONTS.h2, color: COLORS.text },
  center: { flex: 1, alignItems: 'center', padding: SIZES.lg },
  avatar: { width: 90, height: 90, borderRadius: 24, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  buddyName: { ...FONTS.h2, color: COLORS.text },
  metaRow: { flexDirection: 'row', gap: 10, marginTop: 8 },
  metaChip: { backgroundColor: COLORS.background, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  meta: { ...FONTS.bodySm, color: COLORS.textLight },
  etaCard: { backgroundColor: COLORS.primaryLight, borderRadius: SIZES.radiusLg, padding: SIZES.lg, alignItems: 'center', marginTop: 24, width: '100%', ...SHADOWS.small },
  etaLabel: { ...FONTS.bodySm, color: COLORS.textLight },
  etaValue: { ...FONTS.h1, color: COLORS.primary, marginTop: 4 },
  etaBadge: { backgroundColor: COLORS.primary, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 4, marginTop: 8 },
  etaBadgeText: { ...FONTS.caption, color: COLORS.white, fontWeight: '600' },
  actionsRow: { flexDirection: 'row', gap: 16, marginTop: 30 },
  actionBtn: { alignItems: 'center', backgroundColor: COLORS.background, borderRadius: SIZES.radiusLg, padding: 16, width: 80, ...SHADOWS.small },
  actionText: { ...FONTS.caption, color: COLORS.text, marginTop: 6, fontWeight: '500' },
  footer: { padding: SIZES.lg },
  trackBtn: { backgroundColor: COLORS.primary, borderRadius: SIZES.radius, paddingVertical: 16, alignItems: 'center' },
  trackBtnText: { ...FONTS.button, color: COLORS.white },
});
