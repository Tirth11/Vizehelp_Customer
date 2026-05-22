import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

export default function AddressScreen({ navigation, route }) {
  const [address, setAddress] = useState({ flat: '', street: '', landmark: '', city: 'New York', pincode: '' });
  const [addressType, setAddressType] = useState('Home');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.back}>← Back</Text></TouchableOpacity>
        <Text style={styles.title}>Service Address</Text>
        <Text style={styles.subtitle}>Where should the Buddy arrive?</Text>
      </View>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.currentLocation}>
          <Text style={{ fontSize: 18 }}>📍</Text>
          <Text style={styles.currentText}>Use Current Location</Text>
        </TouchableOpacity>

        <View style={styles.divider}><Text style={styles.dividerText}>OR ENTER MANUALLY</Text></View>

        <Text style={styles.label}>Flat / House No.</Text>
        <TextInput style={styles.input} placeholder="e.g. Apt 4B" value={address.flat} onChangeText={v => setAddress({ ...address, flat: v })} />

        <Text style={styles.label}>Street / Area</Text>
        <TextInput style={styles.input} placeholder="e.g. 123 Main Street" value={address.street} onChangeText={v => setAddress({ ...address, street: v })} />

        <Text style={styles.label}>Landmark</Text>
        <TextInput style={styles.input} placeholder="e.g. Near Central Park" value={address.landmark} onChangeText={v => setAddress({ ...address, landmark: v })} />

        <Text style={styles.label}>City</Text>
        <TextInput style={styles.input} value={address.city} onChangeText={v => setAddress({ ...address, city: v })} />

        <Text style={styles.label}>Pincode</Text>
        <TextInput style={styles.input} placeholder="e.g. 10001" keyboardType="numeric" value={address.pincode} onChangeText={v => setAddress({ ...address, pincode: v })} />

        <Text style={styles.label}>Save As</Text>
        <View style={styles.typeRow}>
          {['Home', 'Office', 'Other'].map(t => (
            <TouchableOpacity key={t} style={[styles.typeBtn, addressType === t && styles.typeActive]} onPress={() => setAddressType(t)}>
              <Text style={[styles.typeText, addressType === t && styles.typeTextActive]}>{t === 'Home' ? '🏠' : t === 'Office' ? '🏢' : '📌'} {t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('DateTime', { ...route.params, address, addressType })}>
          <Text style={styles.continueBtnText}>Continue</Text>
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { padding: SIZES.lg, paddingTop: 50, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray },
  back: { ...FONTS.body, color: COLORS.primary, marginBottom: 12 },
  title: { ...FONTS.h2, color: COLORS.text },
  subtitle: { ...FONTS.bodySm, color: COLORS.gray, marginTop: 4 },
  form: { flex: 1, padding: SIZES.lg },
  currentLocation: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EBF4FF', padding: 16, borderRadius: SIZES.radius, borderWidth: 1, borderColor: COLORS.primary },
  currentText: { ...FONTS.body, color: COLORS.primary, fontWeight: '600', marginLeft: 10 },
  divider: { alignItems: 'center', marginVertical: 20 },
  dividerText: { ...FONTS.caption, color: COLORS.gray, backgroundColor: COLORS.white, paddingHorizontal: 10 },
  label: { ...FONTS.bodySm, color: COLORS.text, fontWeight: '600', marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: COLORS.background, borderRadius: SIZES.radiusSm, paddingHorizontal: 16, paddingVertical: 14, ...FONTS.body, borderWidth: 1, borderColor: COLORS.border },
  typeRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
  typeBtn: { flex: 1, padding: 12, borderRadius: SIZES.radiusSm, backgroundColor: COLORS.background, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  typeActive: { borderColor: COLORS.primary, backgroundColor: '#EBF4FF' },
  typeText: { ...FONTS.bodySm, color: COLORS.text },
  typeTextActive: { color: COLORS.primary, fontWeight: '600' },
  continueBtn: { backgroundColor: COLORS.primary, borderRadius: SIZES.radius, paddingVertical: 16, alignItems: 'center', marginTop: 30 },
  continueBtnText: { ...FONTS.button, color: COLORS.white },
});
