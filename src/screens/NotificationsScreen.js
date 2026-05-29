import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';

const SEED = [
  { id: '1', icon: '✅', tint: COLORS.success, title: 'Booking confirmed', message: 'Your EV Charging Help booking is confirmed for May 22.', time: '2 min ago', read: false },
  { id: '2', icon: '🧑‍🔧', tint: COLORS.primary, title: 'Buddy assigned', message: 'Alex Johnson has been assigned to your booking.', time: '5 min ago', read: false },
  { id: '3', icon: '🎉', tint: COLORS.purple, title: 'Service completed', message: 'Your Cleaning Help service has been completed.', time: '2 days ago', read: true },
  { id: '4', icon: '💰', tint: COLORS.success, title: 'Payment received', message: 'Payment of $55.00 processed successfully.', time: '2 days ago', read: true },
  { id: '5', icon: '🎁', tint: COLORS.accent, title: 'Special offer', message: 'Get 20% off your next booking! Use code SAVE20.', time: '5 days ago', read: true },
  { id: '6', icon: '⭐', tint: COLORS.amber, title: 'Rate your experience', message: 'How was your Technician Visit? Leave a review.', time: '1 week ago', read: true },
];

export default function NotificationsScreen() {
  const [items, setItems] = useState(SEED);
  const unread = items.filter(i => !i.read).length;

  const markAll = () => setItems(items.map(i => ({ ...i, read: true })));
  const tap = (id) => setItems(items.map(i => (i.id === id ? { ...i, read: true } : i)));

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.card, !item.read && styles.unread]} activeOpacity={0.85} onPress={() => tap(item.id)}>
      <View style={[styles.iconCircle, { backgroundColor: item.tint + '18' }]}>
        <Text style={{ fontSize: 18 }}>{item.icon}</Text>
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.notifTitle}>{item.title}</Text>
        <Text style={styles.notifMessage}>{item.message}</Text>
        <Text style={styles.notifTime}>{item.time}</Text>
      </View>
      {!item.read && <View style={styles.dot} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Notifications</Text>
          <Text style={styles.subtitle}>{unread > 0 ? `${unread} unread update${unread > 1 ? 's' : ''}` : 'You’re all caught up 🎉'}</Text>
        </View>
        {unread > 0 ? (
          <TouchableOpacity onPress={markAll} style={styles.markAllBtn}><Text style={styles.markAll}>Mark all read</Text></TouchableOpacity>
        ) : null}
      </View>
      <FlatList data={items} renderItem={renderItem} keyExtractor={i => i.id} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'flex-end', padding: SIZES.lg, paddingTop: 52, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  title: { ...FONTS.h1 },
  subtitle: { ...FONTS.caption, color: COLORS.textLight, marginTop: 4 },
  markAllBtn: { backgroundColor: COLORS.primaryLight, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 7 },
  markAll: { ...FONTS.caption, color: COLORS.primary, fontWeight: '700' },
  list: { padding: SIZES.lg },
  card: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: SIZES.md, marginBottom: 10, ...SHADOWS.small },
  unread: { backgroundColor: '#FAFCFF', borderLeftWidth: 3, borderLeftColor: COLORS.primary },
  iconCircle: { width: 42, height: 42, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  notifTitle: { ...FONTS.bodySm, fontWeight: '700', color: COLORS.text },
  notifMessage: { ...FONTS.caption, color: COLORS.textLight, marginTop: 4, lineHeight: 18 },
  notifTime: { ...FONTS.caption, color: COLORS.textDisabled, marginTop: 6 },
  dot: { width: 9, height: 9, borderRadius: 5, backgroundColor: COLORS.primary, marginTop: 4 },
});
