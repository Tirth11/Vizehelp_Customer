import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

export default function LocationScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const savedAddresses = [
    { id: '1', label: 'Home', address: '123 Main St, Apt 4B, New York, NY 10001' },
    { id: '2', label: 'Office', address: '456 Park Ave, Floor 12, New York, NY 10022' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.back}>← Back</Text></TouchableOpacity>
        <Text style={styles.title}>Select Location</Text>
      </View>

      <View style={styles.searchBox}>
        <Text style={{ fontSize: 16 }}>🔍</Text>
        <TextInput style={styles.searchInput} placeholder="Search address or ZIP code" value={search} onChangeText={setSearch} />
      </View>

      <TouchableOpacity style={styles.currentLocation}>
        <Text style={{ fontSize: 20 }}>📍</Text>
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.clTitle}>Use Current Location</Text>
          <Text style={styles.clSub}>Allow GPS to detect your location</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Saved Addresses</Text>
      {savedAddresses.map(addr => (
        <TouchableOpacity key={addr.id} style={styles.addressCard} onPress={() => navigation.goBack()}>
          <View style={styles.addrIcon}><Text>{addr.label === 'Home' ? '🏠' : '🏢'}</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.addrLabel}>{addr.label}</Text>
            <Text style={styles.addrText}>{addr.address}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.addNew}>
        <Text style={styles.addIcon}>＋</Text>
        <Text style={styles.addText}>Add New Address</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Enter ZIP Code</Text>
      <TextInput style={styles.zipInput} placeholder="Enter ZIP code" keyboardType="number-pad" maxLength={5} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { padding: SIZES.lg, paddingTop: 50 },
  back: { ...FONTS.body, color: COLORS.primary, marginBottom: 12 },
  title: { ...FONTS.h2, color: COLORS.text },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.background, marginHorizontal: SIZES.lg, borderRadius: SIZES.radius, paddingHorizontal: 14, paddingVertical: 12, borderWidth: 1, borderColor: COLORS.border },
  searchInput: { flex: 1, marginLeft: 10, ...FONTS.body },
  currentLocation: { flexDirection: 'row', alignItems: 'center', margin: SIZES.lg, padding: SIZES.md, backgroundColor: '#EBF4FF', borderRadius: SIZES.radius },
  clTitle: { ...FONTS.body, fontWeight: '600', color: COLORS.primary },
  clSub: { ...FONTS.caption, color: COLORS.gray, marginTop: 2 },
  sectionTitle: { ...FONTS.h3, color: COLORS.text, marginHorizontal: SIZES.lg, marginTop: SIZES.lg, marginBottom: SIZES.sm },
  addressCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: SIZES.lg, marginBottom: 10, padding: SIZES.md, backgroundColor: COLORS.background, borderRadius: SIZES.radius },
  addrIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  addrLabel: { ...FONTS.bodySm, fontWeight: '600', color: COLORS.text },
  addrText: { ...FONTS.caption, color: COLORS.gray, marginTop: 2 },
  addNew: { flexDirection: 'row', alignItems: 'center', marginHorizontal: SIZES.lg, marginTop: 10, padding: SIZES.md, borderWidth: 1, borderColor: COLORS.primary, borderRadius: SIZES.radius, borderStyle: 'dashed' },
  addIcon: { fontSize: 20, color: COLORS.primary, marginRight: 10 },
  addText: { ...FONTS.body, color: COLORS.primary },
  zipInput: { marginHorizontal: SIZES.lg, backgroundColor: COLORS.background, borderRadius: SIZES.radiusSm, paddingHorizontal: 16, paddingVertical: 14, ...FONTS.body, borderWidth: 1, borderColor: COLORS.border },
});
