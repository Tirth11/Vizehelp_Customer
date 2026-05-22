import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

export default function ProfileSetupScreen({ navigation, route }) {
  const [form, setForm] = useState({ name: '', email: '', language: 'English' });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Complete Your Profile</Text>
        <Text style={styles.subtitle}>Tell us a bit about yourself</Text>

        <TouchableOpacity style={styles.avatar}>
          <Text style={styles.avatarText}>📷</Text>
          <Text style={styles.avatarLabel}>Add Photo</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Full Name *</Text>
        <TextInput style={styles.input} placeholder="Enter your full name" value={form.name} onChangeText={v => setForm({ ...form, name: v })} />

        <Text style={styles.label}>Email Address *</Text>
        <TextInput style={styles.input} placeholder="Enter email" keyboardType="email-address" value={form.email} onChangeText={v => setForm({ ...form, email: v })} />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput style={[styles.input, styles.disabled]} value={`+1 ${route.params?.phone || ''}`} editable={false} />

        <Text style={styles.label}>Preferred Language</Text>
        <View style={styles.langRow}>
          {['English', 'Spanish', 'French'].map(lang => (
            <TouchableOpacity key={lang} style={[styles.langChip, form.language === lang && styles.langActive]} onPress={() => setForm({ ...form, language: lang })}>
              <Text style={[styles.langText, form.language === lang && styles.langTextActive]}>{lang}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Alternate Phone (Optional)</Text>
        <TextInput style={styles.input} placeholder="Alternate number" keyboardType="phone-pad" />

        <TouchableOpacity style={styles.button} onPress={() => navigation.replace('MainTabs')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { flex: 1, padding: SIZES.lg, paddingTop: 60 },
  title: { ...FONTS.h1, color: COLORS.text },
  subtitle: { ...FONTS.body, color: COLORS.gray, marginTop: 4, marginBottom: 24 },
  avatar: { alignSelf: 'center', width: 90, height: 90, borderRadius: 45, backgroundColor: COLORS.lightGray, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  avatarText: { fontSize: 28 },
  avatarLabel: { ...FONTS.caption, color: COLORS.gray, marginTop: 4 },
  label: { ...FONTS.bodySm, color: COLORS.text, marginBottom: 6, marginTop: 16 },
  input: { backgroundColor: COLORS.background, borderRadius: SIZES.radiusSm, paddingHorizontal: 16, paddingVertical: 14, ...FONTS.body, borderWidth: 1, borderColor: COLORS.border },
  disabled: { opacity: 0.6 },
  langRow: { flexDirection: 'row', gap: 10 },
  langChip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: COLORS.lightGray },
  langActive: { backgroundColor: COLORS.primary },
  langText: { ...FONTS.bodySm, color: COLORS.text },
  langTextActive: { color: COLORS.white },
  button: { backgroundColor: COLORS.primary, borderRadius: SIZES.radius, paddingVertical: 16, alignItems: 'center', marginTop: 32, marginBottom: 40 },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { ...FONTS.button, color: COLORS.white },
});
