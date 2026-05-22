import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';

export default function OTPScreen({ navigation, route }) {
  const { phone } = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleVerify = () => {
    navigation.navigate('ProfileSetup', { phone });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>Enter the 6-digit code sent to +1 {phone}</Text>

        <View style={styles.otpRow}>
          {otp.map((digit, i) => (
            <TextInput
              key={i}
              ref={ref => inputs.current[i] = ref}
              style={[styles.otpInput, digit && styles.otpFilled]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={t => handleChange(t, i)}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>

        <View style={styles.actions}>
          <TouchableOpacity><Text style={styles.link}>Resend OTP</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.link}>Change Number</Text></TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { flex: 1, padding: SIZES.lg, paddingTop: 60 },
  back: { ...FONTS.body, color: COLORS.primary, marginBottom: 30 },
  title: { ...FONTS.h1, color: COLORS.text },
  subtitle: { ...FONTS.body, color: COLORS.textLight, marginTop: 8, marginBottom: 32 },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
  otpInput: { width: 48, height: 56, borderRadius: SIZES.radius, borderWidth: 1.5, borderColor: COLORS.border, textAlign: 'center', ...FONTS.h2, backgroundColor: COLORS.background },
  otpFilled: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight },
  button: { backgroundColor: COLORS.primary, borderRadius: SIZES.radius, paddingVertical: 16, alignItems: 'center' },
  buttonText: { ...FONTS.button, color: COLORS.white },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 },
  link: { ...FONTS.bodySm, color: COLORS.primary, fontWeight: '600' },
});
