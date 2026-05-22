import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { SERVICE_CATEGORIES } from '../constants/services';

export default function ServiceListScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.back}>← Back</Text></TouchableOpacity>
        <Text style={styles.title}>Available Services</Text>
        <Text style={styles.subtitle}>Services near your location</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {SERVICE_CATEGORIES.map(item => (
          <TouchableOpacity key={item.id} style={styles.card} onPress={() => navigation.navigate('ServiceDetail', { service: item })}>
            <View style={[styles.iconBox, { backgroundColor: item.color + '12' }]}>
              <Text style={{ fontSize: 28 }}>{item.icon}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <Text style={styles.serviceMeta}>⭐ 4.8 • {item.duration}</Text>
              <View style={[styles.availBadge, { backgroundColor: item.badgeColor + '12' }]}>
                <Text style={[styles.availText, { color: item.badgeColor }]}>{item.badge}</Text>
              </View>
            </View>
            <View style={styles.cardRight}>
              <Text style={styles.price}>From ${item.price}</Text>
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: SIZES.lg, paddingTop: 50, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  back: { ...FONTS.body, color: COLORS.primary, marginBottom: 12 },
  title: { ...FONTS.h2, color: COLORS.text },
  subtitle: { ...FONTS.bodySm, color: COLORS.textLight, marginTop: 4 },
  list: { padding: SIZES.lg },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: SIZES.radiusLg, padding: SIZES.md, marginBottom: 12, ...SHADOWS.small },
  iconBox: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  cardContent: { flex: 1, marginLeft: 14 },
  serviceName: { ...FONTS.body, fontWeight: '600', color: COLORS.text },
  serviceMeta: { ...FONTS.caption, color: COLORS.textLight, marginTop: 4 },
  availBadge: { alignSelf: 'flex-start', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2, marginTop: 4 },
  availText: { fontSize: 11, fontWeight: '600' },
  cardRight: { alignItems: 'flex-end' },
  price: { ...FONTS.bodySm, fontWeight: '700', color: COLORS.primary },
  arrow: { fontSize: 24, color: COLORS.textLight, marginTop: 4 },
});
