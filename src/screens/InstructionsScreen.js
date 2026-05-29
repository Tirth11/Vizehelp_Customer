import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import ScreenHeader from '../components/ScreenHeader';
import StepProgress from '../components/StepProgress';
import { PrimaryButton } from '../components/Button';

export default function InstructionsScreen({ navigation, route }) {
  const [instructions, setInstructions] = useState('');
  const [contactPreference, setContactPreference] = useState('Call');

  return (
    <View style={styles.container}>
      <ScreenHeader title="Add instructions" subtitle="Anything your Buddy should know?" onBack={() => navigation.goBack()} />
      <StepProgress current={4} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <Text style={styles.label}>Instructions for your Buddy</Text>
          <TextInput style={styles.textarea} placeholder="e.g. Ring the doorbell twice, the gate code is 1234…" multiline numberOfLines={6} value={instructions} onChangeText={setInstructions} placeholderTextColor={COLORS.textDisabled} />
          <Text style={styles.optional}>Optional — but it really helps things go smoothly.</Text>

          <Text style={styles.label}>How should your Buddy reach you?</Text>
          <View style={styles.prefRow}>
            {[{ p: 'Call', i: '📞' }, { p: 'Text', i: '💬' }, { p: 'In-App Chat', i: '📱' }].map(({ p, i }) => {
              const active = contactPreference === p;
              return (
                <TouchableOpacity key={p} style={[styles.prefBtn, active && styles.prefActive]} onPress={() => setContactPreference(p)}>
                  <Text style={{ fontSize: 20 }}>{i}</Text>
                  <Text style={[styles.prefText, active && styles.prefTextActive]}>{p}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.tipBox}>
            <Text style={styles.tipTitle}>💡 Helpful tips</Text>
            <Text style={styles.tipText}>• Mention building access or gate codes</Text>
            <Text style={styles.tipText}>• Note parking availability nearby</Text>
            <Text style={styles.tipText}>• Flag any pets or safety concerns</Text>
          </View>

          <PrimaryButton title="Review booking" icon="→" onPress={() => navigation.navigate('BookingSummary', { ...route.params, instructions, contactPreference })} style={{ marginTop: 28 }} />
          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { flex: 1, paddingHorizontal: SIZES.lg, paddingTop: 10 },
  label: { ...FONTS.bodySm, color: COLORS.text, fontWeight: '700', marginBottom: 8, marginTop: 18 },
  textarea: { backgroundColor: COLORS.background, borderRadius: SIZES.radius, paddingHorizontal: 16, paddingVertical: 14, ...FONTS.body, borderWidth: 1, borderColor: COLORS.border, height: 130, textAlignVertical: 'top' },
  optional: { ...FONTS.caption, color: COLORS.textLight, marginTop: 8 },
  prefRow: { flexDirection: 'row', gap: 10 },
  prefBtn: { flex: 1, paddingVertical: 14, borderRadius: SIZES.radius, backgroundColor: COLORS.background, alignItems: 'center', borderWidth: 1.5, borderColor: COLORS.border },
  prefText: { ...FONTS.caption, color: COLORS.text, marginTop: 6, fontWeight: '600' },
  prefTextActive: { color: COLORS.primary },
  prefActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight },
  tipBox: { backgroundColor: COLORS.amberLight, borderRadius: SIZES.radiusLg, padding: SIZES.lg, marginTop: 26 },
  tipTitle: { ...FONTS.bodySm, fontWeight: '700', color: '#92400E', marginBottom: 8 },
  tipText: { ...FONTS.caption, color: '#92400E', marginBottom: 4, lineHeight: 18 },
});
