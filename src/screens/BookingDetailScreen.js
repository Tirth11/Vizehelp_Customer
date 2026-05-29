import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import ScreenHeader from '../components/ScreenHeader';

export default function BookingDetailScreen({ navigation, route }) {
  const { booking = {} } = route.params || {};
  const cancelled = booking.status === 'Cancelled';

  return (
    <View style={styles.container}>
      <ScreenHeader title="Booking details" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.serviceRow}>
            <View style={styles.iconCircle}><Text style={{ fontSize: 28 }}>{booking.icon || '🔧'}</Text></View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.serviceName}>{booking.service || 'Service'}</Text>
              <View style={[styles.statusBadge, cancelled && styles.cancelledBadge]}>
                <Text style={[styles.statusText, cancelled && styles.cancelledText]}>{cancelled ? '✕ ' : '✓ '}{booking.status || 'Completed'}</Text>
              </View>
            </View>
            <Text style={styles.amount}>{booking.amount || '$35.00'}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Booking info</Text>
          <InfoRow label="Booking ID" value={`#VH${booking.id || '123456'}`} />
          <InfoRow label="Date" value={booking.date || 'May 20, 2026'} />
          <InfoRow label="Time" value={booking.time || '10:00 AM'} />
          <InfoRow label="Duration" value="45 min" last />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Buddy</Text>
          <View style={styles.buddyRow}>
            <View style={styles.avatar}><Text style={{ fontSize: 24 }}>👤</Text></View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.buddyName}>Alex Johnson</Text>
              <Text style={styles.buddyMeta}>⭐ 4.9 · 234 jobs · Verified</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment</Text>
          <InfoRow label="Service fee" value="$35.00" />
          <InfoRow label="Platform fee" value="$5.00" />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total paid</Text>
            <Text style={styles.totalValue}>{booking.amount || '$40.00'}</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.85} onPress={() => navigation.navigate('RaiseIssue', { booking })}>
            <Text style={styles.actionIcon}>🚨</Text>
            <Text style={styles.actionText}>Raise issue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.85}>
            <Text style={styles.actionIcon}>📄</Text>
            <Text style={styles.actionText}>Invoice</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.rebookBtn]} activeOpacity={0.85} onPress={() => navigation.navigate('MainTabs')}>
            <Text style={styles.actionIcon}>🔁</Text>
            <Text style={[styles.actionText, { color: COLORS.primary }]}>Rebook</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

function InfoRow({ label, value, last }) {
  return (
    <View style={[styles.infoRow, !last && styles.infoRowBorder]}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, padding: SIZES.lg },
  card: { backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: SIZES.lg, marginBottom: 12, ...SHADOWS.small },
  serviceRow: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: { width: 54, height: 54, borderRadius: 16, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center' },
  serviceName: { ...FONTS.h3, color: COLORS.text },
  amount: { ...FONTS.h3, color: COLORS.primary },
  statusBadge: { backgroundColor: COLORS.successLight, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start', marginTop: 6 },
  cancelledBadge: { backgroundColor: COLORS.errorLight },
  statusText: { ...FONTS.caption, color: COLORS.success, fontWeight: '700' },
  cancelledText: { color: COLORS.error },
  cardTitle: { ...FONTS.h3, color: COLORS.text, marginBottom: 6 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 11 },
  infoRowBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  infoLabel: { ...FONTS.bodySm, color: COLORS.textLight },
  infoValue: { ...FONTS.bodySm, color: COLORS.text, fontWeight: '700' },
  buddyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  avatar: { width: 48, height: 48, borderRadius: 16, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center' },
  buddyName: { ...FONTS.body, fontWeight: '700', color: COLORS.text },
  buddyMeta: { ...FONTS.caption, color: COLORS.textLight, marginTop: 2 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: 12, marginTop: 6 },
  totalLabel: { ...FONTS.body, fontWeight: '700', color: COLORS.text },
  totalValue: { ...FONTS.h3, color: COLORS.primary },
  actionsRow: { flexDirection: 'row', gap: 10 },
  actionBtn: { flex: 1, backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, paddingVertical: 16, alignItems: 'center', ...SHADOWS.small },
  rebookBtn: { backgroundColor: COLORS.primaryLight },
  actionIcon: { fontSize: 20 },
  actionText: { ...FONTS.caption, color: COLORS.text, fontWeight: '700', marginTop: 6 },
});
