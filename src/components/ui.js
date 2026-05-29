import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';

/** Section heading with an optional right-aligned action link. */
export function SectionTitle({ title, actionLabel, onAction, style }) {
  return (
    <View style={[styles.sectionRow, style]}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {actionLabel ? (
        <TouchableOpacity onPress={onAction} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.action}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

/** Small rounded status pill. Pass a base color; tint is derived from it. */
export function Badge({ label, color = COLORS.primary, solid = false, style }) {
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: solid ? color : color + '1A' },
        style,
      ]}
    >
      <Text style={[styles.badgeText, { color: solid ? COLORS.white : color }]}>{label}</Text>
    </View>
  );
}

/**
 * Numbered "How it works" explainer that helps new users understand the flow.
 * steps: [{ icon, title, desc }]
 */
export function HowItWorks({ steps, style }) {
  return (
    <View style={[styles.howCard, style]}>
      {steps.map((s, i) => (
        <View key={i} style={[styles.howRow, i === steps.length - 1 && { marginBottom: 0 }]}>
          <View style={styles.howIconCol}>
            <View style={styles.howIcon}>
              <Text style={styles.howIconText}>{s.icon}</Text>
            </View>
            {i < steps.length - 1 ? <View style={styles.howConnector} /> : null}
          </View>
          <View style={styles.howTextCol}>
            <Text style={styles.howStepNo}>STEP {i + 1}</Text>
            <Text style={styles.howTitle}>{s.title}</Text>
            <Text style={styles.howDesc}>{s.desc}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

/** Row of compact trust signals (verified, insured, rated, etc.). */
export function TrustRow({ items, style }) {
  return (
    <View style={[styles.trustRow, style]}>
      {items.map((it, i) => (
        <View key={i} style={styles.trustItem}>
          <Text style={styles.trustIcon}>{it.icon}</Text>
          <Text style={styles.trustLabel}>{it.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: SIZES.lg,
    marginTop: SIZES.lg,
    marginBottom: SIZES.sm,
  },
  sectionTitle: { ...FONTS.h3 },
  action: { ...FONTS.bodySm, color: COLORS.primary, fontWeight: '700' },

  badge: { borderRadius: 8, paddingHorizontal: 9, paddingVertical: 4, alignSelf: 'flex-start' },
  badgeText: { fontSize: 11, fontWeight: '700' },

  howCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
    ...SHADOWS.small,
  },
  howRow: { flexDirection: 'row', marginBottom: 18 },
  howIconCol: { alignItems: 'center', marginRight: 14 },
  howIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  howIconText: { fontSize: 20 },
  howConnector: { width: 2, flex: 1, backgroundColor: COLORS.border, marginTop: 4, minHeight: 18 },
  howTextCol: { flex: 1, paddingTop: 2 },
  howStepNo: { fontSize: 10, fontWeight: '800', color: COLORS.primary, letterSpacing: 1 },
  howTitle: { ...FONTS.body, fontWeight: '700', marginTop: 2 },
  howDesc: { ...FONTS.bodySm, color: COLORS.textLight, marginTop: 2, lineHeight: 20 },

  trustRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  trustItem: { alignItems: 'center', flex: 1 },
  trustIcon: { fontSize: 20, marginBottom: 4 },
  trustLabel: { fontSize: 11, fontWeight: '600', color: COLORS.textLight, textAlign: 'center' },
});
