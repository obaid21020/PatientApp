import { useState } from 'react';
import {
  KeyboardAvoidingView, Platform, ScrollView,
  StyleSheet,
  Text, TouchableOpacity,
  View
} from 'react-native';
import NairaLogo from '../../../components/NairaLogo';
import ProgressHeader from '../../../components/ProgressHeader';
import { COLORS, FONTS, STYLES } from '../../../themes/regTheme';

// Quick initial picks - subset of popular options
const INITIAL_PICKS = [
  'Fever or malaria-like',
  'Cough / cold / sore throat',
  'Stomach pain / diarrhea',
  'Headache / migraine',
  'Body pain / back or joints',
  'Skin or rashes',
  'Stress / anxiety',
  'Period pain / irregular cycle',
];

export default function InitialPicks({ navigation }) {
  const [selected, setSelected] = useState([]);

  const toggleCategory = (category) => {
    setSelected((prev) => 
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const isValid = selected.length >= 3;

  return (
    <View style={styles.screen}>
      <ProgressHeader current={2} total={6} />
      <NairaLogo />

      {/* ---- title & subtitle at top ---- */}
      <Text style={FONTS.title}>What should we help with?</Text>
      <Text style={FONTS.sub}>
        Select at least 3 categories to personalize your care
      </Text>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}>
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={true}
          nestedScrollEnabled={true}>
          <View style={STYLES.container}>
          
          {/* ---- Quick Pick Options ---- */}
          <View style={styles.section}>
            <View style={styles.categoryGrid}>
              {INITIAL_PICKS.map((item) => {
                const isSelected = selected.includes(item);
                return (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.categoryPill,
                      isSelected && styles.categoryPillSelected
                    ]}
                    onPress={() => toggleCategory(item)}>
                    <Text style={[
                      styles.categoryText,
                      isSelected && styles.categoryTextSelected
                    ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Show All Link */}
          <TouchableOpacity onPress={() => navigation.navigate('ShowAll', { selected })}>
            <Text style={styles.showAllLink}>
              Show all categories
            </Text>
          </TouchableOpacity>

          {/* Footer note */}
          <TouchableOpacity onPress={() => navigation.navigate('SkipGeneral')}>
            <Text style={styles.footerNote}>
                Skip - Default to "General Care"
            </Text>
          </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ---- Bottom Buttons ---- */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.prevBtn}
          onPress={() => navigation.goBack()}>
          <Text style={styles.prevBtnText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.nextBtn, !isValid && styles.nextBtnDisabled]}
          disabled={!isValid}
          onPress={() => navigation.navigate('Reg3')}>
          <Text style={styles.nextBtnText}>
            Done ({selected.length} selected)
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { 
    flex: 1, 
    backgroundColor: COLORS.bg,
  },
  section: {
    marginBottom: 24,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryPill: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
    marginBottom: 8,
  },
  categoryPillSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  categoryTextSelected: {
    color: COLORS.white,
  },
  showAllLink: {
    textAlign: 'center',
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 24,
    fontFamily: 'Poppins',
    textDecorationLine: 'underline',
  },
  footerNote: {
    textAlign: 'center',
    color: COLORS.textLight,
    fontSize: 12,
    marginTop: 32,
    paddingBottom: 15,
    fontFamily: 'Poppins',
  },
  bottomBar: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: COLORS.bg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  prevBtn: {
    flex: 1,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  prevBtnText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  nextBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  nextBtnDisabled: {
    backgroundColor: COLORS.border,
    opacity: 0.5,
  },
  nextBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
});
