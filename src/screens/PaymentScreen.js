import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

export default function PaymentScreen({ navigation, route }) {
  const { total = 40 } = route.params || {};
  const [method, setMethod] = useState('card');
  const [promo, setPromo] = useState('');

  const methods = [
    { id: 'card', icon: '💳', label: 'Credit/Debit Card', sub: '**** 4242' },
    { id: 'upi', icon: '📱', label: 'UPI / Digital Wallet', sub: 'Google Pay, Apple Pay' },
    { id: 'cash', icon: '💵', label: 'Cash on Service', sub: 'Pay after completion' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.back}>← Back</Text></TouchableOpacity>
        <Text style={styles.title}>Payment</Text>
        <Text style={styles.subtitle}>Choose your payment method</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {methods.map(m => (
          <TouchableOpacity key={m.id} style={[styles.methodCard, method === m.id && styles.methodActive]} onPress={() => setMethod(m.id)}>
            <Text style={{ fontSize: 24 }}>{m.icon}</Text>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.methodLabel}>{m.label}</Text>
              <Text style={styles.methodSub}>{m.sub}</Text>
            </View>
            <View style={[styles.radio, method === m.id && styles.radioActive]}>{method === m.id && <View style={styles.radioDot} />}</View>
          </TouchableOpacity>
        ))}

        <View style={styles.promoRow}>
          <TextInput style={styles.promoInput} placeholder="Promo code" value={promo} onChangeText={setPromo} placeholderTextColor={COLORS.gray} />
          <TouchableOpacity style={styles.applyBtn}><Text style={styles.applyText}>Apply</Text></TouchableOpacity>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.row}><Text style={styles.rowLabel}>Subtotal</Text><Text style={styles.rowValue}>${total}.00</Text></View>
          <View style={styles.row}><Text style={styles.rowLabel}>Discount</Text><Text style={[styles.rowValue, { color: COLORS.success }]}>-$0.00</Text></View>
          <View style={[styles.row, styles.totalRow]}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalValue}>${total}.00</Text></View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.payBtn} onPress={() => navigation.navigate('BookingConfirmation', { ...route.params })}>
          <Text style={styles.payBtnText}>Pay ${total}.00</Text>
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
  subtitle: { ...FONTS.bodySm, color: COLORS.gray, marginTop: 4 },
  content: { flex: 1, padding: SIZES.lg },
  methodCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: SIZES.lg, marginBottom: 10, borderWidth: 1.5, borderColor: COLORS.border },
  methodActive: { borderColor: COLORS.primary, backgroundColor: '#EBF4FF' },
  methodLabel: { ...FONTS.body, color: COLORS.text, fontWeight: '600' },
  methodSub: { ...FONTS.caption, color: COLORS.gray, marginTop: 2 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: COLORS.border, justifyContent: 'center', alignItems: 'center' },
  radioActive: { borderColor: COLORS.primary },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.primary },
  promoRow: { flexDirection: 'row', marginTop: 16, gap: 10 },
  promoInput: { flex: 1, backgroundColor: COLORS.white, borderRadius: SIZES.radiusSm, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1, borderColor: COLORS.border, ...FONTS.body },
  applyBtn: { backgroundColor: COLORS.primary, borderRadius: SIZES.radiusSm, paddingHorizontal: 20, justifyContent: 'center' },
  applyText: { ...FONTS.bodySm, color: COLORS.white, fontWeight: '600' },
  summaryCard: { backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: SIZES.lg, marginTop: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  rowLabel: { ...FONTS.body, color: COLORS.gray },
  rowValue: { ...FONTS.body, color: COLORS.text },
  totalRow: { borderTopWidth: 1, borderTopColor: COLORS.lightGray, paddingTop: 10, marginTop: 4 },
  totalLabel: { ...FONTS.h3, color: COLORS.text },
  totalValue: { ...FONTS.h3, color: COLORS.primary },
  footer: { padding: SIZES.lg, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.lightGray },
  payBtn: { backgroundColor: COLORS.primary, borderRadius: SIZES.radius, paddingVertical: 16, alignItems: 'center' },
  payBtnText: { ...FONTS.button, color: COLORS.white },
});
