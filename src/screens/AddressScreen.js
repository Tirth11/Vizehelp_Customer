import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import ScreenHeader from '../components/ScreenHeader';
import StepProgress from '../components/StepProgress';
import { PrimaryButton } from '../components/Button';

export default function AddressScreen({ navigation, route }) {
  const [address, setAddress] = useState({ flat: '', street: '', landmark: '', city: 'New York', pincode: '' });
  const [addressType, setAddressType] = useState('Home');

  return (
    <View style={styles.container}>
      <ScreenHeader title="Service address" subtitle="Where should your Buddy arrive?" onBack={() => navigation.goBack()} />
      <StepProgress current={2} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView style={styles.form} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <TouchableOpacity style={styles.currentLocation} activeOpacity={0.85}>
            <Text style={{ fontSize: 18 }}>📍</Text>
            <Text style={styles.currentText}>Use my current location</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or enter manually</Text>
            <View style={styles.dividerLine} />
          </View>

          <Text style={styles.label}>Flat / House No.<Text style={styles.req}> *</Text></Text>
          <TextInput style={styles.input} placeholder="e.g. Apt 4B" placeholderTextColor={COLORS.textDisabled} value={address.flat} onChangeText={v => setAddress({ ...address, flat: v })} />

          <Text style={styles.label}>Street / Area<Text style={styles.req}> *</Text></Text>
          <TextInput style={styles.input} placeholder="e.g. 123 Main Street" placeholderTextColor={COLORS.textDisabled} value={address.street} onChangeText={v => setAddress({ ...address, street: v })} />

          <Text style={styles.label}>Landmark</Text>
          <TextInput style={styles.input} placeholder="e.g. Near Central Park" placeholderTextColor={COLORS.textDisabled} value={address.landmark} onChangeText={v => setAddress({ ...address, landmark: v })} />

          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>City</Text>
              <TextInput style={styles.input} placeholderTextColor={COLORS.textDisabled} value={address.city} onChangeText={v => setAddress({ ...address, city: v })} />
            </View>
            <View style={{ width: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Pincode</Text>
              <TextInput style={styles.input} placeholder="10001" keyboardType="numeric" placeholderTextColor={COLORS.textDisabled} value={address.pincode} onChangeText={v => setAddress({ ...address, pincode: v })} />
            </View>
          </View>

          <Text style={styles.label}>Save this address as</Text>
          <View style={styles.typeRow}>
            {[{ t: 'Home', i: '🏠' }, { t: 'Office', i: '🏢' }, { t: 'Other', i: '📌' }].map(({ t, i }) => {
              const active = addressType === t;
              return (
                <TouchableOpacity key={t} style={[styles.typeBtn, active && styles.typeActive]} onPress={() => setAddressType(t)}>
                  <Text style={[styles.typeText, active && styles.typeTextActive]}>{i} {t}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <PrimaryButton title="Continue" icon="→" onPress={() => navigation.navigate('DateTime', { ...route.params, address, addressType })} style={{ marginTop: 28 }} />
          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  form: { flex: 1, paddingHorizontal: SIZES.lg, paddingTop: 10 },
  currentLocation: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primaryLight, padding: 16, borderRadius: SIZES.radius, borderWidth: 1, borderColor: '#BFD7FE' },
  currentText: { ...FONTS.body, color: COLORS.primary, fontWeight: '700', marginLeft: 10 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  dividerText: { ...FONTS.caption, color: COLORS.textLight, paddingHorizontal: 12 },
  label: { ...FONTS.bodySm, color: COLORS.text, fontWeight: '700', marginBottom: 8, marginTop: 16 },
  req: { color: COLORS.error },
  input: { backgroundColor: COLORS.background, borderRadius: SIZES.radius, paddingHorizontal: 16, paddingVertical: 14, ...FONTS.body, borderWidth: 1, borderColor: COLORS.border },
  row: { flexDirection: 'row' },
  typeRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
  typeBtn: { flex: 1, padding: 13, borderRadius: SIZES.radius, backgroundColor: COLORS.background, alignItems: 'center', borderWidth: 1.5, borderColor: COLORS.border },
  typeActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight },
  typeText: { ...FONTS.bodySm, color: COLORS.text, fontWeight: '600' },
  typeTextActive: { color: COLORS.primary },
});
