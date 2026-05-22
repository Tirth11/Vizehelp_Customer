import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

export default function InstructionsScreen({ navigation, route }) {
  const [instructions, setInstructions] = useState('');
  const [contactPreference, setContactPreference] = useState('Call');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.back}>← Back</Text></TouchableOpacity>
        <Text style={styles.title}>Special Instructions</Text>
        <Text style={styles.subtitle}>Any additional info for your Buddy?</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Instructions for Buddy</Text>
        <TextInput style={styles.textarea} placeholder="e.g. Ring doorbell twice, gate code is 1234..." multiline numberOfLines={6} value={instructions} onChangeText={setInstructions} placeholderTextColor={COLORS.gray} />

        <Text style={styles.label}>Contact Preference</Text>
        <View style={styles.prefRow}>
          {['Call', 'Text', 'In-App Chat'].map(p => (
            <TouchableOpacity key={p} style={[styles.prefBtn, contactPreference === p && styles.prefActive]} onPress={() => setContactPreference(p)}>
              <Text style={[styles.prefText, contactPreference === p && styles.prefTextActive]}>{p === 'Call' ? '📞' : p === 'Text' ? '💬' : '📱'} {p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>💡 Tips</Text>
          <Text style={styles.tipText}>• Include access instructions if needed</Text>
          <Text style={styles.tipText}>• Mention parking availability</Text>
          <Text style={styles.tipText}>• Note any pets or safety concerns</Text>
        </View>

        <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('BookingSummary', { ...route.params, instructions, contactPreference })}>
          <Text style={styles.continueBtnText}>Review Booking</Text>
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
  content: { flex: 1, padding: SIZES.lg },
  label: { ...FONTS.bodySm, color: COLORS.text, fontWeight: '600', marginBottom: 8, marginTop: 20 },
  textarea: { backgroundColor: COLORS.background, borderRadius: SIZES.radiusSm, paddingHorizontal: 16, paddingVertical: 14, ...FONTS.body, borderWidth: 1, borderColor: COLORS.border, height: 140, textAlignVertical: 'top' },
  prefRow: { flexDirection: 'row', gap: 10 },
  prefBtn: { flex: 1, padding: 12, borderRadius: SIZES.radiusSm, backgroundColor: COLORS.background, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  prefActive: { borderColor: COLORS.primary, backgroundColor: '#EBF4FF' },
  prefText: { ...FONTS.bodySm, color: COLORS.text },
  prefTextActive: { color: COLORS.primary, fontWeight: '600' },
  tipBox: { backgroundColor: '#FFF8E1', borderRadius: SIZES.radius, padding: SIZES.lg, marginTop: 24 },
  tipTitle: { ...FONTS.bodySm, fontWeight: '600', color: COLORS.text, marginBottom: 8 },
  tipText: { ...FONTS.caption, color: COLORS.gray, marginBottom: 4 },
  continueBtn: { backgroundColor: COLORS.primary, borderRadius: SIZES.radius, paddingVertical: 16, alignItems: 'center', marginTop: 30 },
  continueBtnText: { ...FONTS.button, color: COLORS.white },
});
