import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

/**
 * Consistent white screen header with a circular back button, title,
 * optional subtitle and an optional right-side element.
 */
export default function ScreenHeader({ title, subtitle, onBack, right, style }) {
  return (
    <View style={[styles.header, style]}>
      <View style={styles.topRow}>
        {onBack ? (
          <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.backSpacer} />
        )}
        <View style={styles.titleWrap}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text> : null}
        </View>
        <View style={styles.rightWrap}>{right}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: SIZES.lg,
    paddingTop: 52,
    paddingBottom: 14,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  topRow: { flexDirection: 'row', alignItems: 'center' },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backIcon: { fontSize: 28, color: COLORS.text, marginTop: -4, fontWeight: '600' },
  backSpacer: { width: 0 },
  titleWrap: { flex: 1 },
  title: { ...FONTS.h2 },
  subtitle: { ...FONTS.caption, color: COLORS.textLight, marginTop: 2 },
  rightWrap: { marginLeft: 12 },
});
