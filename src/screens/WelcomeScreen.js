import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES, SHADOWS, GRADIENTS } from '../constants/theme';
import { PrimaryButton } from '../components/Button';

const FEATURES = [
  { icon: '✅', title: 'Verified Buddies', desc: 'Every helper is background-checked & skill-verified' },
  { icon: '📍', title: 'Live Tracking', desc: 'Follow your Buddy in real time, right to your door' },
  { icon: '🔒', title: 'Secure Payments', desc: 'Pay safely with cards, wallets or cash on service' },
];

// Demo accounts wired to the mock registry in constants/enterprises.js
const DEMO_ACCOUNTS = [
  { phone: '5550001111', label: 'Returning · 1 enterprise' },
  { phone: '5550002222', label: 'Returning · 3 enterprises' },
];

export default function WelcomeScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const valid = phone.length === 10;

  const handleContinue = () => {
    navigation.navigate('OTP', { phone });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <LinearGradient colors={GRADIENTS.hero} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
          <View style={styles.glow} />
          <View style={styles.logoCircle}><Text style={styles.logo}>⚡</Text></View>
          <Text style={styles.brand}>Vizehelp</Text>
          <Text style={styles.tagline}>Book trusted help for any task, anytime</Text>

          <View style={styles.ratingPill}>
            <Text style={styles.ratingText}>⭐ 4.8  ·  50k+ tasks completed</Text>
          </View>
        </LinearGradient>

        <View style={styles.body}>
          <View style={styles.features}>
            {FEATURES.map((f, i) => (
              <View key={i} style={styles.featureRow}>
                <View style={styles.featureIcon}><Text style={{ fontSize: 18 }}>{f.icon}</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.featureTitle}>{f.title}</Text>
                  <Text style={styles.featureDesc}>{f.desc}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Enter your mobile number to get started</Text>
            <View style={styles.phoneRow}>
              <View style={styles.countryCode}><Text style={styles.codeText}>🇺🇸 +1</Text></View>
              <TextInput
                style={styles.input}
                placeholder="Mobile number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                maxLength={10}
                placeholderTextColor={COLORS.textDisabled}
              />
            </View>

            <PrimaryButton
              title="Get OTP"
              icon="→"
              disabled={!valid}
              onPress={handleContinue}
              style={{ marginTop: 18 }}
            />
            <Text style={styles.helperHint}>We'll text you a 6-digit code to verify your number.</Text>
          </View>

          <View style={styles.demoCard}>
            <Text style={styles.demoTitle}>💡 Demo accounts</Text>
            {DEMO_ACCOUNTS.map(acc => (
              <TouchableOpacity key={acc.phone} style={styles.demoRow} onPress={() => setPhone(acc.phone)} activeOpacity={0.7}>
                <Text style={styles.demoPhone}>{acc.phone}</Text>
                <Text style={styles.demoLabel}>{acc.label}</Text>
              </TouchableOpacity>
            ))}
            <Text style={styles.demoNote}>Any other number signs up as a new user.</Text>
          </View>
        </View>

        <Text style={styles.terms}>By continuing, you agree to our Terms of Service & Privacy Policy</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  hero: { paddingTop: 72, paddingBottom: 40, paddingHorizontal: SIZES.lg, alignItems: 'center', borderBottomLeftRadius: 32, borderBottomRightRadius: 32, overflow: 'hidden' },
  glow: { position: 'absolute', top: -40, right: -30, width: 180, height: 180, borderRadius: 90, backgroundColor: 'rgba(255,255,255,0.1)' },
  logoCircle: { width: 76, height: 76, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.18)', justifyContent: 'center', alignItems: 'center' },
  logo: { fontSize: 40 },
  brand: { fontSize: 34, fontWeight: '800', color: COLORS.white, marginTop: 14, letterSpacing: -0.5 },
  tagline: { ...FONTS.bodySm, color: 'rgba(255,255,255,0.9)', marginTop: 6, textAlign: 'center' },
  ratingPill: { marginTop: 16, backgroundColor: 'rgba(255,255,255,0.16)', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8 },
  ratingText: { ...FONTS.bodySm, color: COLORS.white, fontWeight: '700' },
  body: { paddingHorizontal: SIZES.lg, marginTop: 22 },
  features: { gap: 14 },
  featureRow: { flexDirection: 'row', alignItems: 'center' },
  featureIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  featureTitle: { ...FONTS.body, fontWeight: '700' },
  featureDesc: { ...FONTS.caption, color: COLORS.textLight, marginTop: 1 },
  form: { marginTop: 26 },
  label: { ...FONTS.bodySm, color: COLORS.text, fontWeight: '700', marginBottom: 10 },
  phoneRow: { flexDirection: 'row' },
  countryCode: { backgroundColor: COLORS.background, borderRadius: SIZES.radius, paddingHorizontal: 14, justifyContent: 'center', marginRight: 10, borderWidth: 1, borderColor: COLORS.border },
  codeText: { ...FONTS.body, color: COLORS.text, fontWeight: '700' },
  input: { flex: 1, backgroundColor: COLORS.background, borderRadius: SIZES.radius, paddingHorizontal: 16, paddingVertical: 15, ...FONTS.body, borderWidth: 1, borderColor: COLORS.border },
  helperHint: { ...FONTS.caption, color: COLORS.textLight, textAlign: 'center', marginTop: 14 },
  demoCard: { marginTop: 22, backgroundColor: COLORS.amberLight, borderRadius: SIZES.radius, padding: 14, borderWidth: 1, borderColor: '#FDE68A' },
  demoTitle: { ...FONTS.caption, color: '#92400E', fontWeight: '800', marginBottom: 8 },
  demoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#FDE68A' },
  demoPhone: { ...FONTS.caption, color: '#92400E', fontWeight: '700', fontVariant: ['tabular-nums'] },
  demoLabel: { ...FONTS.caption, color: '#B45309' },
  demoNote: { ...FONTS.caption, color: '#B45309', marginTop: 8, fontSize: 11 },
  terms: { ...FONTS.caption, color: COLORS.textLight, textAlign: 'center', marginTop: 28, marginBottom: 28, paddingHorizontal: SIZES.lg },
});
