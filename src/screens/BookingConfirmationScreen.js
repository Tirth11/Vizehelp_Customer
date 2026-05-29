import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES, SHADOWS, GRADIENTS } from '../constants/theme';
import { PrimaryButton, SecondaryButton } from '../components/Button';

export default function BookingConfirmationScreen({ navigation, route }) {
  const { service } = route.params || {};
  const bookingId = useRef(`#VH${Math.floor(100000 + Math.random() * 900000)}`).current;
  const [dots, setDots] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => navigation.navigate('BuddyAssigned', { ...route.params }), 5000);
    const anim = setInterval(() => setDots(d => (d.length >= 3 ? '' : d + '.')), 500);
    return () => { clearTimeout(timer); clearInterval(anim); };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <LinearGradient colors={GRADIENTS.success} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.checkCircle}>
          <Text style={{ fontSize: 50 }}>✓</Text>
        </LinearGradient>
        <Text style={styles.title}>Booking confirmed!</Text>
        <Text style={styles.subtitle}>Your request has been placed successfully.</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Booking ID</Text><Text style={styles.infoValue}>{bookingId}</Text></View>
          <View style={styles.divider} />
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Service</Text><Text style={styles.infoValue}>{service?.name || 'Service'}</Text></View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status</Text>
            <View style={styles.statusPill}><Text style={styles.statusText}>Finding a Buddy{dots}</Text></View>
          </View>
        </View>

        <View style={styles.searching}>
          <Text style={styles.searchingText}>🔎 Matching you with the best Buddy near you…</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <PrimaryButton title="Track booking" onPress={() => navigation.navigate('BuddyAssigned', { ...route.params })} />
        <SecondaryButton title="Back to home" onPress={() => navigation.navigate('MainTabs')} style={{ marginTop: 10 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: SIZES.lg },
  checkCircle: { width: 104, height: 104, borderRadius: 52, justifyContent: 'center', alignItems: 'center', marginBottom: 26, ...SHADOWS.medium },
  title: { ...FONTS.h1, color: COLORS.text, textAlign: 'center' },
  subtitle: { ...FONTS.body, color: COLORS.textLight, textAlign: 'center', marginTop: 8 },
  infoCard: { backgroundColor: COLORS.background, borderRadius: SIZES.radiusLg, padding: SIZES.lg, width: '100%', marginTop: 28 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  divider: { height: 1, backgroundColor: COLORS.border },
  infoLabel: { ...FONTS.bodySm, color: COLORS.textLight },
  infoValue: { ...FONTS.bodySm, color: COLORS.text, fontWeight: '700' },
  statusPill: { backgroundColor: COLORS.amberLight, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  statusText: { ...FONTS.caption, color: '#92400E', fontWeight: '700' },
  searching: { marginTop: 20 },
  searchingText: { ...FONTS.bodySm, color: COLORS.textLight, textAlign: 'center' },
  footer: { padding: SIZES.lg, paddingBottom: 28 },
});
