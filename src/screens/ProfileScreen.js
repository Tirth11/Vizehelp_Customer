import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

export default function ProfileScreen({ navigation }) {
  const menuItems = [
    { icon: '👤', label: 'Edit Profile', screen: null },
    { icon: '📍', label: 'Saved Addresses', screen: null },
    { icon: '💳', label: 'Payment Methods', screen: null },
    { icon: '🔔', label: 'Notification Settings', screen: null },
    { icon: '🎁', label: 'Refer & Earn', screen: null },
    { icon: '📋', label: 'My Bookings', screen: 'Bookings' },
    { icon: '💬', label: 'Help & Support', screen: 'Support' },
    { icon: '📄', label: 'Terms & Conditions', screen: null },
    { icon: '🔒', label: 'Privacy Policy', screen: null },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}><Text style={{ fontSize: 40 }}>👤</Text></View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.phone}>+1 (555) 123-4567</Text>
          <Text style={styles.email}>john.doe@email.com</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}><Text style={styles.statValue}>12</Text><Text style={styles.statLabel}>Bookings</Text></View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}><Text style={styles.statValue}>4.8</Text><Text style={styles.statLabel}>Avg Rating</Text></View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}><Text style={styles.statValue}>$420</Text><Text style={styles.statLabel}>Total Spent</Text></View>
        </View>

        <View style={styles.menu}>
          {menuItems.map((item, i) => (
            <TouchableOpacity key={i} style={styles.menuItem} onPress={() => item.screen && navigation.navigate(item.screen)}>
              <Text style={{ fontSize: 18 }}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.navigate('Welcome')}>
          <Text style={styles.logoutText}>🚪 Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { backgroundColor: COLORS.white, alignItems: 'center', padding: SIZES.lg, paddingTop: 50 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  name: { ...FONTS.h2, color: COLORS.text },
  phone: { ...FONTS.bodySm, color: COLORS.gray, marginTop: 4 },
  email: { ...FONTS.bodySm, color: COLORS.gray, marginTop: 2 },
  statsRow: { flexDirection: 'row', backgroundColor: COLORS.white, marginTop: 10, padding: SIZES.lg, justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statValue: { ...FONTS.h2, color: COLORS.primary },
  statLabel: { ...FONTS.caption, color: COLORS.gray, marginTop: 4 },
  statDivider: { width: 1, backgroundColor: COLORS.lightGray },
  menu: { backgroundColor: COLORS.white, marginTop: 10, paddingHorizontal: SIZES.lg },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray },
  menuLabel: { ...FONTS.body, color: COLORS.text, flex: 1, marginLeft: 14 },
  chevron: { fontSize: 20, color: COLORS.gray },
  logoutBtn: { backgroundColor: COLORS.white, marginTop: 10, padding: SIZES.lg, alignItems: 'center' },
  logoutText: { ...FONTS.body, color: COLORS.error, fontWeight: '600' },
  version: { ...FONTS.caption, color: COLORS.gray, textAlign: 'center', marginTop: 16 },
});
