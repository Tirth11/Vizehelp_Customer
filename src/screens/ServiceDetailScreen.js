import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { SERVICE_DETAILS } from '../constants/services';

export default function ServiceDetailScreen({ navigation, route }) {
  const { service } = route.params;
  const details = SERVICE_DETAILS[service.id] || SERVICE_DETAILS['1'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.back}>← Back</Text></TouchableOpacity>
        </View>

        <View style={[styles.heroIcon, { backgroundColor: service.color + '12' }]}>
          <Text style={{ fontSize: 56 }}>{service.icon}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{details.name}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaChip}><Text style={styles.meta}>⭐ 4.8</Text></View>
            <View style={styles.metaChip}><Text style={styles.meta}>⏱ {service.duration}</Text></View>
            <View style={styles.metaChip}><Text style={styles.meta}>💰 From ${service.price}</Text></View>
          </View>

          {service.badge && (
            <View style={[styles.availabilityBadge, { backgroundColor: service.badgeColor + '12' }]}>
              <Text style={[styles.availabilityText, { color: service.badgeColor }]}>● {service.badge}</Text>
            </View>
          )}

          <Text style={styles.description}>{details.description}</Text>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>What's Included</Text>
            {details.includes.map((item, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.checkIcon}>✓</Text>
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>What's Not Included</Text>
            {details.excludes.map((item, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.crossIcon}>✗</Text>
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={styles.policyCard}>
            <Text style={styles.sectionTitle}>Cancellation Policy</Text>
            <Text style={styles.policyText}>{details.cancellation}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerPrice}>From ${service.price}.00</Text>
          <Text style={styles.footerSub}>Estimated {service.duration}</Text>
        </View>
        <TouchableOpacity style={styles.bookBtn} onPress={() => navigation.navigate('ServiceInput', { service, details })}>
          <Text style={styles.bookBtnText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { padding: SIZES.lg, paddingTop: 50 },
  back: { ...FONTS.body, color: COLORS.primary },
  heroIcon: { alignSelf: 'center', width: 100, height: 100, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  content: { padding: SIZES.lg },
  title: { ...FONTS.h1, color: COLORS.text },
  metaRow: { flexDirection: 'row', gap: 8, marginTop: 12, marginBottom: 12 },
  metaChip: { backgroundColor: COLORS.background, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
  meta: { ...FONTS.caption, color: COLORS.textLight },
  availabilityBadge: { alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6, marginBottom: 16 },
  availabilityText: { ...FONTS.bodySm, fontWeight: '600' },
  description: { ...FONTS.body, color: COLORS.text, lineHeight: 24, marginBottom: 20 },
  sectionCard: { backgroundColor: COLORS.background, borderRadius: SIZES.radiusLg, padding: SIZES.lg, marginBottom: 12 },
  sectionTitle: { ...FONTS.h3, color: COLORS.text, marginBottom: 12 },
  listItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  checkIcon: { fontSize: 16, color: COLORS.success, marginRight: 10, fontWeight: '700' },
  crossIcon: { fontSize: 16, color: COLORS.error, marginRight: 10, fontWeight: '700' },
  listText: { ...FONTS.bodySm, color: COLORS.text, flex: 1 },
  policyCard: { backgroundColor: COLORS.warningLight, borderRadius: SIZES.radiusLg, padding: SIZES.lg },
  policyText: { ...FONTS.bodySm, color: COLORS.text, lineHeight: 22 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SIZES.lg, borderTopWidth: 1, borderTopColor: COLORS.border, backgroundColor: COLORS.white, ...SHADOWS.medium },
  footerPrice: { ...FONTS.h3, color: COLORS.text },
  footerSub: { ...FONTS.caption, color: COLORS.textLight },
  bookBtn: { backgroundColor: COLORS.primary, borderRadius: SIZES.radius, paddingHorizontal: 32, paddingVertical: 14 },
  bookBtnText: { ...FONTS.button, color: COLORS.white },
});
