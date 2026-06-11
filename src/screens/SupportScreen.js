import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES, SHADOWS, GRADIENTS } from '../constants/theme';

const FAQS = [
  { q: 'How do I cancel a booking?', a: 'Open My Bookings, select the booking, and tap Cancel. Free cancellation applies before your scheduled time.' },
  { q: 'How are Buddies verified?', a: 'Every Buddy completes a background check and skill verification before they can accept jobs.' },
  { q: "What if my Buddy doesn't show up?", a: "You'll receive a full refund and priority rebooking with another nearby Buddy." },
  { q: 'How do refunds work?', a: 'Refunds are processed within 3–5 business days to your original payment method.' },
];

const ACTIONS = [
  { icon: '🚨', label: 'Raise an issue', tint: COLORS.error, screen: 'RaiseIssue' },
  { icon: '💬', label: 'Live chat', tint: COLORS.primary },
  { icon: '📞', label: 'Call us', tint: COLORS.success },
  { icon: '📧', label: 'Email', tint: COLORS.accent },
];

export default function SupportScreen({ navigation }) {
  const [open, setOpen] = useState(null);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Platform.OS === 'web' || Platform.OS === 'ios' ? 100 : 24 }}>
        <LinearGradient colors={GRADIENTS.hero} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
          <Text style={styles.title}>Help & support</Text>
          <Text style={styles.subtitle}>We're here for you 24/7. How can we help?</Text>
        </LinearGradient>

        <View style={styles.actionsGrid}>
          {ACTIONS.map((a, i) => (
            <TouchableOpacity key={i} style={styles.actionCard} activeOpacity={0.85} onPress={() => a.screen && navigation.navigate(a.screen, {})}>
              <View style={[styles.actionIcon, { backgroundColor: a.tint + '18' }]}><Text style={{ fontSize: 24 }}>{a.icon}</Text></View>
              <Text style={styles.actionLabel}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Frequently asked questions</Text>
        {FAQS.map((faq, i) => {
          const expanded = open === i;
          return (
            <TouchableOpacity key={i} style={styles.faqCard} activeOpacity={0.8} onPress={() => setOpen(expanded ? null : i)}>
              <View style={styles.faqHeader}>
                <Text style={styles.faqQ}>{faq.q}</Text>
                <Text style={styles.faqToggle}>{expanded ? '−' : '+'}</Text>
              </View>
              {expanded ? <Text style={styles.faqA}>{faq.a}</Text> : null}
            </TouchableOpacity>
          );
        })}

        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Still need help?</Text>
          <Text style={styles.contactText}>Our support team typically replies within a few minutes.</Text>
          <TouchableOpacity style={styles.contactBtn} activeOpacity={0.85}>
            <Text style={styles.contactBtnText}>💬  Start a live chat</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: SIZES.lg, paddingTop: 56, paddingBottom: 28, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  title: { ...FONTS.h1, color: COLORS.white },
  subtitle: { ...FONTS.bodySm, color: 'rgba(255,255,255,0.9)', marginTop: 6 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: SIZES.lg, paddingTop: SIZES.lg, gap: 12 },
  actionCard: { width: '47%', backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: SIZES.lg, alignItems: 'center', ...SHADOWS.small },
  actionIcon: { width: 52, height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  actionLabel: { ...FONTS.bodySm, color: COLORS.text, fontWeight: '700' },
  sectionTitle: { ...FONTS.h3, color: COLORS.text, marginHorizontal: SIZES.lg, marginTop: 24, marginBottom: 12 },
  faqCard: { backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: SIZES.lg, marginHorizontal: SIZES.lg, marginBottom: 10, ...SHADOWS.small },
  faqHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  faqQ: { ...FONTS.bodySm, fontWeight: '700', color: COLORS.text, flex: 1, paddingRight: 12 },
  faqToggle: { fontSize: 22, color: COLORS.primary, fontWeight: '700' },
  faqA: { ...FONTS.bodySm, color: COLORS.textLight, marginTop: 12, lineHeight: 21 },
  contactCard: { backgroundColor: COLORS.primaryLight, borderRadius: SIZES.radiusLg, padding: SIZES.lg, marginHorizontal: SIZES.lg, marginTop: 16, alignItems: 'center' },
  contactTitle: { ...FONTS.h3, color: COLORS.primaryDark },
  contactText: { ...FONTS.bodySm, color: COLORS.primaryDark, textAlign: 'center', marginTop: 6, opacity: 0.9 },
  contactBtn: { backgroundColor: COLORS.primary, borderRadius: SIZES.radius, paddingHorizontal: 24, paddingVertical: 13, marginTop: 16 },
  contactBtnText: { ...FONTS.bodySm, color: COLORS.white, fontWeight: '700' },
});
