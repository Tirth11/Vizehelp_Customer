import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import ScreenHeader from '../components/ScreenHeader';
import StepProgress from '../components/StepProgress';
import { PrimaryButton } from '../components/Button';

export default function DateTimeScreen({ navigation, route }) {
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      day: i === 0 ? 'Today' : i === 1 ? 'Tom' : d.toLocaleDateString('en', { weekday: 'short' }),
      date: d.getDate(),
      month: d.toLocaleDateString('en', { month: 'short' }),
      full: d.toISOString(),
    };
  });

  const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'];

  return (
    <View style={styles.container}>
      <ScreenHeader title="Pick date & time" subtitle="When do you need the service?" onBack={() => navigation.goBack()} />
      <StepProgress current={3} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Select a date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateRow}>
          {dates.map((d, i) => {
            const active = selectedDate === i;
            return (
              <TouchableOpacity key={i} style={[styles.dateCard, active && styles.dateActive]} onPress={() => setSelectedDate(i)}>
                <Text style={[styles.dateDay, active && styles.dateTextActive]}>{d.day}</Text>
                <Text style={[styles.dateNum, active && styles.dateTextActive]}>{d.date}</Text>
                <Text style={[styles.dateMonth, active && styles.dateTextActive]}>{d.month}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.sectionTitle}>Available time slots</Text>
        <View style={styles.timeGrid}>
          {timeSlots.map(t => {
            const active = selectedTime === t;
            return (
              <TouchableOpacity key={t} style={[styles.timeSlot, active && styles.timeActive]} onPress={() => setSelectedTime(t)}>
                <Text style={[styles.timeText, active && styles.timeTextActive]}>{t}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedTime ? (
          <View style={styles.selectedBanner}>
            <Text style={styles.selectedText}>📅 {dates[selectedDate].day}, {dates[selectedDate].date} {dates[selectedDate].month} at {selectedTime}</Text>
          </View>
        ) : (
          <Text style={styles.hint}>Choose a time slot to continue.</Text>
        )}

        <PrimaryButton title="Continue" icon="→" disabled={!selectedTime} onPress={() => navigation.navigate('Instructions', { ...route.params, date: dates[selectedDate], time: selectedTime })} style={{ marginTop: 22 }} />
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { flex: 1, paddingHorizontal: SIZES.lg, paddingTop: 10 },
  sectionTitle: { ...FONTS.h3, color: COLORS.text, marginBottom: 12, marginTop: 14 },
  dateRow: { paddingBottom: 6, paddingRight: 8 },
  dateCard: { width: 68, paddingVertical: 14, borderRadius: SIZES.radius, backgroundColor: COLORS.background, alignItems: 'center', marginRight: 10, borderWidth: 1.5, borderColor: COLORS.border },
  dateActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  dateDay: { ...FONTS.caption, color: COLORS.textLight, fontWeight: '600' },
  dateNum: { fontSize: 20, fontWeight: '800', color: COLORS.text, marginVertical: 3 },
  dateMonth: { ...FONTS.caption, color: COLORS.textLight },
  dateTextActive: { color: COLORS.white },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  timeSlot: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: SIZES.radius, backgroundColor: COLORS.background, borderWidth: 1.5, borderColor: COLORS.border },
  timeActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  timeText: { ...FONTS.bodySm, color: COLORS.text, fontWeight: '600' },
  timeTextActive: { color: COLORS.white },
  selectedBanner: { backgroundColor: COLORS.successLight, borderRadius: SIZES.radius, padding: 14, marginTop: 22, alignItems: 'center' },
  selectedText: { ...FONTS.bodySm, color: COLORS.success, fontWeight: '700' },
  hint: { ...FONTS.caption, color: COLORS.textLight, textAlign: 'center', marginTop: 22 },
});
