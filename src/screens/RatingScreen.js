import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { PrimaryButton } from '../components/Button';

const QUICK_TAGS = ['On time', 'Professional', 'Friendly', 'Great quality', 'Went the extra mile'];

export default function RatingScreen({ navigation, route }) {
  const { buddy = { name: 'Alex Johnson' } } = route.params || {};
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [tip, setTip] = useState(null);
  const [tags, setTags] = useState([]);

  const toggleTag = (t) => setTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  const label = rating === 5 ? 'Excellent! 🤩' : rating === 4 ? 'Great! 😄' : rating === 3 ? 'Good 🙂' : rating === 2 ? 'Fair 😐' : rating === 1 ? 'Poor 😕' : 'Tap a star to rate';

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 24 }}>
          <View style={styles.header}>
            <View style={styles.avatar}><Text style={{ fontSize: 34 }}>👤</Text></View>
            <Text style={styles.title}>Rate your experience</Text>
            <Text style={styles.subtitle}>How was your service with {buddy.name}?</Text>
          </View>

          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map(s => (
              <TouchableOpacity key={s} onPress={() => setRating(s)} activeOpacity={0.7}>
                <Text style={[styles.star, s <= rating && styles.starActive]}>{s <= rating ? '★' : '☆'}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.ratingLabel}>{label}</Text>

          {rating > 0 ? (
            <View style={styles.tagsWrap}>
              {QUICK_TAGS.map(t => {
                const active = tags.includes(t);
                return (
                  <TouchableOpacity key={t} style={[styles.tag, active && styles.tagActive]} onPress={() => toggleTag(t)}>
                    <Text style={[styles.tagText, active && styles.tagTextActive]}>{t}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}

          <View style={styles.section}>
            <TextInput style={styles.textarea} placeholder="Add a review (optional)" multiline numberOfLines={4} value={review} onChangeText={setReview} placeholderTextColor={COLORS.textDisabled} />

            <Text style={styles.tipLabel}>Add a tip for {buddy.name}?</Text>
            <View style={styles.tipRow}>
              {[2, 5, 10, 15].map(t => {
                const active = tip === t;
                return (
                  <TouchableOpacity key={t} style={[styles.tipBtn, active && styles.tipActive]} onPress={() => setTip(active ? null : t)}>
                    <Text style={[styles.tipText, active && styles.tipTextActive]}>${t}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {tip ? <Text style={styles.tipNote}>💙 100% of your ${tip} tip goes to {buddy.name}.</Text> : null}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton title={rating > 0 ? 'Submit rating' : 'Skip'} onPress={() => navigation.navigate('MainTabs')} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { alignItems: 'center', paddingTop: 48, paddingHorizontal: SIZES.lg },
  avatar: { width: 72, height: 72, borderRadius: 24, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  title: { ...FONTS.h2, color: COLORS.text },
  subtitle: { ...FONTS.bodySm, color: COLORS.textLight, marginTop: 4, textAlign: 'center' },
  starsRow: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 24 },
  star: { fontSize: 42, color: COLORS.lightGray },
  starActive: { color: COLORS.star },
  ratingLabel: { ...FONTS.h3, color: COLORS.text, marginTop: 12, textAlign: 'center' },
  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', paddingHorizontal: SIZES.lg, marginTop: 18 },
  tag: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 22, backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.border },
  tagActive: { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary },
  tagText: { ...FONTS.bodySm, color: COLORS.text, fontWeight: '600' },
  tagTextActive: { color: COLORS.primary },
  section: { paddingHorizontal: SIZES.lg, marginTop: 24 },
  textarea: { backgroundColor: COLORS.background, borderRadius: SIZES.radius, paddingHorizontal: 16, paddingVertical: 14, ...FONTS.body, borderWidth: 1, borderColor: COLORS.border, height: 100, textAlignVertical: 'top' },
  tipLabel: { ...FONTS.h3, color: COLORS.text, marginTop: 24 },
  tipRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  tipBtn: { flex: 1, paddingVertical: 14, borderRadius: SIZES.radius, backgroundColor: COLORS.background, borderWidth: 1.5, borderColor: COLORS.border, alignItems: 'center' },
  tipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  tipText: { ...FONTS.body, color: COLORS.text, fontWeight: '700' },
  tipTextActive: { color: COLORS.white },
  tipNote: { ...FONTS.caption, color: COLORS.primary, fontWeight: '600', marginTop: 10, textAlign: 'center' },
  footer: { padding: SIZES.lg, paddingBottom: 28, borderTopWidth: 1, borderTopColor: COLORS.border },
});
