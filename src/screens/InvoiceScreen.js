import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, Platform } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';

export default function InvoiceScreen({ navigation, route }) {
  const { 
    service, 
    total = 27.40, 
    buddy = { name: 'Michael R.' }, 
    bookingId = 'VH482910',
    todayStr = new Date().toLocaleDateString('en', { day: 'numeric', month: 'short', year: 'numeric' })
  } = route.params || {};

  const invoiceNo = 'INV-' + Math.floor(100000 + Math.random() * 900000);
  const serviceFee = service?.price || 30;
  const tax = parseFloat((serviceFee * 0.08).toFixed(2));
  const platformFee = 5.00;
  const discount = 5.00;

  const handleDownload = () => {
    Alert.alert('Download Started', `PDF for Invoice ${invoiceNo} has been downloaded to your device.`);
  };

  const handleEmail = () => {
    Alert.alert('Email Sent', `Invoice ${invoiceNo} has been emailed to your registered address.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Invoice Details</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.invoiceCard}>
          {/* Header */}
          <View style={styles.invoiceHeader}>
            <View>
              <Text style={styles.brand}>VIZEHELP</Text>
              <Text style={styles.brandSub}>Task Buddies On Demand</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.invoiceTitle}>INVOICE</Text>
              <Text style={styles.invoiceNo}>{invoiceNo}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Details */}
          <View style={styles.metaGrid}>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Date</Text>
              <Text style={styles.metaValue}>{todayStr}</Text>
            </View>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Booking ID</Text>
              <Text style={styles.metaValue}>{bookingId}</Text>
            </View>
          </View>
          
          <View style={styles.metaGrid}>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Billed To</Text>
              <Text style={styles.metaValue}>John Doe</Text>
            </View>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Enterprise Provider</Text>
              <Text style={styles.metaValue}>Vizehelp NY Corp</Text>
            </View>
          </View>

          <View style={styles.metaGrid}>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Assigned Buddy</Text>
              <Text style={styles.metaValue}>{buddy.name}</Text>
            </View>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Payment Status</Text>
              <Text style={styles.paidPill}>PAID</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Items Table */}
          <Text style={styles.tableTitle}>Billing Breakdown</Text>
          
          <View style={styles.tableHeader}>
            <Text style={[styles.th, { flex: 2 }]}>Description</Text>
            <Text style={[styles.th, { textAlign: 'right', flex: 1 }]}>Total</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.td, { flex: 2 }]}>{service?.name || 'EV Buddy'} Service Fee</Text>
            <Text style={[styles.td, { textAlign: 'right', flex: 1 }]}>${serviceFee.toFixed(2)}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.td, { flex: 2 }]}>Platform Admin Fee</Text>
            <Text style={[styles.td, { textAlign: 'right', flex: 1 }]}>${platformFee.toFixed(2)}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.td, { flex: 2 }]}>State Tax (8%)</Text>
            <Text style={[styles.td, { textAlign: 'right', flex: 1 }]}>${tax.toFixed(2)}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.td, { flex: 2, color: COLORS.success }]}>Promo Discount Applied</Text>
            <Text style={[styles.td, { textAlign: 'right', flex: 1, color: COLORS.success }]}>-${discount.toFixed(2)}</Text>
          </View>

          <View style={styles.divider} />

          {/* Total */}
          <View style={styles.totalBlock}>
            <Text style={styles.totalText}>Total Paid Amount</Text>
            <Text style={styles.totalPrice}>${parseFloat(total).toFixed(2)}</Text>
          </View>

          <Text style={styles.paymentMethod}>Paid via Credit Card (ending 4242)</Text>
        </View>
      </ScrollView>

      {/* Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryBtn} onPress={handleDownload}>
          <Text style={styles.primaryBtnText}>Download Invoice PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={handleEmail}>
          <Text style={styles.secondaryBtnText}>Send to Email</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: SIZES.lg, paddingTop: Platform.OS === 'ios' ? 15 : 45, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  backBtn: { alignSelf: 'flex-start', height: 40, paddingHorizontal: 16, borderRadius: 20, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center', ...SHADOWS.small },
  back: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  title: { ...FONTS.h2, color: COLORS.text, marginTop: 12 },
  content: { flex: 1, padding: SIZES.lg },
  invoiceCard: { backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: SIZES.lg, borderWidth: 1, borderColor: COLORS.border, ...SHADOWS.medium, marginBottom: 20 },
  invoiceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brand: { fontSize: 20, fontWeight: '900', color: COLORS.primary, letterSpacing: 1 },
  brandSub: { fontSize: 9, fontWeight: '600', color: COLORS.textLight, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 2 },
  invoiceTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text, letterSpacing: 1 },
  invoiceNo: { fontSize: 11, fontWeight: '600', color: COLORS.textLight, marginTop: 2 },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 16 },
  metaGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  metaCol: { flex: 1 },
  metaLabel: { fontSize: 10, fontWeight: '700', color: COLORS.textLight, textTransform: 'uppercase', letterSpacing: 1 },
  metaValue: { fontSize: 13, color: COLORS.text, fontWeight: '700', marginTop: 3 },
  paidPill: { fontSize: 10, fontWeight: '800', color: COLORS.success, backgroundColor: COLORS.success + '15', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, overflow: 'hidden', alignSelf: 'flex-start', marginTop: 4, letterSpacing: 0.5 },
  tableTitle: { fontSize: 11, fontWeight: '700', color: COLORS.textLight, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 },
  tableHeader: { flexDirection: 'row', backgroundColor: COLORS.background, paddingVertical: 10, paddingHorizontal: 10, borderRadius: SIZES.radiusSm },
  th: { fontSize: 10, fontWeight: '700', color: COLORS.textLight, textTransform: 'uppercase', letterSpacing: 0.5 },
  tableRow: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.background, paddingHorizontal: 10 },
  td: { fontSize: 13, color: COLORS.text, fontWeight: '500' },
  totalBlock: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, backgroundColor: COLORS.primaryLight, borderRadius: SIZES.radius, paddingVertical: 14, paddingHorizontal: 16 },
  totalText: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  totalPrice: { fontSize: 22, fontWeight: '800', color: COLORS.primary, letterSpacing: -0.4 },
  paymentMethod: { fontSize: 11, color: COLORS.textLight, fontStyle: 'italic', textAlign: 'center', marginTop: 16 },
  footer: { padding: SIZES.lg, paddingBottom: Platform.OS === 'web' || Platform.OS === 'ios' ? 28 : SIZES.lg, borderTopWidth: 1, borderTopColor: COLORS.border, backgroundColor: COLORS.white },
  primaryBtn: { backgroundColor: COLORS.primary, borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginBottom: 10, ...SHADOWS.medium },
  primaryBtnText: { ...FONTS.button },
  secondaryBtn: { backgroundColor: COLORS.primaryLight, borderRadius: 14, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: COLORS.primary + '30' },
  secondaryBtnText: { ...FONTS.button, color: COLORS.primary },
});
