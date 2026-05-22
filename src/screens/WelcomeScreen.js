import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

export default function WelcomeScreen({ navigation }) {
  const [phone, setPhone] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>⚡</Text>
          <Text style={styles.title}>Vizehelp</Text>
          <Text style={styles.subtitle}>Book trusted help for any task</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.phoneRow}>
            <View style={styles.countryCode}><Text style={styles.codeText}>+1</Text></View>
            <TextInput
              style={styles.input}
              placeholder="Enter mobile number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              maxLength={10}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('OTP', { phone })}
          >
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
  logo: { fontSize: 64 },
  title: { ...FONTS.h1, color: COLORS.primary, marginTop: 12 },
  subtitle: { ...FONTS.body, color: COLORS.gray, marginTop: 8 },
  form: { width: '100%' },
  label: { ...FONTS.bodySm, color: COLORS.text, marginBottom: 8 },
  phoneRow: { flexDirection: 'row', marginBottom: 20 },
  countryCode: { backgroundColor: COLORS.lightGray, borderRadius: SIZES.radiusSm, paddingHorizontal: 16, justifyContent: 'center', marginRight: 10 },
  codeText: { ...FONTS.body, color: COLORS.text },
  input: { flex: 1, backgroundColor: COLORS.background, borderRadius: SIZES.radiusSm, paddingHorizontal: 16, paddingVertical: 14, ...FONTS.body, borderWidth: 1, borderColor: COLORS.border },
  button: { backgroundColor: COLORS.primary, borderRadius: SIZES.radius, paddingVertical: 16, alignItems: 'center' },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { ...FONTS.button, color: COLORS.white },
  helpLink: { alignItems: 'center', marginTop: 20 },
  helpText: { ...FONTS.bodySm, color: COLORS.primary },
  terms: { ...FONTS.caption, color: COLORS.gray, textAlign: 'center', marginTop: 32 },
});
