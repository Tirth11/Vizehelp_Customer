import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import ScreenHeader from '../components/ScreenHeader';
import { PrimaryButton, FooterBar } from '../components/Button';

const ISSUE_TYPES = ["Buddy didn't arrive", 'Poor service quality', 'Overcharged', 'Buddy was rude', 'Property damage', 'Other'];

export default function RaiseIssueScreen({ navigation }) {
  const [issueType, setIssueType] = useState(null);
  const [description, setDescription] = useState('');

  const submit = () => {
    Alert.alert('Issue submitted', "Thanks for letting us know. Our team will reach out within 24 hours.", [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Raise an issue" subtitle="We're sorry something went wrong" onBack={() => navigation.goBack()} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <Text style={styles.label}>What went wrong?</Text>
          <View style={styles.optionsWrap}>
            {ISSUE_TYPES.map(t => {
              const active = issueType === t;
              return (
                <TouchableOpacity key={t} style={[styles.optionChip, active && styles.optionActive]} onPress={() => setIssueType(t)}>
                  <Text style={[styles.optionText, active && styles.optionTextActive]}>{t}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.label}>Describe the issue</Text>
          <TextInput style={styles.textarea} placeholder="Please share details about what happened…" multiline numberOfLines={6} value={description} onChangeText={setDescription} placeholderTextColor={COLORS.textDisabled} />

          <TouchableOpacity style={styles.uploadBox} activeOpacity={0.8}>
            <Text style={{ fontSize: 24 }}>📷</Text>
            <Text style={styles.uploadText}>Attach photos or screenshots (optional)</Text>
          </TouchableOpacity>

          <View style={styles.reassure}>
            <Text style={styles.reassureText}>🤝 Our team reviews every report and responds within 24 hours.</Text>
          </View>
          <View style={{ height: 30 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      <FooterBar>
        <PrimaryButton title="Submit issue" disabled={!issueType} onPress={submit} />
      </FooterBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { flex: 1, paddingHorizontal: SIZES.lg, paddingTop: 12 },
  label: { ...FONTS.bodySm, color: COLORS.text, fontWeight: '700', marginBottom: 12, marginTop: 16 },
  optionsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionChip: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 22, backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.border },
  optionActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  optionText: { ...FONTS.bodySm, color: COLORS.text, fontWeight: '600' },
  optionTextActive: { color: COLORS.white },
  textarea: { backgroundColor: COLORS.background, borderRadius: SIZES.radius, paddingHorizontal: 16, paddingVertical: 14, ...FONTS.body, borderWidth: 1, borderColor: COLORS.border, height: 130, textAlignVertical: 'top' },
  uploadBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: COLORS.border, borderStyle: 'dashed', borderRadius: SIZES.radius, padding: 16, marginTop: 18 },
  uploadText: { ...FONTS.bodySm, color: COLORS.textLight, marginLeft: 12, fontWeight: '600' },
  reassure: { backgroundColor: COLORS.primarySoft, borderRadius: SIZES.radius, padding: 14, marginTop: 18 },
  reassureText: { ...FONTS.caption, color: COLORS.primaryDark, fontWeight: '600', lineHeight: 18 },
});
