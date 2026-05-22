import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { SERVICE_CATEGORIES } from '../constants/services';

export default function HomeScreen({ navigation }) {
  const recentBookings = [
    { id: '1', service: 'EV Charging Help', icon: '⚡', date: 'May 20, 2026', status: 'Completed', amount: '$32.00' },
    { id: '2', service: 'Cleaning Help', icon: '🧹', date: 'May 18, 2026', status: 'Completed', amount: '$55.00' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, John 👋</Text>
            <TouchableOpacity style={styles.locationRow} onPress={() => navigation.navigate('Location')}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.locationText}>123 Main St, New York</Text>
              <Text style={styles.chevron}>▼</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.notifBtn} onPress={() => navigation.navigate('Notifications')}>
            <Text style={{ fontSize: 22 }}>🔔</Text>
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>What service do you need today?</Text>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput style={styles.searchInput} placeholder="Search EV charging, cleaning, pickup..." placeholderTextColor={COLORS.textLight} />
          </View>
        </View>

        {/* Offers Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>🎉 20% OFF First Booking!</Text>
            <Text style={styles.bannerSub}>Use code WELCOME20 at checkout</Text>
          </View>
        </View>

        {/* Service Categories */}
        <Text style={styles.sectionTitle}>Service Categories</Text>
        <View style={styles.grid}>
          {SERVICE_CATEGORIES.map(item => (
            <TouchableOpacity key={item.id} style={styles.categoryCard} onPress={() => navigation.navigate('ServiceDetail', { service: item })}>
              <View style={[styles.iconCircle, { backgroundColor: item.color + '15' }]}>
                <Text style={styles.categoryIcon}>{item.icon}</Text>
              </View>
              <Text style={styles.categoryName} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.categoryPrice}>From ${item.price}</Text>
              {item.badge && (
                <View style={[styles.badgeTag, { backgroundColor: item.badgeColor + '15' }]}>
                  <Text style={[styles.badgeTagText, { color: item.badgeColor }]}>{item.badge}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Services */}
        <Text style={styles.sectionTitle}>Popular Near You</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.popularRow}>
          {SERVICE_CATEGORIES.slice(0, 5).map(item => (
            <TouchableOpacity key={item.id} style={styles.popularCard} onPress={() => navigation.navigate('ServiceDetail', { service: item })}>
              <View style={[styles.popularIcon, { backgroundColor: item.color + '12' }]}>
                <Text style={{ fontSize: 32 }}>{item.icon}</Text>
              </View>
              <Text style={styles.popularName}>{item.name}</Text>
              <Text style={styles.popularMeta}>⭐ 4.8 • {item.duration}</Text>
              <Text style={styles.popularPrice}>From ${item.price}</Text>
              <TouchableOpacity style={styles.bookNowSmall}>
                <Text style={styles.bookNowSmallText}>Book Now</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recent Bookings */}
        <View style={styles.recentHeader}>
          <Text style={styles.sectionTitle}>Recent Bookings</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Bookings')}><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        {recentBookings.map(b => (
          <TouchableOpacity key={b.id} style={styles.bookingCard} onPress={() => navigation.navigate('BookingDetail', { booking: b })}>
            <View style={styles.bookingIconCircle}>
              <Text style={{ fontSize: 20 }}>{b.icon}</Text>
            </View>
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

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: SIZES.lg, paddingTop: 50, paddingBottom: SIZES.sm },
  greeting: { ...FONTS.h2, color: COLORS.text },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  locationIcon: { fontSize: 14 },
  locationText: { ...FONTS.bodySm, color: COLORS.textLight, marginLeft: 4 },
  chevron: { fontSize: 10, color: COLORS.textLight, marginLeft: 4 },
  notifBtn: { position: 'relative', width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', ...SHADOWS.small },
  badge: { position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.error },
  hero: { paddingHorizontal: SIZES.lg, paddingTop: SIZES.md },
  heroTitle: { ...FONTS.h1, color: COLORS.text, marginBottom: SIZES.md },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, paddingHorizontal: 16, paddingVertical: 14, ...SHADOWS.medium },
  searchIcon: { fontSize: 16, marginRight: 10 },
  searchInput: { flex: 1, ...FONTS.body, color: COLORS.text },
  banner: { marginHorizontal: SIZES.lg, marginTop: SIZES.lg, borderRadius: SIZES.radiusLg, backgroundColor: COLORS.primary, overflow: 'hidden' },
  bannerContent: { padding: SIZES.lg },
  bannerTitle: { ...FONTS.h3, color: COLORS.white },
  bannerSub: { ...FONTS.bodySm, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  sectionTitle: { ...FONTS.h3, color: COLORS.text, marginHorizontal: SIZES.lg, marginTop: SIZES.lg, marginBottom: SIZES.sm },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: SIZES.md, gap: 10 },
  categoryCard: { width: '30%', backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: 12, alignItems: 'center', marginBottom: 4, ...SHADOWS.small },
  iconCircle: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  categoryIcon: { fontSize: 24 },
  categoryName: { ...FONTS.caption, color: COLORS.text, textAlign: 'center', marginTop: 8, fontWeight: '600' },
  categoryPrice: { ...FONTS.caption, color: COLORS.textLight, marginTop: 2 },
  badgeTag: { borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2, marginTop: 4 },
  badgeTagText: { fontSize: 9, fontWeight: '600' },
  popularRow: { paddingLeft: SIZES.lg },
  popularCard: { width: 170, backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: 14, marginRight: 12, ...SHADOWS.medium },
  popularIcon: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  popularName: { ...FONTS.bodySm, fontWeight: '600', color: COLORS.text },
  popularMeta: { ...FONTS.caption, color: COLORS.textLight, marginTop: 4 },
  popularPrice: { ...FONTS.bodySm, color: COLORS.primary, fontWeight: '700', marginTop: 6 },
  bookNowSmall: { backgroundColor: COLORS.primaryLight, borderRadius: 8, paddingVertical: 6, alignItems: 'center', marginTop: 10 },
  bookNowSmallText: { ...FONTS.caption, color: COLORS.primary, fontWeight: '600' },
  recentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: SIZES.lg },
  seeAll: { ...FONTS.bodySm, color: COLORS.primary, fontWeight: '600' },
  bookingCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, marginHorizontal: SIZES.lg, marginBottom: 10, borderRadius: SIZES.radiusLg, padding: SIZES.md, ...SHADOWS.small },
  bookingIconCircle: { width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center' },
  bookingLeft: { flex: 1, marginLeft: 12 },
  bookingService: { ...FONTS.bodySm, fontWeight: '600', color: COLORS.text },
  bookingDate: { ...FONTS.caption, color: COLORS.textLight, marginTop: 2 },
  bookingRight: { alignItems: 'flex-end' },
  bookingAmount: { ...FONTS.bodySm, fontWeight: '700', color: COLORS.text },
  statusBadge: { backgroundColor: COLORS.successLight, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2, marginTop: 4 },
  statusText: { ...FONTS.caption, color: COLORS.success, fontWeight: '500' },
});
