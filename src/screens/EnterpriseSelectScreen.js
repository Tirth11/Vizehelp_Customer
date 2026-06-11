import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { ENTERPRISES, getEnterpriseById } from '../constants/enterprises';
import { globalStore } from '../constants/state';

// Modes:
//  'onboarding' — new user just verified OTP; must pick an enterprise before profile setup
//  'select'     — returning multi-enterprise user; pick which enterprise to enter
//  'switch'     — logged-in user switching from Profile/Home; can also join a new enterprise
export default function EnterpriseSelectScreen({ navigation, route }) {
  const { mode = 'switch', phone, pendingUser, lastUsedId } = route.params || {};
  const [selectedId, setSelectedId] = useState(
    mode === 'switch' ? globalStore.activeEnterpriseId : (lastUsedId || null)
  );

  const userEntIds = mode === 'onboarding' ? [] : globalStore.userEnterpriseIds;
  const myEnterprises = ENTERPRISES.filter(e => userEntIds.includes(e.id));
  const otherEnterprises = ENTERPRISES.filter(e => !userEntIds.includes(e.id));

  const heading = {
    onboarding: 'Choose your enterprise',
    select: 'Welcome back!',
    switch: 'Switch enterprise',
  }[mode];

  const subheading = {
    onboarding: 'Select the enterprise you want to book services with. You can join more later.',
    select: 'Your account is linked to multiple enterprises. Pick one to continue.',
    switch: 'Services shown in the app come from your active enterprise.',
  }[mode];

  const handleConfirm = () => {
    if (!selectedId) {
      Alert.alert('Select an Enterprise', 'Please choose an enterprise to continue.');
      return;
    }

    if (mode === 'onboarding') {
      globalStore.setUserEnterprises([selectedId]);
      globalStore.setActiveEnterprise(selectedId);
      navigation.navigate('ProfileSetup', { phone });
      return;
    }

    if (mode === 'select') {
      // Returning multi-enterprise user: commit the session only on confirm.
      if (pendingUser) globalStore.setUser(pendingUser);
      globalStore.setActiveEnterprise(selectedId);
      navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
      return;
    }

    // switch mode
    if (selectedId === globalStore.activeEnterpriseId) {
      navigation.goBack();
      return;
    }
    globalStore.addUserEnterprise(selectedId);
    globalStore.setActiveEnterprise(selectedId);
    const ent = getEnterpriseById(selectedId);
    // Reset to MainTabs so Home remounts with the new enterprise's catalog and
    // any in-progress booking draft screens are discarded.
    navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
    setTimeout(() => {
      Alert.alert('Enterprise Switched', `You are now browsing services from ${ent?.name}.`);
    }, 350);
  };

  const renderCard = (ent, { isCurrent, isLastUsed }) => {
    const selected = selectedId === ent.id;
    return (
      <TouchableOpacity
        key={ent.id}
        style={[styles.card, selected && styles.cardSelected, selected && { borderColor: ent.color }]}
        onPress={() => setSelectedId(ent.id)}
        activeOpacity={0.8}
      >
        <View style={[styles.logoWrap, { backgroundColor: ent.color + '15' }]}>
          <Text style={styles.logoEmoji}>{ent.logo}</Text>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.cardTitleRow}>
            <Text style={styles.cardName} numberOfLines={1}>{ent.name}</Text>
            {isCurrent && <View style={styles.currentBadge}><Text style={styles.currentBadgeText}>Current</Text></View>}
            {!isCurrent && isLastUsed && <View style={styles.lastBadge}><Text style={styles.lastBadgeText}>Last used</Text></View>}
          </View>
          <Text style={styles.cardTagline} numberOfLines={1}>{ent.tagline}</Text>
          <View style={styles.cardMetaRow}>
            <Text style={styles.cardMeta}>📍 {ent.location}</Text>
            <Text style={styles.cardMetaDot}>•</Text>
            <Text style={styles.cardMeta}>{ent.serviceIds.length} services</Text>
          </View>
        </View>
        <View style={[styles.radio, selected && { borderColor: ent.color }]}>
          {selected && <View style={[styles.radioDot, { backgroundColor: ent.color }]} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        {mode !== 'select' && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
        )}
        {mode === 'onboarding' && (
          <View style={styles.stepPill}><Text style={styles.stepPillText}>Step 1 of 2</Text></View>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerIcon}><Text style={{ fontSize: 30 }}>🏢</Text></View>
        <Text style={styles.title}>{heading}</Text>
        <Text style={styles.subtitle}>{subheading}</Text>

        {myEnterprises.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>Your enterprises</Text>
            {myEnterprises.map(ent => renderCard(ent, {
              isCurrent: mode === 'switch' && ent.id === globalStore.activeEnterpriseId,
              isLastUsed: ent.id === lastUsedId,
            }))}
          </>
        )}

        {otherEnterprises.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>
              {mode === 'onboarding' ? 'Available enterprises' : 'Discover more'}
            </Text>
            {otherEnterprises.map(ent => renderCard(ent, { isCurrent: false, isLastUsed: false }))}
          </>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.confirmBtn, !selectedId && styles.confirmBtnDisabled]}
          onPress={handleConfirm}
          disabled={!selectedId}
        >
          <Text style={styles.confirmText}>
            {mode === 'onboarding' ? 'Continue' : mode === 'select' ? 'Enter Enterprise' : 'Switch Enterprise'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SIZES.lg, paddingTop: 50, minHeight: 60 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  backText: { fontSize: 18, color: COLORS.text },
  stepPill: { backgroundColor: COLORS.primaryLight, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 6 },
  stepPillText: { fontSize: 11, fontWeight: '700', color: COLORS.primary },
  scrollContent: { paddingHorizontal: SIZES.lg, paddingTop: 12 },
  headerIcon: { width: 64, height: 64, borderRadius: 20, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.text, letterSpacing: -0.5 },
  subtitle: { ...FONTS.bodySm, color: COLORS.textLight, marginTop: 8, lineHeight: 21, marginBottom: 8 },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: COLORS.textLight, textTransform: 'uppercase', letterSpacing: 1, marginTop: 24, marginBottom: 10 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: SIZES.md, marginBottom: 10, borderWidth: 1.5, borderColor: COLORS.border, ...SHADOWS.small },
  cardSelected: { ...SHADOWS.medium, backgroundColor: COLORS.white },
  logoWrap: { width: 52, height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  logoEmoji: { fontSize: 26 },
  cardBody: { flex: 1, marginLeft: 12, marginRight: 8 },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cardName: { fontSize: 15, fontWeight: '700', color: COLORS.text, flexShrink: 1 },
  currentBadge: { backgroundColor: COLORS.successLight, borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2 },
  currentBadgeText: { fontSize: 9, fontWeight: '700', color: COLORS.success },
  lastBadge: { backgroundColor: COLORS.primaryLight, borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2 },
  lastBadgeText: { fontSize: 9, fontWeight: '700', color: COLORS.primary },
  cardTagline: { fontSize: 12, color: COLORS.textLight, marginTop: 3 },
  cardMetaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  cardMeta: { fontSize: 11, color: COLORS.textLight, fontWeight: '500' },
  cardMetaDot: { fontSize: 11, color: COLORS.textDisabled, marginHorizontal: 6 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: COLORS.border, justifyContent: 'center', alignItems: 'center' },
  radioDot: { width: 11, height: 11, borderRadius: 6 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: SIZES.lg, paddingBottom: 28, backgroundColor: COLORS.background, borderTopWidth: 1, borderTopColor: COLORS.border },
  confirmBtn: { backgroundColor: COLORS.primary, borderRadius: SIZES.radiusLg, paddingVertical: 16, alignItems: 'center', ...SHADOWS.medium },
  confirmBtnDisabled: { backgroundColor: COLORS.textDisabled },
  confirmText: { ...FONTS.button, color: COLORS.white },
});
