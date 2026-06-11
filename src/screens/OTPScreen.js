import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { PrimaryButton } from '../components/Button';
import { findUserByPhone } from '../constants/enterprises';
import { globalStore } from '../constants/state';

export default function OTPScreen({ navigation, route }) {
  const { phone } = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [seconds, setSeconds] = useState(30);
  const [verifying, setVerifying] = useState(false);
  const inputs = useRef([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const handleChange = (text, index) => {
    const clean = text.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = clean.slice(-1);
    setOtp(newOtp);
    if (clean && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const filled = otp.every(d => d !== '');

  // Post-OTP routing — the "intelligence" step:
  //   new user            → EnterpriseSelect (onboarding)
  //   returning, 1 ent    → auto-login to last used + one-shot switch prompt on Home
  //   returning, 2+ ents  → EnterpriseSelect (pick before entering)
  const handleVerify = () => {
    setVerifying(true);
    // Simulate the login API round-trip.
    setTimeout(() => {
      const registered = findUserByPhone(phone);

      if (!registered) {
        setVerifying(false);
        navigation.navigate('EnterpriseSelect', { mode: 'onboarding', phone });
        return;
      }

      const user = { name: registered.name, email: registered.email, language: registered.language, phone };

      if (registered.enterpriseIds.length === 1) {
        globalStore.setUser(user);
        globalStore.setUserEnterprises(registered.enterpriseIds);
        globalStore.setActiveEnterprise(registered.lastUsedEnterpriseId || registered.enterpriseIds[0]);
        globalStore.pendingSwitchPrompt = true;
        setVerifying(false);
        navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
        return;
      }

      // Multi-enterprise: commit user + memberships, let them pick the session enterprise.
      globalStore.setUser(user);
      globalStore.setUserEnterprises(registered.enterpriseIds);
      setVerifying(false);
      navigation.navigate('EnterpriseSelect', {
        mode: 'select',
        phone,
        lastUsedId: registered.lastUsedEnterpriseId,
      });
    }, 900);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.content}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <View style={styles.iconCircle}><Text style={{ fontSize: 34 }}>📩</Text></View>
        <Text style={styles.title}>Verify your number</Text>
        <Text style={styles.subtitle}>Enter the 6-digit code sent to{'\n'}<Text style={styles.phone}>+1 {phone}</Text></Text>

        <View style={styles.otpRow}>
          {otp.map((digit, i) => (
            <TextInput
              key={i}
              ref={ref => (inputs.current[i] = ref)}
              style={[styles.otpInput, digit && styles.otpFilled]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={t => handleChange(t, i)}
              onKeyPress={e => handleKeyPress(e, i)}
              editable={!verifying}
            />
          ))}
        </View>

        {verifying ? (
          <View style={styles.verifyingRow}>
            <ActivityIndicator size="small" color={COLORS.primary} />
            <Text style={styles.verifyingText}>Checking your account…</Text>
          </View>
        ) : (
          <PrimaryButton title="Verify & Continue" disabled={!filled} onPress={handleVerify} />
        )}

        <View style={styles.resendRow}>
          {seconds > 0 ? (
            <Text style={styles.resendMuted}>Resend code in 0:{seconds.toString().padStart(2, '0')}</Text>
          ) : (
            <TouchableOpacity onPress={() => setSeconds(30)}><Text style={styles.link}>Resend OTP</Text></TouchableOpacity>
          )}
          <Text style={styles.dot}>·</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.link}>Change number</Text></TouchableOpacity>
        </View>

        <View style={styles.demoNote}>
          <Text style={styles.demoText}>💡 Demo mode — enter any 6 digits to continue</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { flex: 1, padding: SIZES.lg, paddingTop: 56 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  backIcon: { fontSize: 28, color: COLORS.text, marginTop: -4, fontWeight: '600' },
  iconCircle: { width: 68, height: 68, borderRadius: 22, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', marginBottom: 18 },
  title: { ...FONTS.h1 },
  subtitle: { ...FONTS.body, color: COLORS.textLight, marginTop: 10, lineHeight: 24 },
  phone: { color: COLORS.text, fontWeight: '700' },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 28, marginBottom: 28 },
  otpInput: { width: 48, height: 58, borderRadius: SIZES.radius, borderWidth: 1.5, borderColor: COLORS.border, textAlign: 'center', fontSize: 22, fontWeight: '700', color: COLORS.text, backgroundColor: COLORS.background },
  otpFilled: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight, color: COLORS.primary },
  verifyingRow: { height: SIZES.buttonHeight, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  verifyingText: { ...FONTS.bodySm, color: COLORS.textLight, fontWeight: '600' },
  resendRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24, gap: 10 },
  resendMuted: { ...FONTS.bodySm, color: COLORS.textLight },
  link: { ...FONTS.bodySm, color: COLORS.primary, fontWeight: '700' },
  dot: { color: COLORS.textLight },
  demoNote: { marginTop: 'auto', backgroundColor: COLORS.amberLight, borderRadius: SIZES.radius, padding: 14, alignItems: 'center' },
  demoText: { ...FONTS.caption, color: '#92400E', fontWeight: '600' },
});
