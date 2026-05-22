import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

export default function BookingSummaryScreen({ navigation, route }) {
  const { service, address, date, time, instructions } = route.params || {};
  const serviceFee = service?.price || 35;
  const platformFee = 5;
  const total = serviceFee + platformFee;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.back}>← Back</Text></TouchableOpacity>
        <Text style={styles.title}>Booking Summary</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.serviceRow}>
            <View style={[styles.iconCircle, { backgroundColor: (service?.color || COLORS.primary) + '20' }]}>
              <Text style={{ fontSize: 28 }}>{service?.icon || '🔧'}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.serviceName}>{service?.name || 'Service'}</Text>
              <Text style={styles.serviceMeta}>{service?.duration || '1-2 hrs'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📍 Address</Text>
          <Text style={styles.cardValue}>{address?.flat ? `${address.flat}, ${address.street}` : '123 Main St, New York'}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📅 Date & Time</Text>
          <Text style={styles.cardValue}>{date ? `${date.day}, ${date.date} ${date.month}` : 'Today'} at {time || '10:00 AM'}</Text>
        </View>

        {instructions ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📝 Instructions</Text>
            <Text style={styles.cardValue}>{instructions}</Text>
          </View>
        ) : null}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>💰 Price Breakdown</Text>
          <View style={styles.priceRow}><Text style={styles.priceLabel}>Service Fee</Text><Text style={styles.priceValue}>${serviceFee}.00</Text></View>
          <View style={styles.priceRow}><Text style={styles.priceLabel}>Platform Fee</Text><Text style={styles.priceValue}>${platformFee}.00</Text></View>
          <View style={[styles.priceRow, styles.totalRow]}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalValue}>${total}.00</Text></View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerTotal}>${total}.00</Text>
          <Text style={styles.footerSub}>Total Amount</Text>
        </View>
        <TouchableOpacity style={styles.payBtn} onPress={() => navigation.navigate('Payment', { ...route.params, total })}>
          <Text style={styles.payBtnText}>Proceed to Pay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: SIZES.lg, paddingTop: 50, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray },
  back: { ...FONTS.body, color: COLORS.primary, marginBottom: 12 },
  title: { ...FONTS.h2, color: COLORS.text },
  content: { flex: 1, padding: SIZES.lg },
  card: { backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: SIZES.lg, marginBottom: 12 },
  serviceRow: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center' },
  serviceName: { ...FONTS.h3, color: COLORS.text },
  serviceMeta: { ...FONTS.bodySm, color: COLORS.gray, marginTop: 2 },
  cardTitle: { ...FONTS.bodySm, fontWeight: '600', color: COLORS.text, marginBottom: 8 },
  cardValue: { ...FONTS.body, color: COLORS.gray },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  priceLabel: { ...FONTS.body, color: COLORS.gray },
  priceValue: { ...FONTS.body, color: COLORS.text },
  totalRow: { borderTopWidth: 1, borderTopColor: COLORS.lightGray, paddingTop: 10, marginTop: 4 },
  totalLabel: { ...FONTS.h3, color: COLORS.text },
  totalValue: { ...FONTS.h3, color: COLORS.primary },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SIZES.lg, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.lightGray },
  footerTotal: { ...FONTS.h3, color: COLORS.text },
  footerSub: { ...FONTS.caption, color: COLORS.gray },
  payBtn: { backgroundColor: COLORS.primary, borderRadius: SIZES.radius, paddingHorizontal: 28, paddingVertical: 14 },
  payBtnText: { ...FONTS.button, color: COLORS.white },
});
