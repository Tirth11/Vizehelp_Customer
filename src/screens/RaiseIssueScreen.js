import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

export default function RaiseIssueScreen({ navigation, route }) {
  const [issueType, setIssueType] = useState(null);
  const [description, setDescription] = useState('');

  const issueTypes = ['Buddy didn\'t arrive', 'Poor service quality', 'Overcharged', 'Buddy was rude', 'Property damage', 'Other'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.back}>← Back</Text></TouchableOpacity>
        <Text style={styles.title}>Raise an Issue</Text>
        <Text style={styles.subtitle}>We're sorry you had a problem</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>What went wrong?</Text>
        <View style={styles.optionsWrap}>
          {issueTypes.map(t => (
            <TouchableOpacity key={t} style={[styles.optionChip, issueType === t && styles.optionActive]} onPress={() => setIssueType(t)}>
              <Text style={[styles.optionText, issueType === t && styles.optionTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Describe the issue</Text>
        <TextInput style={styles.textarea} placeholder="Please provide details about what happened..." multiline numberOfLines={6} value={description} onChangeText={setDescription} placeholderTextColor={COLORS.gray} />

        <TouchableOpacity style={styles.uploadBox}>
          <Text style={{ fontSize: 24 }}>📷</Text>
          <Text style={styles.uploadText}>Attach photos/screenshots (optional)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitBtn} onPress={() => { alert('Issue submitted successfully!'); navigation.goBack(); }}>
          <Text style={styles.submitBtnText}>Submit Issue</Text>
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
  label: { ...FONTS.bodySm, color: COLORS.text, fontWeight: '600', marginBottom: 10, marginTop: 20 },
  optionsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionChip: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20, backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.border },
  optionActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  optionText: { ...FONTS.bodySm, color: COLORS.text },
  optionTextActive: { color: COLORS.white },
  textarea: { backgroundColor: COLORS.background, borderRadius: SIZES.radiusSm, paddingHorizontal: 16, paddingVertical: 14, ...FONTS.body, borderWidth: 1, borderColor: COLORS.border, height: 120, textAlignVertical: 'top' },
  uploadBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: COLORS.border, borderStyle: 'dashed', borderRadius: SIZES.radius, padding: 16, marginTop: 20 },
  uploadText: { ...FONTS.bodySm, color: COLORS.gray, marginLeft: 10 },
  submitBtn: { backgroundColor: COLORS.primary, borderRadius: SIZES.radius, paddingVertical: 16, alignItems: 'center', marginTop: 30 },
  btnDisabled: { opacity: 0.5 },
  submitBtnText: { ...FONTS.button, color: COLORS.white },
});
