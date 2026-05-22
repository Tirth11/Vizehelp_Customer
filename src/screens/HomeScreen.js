import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { SERVICE_CATEGORIES } from '../constants/services';

export default function HomeScreen({ navigation }) {
  const recentBookings = [
    { id: '1', service: 'EV Charging Help', date: 'May 20, 2026', status: 'Completed', amount: '$32.00' },
    { id: '2', service: 'Cleaning Help', date: 'May 18, 2026', status: 'Completed', amount: '$55.00' },
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

        {/* Search */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput style={styles.searchInput} placeholder="What service do you need?" placeholderTextColor={COLORS.gray} />
        </View>

        {/* Offers Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>🎉 20% OFF First Booking!</Text>
          <Text style={styles.bannerSub}>Use code WELCOME20 at checkout</Text>
        </View>

        {/* Service Categories */}
        <Text style={styles.sectionTitle}>Service Categories</Text>
        <View style={styles.grid}>
          {SERVICE_CATEGORIES.map(item => (
            <TouchableOpacity key={item.id} style={styles.categoryCard} onPress={() => navigation.navigate('ServiceDetail', { service: item })}>
              <View style={[styles.iconCircle, { backgroundColor: item.color + '20' }]}>
                <Text style={styles.categoryIcon}>{item.icon}</Text>
              </View>
              <Text style={styles.categoryName} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.categoryPrice}>From ${item.price}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Services */}
        <Text style={styles.sectionTitle}>Popular Near You</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.popularRow}>
          {SERVICE_CATEGORIES.slice(0, 5).map(item => (
            <TouchableOpacity key={item.id} style={styles.popularCard} onPress={() => navigation.navigate('ServiceDetail', { service: item })}>
              <View style={[styles.popularIcon, { backgroundColor: item.color + '15' }]}>
                <Text style={{ fontSize: 32 }}>{item.icon}</Text>
              </View>
              <Text style={styles.popularName}>{item.name}</Text>
              <Text style={styles.popularMeta}>⭐ 4.8 • {item.duration}</Text>
              <Text style={styles.popularPrice}>From ${item.price}</Text>
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SIZES.lg, paddingTop: 50 },
  greeting: { ...FONTS.h2, color: COLORS.text },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  locationIcon: { fontSize: 14 },
  locationText: { ...FONTS.bodySm, color: COLORS.gray, marginLeft: 4 },
  chevron: { fontSize: 10, color: COLORS.gray, marginLeft: 4 },
  notifBtn: { position: 'relative' },
  badge: { position: 'absolute', top: 0, right: 0, width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.error },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, marginHorizontal: SIZES.lg, borderRadius: SIZES.radius, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1, borderColor: COLORS.border },
  searchIcon: { fontSize: 16, marginRight: 10 },
  searchInput: { flex: 1, ...FONTS.body, color: COLORS.text },
  banner: { backgroundColor: COLORS.primary, marginHorizontal: SIZES.lg, marginTop: SIZES.lg, borderRadius: SIZES.radius, padding: SIZES.lg },
  bannerTitle: { ...FONTS.h3, color: COLORS.white },
  bannerSub: { ...FONTS.bodySm, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  sectionTitle: { ...FONTS.h3, color: COLORS.text, marginHorizontal: SIZES.lg, marginTop: SIZES.lg, marginBottom: SIZES.sm },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: SIZES.md, gap: 10 },
  categoryCard: { width: '30%', backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 12, alignItems: 'center', marginBottom: 4 },
  iconCircle: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  categoryIcon: { fontSize: 24 },
  categoryName: { ...FONTS.caption, color: COLORS.text, textAlign: 'center', marginTop: 8, fontWeight: '600' },
  categoryPrice: { ...FONTS.caption, color: COLORS.gray, marginTop: 2 },
  popularRow: { paddingLeft: SIZES.lg },
  popularCard: { width: 160, backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: 14, marginRight: 12 },
  popularIcon: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  popularName: { ...FONTS.bodySm, fontWeight: '600', color: COLORS.text },
  popularMeta: { ...FONTS.caption, color: COLORS.gray, marginTop: 4 },
  popularPrice: { ...FONTS.bodySm, color: COLORS.primary, fontWeight: '600', marginTop: 6 },
  recentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: SIZES.lg },
  seeAll: { ...FONTS.bodySm, color: COLORS.primary },
  bookingCard: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: COLORS.white, marginHorizontal: SIZES.lg, marginBottom: 10, borderRadius: SIZES.radius, padding: SIZES.md },
  bookingLeft: {},
  bookingService: { ...FONTS.bodySm, fontWeight: '600', color: COLORS.text },
  bookingDate: { ...FONTS.caption, color: COLORS.gray, marginTop: 4 },
  bookingRight: { alignItems: 'flex-end' },
  bookingAmount: { ...FONTS.bodySm, fontWeight: '600', color: COLORS.text },
  statusBadge: { backgroundColor: '#D1FAE5', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2, marginTop: 4 },
  statusText: { ...FONTS.caption, color: COLORS.success },
});
