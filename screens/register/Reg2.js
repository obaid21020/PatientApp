import { useState } from 'react';
import {
    KeyboardAvoidingView, Platform, ScrollView,
    StyleSheet,
    Text, TouchableOpacity,
    View
} from 'react-native';
import NairaLogo from '../../components/NairaLogo';
import ProgressHeader from '../../components/ProgressHeader';
import { COLORS, FONTS, STYLES } from '../../themes/regTheme';

const CATEGORIES = {
  'Common Symptoms': [
    'Fever or malaria-like',
    'Cough / cold / sore throat',
    'Stomach pain / diarrhea',
    'Headache / migraine',
    'Body pain / back or joints',
    'Skin or rashes',
    'Eye or ear problems',
    'Period pain / irregular cycle',
  ],
  "Women's Health": [
    'Vaginal discharge / UTI',
    'Family planning',
    'Pregnancy (I\'m pregnant)',
    'Trying to conceive',
  ],
  'Pregnancy & Newborn': [
    'Pregnancy check-in',
    'Baby care (0-1 yr)',
    'Immunization reminders',
  ],
  'Child & Teen Health': [
    'Child fever / cough',
    'Rashes / skin (child)',
    'Growth & nutrition',
  ],
  "Men's Health": [
    'Urinary / prostate symptoms',
    'Erectile Dysfunction',
  ],
  'Chronic Conditions': [
    'Blood pressure (Hypertension)',
    'Diabetes (Type 2)',
    'Asthma',
    'Cholesterol / heart risk',
  ],
  'Mental Health & Sleep': [
    'Stress / anxiety',
    'Low mood / sadness',
    'Sleep problems',
  ],
  'Sexual Health': [
    'Possible STI exposure',
    'Discharge / itching',
    'PrEP / PEP info',
  ],
  'Medicines & Refills': [
    'Refill my medicine',
    'Side-effects / how to take',
    'Check if medicine is genuine',
  ],
  'Labs & Screening': [
    'Order a lab test',
    'View my results',
    'Health screening',
  ],
  'Lifestyle & Prevention': [
    'Nutrition / weight',
    'Exercise plan',
    'Quit smoking / reduce alcohol',
  ],
  'Elder Care': [
    'Care for a parent',
    'Falls / memory concerns',
  ],
};

export default function Reg2({ navigation }) {
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
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={true}
          nestedScrollEnabled={true}>
          <View style={STYLES.container}>
          
          {/* ---- Categories ---- */}
          {Object.entries(CATEGORIES).map(([section, items]) => (
            <View key={section} style={styles.section}>
              <Text style={styles.sectionTitle}>{section}</Text>
              <View style={styles.categoryGrid}>
                {items.map((item) => {
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
          ))}

          {/* Footer note */}
          <TouchableOpacity onPress={() => navigation.navigate('Reg3')}>
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
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 12,
    fontFamily: 'Poppins',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryPill: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 20,
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
