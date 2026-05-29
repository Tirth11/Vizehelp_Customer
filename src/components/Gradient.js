import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { GRADIENTS } from '../constants/theme';

/**
 * Thin wrapper around expo-linear-gradient with named presets.
 * Usage: <Gradient preset="hero" style={...}>...</Gradient>
 */
export default function Gradient({
  preset = 'primary',
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  style,
  children,
  ...rest
}) {
  const palette = colors || GRADIENTS[preset] || GRADIENTS.primary;
  return (
    <LinearGradient colors={palette} start={start} end={end} style={style} {...rest}>
      {children}
    </LinearGradient>
  );
}
