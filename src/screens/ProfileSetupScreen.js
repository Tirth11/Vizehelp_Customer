import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { PrimaryButton } from '../components/Button';
import { getEnterpriseById } from '../constants/enterprises';
import { globalStore } from '../constants/state';

export default function ProfileSetupScreen({ navigation, route }) {
  const [form, setForm] = useState({ name: '', email: '', language: 'English' });
  const valid = form.name.trim() && form.email.trim();
  const enterprise = getEnterpriseById(globalStore.activeEnterpriseId);

  const handleFinish = () => {
    globalStore.setUser({ ...form, phone: route.params?.phone || '' });
    navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.badgeRow}>
            <View style={styles.badge}><Text style={styles.badgeText}>✓ Number verified</Text></View>
            <View style={styles.stepPill}><Text style={styles.stepPillText}>Step 2 of 2</Text></View>
          </View>
          <Text style={styles.title}>Set up your profile</Text>
          <Text style={styles.subtitle}>Just a few details so your Buddy knows who to help.</Text>

          {enterprise && (
            <View style={styles.entCard}>
              <View style={[styles.entLogo, { backgroundColor: enterprise.color + '15' }]}>
                <Text style={{ fontSize: 20 }}>{enterprise.logo}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.entLabel}>Joining</Text>
                <Text style={styles.entName}>{enterprise.name}</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.entChange}>Change</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.avatarWrap} activeOpacity={0.8}>
            <View style={styles.avatar}><Text style={styles.avatarText}>📷</Text></View>
            <View style={styles.avatarEdit}><Text style={{ fontSize: 12 }}>＋</Text></View>
          </TouchableOpacity>
          <Text style={styles.avatarLabel}>Add a profile photo (optional)</Text>

          <Text style={styles.label}>Full Name *</Text>
          <TextInput style={styles.input} placeholder="e.g. John Doe" placeholderTextColor={COLORS.textDisabled} value={form.name} onChangeText={v => setForm({ ...form, name: v })} />

          <Text style={styles.label}>Email Address *</Text>
          <TextInput style={styles.input} placeholder="e.g. john@email.com" placeholderTextColor={COLORS.textDisabled} keyboardType="email-address" autoCapitalize="none" value={form.email} onChangeText={v => setForm({ ...form, email: v })} />

          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.lockedInput}>
            <Text style={styles.lockedText}>+1 {route.params?.phone || ''}</Text>
            <Text style={styles.lockBadge}>🔒 Verified</Text>
          </View>

          <Text style={styles.label}>Preferred Language</Text>
          <View style={styles.langRow}>
            {['English', 'Spanish', 'French'].map(lang => (
              <TouchableOpacity key={lang} style={[styles.langChip, form.language === lang && styles.langActive]} onPress={() => setForm({ ...form, language: lang })}>
                <Text style={[styles.langText, form.language === lang && styles.langTextActive]}>{lang}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ height: 20 }} />
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton title="Get Started" icon="🚀" disabled={!valid} onPress={handleFinish} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { flex: 1, padding: SIZES.lg, paddingTop: 56 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  badge: { backgroundColor: COLORS.successLight, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  badgeText: { ...FONTS.caption, color: COLORS.success, fontWeight: '700' },
  stepPill: { backgroundColor: COLORS.primaryLight, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 6 },
  stepPillText: { fontSize: 11, fontWeight: '700', color: COLORS.primary },
  entCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.background, borderRadius: SIZES.radius, padding: 12, marginTop: 18, borderWidth: 1, borderColor: COLORS.border },
  entLogo: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  entLabel: { fontSize: 10, fontWeight: '700', color: COLORS.textLight, textTransform: 'uppercase', letterSpacing: 0.6 },
  entName: { ...FONTS.bodySm, fontWeight: '700', color: COLORS.text, marginTop: 1 },
  entChange: { ...FONTS.caption, color: COLORS.primary, fontWeight: '700' },
  title: { ...FONTS.h1 },
  subtitle: { ...FONTS.bodySm, color: COLORS.textLight, marginTop: 6, lineHeight: 20 },
  avatarWrap: { alignSelf: 'center', marginTop: 24 },
  avatar: { width: 96, height: 96, borderRadius: 30, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 32 },
  avatarEdit: { position: 'absolute', bottom: 0, right: 0, width: 30, height: 30, borderRadius: 15, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: COLORS.white },
  avatarLabel: { ...FONTS.caption, color: COLORS.textLight, textAlign: 'center', marginTop: 10, marginBottom: 8 },
  label: { ...FONTS.bodySm, color: COLORS.text, fontWeight: '700', marginBottom: 8, marginTop: 18 },
  input: { backgroundColor: COLORS.background, borderRadius: SIZES.radius, paddingHorizontal: 16, paddingVertical: 15, ...FONTS.body, borderWidth: 1, borderColor: COLORS.border },
  lockedInput: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.successLight, borderRadius: SIZES.radius, paddingHorizontal: 16, paddingVertical: 15, borderWidth: 1, borderColor: '#BBF7D0' },
  lockedText: { ...FONTS.body, color: COLORS.text, fontWeight: '600' },
  lockBadge: { ...FONTS.caption, color: COLORS.success, fontWeight: '700' },
  langRow: { flexDirection: 'row', gap: 10 },
  langChip: { paddingHorizontal: 18, paddingVertical: 11, borderRadius: 22, backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.border },
  langActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  langText: { ...FONTS.bodySm, color: COLORS.text, fontWeight: '600' },
  langTextActive: { color: COLORS.white },
  footer: { padding: SIZES.lg, paddingBottom: Platform.OS === 'web' || Platform.OS === 'ios' ? 28 : SIZES.lg, borderTopWidth: 1, borderTopColor: COLORS.border, backgroundColor: COLORS.white, ...SHADOWS.medium },
});
