import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';

export default function ServiceCompletionScreen({ navigation, route }) {
  const { service, total = 40 } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <View style={styles.iconCircle}><Text style={{ fontSize: 56 }}>🎊</Text></View>
        <Text style={styles.title}>Service Completed!</Text>
        <Text style={styles.subtitle}>Your {service?.name || 'service'} has been completed successfully</Text>

        <View style={styles.summaryCard}>
          <View style={styles.row}><Text style={styles.rowLabel}>Service</Text><Text style={styles.rowValue}>{service?.name || 'Service'}</Text></View>
          <View style={styles.row}><Text style={styles.rowLabel}>Duration</Text><Text style={styles.rowValue}>45 min</Text></View>
          <View style={[styles.row, { borderBottomWidth: 0, marginBottom: 0 }]}><Text style={styles.rowLabel}>Amount Paid</Text><Text style={[styles.rowValue, { color: COLORS.primary, fontWeight: '700' }]}>${total}.00</Text></View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.rateBtn} onPress={() => navigation.navigate('Rating', { ...route.params })}>
          <Text style={styles.rateBtnText}>Rate Your Experience</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipBtn} onPress={() => navigation.navigate('MainTabs')}>
          <Text style={styles.skipBtnText}>Skip for Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: SIZES.lg },
  iconCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: COLORS.successLight, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  title: { ...FONTS.h1, color: COLORS.success },
  subtitle: { ...FONTS.body, color: COLORS.textLight, textAlign: 'center', marginTop: 8 },
  summaryCard: { backgroundColor: COLORS.background, borderRadius: SIZES.radiusLg, padding: SIZES.lg, width: '100%', marginTop: 24, ...SHADOWS.small },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 12, marginBottom: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  rowLabel: { ...FONTS.body, color: COLORS.textLight },
  rowValue: { ...FONTS.body, color: COLORS.text, fontWeight: '600' },
  footer: { padding: SIZES.lg },
  rateBtn: { backgroundColor: COLORS.primary, borderRadius: SIZES.radius, paddingVertical: 16, alignItems: 'center', marginBottom: 10 },
  rateBtnText: { ...FONTS.button, color: COLORS.white },
  skipBtn: { paddingVertical: 14, alignItems: 'center' },
  skipBtnText: { ...FONTS.body, color: COLORS.textLight },
});
