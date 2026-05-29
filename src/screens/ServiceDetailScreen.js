import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES, SHADOWS, GRADIENTS } from '../constants/theme';
import { SERVICE_DETAILS } from '../constants/services';
import { PrimaryButton, FooterBar } from '../components/Button';
import { HowItWorks } from '../components/ui';

const FLOW = [
  { icon: '📝', title: 'Tell us what you need', desc: 'Share a few details so we match the right Buddy.' },
  { icon: '🧑‍🔧', title: 'A verified Buddy is assigned', desc: 'Background-checked and rated by customers like you.' },
  { icon: '✅', title: 'Job done & rated', desc: 'Track live, pay securely, then rate your experience.' },
];

export default function ServiceDetailScreen({ navigation, route }) {
  const { service } = route.params;
  const details = SERVICE_DETAILS[service.id] || SERVICE_DETAILS['1'];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Gradient hero */}
        <LinearGradient colors={GRADIENTS.hero} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
          <View style={styles.heroGlow} />
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <View style={styles.heroIcon}><Text style={{ fontSize: 48 }}>{service.icon}</Text></View>
          <Text style={styles.heroTitle}>{details.name}</Text>
          {service.badge ? (
            <View style={styles.availabilityBadge}>
              <Text style={styles.availabilityText}>● {service.badge}</Text>
            </View>
          ) : null}
        </LinearGradient>

        {/* Quick meta cards */}
        <View style={styles.metaRow}>
          <View style={styles.metaCard}><Text style={styles.metaValue}>⭐ 4.8</Text><Text style={styles.metaLabel}>Rating</Text></View>
          <View style={styles.metaCard}><Text style={styles.metaValue}>⏱ {service.duration}</Text><Text style={styles.metaLabel}>Duration</Text></View>
          <View style={styles.metaCard}><Text style={styles.metaValue}>${service.price}</Text><Text style={styles.metaLabel}>Starting at</Text></View>
        </View>

        <View style={styles.content}>
          <Text style={styles.description}>{details.description}</Text>

          {/* How it works */}
          <Text style={styles.sectionHeading}>How it works</Text>
          <HowItWorks steps={FLOW} />

          {/* Included */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>✅ What's included</Text>
            {details.includes.map((item, i) => (
              <View key={i} style={styles.listItem}>
                <View style={styles.checkDot}><Text style={styles.checkIcon}>✓</Text></View>
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Excluded */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>🚫 Not included</Text>
            {details.excludes.map((item, i) => (
              <View key={i} style={styles.listItem}>
                <View style={styles.crossDot}><Text style={styles.crossIcon}>✕</Text></View>
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Cancellation */}
          <View style={styles.policyCard}>
            <Text style={styles.policyTitle}>🛡️ Cancellation policy</Text>
            <Text style={styles.policyText}>{details.cancellation}</Text>
          </View>
        </View>
      </ScrollView>

      <FooterBar style={styles.footer}>
        <View style={styles.footerInner}>
          <View>
            <Text style={styles.footerSub}>Starting at</Text>
            <Text style={styles.footerPrice}>${service.price}.00</Text>
          </View>
          <PrimaryButton title="Book Now" icon="→" onPress={() => navigation.navigate('ServiceInput', { service, details })} style={styles.footerBtn} />
        </View>
      </FooterBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  hero: { paddingTop: 52, paddingBottom: 56, alignItems: 'center', borderBottomLeftRadius: 28, borderBottomRightRadius: 28, overflow: 'hidden' },
  heroGlow: { position: 'absolute', top: -40, left: -30, width: 180, height: 180, borderRadius: 90, backgroundColor: 'rgba(255,255,255,0.1)' },
  backBtn: { position: 'absolute', top: 50, left: SIZES.lg, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', zIndex: 2 },
  backIcon: { fontSize: 28, color: COLORS.white, marginTop: -4, fontWeight: '700' },
  heroIcon: { width: 92, height: 92, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.18)', justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  heroTitle: { ...FONTS.h1, color: COLORS.white, marginTop: 14, textAlign: 'center', paddingHorizontal: SIZES.lg },
  availabilityBadge: { backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6, marginTop: 12 },
  availabilityText: { ...FONTS.bodySm, color: COLORS.white, fontWeight: '700' },
  metaRow: { flexDirection: 'row', marginHorizontal: SIZES.lg, marginTop: -28, gap: 10 },
  metaCard: { flex: 1, backgroundColor: COLORS.white, borderRadius: SIZES.radius, paddingVertical: 14, alignItems: 'center', ...SHADOWS.medium },
  metaValue: { ...FONTS.bodySm, fontWeight: '800', color: COLORS.text },
  metaLabel: { ...FONTS.caption, color: COLORS.textLight, marginTop: 3 },
  content: { padding: SIZES.lg },
  description: { ...FONTS.body, color: COLORS.text, lineHeight: 24 },
  sectionHeading: { ...FONTS.h3, color: COLORS.text, marginTop: 22, marginBottom: 12 },
  sectionCard: { backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: SIZES.lg, marginTop: 12, ...SHADOWS.small },
  sectionTitle: { ...FONTS.h3, color: COLORS.text, marginBottom: 14 },
  listItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  checkDot: { width: 22, height: 22, borderRadius: 11, backgroundColor: COLORS.successLight, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  checkIcon: { fontSize: 12, color: COLORS.success, fontWeight: '800' },
  crossDot: { width: 22, height: 22, borderRadius: 11, backgroundColor: COLORS.errorLight, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  crossIcon: { fontSize: 11, color: COLORS.error, fontWeight: '800' },
  listText: { ...FONTS.bodySm, color: COLORS.text, flex: 1, lineHeight: 20 },
  policyCard: { backgroundColor: COLORS.warningLight, borderRadius: SIZES.radiusLg, padding: SIZES.lg, marginTop: 12 },
  policyTitle: { ...FONTS.h3, color: '#9A3412', marginBottom: 8 },
  policyText: { ...FONTS.bodySm, color: '#9A3412', lineHeight: 22 },
  footer: { padding: 0 },
  footerInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SIZES.lg, paddingTop: 14, paddingBottom: 22 },
  footerSub: { ...FONTS.caption, color: COLORS.textLight },
  footerPrice: { ...FONTS.h2, color: COLORS.text },
  footerBtn: { flex: 0, paddingHorizontal: 8, minWidth: 168 },
});
