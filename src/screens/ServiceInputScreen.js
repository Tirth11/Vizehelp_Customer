import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import ScreenHeader from '../components/ScreenHeader';
import StepProgress from '../components/StepProgress';
import { PrimaryButton } from '../components/Button';

export default function ServiceInputScreen({ navigation, route }) {
  const { service, details } = route.params;
  const [formData, setFormData] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});

  const updateField = (key, value) => setFormData({ ...formData, [key]: value });

  const renderField = (field) => {
    if (field.type === 'select') {
      return (
        <View key={field.key} style={styles.fieldGroup}>
          <Text style={styles.label}>{field.label}{field.required ? <Text style={styles.req}> *</Text> : null}</Text>
          <View style={styles.optionsWrap}>
            {field.options.map(opt => {
              const active = selectedOptions[field.key] === opt;
              return (
                <TouchableOpacity key={opt} style={[styles.optionChip, active && styles.optionActive]} onPress={() => setSelectedOptions({ ...selectedOptions, [field.key]: opt })}>
                  <Text style={[styles.optionText, active && styles.optionTextActive]}>{opt}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      );
    }
    if (field.type === 'textarea') {
      return (
        <View key={field.key} style={styles.fieldGroup}>
          <Text style={styles.label}>{field.label}{field.required ? <Text style={styles.req}> *</Text> : null}</Text>
          <TextInput style={[styles.input, styles.textarea]} placeholder={`Enter ${field.label.toLowerCase()}`} multiline numberOfLines={4} value={formData[field.key] || ''} onChangeText={v => updateField(field.key, v)} placeholderTextColor={COLORS.textDisabled} />
        </View>
      );
    }
    if (field.type === 'image') {
      return (
        <View key={field.key} style={styles.fieldGroup}>
          <Text style={styles.label}>{field.label}</Text>
          <TouchableOpacity style={styles.uploadBox} activeOpacity={0.8}>
            <Text style={{ fontSize: 28 }}>📷</Text>
            <Text style={styles.uploadText}>Tap to add photos</Text>
            <Text style={styles.uploadHint}>Helps your Buddy prepare better</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View key={field.key} style={styles.fieldGroup}>
        <Text style={styles.label}>{field.label}{field.required ? <Text style={styles.req}> *</Text> : null}</Text>
        <TextInput style={styles.input} placeholder={`Enter ${field.label.toLowerCase()}`} keyboardType={field.type === 'number' ? 'numeric' : field.type === 'phone' ? 'phone-pad' : 'default'} value={formData[field.key] || ''} onChangeText={v => updateField(field.key, v)} placeholderTextColor={COLORS.textDisabled} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title={service.name} subtitle="Tell us about your request" onBack={() => navigation.goBack()} />
      <StepProgress current={1} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView style={styles.form} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.infoBanner}>
            <Text style={styles.infoIcon}>💡</Text>
            <Text style={styles.infoText}>The more detail you share, the better your Buddy can help.</Text>
          </View>

          {details.fields.map(renderField)}

          <Text style={styles.sectionLabel}>When do you need this?</Text>
          <View style={styles.urgencyRow}>
            {['Now', 'Scheduled'].map(opt => {
              const active = selectedOptions.urgency === opt;
              return (
                <TouchableOpacity key={opt} style={[styles.urgencyBtn, active && styles.urgencyActive]} onPress={() => setSelectedOptions({ ...selectedOptions, urgency: opt })}>
                  <Text style={{ fontSize: 22 }}>{opt === 'Now' ? '⚡' : '📅'}</Text>
                  <Text style={[styles.urgencyText, active && styles.urgencyTextActive]}>{opt === 'Now' ? 'As soon as possible' : 'Schedule for later'}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{ height: 20 }} />
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton title="Continue" icon="→" onPress={() => navigation.navigate('Address', { service, details, formData, selectedOptions })} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  form: { flex: 1, paddingHorizontal: SIZES.lg, paddingTop: 6 },
  infoBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primarySoft, borderRadius: SIZES.radius, padding: 14, marginTop: 12, marginBottom: 6 },
  infoIcon: { fontSize: 16, marginRight: 10 },
  infoText: { ...FONTS.caption, color: COLORS.primaryDark, flex: 1, lineHeight: 18, fontWeight: '600' },
  fieldGroup: { marginTop: 18 },
  label: { ...FONTS.bodySm, color: COLORS.text, fontWeight: '700', marginBottom: 8 },
  req: { color: COLORS.error },
  input: { backgroundColor: COLORS.background, borderRadius: SIZES.radius, paddingHorizontal: 16, paddingVertical: 14, ...FONTS.body, borderWidth: 1, borderColor: COLORS.border },
  textarea: { height: 100, textAlignVertical: 'top' },
  optionsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionChip: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 22, backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.border },
  optionActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  optionText: { ...FONTS.bodySm, color: COLORS.text, fontWeight: '600' },
  optionTextActive: { color: COLORS.white },
  uploadBox: { borderWidth: 1.5, borderColor: COLORS.border, borderStyle: 'dashed', borderRadius: SIZES.radius, padding: 24, alignItems: 'center' },
  uploadText: { ...FONTS.bodySm, color: COLORS.text, marginTop: 8, fontWeight: '600' },
  uploadHint: { ...FONTS.caption, color: COLORS.textLight, marginTop: 2 },
  sectionLabel: { ...FONTS.h3, color: COLORS.text, marginTop: 26, marginBottom: 12 },
  urgencyRow: { flexDirection: 'row', gap: 12 },
  urgencyBtn: { flex: 1, padding: 16, borderRadius: SIZES.radius, backgroundColor: COLORS.background, alignItems: 'center', borderWidth: 1.5, borderColor: COLORS.border },
  urgencyActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight },
  urgencyText: { ...FONTS.caption, color: COLORS.text, marginTop: 8, textAlign: 'center', fontWeight: '600' },
  urgencyTextActive: { color: COLORS.primary },
  footer: { padding: SIZES.lg, paddingBottom: Platform.OS === 'web' || Platform.OS === 'ios' ? 28 : SIZES.lg, borderTopWidth: 1, borderTopColor: COLORS.border, backgroundColor: COLORS.white, ...SHADOWS.medium },
});
