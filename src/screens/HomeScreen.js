import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Platform, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES, SHADOWS, GRADIENTS } from '../constants/theme';
import { SectionTitle, HowItWorks, TrustRow } from '../components/ui';
import { getEnterpriseById, getEnterpriseServices } from '../constants/enterprises';
import { globalStore } from '../constants/state';

const HOW_IT_WORKS = [
  { icon: '🔍', title: 'Choose a service', desc: 'Pick from 10+ everyday help categories.' },
  { icon: '🧑‍🔧', title: 'Get matched to a Buddy', desc: 'We assign a verified helper near you.' },
  { icon: '📍', title: 'Track & relax', desc: 'Follow live, pay securely, then rate.' },
];

const TRUST = [
  { icon: '🛡️', label: 'Verified\nBuddies' },
  { icon: '⭐', label: '4.8 avg\nrating' },
  { icon: '💸', label: 'Secure\npayments' },
  { icon: '🕑', label: '24/7\nsupport' },
];

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [, forceRender] = useState(0);
  const [switchPrompt, setSwitchPrompt] = useState(false);

  // Re-render when the global store changes (e.g. enterprise switched).
  useEffect(() => {
    const unsub = globalStore.subscribe(() => forceRender(n => n + 1));
    return unsub;
  }, []);

  // One-shot snackbar after auto-login: "Logged into X — switch?"
  useEffect(() => {
    if (globalStore.consumeSwitchPrompt()) {
      setSwitchPrompt(true);
      const t = setTimeout(() => setSwitchPrompt(false), 6000);
      return () => clearTimeout(t);
    }
  }, []);

  const enterprise = getEnterpriseById(globalStore.activeEnterpriseId);
  const catalog = getEnterpriseServices(globalStore.activeEnterpriseId);
  const firstName = globalStore.user?.name ? globalStore.user.name.split(' ')[0] : 'there';

  const recentBookings = [
    { id: '1', service: 'EV Charging Help', icon: '⚡', date: 'May 20, 2026', status: 'Completed', amount: '$32.00' },
    { id: '2', service: 'Cleaning Help', icon: '🧹', date: 'May 18, 2026', status: 'Completed', amount: '$55.00' },
  ];

  const filtered = query
    ? catalog.filter(s => s.name.toLowerCase().includes(query.toLowerCase()))
    : catalog;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Platform.OS === 'web' || Platform.OS === 'ios' ? 100 : 24 }}>
        {/* Gradient Header */}
        <LinearGradient colors={GRADIENTS.hero} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
          <View style={styles.headerGlow} />
          <View style={styles.headerTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.greeting}>Hello, {firstName} 👋</Text>
              <TouchableOpacity style={styles.locationRow} onPress={() => navigation.navigate('Location')} activeOpacity={0.7}>
                <Text style={styles.locationIcon}>📍</Text>
                <Text style={styles.locationText} numberOfLines={1}>{globalStore.currentLocation}</Text>
                <Text style={styles.chevron}>▼</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.notifBtn} onPress={() => navigation.navigate('Notifications')} activeOpacity={0.8}>
              <Text style={{ fontSize: 20 }}>🔔</Text>
              <View style={styles.badge} />
            </TouchableOpacity>
          </View>

          {/* Active enterprise chip — tap to switch */}
          {enterprise && (
            <TouchableOpacity
              style={styles.entChip}
              onPress={() => navigation.navigate('EnterpriseSelect', { mode: 'switch' })}
              activeOpacity={0.8}
            >
              <Text style={{ fontSize: 14 }}>{enterprise.logo}</Text>
              <Text style={styles.entChipText} numberOfLines={1}>{enterprise.name}</Text>
              <View style={styles.entChipDivider} />
              <Text style={styles.entChipSwitch}>Switch ▾</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.heroTitle}>What do you need help with today?</Text>

          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search EV charging, cleaning, pickup…"
              placeholderTextColor={COLORS.textLight}
              value={query}
              onChangeText={setQuery}
            />
          </View>
        </LinearGradient>

        {/* Trust strip */}
        <View style={styles.trustCard}>
          <TrustRow items={TRUST} />
        </View>

        {/* Offer Banner */}
        <TouchableOpacity activeOpacity={0.9} style={styles.bannerWrap}>
          <LinearGradient colors={GRADIENTS.banner} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.banner}>
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerTitle}>🎉 20% OFF your first booking</Text>
              <Text style={styles.bannerSub}>Use code WELCOME20 at checkout</Text>
            </View>
            <View style={styles.bannerCta}><Text style={styles.bannerCtaText}>Grab it</Text></View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Service Categories — only the active enterprise's catalog */}
        <SectionTitle
          title={enterprise ? `Services by ${enterprise.name}` : 'Browse services'}
          actionLabel="View all"
          onAction={() => navigation.navigate('ServiceList')}
        />
        {filtered.length === 0 ? (
          <View style={styles.emptySearch}>
            <Text style={styles.emptyIcon}>🔎</Text>
            <Text style={styles.emptyText}>
              {query ? `No services match “${query}”.` : 'This enterprise has no services yet.'}
            </Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {filtered.map(item => (
              <TouchableOpacity key={item.id} style={styles.categoryCard} activeOpacity={0.85} onPress={() => navigation.navigate('ServiceDetail', { service: item })}>
                {item.badge ? (
                  <View style={[styles.cardBadge, { backgroundColor: item.badgeColor }]}>
                    <Text style={styles.cardBadgeText}>{item.badge}</Text>
                  </View>
                ) : null}
                <View style={[styles.iconCircle, { backgroundColor: item.color + '18' }]}>
                  <Text style={styles.categoryIcon}>{item.icon}</Text>
                </View>
                <Text style={styles.categoryName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.categoryMeta}>⭐ 4.8 · {item.duration}</Text>
                <Text style={styles.categoryPrice}>From ${item.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Popular Services */}
        <SectionTitle title="Popular near you" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.popularRow}>
          {catalog.slice(0, 5).map(item => (
            <TouchableOpacity key={item.id} style={styles.popularCard} activeOpacity={0.85} onPress={() => navigation.navigate('ServiceDetail', { service: item })}>
              <View style={[styles.popularIcon, { backgroundColor: item.color + '15' }]}>
                <Text style={{ fontSize: 30 }}>{item.icon}</Text>
              </View>
              <Text style={styles.popularName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.popularMeta}>⭐ 4.8 · {item.duration}</Text>
              <View style={styles.popularFooter}>
                <Text style={styles.popularPrice}>${item.price}</Text>
                <View style={styles.bookNowSmall}><Text style={styles.bookNowSmallText}>Book</Text></View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* How it works */}
        <SectionTitle title="How Vizehelp works" />
        <View style={{ marginHorizontal: SIZES.lg }}>
          <HowItWorks steps={HOW_IT_WORKS} />
        </View>

        {/* Recent Bookings */}
        <SectionTitle title="Recent bookings" actionLabel="See all" onAction={() => navigation.navigate('Bookings')} />
        {recentBookings.map(b => (
          <TouchableOpacity key={b.id} style={styles.bookingCard} activeOpacity={0.85} onPress={() => navigation.navigate('BookingDetail', { booking: b })}>
            <View style={styles.bookingIconCircle}><Text style={{ fontSize: 20 }}>{b.icon}</Text></View>
            <View style={styles.bookingLeft}>
              <Text style={styles.bookingService}>{b.service}</Text>
              <Text style={styles.bookingDate}>{b.date}</Text>
            </View>
            <View style={styles.bookingRight}>
              <Text style={styles.bookingAmount}>{b.amount}</Text>
              <View style={styles.statusBadge}><Text style={styles.statusText}>{b.status}</Text></View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* One-shot auto-login snackbar */}
      {switchPrompt && enterprise && (
        <View style={styles.snackbar}>
          <Text style={styles.snackIcon}>✓</Text>
          <Text style={styles.snackText} numberOfLines={2}>
            Logged into <Text style={{ fontWeight: '800' }}>{enterprise.name}</Text>
          </Text>
          <TouchableOpacity
            onPress={() => { setSwitchPrompt(false); navigation.navigate('EnterpriseSelect', { mode: 'switch' }); }}
            style={styles.snackBtn}
          >
            <Text style={styles.snackBtnText}>Switch</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSwitchPrompt(false)} style={styles.snackClose}>
            <Text style={styles.snackCloseText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingTop: 52, paddingHorizontal: SIZES.lg, paddingBottom: 22, borderBottomLeftRadius: 28, borderBottomRightRadius: 28, overflow: 'hidden' },
  headerGlow: { position: 'absolute', top: -50, right: -40, width: 180, height: 180, borderRadius: 90, backgroundColor: 'rgba(255,255,255,0.1)' },
  headerTop: { flexDirection: 'row', alignItems: 'flex-start' },
  greeting: { fontSize: 22, fontWeight: '800', color: COLORS.white },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  locationIcon: { fontSize: 13 },
  locationText: { ...FONTS.bodySm, color: 'rgba(255,255,255,0.92)', marginLeft: 4, maxWidth: 200, fontWeight: '600' },
  chevron: { fontSize: 9, color: 'rgba(255,255,255,0.92)', marginLeft: 6 },
  notifBtn: { width: 44, height: 44, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.18)', justifyContent: 'center', alignItems: 'center' },
  badge: { position: 'absolute', top: 9, right: 10, width: 9, height: 9, borderRadius: 5, backgroundColor: '#FBBF24', borderWidth: 1.5, borderColor: COLORS.primaryDark },
  entChip: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.16)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 7, marginTop: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)', gap: 7 },
  entChipText: { ...FONTS.caption, color: COLORS.white, fontWeight: '700', maxWidth: 160 },
  entChipDivider: { width: 1, height: 14, backgroundColor: 'rgba(255,255,255,0.3)' },
  entChipSwitch: { fontSize: 11, color: 'rgba(255,255,255,0.85)', fontWeight: '600' },
  heroTitle: { fontSize: 19, fontWeight: '700', color: COLORS.white, marginTop: 20, lineHeight: 26 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, paddingHorizontal: 16, paddingVertical: 14, marginTop: 16, ...SHADOWS.medium },
  searchIcon: { fontSize: 16, marginRight: 10 },
  searchInput: { flex: 1, ...FONTS.body, color: COLORS.text },
  trustCard: { backgroundColor: COLORS.white, marginHorizontal: SIZES.lg, marginTop: -2, borderRadius: SIZES.radiusLg, paddingVertical: 16, paddingHorizontal: 8, marginBottom: 4, ...SHADOWS.small },
  bannerWrap: { marginHorizontal: SIZES.lg, marginTop: SIZES.md, borderRadius: SIZES.radiusLg, ...SHADOWS.medium },
  banner: { flexDirection: 'row', alignItems: 'center', borderRadius: SIZES.radiusLg, padding: SIZES.lg },
  bannerTitle: { ...FONTS.h3, color: COLORS.white },
  bannerSub: { ...FONTS.bodySm, color: 'rgba(255,255,255,0.9)', marginTop: 4 },
  bannerCta: { backgroundColor: COLORS.white, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 9 },
  bannerCtaText: { ...FONTS.bodySm, color: COLORS.primary, fontWeight: '800' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: SIZES.md, gap: 10 },
  categoryCard: { width: '30.7%', backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: 12, alignItems: 'center', marginBottom: 4, ...SHADOWS.small },
  cardBadge: { position: 'absolute', top: 8, right: 8, borderRadius: 6, paddingHorizontal: 5, paddingVertical: 2, maxWidth: 64 },
  cardBadgeText: { fontSize: 7.5, fontWeight: '800', color: COLORS.white },
  iconCircle: { width: 52, height: 52, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginTop: 6 },
  categoryIcon: { fontSize: 26 },
  categoryName: { ...FONTS.caption, color: COLORS.text, textAlign: 'center', marginTop: 8, fontWeight: '700' },
  categoryMeta: { fontSize: 10, color: COLORS.textLight, marginTop: 3, textAlign: 'center' },
  categoryPrice: { ...FONTS.caption, color: COLORS.primary, marginTop: 3, fontWeight: '800' },
  emptySearch: { alignItems: 'center', paddingVertical: 30, marginHorizontal: SIZES.lg },
  emptyIcon: { fontSize: 34 },
  emptyText: { ...FONTS.bodySm, color: COLORS.textLight, marginTop: 8 },
  popularRow: { paddingLeft: SIZES.lg, paddingRight: SIZES.sm, paddingBottom: 4 },
  popularCard: { width: 172, backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: 14, marginRight: 12, ...SHADOWS.small },
  popularIcon: { width: 54, height: 54, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  popularName: { ...FONTS.bodySm, fontWeight: '700', color: COLORS.text },
  popularMeta: { ...FONTS.caption, color: COLORS.textLight, marginTop: 4 },
  popularFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  popularPrice: { ...FONTS.body, color: COLORS.primary, fontWeight: '800' },
  bookNowSmall: { backgroundColor: COLORS.primary, borderRadius: 10, paddingVertical: 7, paddingHorizontal: 16 },
  bookNowSmallText: { ...FONTS.caption, color: COLORS.white, fontWeight: '700' },
  bookingCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, marginHorizontal: SIZES.lg, marginBottom: 10, borderRadius: SIZES.radiusLg, padding: SIZES.md, ...SHADOWS.small },
  bookingIconCircle: { width: 44, height: 44, borderRadius: 14, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center' },
  bookingLeft: { flex: 1, marginLeft: 12 },
  bookingService: { ...FONTS.bodySm, fontWeight: '700', color: COLORS.text },
  bookingDate: { ...FONTS.caption, color: COLORS.textLight, marginTop: 2 },
  bookingRight: { alignItems: 'flex-end' },
  bookingAmount: { ...FONTS.bodySm, fontWeight: '800', color: COLORS.text },
  statusBadge: { backgroundColor: COLORS.successLight, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2, marginTop: 4 },
  statusText: { ...FONTS.caption, color: COLORS.success, fontWeight: '700' },
  snackbar: { position: 'absolute', left: SIZES.lg, right: SIZES.lg, bottom: Platform.OS === 'web' || Platform.OS === 'ios' ? 92 : 20, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E293B', borderRadius: 14, paddingVertical: 12, paddingHorizontal: 14, gap: 10, ...SHADOWS.large },
  snackIcon: { width: 22, height: 22, borderRadius: 11, backgroundColor: COLORS.success, color: COLORS.white, fontSize: 12, fontWeight: '800', textAlign: 'center', lineHeight: 22, overflow: 'hidden' },
  snackText: { flex: 1, ...FONTS.caption, color: 'rgba(255,255,255,0.92)', fontSize: 12.5 },
  snackBtn: { backgroundColor: 'rgba(255,255,255,0.14)', borderRadius: 9, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  snackBtnText: { ...FONTS.caption, color: COLORS.white, fontWeight: '700' },
  snackClose: { padding: 4 },
  snackCloseText: { color: 'rgba(255,255,255,0.5)', fontSize: 13 },
});
