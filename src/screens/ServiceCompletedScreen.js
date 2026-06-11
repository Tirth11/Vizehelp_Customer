import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Platform } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';

export default function ServiceCompletedScreen({ navigation, route }) {
  const { service, total = 27.40, buddy = { name: 'Michael R.' }, bookingId = 'VH482910' } = route.params || {};

  const todayStr = new Date().toLocaleDateString('en', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  }) + ', ' + new Date().toLocaleTimeString('en', {
    hour: 'numeric',
    minute: '2-digit'
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.center}>
          <View style={styles.successBadge}>
            <Text style={{ fontSize: 48 }}>🎉</Text>
          </View>
          <Text style={styles.title}>Service Completed Successfully!</Text>
          <Text style={styles.subtitle}>Your Buddy has resolved the task and the job is closed.</Text>

          <View style={styles.detailsCard}>
            <View style={styles.row}>
              <Text style={styles.label}>Booking ID</Text>
              <Text style={styles.value}>{bookingId}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Service Name</Text>
              <Text style={styles.value}>{service?.name || 'EV Buddy'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Buddy Name</Text>
              <Text style={styles.value}>{buddy.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Completed At</Text>
              <Text style={styles.value}>{todayStr}</Text>
            </View>
            <View style={[styles.row, { borderBottomWidth: 0, paddingBottom: 0, marginBottom: 0 }]}>
              <Text style={styles.label}>Amount Paid</Text>
              <Text style={[styles.value, { color: COLORS.primary, fontWeight: '800' }]}>${parseFloat(total).toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryBtn} 
          onPress={() => navigation.navigate('Rating', { ...route.params, buddy })}
        >
          <Text style={styles.primaryBtnText}>Rate Buddy & Provide Feedback</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryBtn} 
          onPress={() => navigation.navigate('Invoice', { ...route.params, bookingId, total, todayStr })}
        >
          <Text style={styles.secondaryBtnText}>📄 Download Invoice</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.textBtn} 
          onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
        >
          <Text style={styles.textBtnText}>Go to Home Dashboard</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { flexGrow: 1, justifyContent: 'center' },
  center: { alignItems: 'center', paddingHorizontal: SIZES.lg, paddingVertical: 40 },
  successBadge: { width: 104, height: 104, borderRadius: 52, backgroundColor: COLORS.successLight, justifyContent: 'center', alignItems: 'center', marginBottom: SIZES.lg, borderWidth: 1, borderColor: COLORS.success + '15' },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.success, textAlign: 'center', lineHeight: 28, letterSpacing: -0.4 },
  subtitle: { ...FONTS.body, color: COLORS.textLight, textAlign: 'center', marginTop: 8 },
  detailsCard: { backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: SIZES.lg, width: '100%', marginTop: SIZES.lg, borderWidth: 1, borderColor: COLORS.border, ...SHADOWS.small },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 12, marginBottom: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  label: { ...FONTS.bodySm, color: COLORS.textLight, fontWeight: '500' },
  value: { ...FONTS.bodySm, color: COLORS.text, fontWeight: '700' },
  footer: { padding: SIZES.lg, paddingBottom: Platform.OS === 'web' || Platform.OS === 'ios' ? 28 : SIZES.lg, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.border },
  primaryBtn: { backgroundColor: COLORS.primary, borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginBottom: 10, ...SHADOWS.medium },
  primaryBtnText: { ...FONTS.button },
  secondaryBtn: { backgroundColor: COLORS.white, borderRadius: 14, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border, marginBottom: 10, ...SHADOWS.small },
  secondaryBtnText: { fontSize: 14, color: COLORS.text, fontWeight: '600' },
  textBtn: { paddingVertical: 10, alignItems: 'center' },
  textBtnText: { fontSize: 13, color: COLORS.primary, fontWeight: '700' },
});
