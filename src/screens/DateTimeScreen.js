import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

export default function DateTimeScreen({ navigation, route }) {
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return { day: d.toLocaleDateString('en', { weekday: 'short' }), date: d.getDate(), month: d.toLocaleDateString('en', { month: 'short' }), full: d.toISOString() };
  });

  const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.back}>← Back</Text></TouchableOpacity>
        <Text style={styles.title}>Select Date & Time</Text>
        <Text style={styles.subtitle}>When do you need the service?</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Select Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateRow}>
          {dates.map((d, i) => (
            <TouchableOpacity key={i} style={[styles.dateCard, selectedDate === i && styles.dateActive]} onPress={() => setSelectedDate(i)}>
              <Text style={[styles.dateDay, selectedDate === i && styles.dateTextActive]}>{d.day}</Text>
              <Text style={[styles.dateNum, selectedDate === i && styles.dateTextActive]}>{d.date}</Text>
              <Text style={[styles.dateMonth, selectedDate === i && styles.dateTextActive]}>{d.month}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Select Time</Text>
        <View style={styles.timeGrid}>
          {timeSlots.map(t => (
            <TouchableOpacity key={t} style={[styles.timeSlot, selectedTime === t && styles.timeActive]} onPress={() => setSelectedTime(t)}>
              <Text style={[styles.timeText, selectedTime === t && styles.timeTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('Instructions', { ...route.params, date: dates[selectedDate], time: selectedTime })}>
          <Text style={styles.continueBtnText}>Continue</Text>
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { padding: SIZES.lg, paddingTop: 50, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray },
  back: { ...FONTS.body, color: COLORS.primary, marginBottom: 12 },
  title: { ...FONTS.h2, color: COLORS.text },
  subtitle: { ...FONTS.bodySm, color: COLORS.gray, marginTop: 4 },
  content: { flex: 1, padding: SIZES.lg },
  sectionTitle: { ...FONTS.h3, color: COLORS.text, marginBottom: 12, marginTop: 10 },
  dateRow: { marginBottom: 20 },
  dateCard: { width: 70, padding: 12, borderRadius: SIZES.radius, backgroundColor: COLORS.background, alignItems: 'center', marginRight: 10, borderWidth: 1, borderColor: COLORS.border },
  dateActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  dateDay: { ...FONTS.caption, color: COLORS.gray },
  dateNum: { ...FONTS.h2, color: COLORS.text, marginVertical: 4 },
  dateMonth: { ...FONTS.caption, color: COLORS.gray },
  dateTextActive: { color: COLORS.white },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  timeSlot: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: SIZES.radiusSm, backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.border },
  timeActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  timeText: { ...FONTS.bodySm, color: COLORS.text },
  timeTextActive: { color: COLORS.white, fontWeight: '600' },
  continueBtn: { backgroundColor: COLORS.primary, borderRadius: SIZES.radius, paddingVertical: 16, alignItems: 'center', marginTop: 30 },
  btnDisabled: { opacity: 0.5 },
  continueBtnText: { ...FONTS.button, color: COLORS.white },
});
