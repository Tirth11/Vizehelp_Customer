import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import ScreenHeader from '../components/ScreenHeader';

export default function LocationScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const savedAddresses = [
    { id: '1', label: 'Home', icon: '🏠', address: '123 Main St, Apt 4B, New York, NY 10001' },
    { id: '2', label: 'Office', icon: '🏢', address: '456 Park Ave, Floor 12, New York, NY 10022' },
  ];

  return (
    <View style={styles.container}>
      <ScreenHeader title="Select location" subtitle="Where do you need help?" onBack={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: SIZES.lg }}>
        <View style={styles.searchBox}>
          <Text style={{ fontSize: 16 }}>🔍</Text>
          <TextInput style={styles.searchInput} placeholder="Search address or ZIP code" placeholderTextColor={COLORS.textLight} value={search} onChangeText={setSearch} />
        </View>

        <TouchableOpacity style={styles.currentLocation} activeOpacity={0.85}>
          <View style={styles.gpsIcon}><Text style={{ fontSize: 20 }}>📍</Text></View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.clTitle}>Use my current location</Text>
            <Text style={styles.clSub}>Allow GPS to detect where you are</Text>
          </View>
          <Text style={styles.clArrow}>›</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Saved addresses</Text>
        {savedAddresses.map(addr => (
          <TouchableOpacity key={addr.id} style={styles.addressCard} activeOpacity={0.85} onPress={() => navigation.goBack()}>
            <View style={styles.addrIcon}><Text style={{ fontSize: 18 }}>{addr.icon}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.addrLabel}>{addr.label}</Text>
              <Text style={styles.addrText} numberOfLines={2}>{addr.address}</Text>
            </View>
            <Text style={styles.clArrow}>›</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.addNew} activeOpacity={0.8}>
          <Text style={styles.addIcon}>＋</Text>
          <Text style={styles.addText}>Add a new address</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: SIZES.radius, paddingHorizontal: 14, paddingVertical: 13, borderWidth: 1, borderColor: COLORS.border, ...SHADOWS.small },
  searchInput: { flex: 1, marginLeft: 10, ...FONTS.body, color: COLORS.text },
  currentLocation: { flexDirection: 'row', alignItems: 'center', marginTop: 16, padding: SIZES.md, backgroundColor: COLORS.primaryLight, borderRadius: SIZES.radiusLg, borderWidth: 1, borderColor: '#BFD7FE' },
  gpsIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center' },
  clTitle: { ...FONTS.body, fontWeight: '700', color: COLORS.primary },
  clSub: { ...FONTS.caption, color: COLORS.textLight, marginTop: 2 },
  clArrow: { fontSize: 22, color: COLORS.textLight },
  sectionTitle: { ...FONTS.h3, color: COLORS.text, marginTop: 24, marginBottom: 12 },
  addressCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, padding: SIZES.md, backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, ...SHADOWS.small },
  addrIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  addrLabel: { ...FONTS.bodySm, fontWeight: '700', color: COLORS.text },
  addrText: { ...FONTS.caption, color: COLORS.textLight, marginTop: 2 },
  addNew: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 6, padding: SIZES.md, borderWidth: 1.5, borderColor: COLORS.primary, borderRadius: SIZES.radiusLg, borderStyle: 'dashed' },
  addIcon: { fontSize: 20, color: COLORS.primary, marginRight: 10 },
  addText: { ...FONTS.body, color: COLORS.primary, fontWeight: '700' },
});
