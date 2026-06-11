import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import ScreenHeader from '../components/ScreenHeader';
import { getEnterpriseById, getEnterpriseServices } from '../constants/enterprises';
import { globalStore } from '../constants/state';

export default function ServiceListScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const enterprise = getEnterpriseById(globalStore.activeEnterpriseId);
  const catalog = getEnterpriseServices(globalStore.activeEnterpriseId);
  const list = query
    ? catalog.filter(s => s.name.toLowerCase().includes(query.toLowerCase()))
    : catalog;

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="All services"
        subtitle={enterprise ? `Offered by ${enterprise.name}` : 'Trusted help available near you'}
        onBack={() => navigation.goBack()}
      />

      <View style={styles.searchWrap}>
        <View style={styles.searchBox}>
          <Text style={{ fontSize: 15 }}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search services…"
            placeholderTextColor={COLORS.textLight}
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {list.map(item => (
          <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.85} onPress={() => navigation.navigate('ServiceDetail', { service: item })}>
            <View style={[styles.iconBox, { backgroundColor: item.color + '18' }]}>
              <Text style={{ fontSize: 28 }}>{item.icon}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <Text style={styles.serviceMeta}>⭐ 4.8 · {item.duration}</Text>
              <View style={[styles.availBadge, { backgroundColor: item.badgeColor + '18' }]}>
                <Text style={[styles.availText, { color: item.badgeColor }]}>{item.badge}</Text>
              </View>
            </View>
            <View style={styles.cardRight}>
              <Text style={styles.priceFrom}>from</Text>
              <Text style={styles.price}>${item.price}</Text>
              <View style={styles.arrowBtn}><Text style={styles.arrow}>›</Text></View>
            </View>
          </TouchableOpacity>
        ))}
        {list.length === 0 ? (
          <View style={styles.empty}>
            <Text style={{ fontSize: 36 }}>🔎</Text>
            <Text style={styles.emptyText}>No services found for “{query}”.</Text>
          </View>
        ) : null}
        <View style={{ height: 16 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  searchWrap: { backgroundColor: COLORS.white, paddingHorizontal: SIZES.lg, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.background, borderRadius: SIZES.radius, paddingHorizontal: 14, paddingVertical: 12, borderWidth: 1, borderColor: COLORS.border },
  searchInput: { flex: 1, marginLeft: 10, ...FONTS.body, color: COLORS.text },
  list: { padding: SIZES.lg },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: SIZES.md, marginBottom: 12, ...SHADOWS.small },
  iconBox: { width: 56, height: 56, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  cardContent: { flex: 1, marginLeft: 14 },
  serviceName: { ...FONTS.body, fontWeight: '700', color: COLORS.text },
  serviceMeta: { ...FONTS.caption, color: COLORS.textLight, marginTop: 4 },
  availBadge: { alignSelf: 'flex-start', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2, marginTop: 6 },
  availText: { fontSize: 11, fontWeight: '700' },
  cardRight: { alignItems: 'flex-end' },
  priceFrom: { ...FONTS.caption, color: COLORS.textLight },
  price: { ...FONTS.h3, color: COLORS.primary },
  arrowBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', marginTop: 6 },
  arrow: { fontSize: 20, color: COLORS.primary, marginTop: -2 },
  empty: { alignItems: 'center', paddingVertical: 40 },
  emptyText: { ...FONTS.bodySm, color: COLORS.textLight, marginTop: 10 },
});
