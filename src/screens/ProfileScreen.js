import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES, SHADOWS, GRADIENTS } from '../constants/theme';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { user, userEnterprises, activeEnterpriseId, logout } = useAuth();

  const handleSwitchEnterprise = () => {
    navigation.navigate('EnterpriseSelect', { mode: 'switch' });
  };

  const handleLogout = () => {
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
  };

  const menuGroups = [
    {
      title: 'Multi-Tenant',
      items: [
        { icon: '🏢', label: 'Switch enterprise', tint: COLORS.primary, action: handleSwitchEnterprise },
      ],
    },
    {
      title: 'Account',
      items: [
        { icon: '👤', label: 'Edit profile', tint: COLORS.primary, screen: null },
        { icon: '📍', label: 'Saved addresses', tint: COLORS.secondary, screen: null },
        { icon: '💳', label: 'Payment methods', tint: COLORS.purple, screen: null },
        { icon: '🔔', label: 'Notification settings', tint: COLORS.accent, screen: 'Notifications' },
      ],
    },
    {
      title: 'Activity',
      items: [
        { icon: '🎁', label: 'Refer & earn', tint: COLORS.accent, screen: null },
        { icon: '📋', label: 'My bookings', tint: COLORS.primary, screen: 'Bookings' },
        { icon: '💬', label: 'Help & support', tint: COLORS.secondary, screen: 'Support' },
      ],
    },
    {
      title: 'Legal',
      items: [
        { icon: '📄', label: 'Terms & conditions', tint: COLORS.gray, screen: null },
        { icon: '🔒', label: 'Privacy policy', tint: COLORS.gray, screen: null },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Platform.OS === 'web' || Platform.OS === 'ios' ? 100 : 24 }}>
        <LinearGradient colors={GRADIENTS.hero} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
          <View style={styles.headerGlow} />
          <View style={styles.avatar}><Text style={{ fontSize: 38 }}>👤</Text></View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.contact}>+1 (555) 123-4567 · john.doe@email.com</Text>
        </LinearGradient>

        <View style={styles.statsRow}>
          <View style={styles.statItem}><Text style={styles.statValue}>12</Text><Text style={styles.statLabel}>Bookings</Text></View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}><Text style={styles.statValue}>4.8</Text><Text style={styles.statLabel}>Avg rating</Text></View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}><Text style={styles.statValue}>$420</Text><Text style={styles.statLabel}>Total spent</Text></View>
        </View>

        {menuGroups.map((group, gi) => (
          <View key={gi} style={styles.group}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.menu}>
              {group.items.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.menuItem, i === group.items.length - 1 && { borderBottomWidth: 0 }]}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (item.action) item.action();
                    else if (item.screen) navigation.navigate(item.screen);
                  }}
                >
                  <View style={[styles.menuIcon, { backgroundColor: item.tint + '18' }]}><Text style={{ fontSize: 17 }}>{item.icon}</Text></View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  {userEnterprises.length > 1 && item.label === 'Switch enterprise' && (
                    <Text style={styles.badge}>{userEnterprises.length}</Text>
                  )}
                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪  Log out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Vizehelp · Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { alignItems: 'center', paddingTop: 56, paddingBottom: 44, paddingHorizontal: SIZES.lg, borderBottomLeftRadius: 28, borderBottomRightRadius: 28, overflow: 'hidden' },
  headerGlow: { position: 'absolute', top: -40, right: -30, width: 160, height: 160, borderRadius: 80, backgroundColor: 'rgba(255,255,255,0.1)' },
  avatar: { width: 84, height: 84, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  name: { ...FONTS.h1, color: COLORS.white },
  contact: { ...FONTS.caption, color: 'rgba(255,255,255,0.9)', marginTop: 6, textAlign: 'center' },
  statsRow: { flexDirection: 'row', backgroundColor: COLORS.white, marginHorizontal: SIZES.lg, marginTop: -26, borderRadius: SIZES.radiusLg, paddingVertical: 18, justifyContent: 'space-around', ...SHADOWS.medium },
  statItem: { alignItems: 'center', flex: 1 },
  statValue: { ...FONTS.h2, color: COLORS.primary },
  statLabel: { ...FONTS.caption, color: COLORS.textLight, marginTop: 4 },
  statDivider: { width: 1, backgroundColor: COLORS.border },
  group: { marginTop: 22 },
  groupTitle: { ...FONTS.caption, color: COLORS.textLight, fontWeight: '800', letterSpacing: 0.8, marginHorizontal: SIZES.lg, marginBottom: 10, textTransform: 'uppercase' },
  menu: { backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, marginHorizontal: SIZES.lg, ...SHADOWS.small, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: SIZES.md, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  menuIcon: { width: 38, height: 38, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  menuLabel: { ...FONTS.body, color: COLORS.text, flex: 1, marginLeft: 14, fontWeight: '600' },
  badge: { backgroundColor: COLORS.primary, color: COLORS.white, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2, ...FONTS.caption, fontWeight: '700', marginRight: 6 },
  chevron: { fontSize: 22, color: COLORS.textLight },
  logoutBtn: { marginHorizontal: SIZES.lg, marginTop: 24, backgroundColor: COLORS.errorLight, borderRadius: SIZES.radiusLg, paddingVertical: 16, alignItems: 'center' },
  logoutText: { ...FONTS.body, color: COLORS.error, fontWeight: '700' },
  version: { ...FONTS.caption, color: COLORS.textLight, textAlign: 'center', marginTop: 18 },
});
