import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { SERVICE_CATEGORIES } from '../constants/services';

export default function ServiceListScreen({ navigation, route }) {
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
            <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
              <Text style={{ fontSize: 28 }}>{item.icon}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <Text style={styles.serviceMeta}>⭐ 4.8 • {item.duration}</Text>
              <Text style={styles.serviceAvail}>✓ Available in your area</Text>
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
  header: { padding: SIZES.lg, paddingTop: 50, backgroundColor: COLORS.white },
  back: { ...FONTS.body, color: COLORS.primary, marginBottom: 12 },
  title: { ...FONTS.h2, color: COLORS.text },
  subtitle: { ...FONTS.bodySm, color: COLORS.gray, marginTop: 4 },
  list: { padding: SIZES.lg },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: SIZES.md, marginBottom: 12 },
  iconBox: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  cardContent: { flex: 1, marginLeft: 14 },
  serviceName: { ...FONTS.body, fontWeight: '600', color: COLORS.text },
  serviceMeta: { ...FONTS.caption, color: COLORS.gray, marginTop: 4 },
  serviceAvail: { ...FONTS.caption, color: COLORS.success, marginTop: 2 },
  cardRight: { alignItems: 'flex-end' },
  price: { ...FONTS.bodySm, fontWeight: '600', color: COLORS.primary },
  arrow: { fontSize: 24, color: COLORS.gray, marginTop: 4 },
});
