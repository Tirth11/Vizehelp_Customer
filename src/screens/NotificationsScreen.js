import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';

const NOTIFICATIONS = [
  { id: '1', icon: '✅', title: 'Booking Confirmed', message: 'Your EV Charging Help booking is confirmed for May 22.', time: '2 min ago', read: false },
  { id: '2', icon: '👤', title: 'Buddy Assigned', message: 'Alex Johnson has been assigned to your booking.', time: '5 min ago', read: false },
  { id: '3', icon: '🎉', title: 'Service Completed', message: 'Your Cleaning Help service has been completed.', time: '2 days ago', read: true },
  { id: '4', icon: '💰', title: 'Payment Received', message: 'Payment of $55.00 processed successfully.', time: '2 days ago', read: true },
  { id: '5', icon: '🎁', title: 'Special Offer', message: 'Get 20% off your next booking! Use code SAVE20.', time: '5 days ago', read: true },
  { id: '6', icon: '⭐', title: 'Rate Your Experience', message: 'How was your Technician Visit? Leave a review.', time: '1 week ago', read: true },
];

export default function NotificationsScreen() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.card, !item.read && styles.unread]}>
      <View style={[styles.iconCircle, !item.read && { backgroundColor: COLORS.primaryLight }]}>
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity><Text style={styles.markAll}>Mark all read</Text></TouchableOpacity>
      </View>
      <FlatList data={NOTIFICATIONS} renderItem={renderItem} keyExtractor={i => i.id} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SIZES.lg, paddingTop: 50, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  title: { ...FONTS.h2, color: COLORS.text },
  markAll: { ...FONTS.bodySm, color: COLORS.primary, fontWeight: '600' },
  list: { padding: SIZES.lg },
  card: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: SIZES.md, marginBottom: 10, ...SHADOWS.small },
  unread: { borderLeftWidth: 3, borderLeftColor: COLORS.primary },
  iconCircle: { width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  notifTitle: { ...FONTS.bodySm, fontWeight: '600', color: COLORS.text },
  notifMessage: { ...FONTS.caption, color: COLORS.textLight, marginTop: 4 },
  notifTime: { ...FONTS.caption, color: COLORS.textDisabled, marginTop: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary, marginTop: 4 },
});
