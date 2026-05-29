import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';

const BOOKINGS = [
  { id: '1', service: 'EV Charging Help', icon: '⚡', date: 'May 20, 2026', time: '10:00 AM', status: 'Completed', amount: '$32.00' },
  { id: '2', service: 'Cleaning Help', icon: '🧹', date: 'May 18, 2026', time: '2:00 PM', status: 'Completed', amount: '$55.00' },
  { id: '3', service: 'Pickup & Drop', icon: '📦', date: 'May 15, 2026', time: '11:00 AM', status: 'Cancelled', amount: '$0.00' },
  { id: '4', service: 'Technician Visit', icon: '🔧', date: 'May 12, 2026', time: '3:00 PM', status: 'Completed', amount: '$48.00' },
  { id: '5', service: 'Senior Assistance', icon: '👴', date: 'May 10, 2026', time: '9:00 AM', status: 'Completed', amount: '$35.00' },
];

export default function BookingHistoryScreen({ navigation }) {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? BOOKINGS : BOOKINGS.filter(b => b.status === filter);

  const renderItem = ({ item }) => {
    const cancelled = item.status === 'Cancelled';
    return (
      <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={() => navigation.navigate('BookingDetail', { booking: item })}>
        <View style={styles.iconCircle}><Text style={{ fontSize: 22 }}>{item.icon}</Text></View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.serviceName}>{item.service}</Text>
          <Text style={styles.dateText}>{item.date} · {item.time}</Text>
          <View style={[styles.statusBadge, cancelled && styles.cancelledBadge]}>
            <Text style={[styles.statusText, cancelled && styles.cancelledText]}>{cancelled ? '✕ ' : '✓ '}{item.status}</Text>
          </View>
        </View>
        <View style={styles.cardRight}>
          <Text style={[styles.amount, cancelled && { color: COLORS.textLight }]}>{item.amount}</Text>
          <View style={styles.detailBtn}><Text style={styles.detailArrow}>›</Text></View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My bookings</Text>
        <Text style={styles.subtitle}>{BOOKINGS.length} total · track and manage your services</Text>
        <View style={styles.filterRow}>
          {['All', 'Completed', 'Cancelled'].map(f => {
            const active = filter === f;
            return (
              <TouchableOpacity key={f} style={[styles.filterBtn, active && styles.filterActive]} onPress={() => setFilter(f)}>
                <Text style={[styles.filterText, active && styles.filterTextActive]}>{f}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={i => i.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={{ fontSize: 40 }}>🗂️</Text>
            <Text style={styles.emptyText}>No {filter.toLowerCase()} bookings yet.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: SIZES.lg, paddingTop: 52, paddingBottom: 16, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  title: { ...FONTS.h1 },
  subtitle: { ...FONTS.caption, color: COLORS.textLight, marginTop: 4 },
  filterRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  filterBtn: { paddingHorizontal: 18, paddingVertical: 9, borderRadius: 22, backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.border },
  filterActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterText: { ...FONTS.bodySm, color: COLORS.text, fontWeight: '600' },
  filterTextActive: { color: COLORS.white },
  list: { padding: SIZES.lg },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: SIZES.md, marginBottom: 10, ...SHADOWS.small },
  iconCircle: { width: 48, height: 48, borderRadius: 16, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center' },
  serviceName: { ...FONTS.body, fontWeight: '700', color: COLORS.text },
  dateText: { ...FONTS.caption, color: COLORS.textLight, marginTop: 3 },
  statusBadge: { backgroundColor: COLORS.successLight, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, marginTop: 6, alignSelf: 'flex-start' },
  cancelledBadge: { backgroundColor: COLORS.errorLight },
  statusText: { ...FONTS.caption, color: COLORS.success, fontWeight: '700' },
  cancelledText: { color: COLORS.error },
  cardRight: { alignItems: 'flex-end' },
  amount: { ...FONTS.body, fontWeight: '800', color: COLORS.text },
  detailBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  detailArrow: { fontSize: 18, color: COLORS.textLight, marginTop: -2 },
  empty: { alignItems: 'center', paddingVertical: 60 },
  emptyText: { ...FONTS.bodySm, color: COLORS.textLight, marginTop: 12 },
});
