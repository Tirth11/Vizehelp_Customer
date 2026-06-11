import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import { PrimaryButton } from '../components/Button';

const ENTERPRISE_OPTIONS = [
  { id: 'ent_001', name: 'Global Spa', logo: '💆', desc: 'Professional spa & wellness' },
  { id: 'ent_002', name: 'City Cleaning', logo: '🧹', desc: 'Expert cleaning services' },
  { id: 'ent_003', name: 'Smart Laundry', logo: '👕', desc: 'Premium laundry care' },
  { id: 'ent_004', name: 'Fresh Market', logo: '🛒', desc: 'Grocery & delivery' },
];

export default function EnterpriseSelectScreen({ navigation, route }) {
  const { phone, mode = 'new' } = route.params || {};
  const { userEnterprises, activeEnterpriseId, selectEnterprise, switchEnterprise, loading } = useAuth();
  const [selectedId, setSelectedId] = useState(activeEnterpriseId || null);

  const isNewUser = mode === 'new' || userEnterprises.length === 0;
  const availableEnterprises = isNewUser ? ENTERPRISE_OPTIONS : userEnterprises;

  const handleConfirm = async () => {
    if (!selectedId) {
      Alert.alert('Select Enterprise', 'Please choose an enterprise to continue.');
      return;
    }

    if (isNewUser) {
      const result = await selectEnterprise(selectedId);
      if (result.success) {
        navigation.navigate('ProfileSetup', { phone });
      }
    } else {
      // Existing user switching enterprises
      switchEnterprise(selectedId);
      navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
    }
  };

  const renderCard = (ent, isCurrent) => {
    const selected = selectedId === ent.id;
    return (
      <TouchableOpacity
        key={ent.id}
        style={[styles.card, selected && styles.cardSelected]}
        onPress={() => setSelectedId(ent.id)}
        activeOpacity={0.8}
      >
        <View style={[styles.logoWrap, selected && styles.logoWrapActive]}>
          <Text style={styles.logo}>{ent.logo}</Text>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.cardTitleRow}>
            <Text style={styles.cardName}>{ent.name}</Text>
            {isCurrent && <View style={styles.badgeCurrent}><Text style={styles.badgeText}>Current</Text></View>}
          </View>
          <Text style={styles.cardDesc}>{ent.desc}</Text>
        </View>
        {selected && <View style={styles.checkmark}><Text style={styles.checkmarkText}>✓</Text></View>}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Header */}
        <LinearGradient
          colors={['#4F46E5', '#7C3AED']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerGlow} />
          <View style={styles.headerContent}>
            {isNewUser && <Text style={styles.step}>Step 1 of 2</Text>}
            <Text style={styles.title}>
              {isNewUser ? 'Which service would you like?' : 'Switch enterprise'}
            </Text>
            <Text style={styles.subtitle}>
              {isNewUser
                ? 'Select your service provider to start booking'
                : 'Choose another enterprise to view its services'}
            </Text>
          </View>
        </LinearGradient>

        {/* Enterprise Cards */}
        <View style={styles.cardsContainer}>
          {availableEnterprises.map((ent) =>
            renderCard(ent, !isNewUser && ent.id === activeEnterpriseId)
          )}
        </View>

        {/* Info Box */}
        {isNewUser && (
          <View style={styles.infoBox}>
            <Text style={styles.infoIcon}>ℹ️</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.infoTitle}>New user?</Text>
              <Text style={styles.infoText}>You'll complete your profile in the next step.</Text>
            </View>
          </View>
        )}

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        {loading && <ActivityIndicator size="small" color={COLORS.primary} style={styles.spinner} />}
        <PrimaryButton
          title={loading ? 'Setting up...' : (isNewUser ? 'Continue' : 'Switch Enterprise')}
          disabled={!selectedId || loading}
          onPress={handleConfirm}
        />
        {!isNewUser && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelBtn}>
            <Text style={styles.cancelText}>← Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingBottom: 40 },
  header: { paddingTop: 28, paddingBottom: 40, paddingHorizontal: SIZES.lg, borderBottomLeftRadius: 28, borderBottomRightRadius: 28, overflow: 'hidden', position: 'relative' },
  headerGlow: { position: 'absolute', top: -40, right: -60, width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.15)' },
  headerContent: { position: 'relative', zIndex: 1 },
  step: { ...FONTS.caption, color: 'rgba(255,255,255,0.8)', fontWeight: '600', marginBottom: 6 },
  title: { ...FONTS.h2, color: COLORS.white, marginBottom: 8, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { ...FONTS.body, color: 'rgba(255,255,255,0.9)', lineHeight: 24 },
  cardsContainer: { paddingHorizontal: SIZES.lg, marginTop: 28, gap: 12 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 18, borderWidth: 2, borderColor: COLORS.border, paddingVertical: 18, paddingHorizontal: 14 },
  cardSelected: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight, borderWidth: 2.5 },
  logoWrap: { width: 60, height: 60, borderRadius: 16, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  logoWrapActive: { backgroundColor: COLORS.primary },
  logo: { fontSize: 28 },
  cardBody: { flex: 1 },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  cardName: { ...FONTS.bodySm, fontWeight: '700', color: COLORS.text },
  badgeCurrent: { backgroundColor: COLORS.successLight, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 },
  badgeText: { fontSize: 9, fontWeight: '700', color: COLORS.success },
  cardDesc: { ...FONTS.caption, color: COLORS.textLight },
  checkmark: { width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  checkmarkText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  infoBox: { marginHorizontal: SIZES.lg, marginTop: 24, backgroundColor: '#EEF2FF', borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  infoIcon: { fontSize: 20 },
  infoTitle: { ...FONTS.bodySm, fontWeight: '700', color: COLORS.primary, marginBottom: 2 },
  infoText: { ...FONTS.caption, color: COLORS.primary, lineHeight: 18 },
  footer: { paddingHorizontal: SIZES.lg, paddingVertical: 16, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.border },
  spinner: { marginBottom: 12 },
  cancelBtn: { marginTop: 12, alignItems: 'center', paddingVertical: 10 },
  cancelText: { ...FONTS.bodySm, color: COLORS.primary, fontWeight: '600' },
});
