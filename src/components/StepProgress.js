import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

/** Ordered labels for the end-to-end booking flow. */
export const BOOKING_STEPS = ['Details', 'Address', 'Schedule', 'Notes', 'Review', 'Pay'];

/**
 * Compact segmented progress bar that tells the user exactly where they
 * are in the multi-step booking flow ("Step 2 of 6 · Address").
 */
export default function StepProgress({ current, total = BOOKING_STEPS.length, label }) {
  const stepLabel = label || BOOKING_STEPS[current - 1];
  return (
    <View style={styles.wrap}>
      <View style={styles.segments}>
        {Array.from({ length: total }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.segment,
              i < current ? styles.segmentDone : styles.segmentTodo,
              i === 0 && { marginLeft: 0 },
            ]}
          />
        ))}
      </View>
      <Text style={styles.label}>
        Step {current} of {total}
        {stepLabel ? <Text style={styles.labelStep}>{`  ·  ${stepLabel}`}</Text> : null}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: SIZES.lg, paddingTop: 12, paddingBottom: 14, backgroundColor: COLORS.white },
  segments: { flexDirection: 'row' },
  segment: { flex: 1, height: 6, borderRadius: 3, marginLeft: 5 },
  segmentDone: { backgroundColor: COLORS.primary },
  segmentTodo: { backgroundColor: COLORS.lightGray },
  label: { ...FONTS.caption, color: COLORS.textLight, marginTop: 8, fontWeight: '600' },
  labelStep: { color: COLORS.primary, fontWeight: '700' },
});
