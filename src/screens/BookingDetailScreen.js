import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

export default function BookingDetailScreen({ navigation, route }) {
  const { booking = {} } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.back}>← Back</Text></TouchableOpacity>
        <Text style={styles.title}>Booking Details</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.serviceRow}>
            <View style={styles.iconCircle}><Text style={{ fontSize: 28 }}>{booking.icon || '🔧'}</Text></View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.serviceName}>{booking.service || 'Service'}</Text>
              <View style={[styles.statusBadge, booking.status === 'Cancelled' && styles.cancelledBadge]}>
                <Text style={[styles.statusText, booking.status === 'Cancelled' && styles.cancelledText]}>{booking.status || 'Completed'}</Text>
              </View>
            </View>
            <Text style={styles.amount}>{booking.amount || '$35.00'}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Booking Info</Text>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Booking ID</Text><Text style={styles.infoValue}>#VH{booking.id || '123456'}</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Date</Text><Text style={styles.infoValue}>{booking.date || 'May 20, 2026'}</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Time</Text><Text style={styles.infoValue}>{booking.time || '10:00 AM'}</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Duration</Text><Text style={styles.infoValue}>45 min</Text></View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Buddy Details</Text>
          <View style={styles.buddyRow}>
            <View style={styles.avatar}><Text style={{ fontSize: 24 }}>👤</Text></View>
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.buddyName}>Alex Johnson</Text>
              <Text style={styles.buddyMeta}>⭐ 4.9 • 234 jobs</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment</Text>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Service Fee</Text><Text style={styles.infoValue}>$35.00</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Platform Fee</Text><Text style={styles.infoValue}>$5.00</Text></View>
          <View style={[styles.infoRow, { borderTopWidth: 1, borderTopColor: COLORS.lightGray, paddingTop: 10 }]}><Text style={[styles.infoLabel, { fontWeight: '600' }]}>Total</Text><Text style={[styles.infoValue, { color: COLORS.primary }]}>{booking.amount || '$40.00'}</Text></View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('RaiseIssue', { booking })}>
            <Text style={styles.actionText}>🚨 Raise Issue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}><Text style={styles.actionText}>📄 Download Invoice</Text></TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: SIZES.lg, paddingTop: 50, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray },
  back: { ...FONTS.body, color: COLORS.primary, marginBottom: 12 },
  title: { ...FONTS.h2, color: COLORS.text },
  content: { flex: 1, padding: SIZES.lg },
  card: { backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: SIZES.lg, marginBottom: 12 },
  serviceRow: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  serviceName: { ...FONTS.h3, color: COLORS.text },
  amount: { ...FONTS.h3, color: COLORS.primary },
  statusBadge: { backgroundColor: '#D1FAE5', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2, alignSelf: 'flex-start', marginTop: 4 },
  cancelledBadge: { backgroundColor: '#FEE2E2' },
  statusText: { ...FONTS.caption, color: COLORS.success },
  cancelledText: { color: COLORS.error },
  cardTitle: { ...FONTS.h3, color: COLORS.text, marginBottom: 12 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  infoLabel: { ...FONTS.bodySm, color: COLORS.gray },
  infoValue: { ...FONTS.bodySm, color: COLORS.text, fontWeight: '500' },
  buddyRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  buddyName: { ...FONTS.body, fontWeight: '600', color: COLORS.text },
  buddyMeta: { ...FONTS.caption, color: COLORS.gray, marginTop: 2 },
  actionsRow: { flexDirection: 'row', gap: 10 },
  actionBtn: { flex: 1, backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 14, alignItems: 'center' },
  actionText: { ...FONTS.bodySm, color: COLORS.text },
});
