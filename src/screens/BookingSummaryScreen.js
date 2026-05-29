import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import ScreenHeader from '../components/ScreenHeader';
import StepProgress from '../components/StepProgress';
import { PrimaryButton, FooterBar } from '../components/Button';

export default function BookingSummaryScreen({ navigation, route }) {
  const { service, address, date, time, instructions, addressType } = route.params || {};
  const serviceFee = service?.price || 35;
  const platformFee = 5;
  const total = serviceFee + platformFee;

  return (
    <View style={styles.container}>
      <ScreenHeader title="Review & confirm" subtitle="Check everything looks right" onBack={() => navigation.goBack()} />
      <StepProgress current={5} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.serviceCard}>
          <View style={[styles.iconCircle, { backgroundColor: (service?.color || COLORS.primary) + '18' }]}>
            <Text style={{ fontSize: 30 }}>{service?.icon || '🔧'}</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={styles.serviceName}>{service?.name || 'Service'}</Text>
            <Text style={styles.serviceMeta}>⏱ {service?.duration || '1-2 hrs'}</Text>
          </View>
        </View>

        <DetailRow icon="📍" label="Address" value={address?.flat ? `${address.flat}, ${address.street}${address.city ? ', ' + address.city : ''}` : '123 Main St, New York'} tag={addressType} onEdit={() => navigation.navigate('Address', route.params)} />
        <DetailRow icon="📅" label="Date & time" value={`${date ? `${date.day}, ${date.date} ${date.month}` : 'Today'} at ${time || '10:00 AM'}`} onEdit={() => navigation.navigate('DateTime', route.params)} />
        {instructions ? (
          <DetailRow icon="📝" label="Instructions" value={instructions} onEdit={() => navigation.navigate('Instructions', route.params)} />
        ) : null}

        <View style={styles.priceCard}>
          <Text style={styles.priceTitle}>Price breakdown</Text>
          <View style={styles.priceRow}><Text style={styles.priceLabel}>Service fee</Text><Text style={styles.priceValue}>${serviceFee}.00</Text></View>
          <View style={styles.priceRow}><Text style={styles.priceLabel}>Platform fee</Text><Text style={styles.priceValue}>${platformFee}.00</Text></View>
          <View style={[styles.priceRow, styles.totalRow]}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalValue}>${total}.00</Text></View>
        </View>

        <View style={styles.assurance}>
          <Text style={styles.assuranceText}>🛡️ Free cancellation before your scheduled time · Secure payment</Text>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <FooterBar style={{ padding: 0 }}>
        <View style={styles.footerInner}>
          <View>
            <Text style={styles.footerSub}>Total amount</Text>
            <Text style={styles.footerTotal}>${total}.00</Text>
          </View>
          <PrimaryButton title="Proceed to pay" icon="→" onPress={() => navigation.navigate('Payment', { ...route.params, total })} style={styles.footerBtn} />
        </View>
      </FooterBar>
    </View>
  );
}

function DetailRow({ icon, label, value, tag, onEdit }) {
  return (
    <View style={styles.detailCard}>
      <View style={styles.detailHeader}>
        <Text style={styles.detailLabel}>{icon}  {label}{tag ? <Text style={styles.tag}>  ·  {tag}</Text> : null}</Text>
        {onEdit ? <TouchableOpacity onPress={onEdit} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}><Text style={styles.edit}>Edit</Text></TouchableOpacity> : null}
      </View>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, paddingHorizontal: SIZES.lg, paddingTop: 12 },
  serviceCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: SIZES.md, ...SHADOWS.small },
  iconCircle: { width: 56, height: 56, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  serviceName: { ...FONTS.h3, color: COLORS.text },
  serviceMeta: { ...FONTS.bodySm, color: COLORS.textLight, marginTop: 2 },
  detailCard: { backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: SIZES.md, marginTop: 12, ...SHADOWS.small },
  detailHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  detailLabel: { ...FONTS.bodySm, fontWeight: '700', color: COLORS.text },
  tag: { ...FONTS.caption, color: COLORS.primary, fontWeight: '700' },
  edit: { ...FONTS.bodySm, color: COLORS.primary, fontWeight: '700' },
  detailValue: { ...FONTS.bodySm, color: COLORS.textLight, lineHeight: 20 },
  priceCard: { backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: SIZES.lg, marginTop: 12, ...SHADOWS.small },
  priceTitle: { ...FONTS.h3, color: COLORS.text, marginBottom: 14 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  priceLabel: { ...FONTS.body, color: COLORS.textLight },
  priceValue: { ...FONTS.body, color: COLORS.text, fontWeight: '600' },
  totalRow: { borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: 14, marginTop: 2, marginBottom: 0 },
  totalLabel: { ...FONTS.h3, color: COLORS.text },
  totalValue: { ...FONTS.h2, color: COLORS.primary },
  assurance: { backgroundColor: COLORS.successLight, borderRadius: SIZES.radius, padding: 14, marginTop: 12 },
  assuranceText: { ...FONTS.caption, color: COLORS.success, fontWeight: '600', lineHeight: 18 },
  footerInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SIZES.lg, paddingTop: 14, paddingBottom: 22 },
  footerSub: { ...FONTS.caption, color: COLORS.textLight },
  footerTotal: { ...FONTS.h2, color: COLORS.text },
  footerBtn: { flex: 0, minWidth: 180 },
});
