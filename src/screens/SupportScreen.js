import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';

export default function SupportScreen({ navigation }) {
  const faqs = [
    { q: 'How do I cancel a booking?', a: 'Go to My Bookings, select the booking, and tap Cancel.' },
    { q: 'How are Buddies verified?', a: 'All Buddies undergo background checks and skill verification.' },
    { q: 'What if my Buddy doesn\'t show up?', a: 'You\'ll get a full refund and priority rebooking.' },
    { q: 'How do refunds work?', a: 'Refunds are processed within 3-5 business days to your original payment method.' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Help & Support</Text>
          <Text style={styles.subtitle}>How can we help you?</Text>
        </View>

        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('RaiseIssue', {})}>
            <View style={[styles.actionIcon, { backgroundColor: COLORS.errorLight }]}><Text style={{ fontSize: 24 }}>🚨</Text></View>
            <Text style={styles.actionLabel}>Raise Issue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: COLORS.primaryLight }]}><Text style={{ fontSize: 24 }}>💬</Text></View>
            <Text style={styles.actionLabel}>Live Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: COLORS.successLight }]}><Text style={{ fontSize: 24 }}>📞</Text></View>
            <Text style={styles.actionLabel}>Call Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: COLORS.warningLight }]}><Text style={{ fontSize: 24 }}>📧</Text></View>
            <Text style={styles.actionLabel}>Email</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {faqs.map((faq, i) => (
          <View key={i} style={styles.faqCard}>
            <Text style={styles.faqQ}>{faq.q}</Text>
            <Text style={styles.faqA}>{faq.a}</Text>
          </View>
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: SIZES.lg, paddingTop: 50, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  title: { ...FONTS.h2, color: COLORS.text },
  subtitle: { ...FONTS.bodySm, color: COLORS.textLight, marginTop: 4 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: SIZES.lg, gap: 10 },
  actionCard: { width: '47%', backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: SIZES.lg, alignItems: 'center', ...SHADOWS.small },
  actionIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  actionLabel: { ...FONTS.bodySm, color: COLORS.text, fontWeight: '600' },
  sectionTitle: { ...FONTS.h3, color: COLORS.text, marginHorizontal: SIZES.lg, marginTop: 10, marginBottom: 12 },
  faqCard: { backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: SIZES.lg, marginHorizontal: SIZES.lg, marginBottom: 10, ...SHADOWS.small },
  faqQ: { ...FONTS.bodySm, fontWeight: '600', color: COLORS.text },
  faqA: { ...FONTS.bodySm, color: COLORS.textLight, marginTop: 8, lineHeight: 20 },
});
