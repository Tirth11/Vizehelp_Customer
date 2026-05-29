import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES, SHADOWS, GRADIENTS } from '../constants/theme';
import { PrimaryButton } from '../components/Button';

export default function ServiceCompletionScreen({ navigation, route }) {
  const { service, total = 40 } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <LinearGradient colors={GRADIENTS.success} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.iconCircle}>
          <Text style={{ fontSize: 52 }}>🎊</Text>
        </LinearGradient>
        <Text style={styles.title}>Service completed!</Text>
        <Text style={styles.subtitle}>Your {service?.name || 'service'} was completed successfully.</Text>

        <View style={styles.summaryCard}>
          <View style={styles.row}><Text style={styles.rowLabel}>Service</Text><Text style={styles.rowValue}>{service?.name || 'Service'}</Text></View>
          <View style={styles.divider} />
          <View style={styles.row}><Text style={styles.rowLabel}>Duration</Text><Text style={styles.rowValue}>45 min</Text></View>
          <View style={styles.divider} />
          <View style={styles.row}><Text style={styles.rowLabel}>Amount paid</Text><Text style={styles.amount}>${total}.00</Text></View>
        </View>

        <View style={styles.ratePrompt}>
          <Text style={styles.ratePromptText}>⭐ Your feedback helps keep Buddies great. Mind sharing?</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <PrimaryButton title="Rate your experience" icon="⭐" onPress={() => navigation.navigate('Rating', { ...route.params })} />
        <TouchableOpacity style={styles.skipBtn} onPress={() => navigation.navigate('MainTabs')}>
          <Text style={styles.skipBtnText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: SIZES.lg },
  iconCircle: { width: 104, height: 104, borderRadius: 52, justifyContent: 'center', alignItems: 'center', marginBottom: 24, ...SHADOWS.medium },
  title: { ...FONTS.h1, color: COLORS.success, textAlign: 'center' },
  subtitle: { ...FONTS.body, color: COLORS.textLight, textAlign: 'center', marginTop: 8 },
  summaryCard: { backgroundColor: COLORS.background, borderRadius: SIZES.radiusLg, padding: SIZES.lg, width: '100%', marginTop: 28 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  divider: { height: 1, backgroundColor: COLORS.border },
  rowLabel: { ...FONTS.body, color: COLORS.textLight },
  rowValue: { ...FONTS.body, color: COLORS.text, fontWeight: '700' },
  amount: { ...FONTS.h3, color: COLORS.primary },
  ratePrompt: { backgroundColor: COLORS.amberLight, borderRadius: SIZES.radius, padding: 14, marginTop: 18 },
  ratePromptText: { ...FONTS.bodySm, color: '#92400E', fontWeight: '600', textAlign: 'center' },
  footer: { padding: SIZES.lg, paddingBottom: 28 },
  skipBtn: { paddingVertical: 14, alignItems: 'center', marginTop: 4 },
  skipBtnText: { ...FONTS.body, color: COLORS.textLight, fontWeight: '600' },
});
