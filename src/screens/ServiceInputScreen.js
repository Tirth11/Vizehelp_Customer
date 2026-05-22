import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';

export default function ServiceInputScreen({ navigation, route }) {
  const { service, details } = route.params;
  const [formData, setFormData] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});

  const updateField = (key, value) => setFormData({ ...formData, [key]: value });

  const renderField = (field) => {
    if (field.type === 'select') {
      return (
        <View key={field.key} style={styles.fieldGroup}>
          <Text style={styles.label}>{field.label}{field.required ? ' *' : ''}</Text>
          <View style={styles.optionsWrap}>
            {field.options.map(opt => (
              <TouchableOpacity key={opt} style={[styles.optionChip, selectedOptions[field.key] === opt && styles.optionActive]} onPress={() => setSelectedOptions({ ...selectedOptions, [field.key]: opt })}>
                <Text style={[styles.optionText, selectedOptions[field.key] === opt && styles.optionTextActive]}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }
    if (field.type === 'textarea') {
      return (
        <View key={field.key} style={styles.fieldGroup}>
          <Text style={styles.label}>{field.label}{field.required ? ' *' : ''}</Text>
          <TextInput style={[styles.input, styles.textarea]} placeholder={`Enter ${field.label.toLowerCase()}`} multiline numberOfLines={4} value={formData[field.key] || ''} onChangeText={v => updateField(field.key, v)} placeholderTextColor={COLORS.textDisabled} />
        </View>
      );
    }
    if (field.type === 'image') {
      return (
        <View key={field.key} style={styles.fieldGroup}>
          <Text style={styles.label}>{field.label}</Text>
          <TouchableOpacity style={styles.uploadBox}>
            <Text style={{ fontSize: 28 }}>📷</Text>
            <Text style={styles.uploadText}>Tap to upload photos</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View key={field.key} style={styles.fieldGroup}>
        <Text style={styles.label}>{field.label}{field.required ? ' *' : ''}</Text>
        <TextInput style={styles.input} placeholder={`Enter ${field.label.toLowerCase()}`} keyboardType={field.type === 'number' ? 'numeric' : field.type === 'phone' ? 'phone-pad' : 'default'} value={formData[field.key] || ''} onChangeText={v => updateField(field.key, v)} placeholderTextColor={COLORS.textDisabled} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.back}>← Back</Text></TouchableOpacity>
        <Text style={styles.title}>{service.name}</Text>
        <Text style={styles.subtitle}>Fill in the details for your service</Text>
      </View>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        {details.fields.map(renderField)}

        <Text style={styles.sectionLabel}>Urgency</Text>
        <View style={styles.urgencyRow}>
          {['Now', 'Scheduled'].map(opt => (
            <TouchableOpacity key={opt} style={[styles.urgencyBtn, selectedOptions.urgency === opt && styles.urgencyActive]} onPress={() => setSelectedOptions({ ...selectedOptions, urgency: opt })}>
              <Text style={{ fontSize: 20 }}>{opt === 'Now' ? '⚡' : '📅'}</Text>
              <Text style={[styles.urgencyText, selectedOptions.urgency === opt && styles.urgencyTextActive]}>{opt === 'Now' ? 'Book Now' : 'Schedule Later'}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('Address', { service, details, formData, selectedOptions })}>
          <Text style={styles.continueBtnText}>Continue</Text>
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { padding: SIZES.lg, paddingTop: 50, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  back: { ...FONTS.body, color: COLORS.primary, marginBottom: 12 },
  title: { ...FONTS.h2, color: COLORS.text },
  subtitle: { ...FONTS.bodySm, color: COLORS.textLight, marginTop: 4 },
  form: { flex: 1, padding: SIZES.lg },
  fieldGroup: { marginBottom: 20 },
  label: { ...FONTS.bodySm, color: COLORS.text, fontWeight: '600', marginBottom: 8 },
  input: { backgroundColor: COLORS.background, borderRadius: SIZES.radius, paddingHorizontal: 16, paddingVertical: 14, ...FONTS.body, borderWidth: 1, borderColor: COLORS.border },
  textarea: { height: 100, textAlignVertical: 'top' },
  optionsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionChip: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20, backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.border },
  optionActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  optionText: { ...FONTS.bodySm, color: COLORS.text },
  optionTextActive: { color: COLORS.white },
  uploadBox: { borderWidth: 1.5, borderColor: COLORS.border, borderStyle: 'dashed', borderRadius: SIZES.radius, padding: 24, alignItems: 'center' },
  uploadText: { ...FONTS.bodySm, color: COLORS.textLight, marginTop: 8 },
  sectionLabel: { ...FONTS.h3, color: COLORS.text, marginTop: 10, marginBottom: 12 },
  urgencyRow: { flexDirection: 'row', gap: 12 },
  urgencyBtn: { flex: 1, padding: 16, borderRadius: SIZES.radius, backgroundColor: COLORS.background, alignItems: 'center', borderWidth: 1.5, borderColor: COLORS.border },
  urgencyActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight },
  urgencyText: { ...FONTS.bodySm, color: COLORS.text, marginTop: 8 },
  urgencyTextActive: { color: COLORS.primary, fontWeight: '600' },
  continueBtn: { backgroundColor: COLORS.primary, borderRadius: SIZES.radius, paddingVertical: 16, alignItems: 'center', marginTop: 30 },
  continueBtnText: { ...FONTS.button, color: COLORS.white },
});
