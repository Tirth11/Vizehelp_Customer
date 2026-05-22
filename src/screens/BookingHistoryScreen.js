import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

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

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BookingDetail', { booking: item })}>
      <View style={styles.cardLeft}>
        <View style={styles.iconCircle}><Text style={{ fontSize: 22 }}>{item.icon}</Text></View>
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.serviceName}>{item.service}</Text>
          <Text style={styles.dateText}>{item.date} • {item.time}</Text>
        </View>
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.amount}>{item.amount}</Text>
        <View style={[styles.statusBadge, item.status === 'Cancelled' && styles.cancelledBadge]}>
          <Text style={[styles.statusText, item.status === 'Cancelled' && styles.cancelledText]}>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
      </View>

      <View style={styles.filterRow}>
        {['All', 'Completed', 'Cancelled'].map(f => (
          <TouchableOpacity key={f} style={[styles.filterBtn, filter === f && styles.filterActive]} onPress={() => setFilter(f)}>
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList data={filtered} renderItem={renderItem} keyExtractor={i => i.id} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: SIZES.lg, paddingTop: 50, backgroundColor: COLORS.white },
  title: { ...FONTS.h2, color: COLORS.text },
  filterRow: { flexDirection: 'row', padding: SIZES.lg, paddingBottom: 0, gap: 10 },
  filterBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border },
  filterActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterText: { ...FONTS.bodySm, color: COLORS.text },
  filterTextActive: { color: COLORS.white, fontWeight: '600' },
  list: { padding: SIZES.lg },
  card: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: SIZES.md, marginBottom: 10 },
  cardLeft: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  serviceName: { ...FONTS.bodySm, fontWeight: '600', color: COLORS.text },
  dateText: { ...FONTS.caption, color: COLORS.gray, marginTop: 2 },
  cardRight: { alignItems: 'flex-end' },
  amount: { ...FONTS.bodySm, fontWeight: '600', color: COLORS.text },
  statusBadge: { backgroundColor: '#D1FAE5', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2, marginTop: 4 },
  cancelledBadge: { backgroundColor: '#FEE2E2' },
  statusText: { ...FONTS.caption, color: COLORS.success },
  cancelledText: { color: COLORS.error },
});
