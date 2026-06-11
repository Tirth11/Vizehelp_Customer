import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES, SHADOWS, GRADIENTS } from '../constants/theme';

/** Primary call-to-action with a gradient fill. */
export function PrimaryButton({ title, onPress, icon, disabled, gradient = 'primary', style }) {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      disabled={disabled}
      style={[styles.shadow, disabled && styles.disabled, style]}
    >
      <LinearGradient
        colors={GRADIENTS[gradient] || GRADIENTS.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.primary}
      >
        {icon ? <Text style={styles.icon}>{icon}</Text> : null}
        <Text style={styles.primaryText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

/** Secondary / outline style button. */
export function SecondaryButton({ title, onPress, icon, style }) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={[styles.secondary, style]}>
      {icon ? <Text style={styles.iconDark}>{icon}</Text> : null}
      <Text style={styles.secondaryText}>{title}</Text>
    </TouchableOpacity>
  );
}

/** Full-width sticky footer container that sits above the home indicator. */
export function FooterBar({ children, style }) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  shadow: { borderRadius: SIZES.radius, ...SHADOWS.primary },
  disabled: { opacity: 0.5 },
  primary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  primaryText: { ...FONTS.button },
  icon: { fontSize: 17, marginRight: 8 },
  iconDark: { fontSize: 16, marginRight: 8 },
  secondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
    paddingVertical: 15,
    paddingHorizontal: 24,
    backgroundColor: COLORS.primaryLight,
  },
  secondaryText: { ...FONTS.button, color: COLORS.primary },
  footer: {
    paddingHorizontal: SIZES.lg,
    paddingTop: 14,
    paddingBottom: Platform.OS === 'web' || Platform.OS === 'ios' ? 28 : 22,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});
