import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import ScreenHeader from '../components/ScreenHeader';
import StepProgress from '../components/StepProgress';
import { PrimaryButton, FooterBar } from '../components/Button';

export default function PaymentScreen({ navigation, route }) {
  const { total = 40 } = route.params || {};
  const [method, setMethod] = useState('card');
  const [promo, setPromo] = useState('');
  const [applied, setApplied] = useState(false);

  const methods = [
    { id: 'card', icon: '💳', label: 'Credit / Debit Card', sub: '•••• 4242' },
    { id: 'upi', icon: '📱', label: 'UPI / Digital Wallet', sub: 'Google Pay, Apple Pay' },
    { id: 'cash', icon: '💵', label: 'Cash on Service', sub: 'Pay after completion' },
  ];

  const discount = applied ? 5 : 0;
  const taxes = 2.1;
  const payable = (total + taxes - discount).toFixed(2);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Payment" subtitle="Choose how you'd like to pay" onBack={() => navigation.goBack()} />
      <StepProgress current={6} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {methods.map(m => {
          const active = method === m.id;
          return (
            <TouchableOpacity key={m.id} style={[styles.methodCard, active && styles.methodActive]} onPress={() => setMethod(m.id)} activeOpacity={0.85}>
              <View style={styles.methodIcon}><Text style={{ fontSize: 22 }}>{m.icon}</Text></View>
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={styles.methodLabel}>{m.label}</Text>
                <Text style={styles.methodSub}>{m.sub}</Text>
              </View>
              <View style={[styles.radio, active && styles.radioActive]}>{active && <View style={styles.radioDot} />}</View>
            </TouchableOpacity>
          );
        })}

        <View style={styles.promoRow}>
          <Text style={styles.promoIcon}>🏷️</Text>
          <TextInput style={styles.promoInput} placeholder="Have a promo code?" value={promo} onChangeText={setPromo} placeholderTextColor={COLORS.textDisabled} autoCapitalize="characters" />
          <TouchableOpacity style={[styles.applyBtn, applied && styles.appliedBtn]} onPress={() => setApplied(!!promo)}>
            <Text style={styles.applyText}>{applied ? 'Applied' : 'Apply'}</Text>
          </TouchableOpacity>
        </View>
        {applied ? <Text style={styles.promoSuccess}>✓ Promo applied — you saved $5.00</Text> : null}

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Price summary</Text>
          <View style={styles.row}><Text style={styles.rowLabel}>Service total</Text><Text style={styles.rowValue}>${total}.00</Text></View>
          <View style={styles.row}><Text style={styles.rowLabel}>Taxes</Text><Text style={styles.rowValue}>${taxes.toFixed(2)}</Text></View>
          <View style={styles.row}><Text style={styles.rowLabel}>Discount</Text><Text style={[styles.rowValue, { color: COLORS.success }]}>-${discount.toFixed(2)}</Text></View>
          <View style={[styles.row, styles.totalRow]}><Text style={styles.totalLabel}>Amount payable</Text><Text style={styles.totalValue}>${payable}</Text></View>
        </View>

        <View style={styles.secureNote}>
          <Text style={styles.secureText}>🔒 Payments are encrypted and 100% secure</Text>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <FooterBar>
        <PrimaryButton title={`Pay $${payable}`} icon="🔒" onPress={() => navigation.navigate('BookingConfirmation', { ...route.params })} />
      </FooterBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, paddingHorizontal: SIZES.lg, paddingTop: 12 },
  methodCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: SIZES.md, marginBottom: 10, borderWidth: 1.5, borderColor: COLORS.border, ...SHADOWS.small },
  methodActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight },
  methodIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  methodLabel: { ...FONTS.body, color: COLORS.text, fontWeight: '700' },
  methodSub: { ...FONTS.caption, color: COLORS.textLight, marginTop: 2 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: COLORS.border, justifyContent: 'center', alignItems: 'center' },
  radioActive: { borderColor: COLORS.primary },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.primary },
  promoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, backgroundColor: COLORS.white, borderRadius: SIZES.radius, borderWidth: 1, borderColor: COLORS.border, paddingLeft: 14, ...SHADOWS.small },
  promoIcon: { fontSize: 15, marginRight: 8 },
  promoInput: { flex: 1, paddingVertical: 14, ...FONTS.body, color: COLORS.text },
  applyBtn: { backgroundColor: COLORS.primary, borderTopRightRadius: SIZES.radius, borderBottomRightRadius: SIZES.radius, paddingHorizontal: 20, paddingVertical: 15 },
  appliedBtn: { backgroundColor: COLORS.success },
  applyText: { ...FONTS.bodySm, color: COLORS.white, fontWeight: '700' },
  promoSuccess: { ...FONTS.caption, color: COLORS.success, fontWeight: '600', marginTop: 8 },
  summaryCard: { backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: SIZES.lg, marginTop: 18, ...SHADOWS.small },
  summaryTitle: { ...FONTS.h3, color: COLORS.text, marginBottom: 14 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  rowLabel: { ...FONTS.body, color: COLORS.textLight },
  rowValue: { ...FONTS.body, color: COLORS.text, fontWeight: '600' },
  totalRow: { borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: 14, marginTop: 2, marginBottom: 0 },
  totalLabel: { ...FONTS.h3, color: COLORS.text },
  totalValue: { ...FONTS.h2, color: COLORS.primary },
  secureNote: { alignItems: 'center', marginTop: 16 },
  secureText: { ...FONTS.caption, color: COLORS.textLight, fontWeight: '600' },
});
