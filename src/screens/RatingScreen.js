import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

export default function RatingScreen({ navigation, route }) {
  const { buddy = { name: 'Alex Johnson' } } = route.params || {};
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [tip, setTip] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Rate Your Experience</Text>
        <Text style={styles.subtitle}>How was your service with {buddy.name}?</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map(s => (
            <TouchableOpacity key={s} onPress={() => setRating(s)}>
              <Text style={styles.star}>{s <= rating ? '⭐' : '☆'}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.ratingLabel}>{rating === 5 ? 'Excellent!' : rating >= 4 ? 'Great!' : rating >= 3 ? 'Good' : rating >= 2 ? 'Fair' : rating === 1 ? 'Poor' : 'Tap to rate'}</Text>

        <TextInput style={styles.textarea} placeholder="Write a review (optional)" multiline numberOfLines={4} value={review} onChangeText={setReview} placeholderTextColor={COLORS.gray} />

        <Text style={styles.tipLabel}>Add a Tip?</Text>
        <View style={styles.tipRow}>
          {[2, 5, 10, 15].map(t => (
            <TouchableOpacity key={t} style={[styles.tipBtn, tip === t && styles.tipActive]} onPress={() => setTip(tip === t ? null : t)}>
              <Text style={[styles.tipText, tip === t && styles.tipTextActive]}>${t}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitBtn} onPress={() => navigation.navigate('MainTabs')}>
          <Text style={styles.submitBtnText}>Submit Rating</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { padding: SIZES.lg, paddingTop: 50, alignItems: 'center' },
  title: { ...FONTS.h2, color: COLORS.text },
  subtitle: { ...FONTS.bodySm, color: COLORS.gray, marginTop: 4 },
  content: { flex: 1, padding: SIZES.lg, alignItems: 'center' },
  starsRow: { flexDirection: 'row', gap: 12, marginTop: 20 },
  star: { fontSize: 40 },
  ratingLabel: { ...FONTS.body, color: COLORS.gray, marginTop: 12 },
  textarea: { backgroundColor: COLORS.background, borderRadius: SIZES.radiusSm, paddingHorizontal: 16, paddingVertical: 14, ...FONTS.body, borderWidth: 1, borderColor: COLORS.border, width: '100%', height: 100, textAlignVertical: 'top', marginTop: 24 },
  tipLabel: { ...FONTS.h3, color: COLORS.text, marginTop: 24, alignSelf: 'flex-start' },
  tipRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  tipBtn: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: SIZES.radiusSm, backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.border },
  tipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  tipText: { ...FONTS.body, color: COLORS.text, fontWeight: '600' },
  tipTextActive: { color: COLORS.white },
  footer: { padding: SIZES.lg },
  submitBtn: { backgroundColor: COLORS.primary, borderRadius: SIZES.radius, paddingVertical: 16, alignItems: 'center' },
  btnDisabled: { opacity: 0.5 },
  submitBtnText: { ...FONTS.button, color: COLORS.white },
});
