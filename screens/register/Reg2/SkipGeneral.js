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

// General health options - default categories for skip option
const GENERAL_HEALTH_OPTIONS = [
  'Fever or malaria-like',
  'Cough / cold / sore throat',
  'Stomach pain / diarrhea',
  'Headache / migraine',
  'Body pain / back or joints',
  'Skin or rashes',
  'Eye or ear problems',
  'Stress / anxiety',
];

export default function SkipGeneral({ navigation }) {
  // Pre-select first 3 general health options
  const [selected, setSelected] = useState([
    'Fever or malaria-like',
    'Cough / cold / sore throat',
    'Stomach pain / diarrhea',
  ]);

  const toggleCategory = (category) => {
    setSelected((prev) => 
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <View style={styles.screen}>
      <ProgressHeader current={2} total={6} />
      <NairaLogo />

      {/* ---- title & subtitle at top ---- */}
      <Text style={FONTS.title}>General Health Care</Text>
      <Text style={FONTS.sub}>
        We've selected these general health options for you. You can customize them.
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
          
          {/* ---- General Health Options ---- */}
          <View style={styles.section}>
            <View style={styles.categoryGrid}>
              {GENERAL_HEALTH_OPTIONS.map((item) => {
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

          {/* Info text */}
          <Text style={styles.infoText}>
            You can select any of these general health categories. Minimum 3 required.
          </Text>
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
          style={styles.nextBtn}
          onPress={() => navigation.navigate('Reg3')}>
          <Text style={styles.nextBtnText}>
            Next
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
  infoText: {
    textAlign: 'center',
    color: COLORS.textLight,
    fontSize: 12,
    marginVertical: 20,
    fontFamily: 'Poppins',
    paddingHorizontal: 16,
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
  nextBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
});
