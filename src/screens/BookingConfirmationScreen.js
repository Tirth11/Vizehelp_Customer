import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

export default function BookingConfirmationScreen({ navigation, route }) {
  const { service } = route.params || {};

  useEffect(() => {
    const timer = setTimeout(() => navigation.navigate('BuddyAssigned', { ...route.params }), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <View style={styles.checkCircle}><Text style={{ fontSize: 48 }}>✅</Text></View>
        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>Your booking has been placed successfully</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Booking ID</Text>
          <Text style={styles.infoValue}>#VH{Math.floor(100000 + Math.random() * 900000)}</Text>
          <Text style={[styles.infoLabel, { marginTop: 12 }]}>Service</Text>
          <Text style={styles.infoValue}>{service?.name || 'Service'}</Text>
          <Text style={[styles.infoLabel, { marginTop: 12 }]}>Status</Text>
          <Text style={[styles.infoValue, { color: COLORS.accent }]}>Finding a Buddy...</Text>
        </View>
        <Text style={styles.note}>We're assigning the best Buddy near you. You'll be notified shortly.</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('BuddyAssigned', { ...route.params })}>
          <Text style={styles.primaryBtnText}>Track Booking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate('MainTabs')}>
          <Text style={styles.secondaryBtnText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: SIZES.lg },
  checkCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#D1FAE5', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  title: { ...FONTS.h1, color: COLORS.text, textAlign: 'center' },
  subtitle: { ...FONTS.body, color: COLORS.gray, textAlign: 'center', marginTop: 8 },
  infoCard: { backgroundColor: COLORS.background, borderRadius: SIZES.radius, padding: SIZES.lg, width: '100%', marginTop: 24 },
  infoLabel: { ...FONTS.caption, color: COLORS.gray },
  infoValue: { ...FONTS.body, color: COLORS.text, fontWeight: '600', marginTop: 2 },
  note: { ...FONTS.bodySm, color: COLORS.gray, textAlign: 'center', marginTop: 20 },
  footer: { padding: SIZES.lg },
  primaryBtn: { backgroundColor: COLORS.primary, borderRadius: SIZES.radius, paddingVertical: 16, alignItems: 'center', marginBottom: 10 },
  primaryBtnText: { ...FONTS.button, color: COLORS.white },
  secondaryBtn: { borderRadius: SIZES.radius, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  secondaryBtnText: { ...FONTS.button, color: COLORS.text },
});
