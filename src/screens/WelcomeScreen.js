import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';

export default function WelcomeScreen({ navigation }) {
  const [phone, setPhone] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoCircle}><Text style={styles.logo}>⚡</Text></View>
          <Text style={styles.title}>Vizehelp</Text>
          <Text style={styles.subtitle}>Book trusted help for any task</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.phoneRow}>
            <View style={styles.countryCode}><Text style={styles.codeText}>+1</Text></View>
            <TextInput style={styles.input} placeholder="Enter mobile number" keyboardType="phone-pad" value={phone} onChangeText={setPhone} maxLength={10} placeholderTextColor={COLORS.textDisabled} />
          </View>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OTP', { phone })}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.helpLink}>
            <Text style={styles.helpText}>Need Help?</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.terms}>By continuing, you agree to our Terms of Service and Privacy Policy</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { flex: 1, padding: SIZES.lg, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 48 },
  logoCircle: { width: 80, height: 80, borderRadius: 22, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center' },
  logo: { fontSize: 44 },
  title: { fontSize: 32, fontWeight: '700', color: COLORS.primary, marginTop: 16 },
  subtitle: { ...FONTS.body, color: COLORS.textLight, marginTop: 8 },
  form: { width: '100%' },
  label: { ...FONTS.bodySm, color: COLORS.text, fontWeight: '600', marginBottom: 8 },
  phoneRow: { flexDirection: 'row', marginBottom: 20 },
  countryCode: { backgroundColor: COLORS.background, borderRadius: SIZES.radius, paddingHorizontal: 16, justifyContent: 'center', marginRight: 10, borderWidth: 1, borderColor: COLORS.border },
  codeText: { ...FONTS.body, color: COLORS.text, fontWeight: '600' },
  input: { flex: 1, backgroundColor: COLORS.background, borderRadius: SIZES.radius, paddingHorizontal: 16, paddingVertical: 14, ...FONTS.body, borderWidth: 1, borderColor: COLORS.border },
  button: { backgroundColor: COLORS.primary, borderRadius: SIZES.radius, paddingVertical: 16, alignItems: 'center' },
  buttonText: { ...FONTS.button, color: COLORS.white },
  helpLink: { alignItems: 'center', marginTop: 20 },
  helpText: { ...FONTS.bodySm, color: COLORS.primary, fontWeight: '600' },
  terms: { ...FONTS.caption, color: COLORS.textLight, textAlign: 'center', marginTop: 32 },
});
