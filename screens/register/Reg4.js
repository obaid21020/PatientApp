'use client';

import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import {
  KeyboardAvoidingView, Platform, ScrollView,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';
import NairaLogo from '../../components/NairaLogo';
import ProgressHeader from '../../components/ProgressHeader';
import { COLORS, FONTS, LAYOUT_STYLES, SCREEN_STYLES, STYLES } from '../../themes/regTheme';

const CONDITIONS = [
  'Hypertension',
  'Diabetes',
  'Asthma',
  'Pregnancy',
  'Epilepsy',
  'Not Sure',
  'None',
];

const BLOOD_TYPES = ['O', 'A', 'B', 'AB'];
const RH_FACTORS = ['Rh +', 'Rh -'];
const GENOTYPES = ['Unknown', 'AA', 'AS', 'SS', 'AC', 'SC', 'CC'];
const LIFESTYLE_OPTIONS = ['Yes', 'No', 'Occasionally'];

export default function Reg4({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [dob, setDob] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [sex, setSex] = useState('');
  const [conditions, setConditions] = useState([]);
  const [genotype, setGenotype] = useState('Unknown');
  const [allergies, setAllergies] = useState('');
  const [medications, setMedications] = useState('');
  const [smokes, setSmokes] = useState('No');
  const [drinks, setDrinks] = useState('No');
  const [agreedToTelemedicine, setAgreedToTelemedicine] = useState(false);
  const [bloodType, setBloodType] = useState('');
  const [rhFactor, setRhFactor] = useState('');

  const toggleCondition = (condition) => {
    setConditions((prev) => {
      if (condition === 'None' || condition === 'Not Sure') {
        return prev.includes(condition) ? [] : [condition];
      }
      if (prev.includes('None') || prev.includes('Not Sure')) {
        return prev;
      }
      return prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition];
    });
  };

  const calculateAge = (date) => {
    if (!date) return 0;
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
      age--;
    }
    return age;
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDob(selectedDate);
    }
  };

  const age = calculateAge(dob);
  const isAgeValid = dob && age >= 16;
  const dobString = dob ? dob.toLocaleDateString('en-GB') : '';

  const isFormComplete = 
    firstName.trim() !== '' &&
    dob !== '' &&
    isAgeValid &&
    sex !== '' &&
    conditions.length > 0 &&
    bloodType !== '' &&
    rhFactor !== '' &&
    genotype !== '' &&
    smokes !== '' &&
    drinks !== '' &&
    agreedToTelemedicine;

  // Generic pill renderer using CONDITION styling
  const renderPills = (label, options, selected, setSelected, config = {}) => {
    const { required = false, multi = false, columns = null, icon = false } = config;
    
    // Calculate width based on columns (2 or 3), null for natural flow
    const getWidth = () => {
      if (columns === 2) return { width: '48%' };
      if (columns === 3) return { width: '31%' };
      return {};
    };

    return (
      <View style={{ marginBottom: 20 }}>
        <Text style={STYLES.label}>
          {label} {required && <Text style={{color: COLORS.primary}}>*</Text>}
        </Text>
        <View style={styles.pillGrid}>
          {options.map((option) => {
            const isSelected = multi ? selected.includes(option) : selected === option;
            const widthStyle = getWidth();
            
            return (
              <TouchableOpacity
                key={option}
                style={[
                  styles.pill,
                  isSelected && styles.pillSelected,
                  widthStyle
                ]}
                onPress={() => {
                  if (multi) {
                    toggleCondition(option);
                  } else {
                    setSelected(option);
                  }
                }}>
                {icon && (
                  <Ionicons 
                    name="water" 
                    size={16} 
                    color={isSelected ? COLORS.white : COLORS.primary}
                  />
                )}
                <Text style={[
                  styles.pillText,
                  isSelected && styles.pillTextSelected,
                  icon && { marginTop: 2 }
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={SCREEN_STYLES.screen}>
      <ProgressHeader current={4} total={6} />
      <NairaLogo />

      <Text style={FONTS.title}>About you</Text>
      <Text style={[FONTS.sub, {paddingBottom: 16}]}>
        Help us provide safe, personalized care
      </Text>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}>
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={true}>
          <View style={STYLES.container}>

            {/* ---- First Name ---- */}
            <View style={LAYOUT_STYLES.fieldGroup}>
              <Text style={STYLES.label}>First Name (Legal Name) <Text style={{color: COLORS.primary}}>*</Text></Text>
              <TextInput
                style={STYLES.input}
                placeholder="Enter your first name"
                placeholderTextColor={COLORS.placeholder}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>

            {/* ---- Date of Birth ---- */}
            <View style={{ marginBottom: 16 }}>
              <Text style={STYLES.label}>Date of Birth <Text style={{color: COLORS.primary}}>*</Text></Text>
              <TouchableOpacity
                style={STYLES.inputWrap}
                onPress={() => setShowDatePicker(true)}>
                <Ionicons name="calendar" size={20} color={COLORS.placeholder} />
                <Text style={[STYLES.input, { marginLeft: 8 }]}>
                  {dobString || 'Select date'}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={dob || new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                  onTouchCancel={() => setShowDatePicker(false)}
                />
              )}

              {dob && !isAgeValid && (
                <Text style={[STYLES.validationText, { color: COLORS.primary }]}>
                  ✗ Must be at least 16 years old
                </Text>
              )}
              {dob && isAgeValid && (
                <Text style={[STYLES.validationText, { color: COLORS.primary }]}>
                  ✓ Age: {age} years
                </Text>
              )}
            </View>

            {/* ---- Sex (2 per row) ---- */}
            {renderPills('Sex at Birth', ['Female', 'Male'], sex, setSex, { required: true, columns: 2 })}

            {/* ---- Conditions (Original multi-select style preserved) ---- */}
            <View style={{ marginBottom: 20 }}>
              <Text style={STYLES.label}>Any conditions we should factor in?</Text>
              <View style={styles.pillGrid}>
                {CONDITIONS.map((condition) => {
                  const isSelected = conditions.includes(condition);
                  return (
                    <TouchableOpacity
                      key={condition}
                      style={[styles.pill, isSelected && styles.pillSelected]}
                      onPress={() => toggleCondition(condition)}>
                      <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
                        {condition}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* ---- Blood Type (2 per row, with icon) ---- */}
            {renderPills('Blood Type', BLOOD_TYPES, bloodType, setBloodType, { required: true, columns: 2, icon: true })}

            {/* ---- Rh Factor (2 per row) ---- */}
            {renderPills('Rh Factor', RH_FACTORS, rhFactor, setRhFactor, { required: true, columns: 2 })}

            {/* ---- Genotype (3 per row) ---- */}
            {renderPills('Genotype', GENOTYPES, genotype, setGenotype, { columns: 3 })}

            {/* ---- Lifestyle Questions (3 per row) ---- */}
            {renderPills('Do you smoke?', LIFESTYLE_OPTIONS, smokes, setSmokes, { required: true, columns: 3 })}
            {renderPills('Do you drink?', LIFESTYLE_OPTIONS, drinks, setDrinks, { required: true, columns: 3 })}

            {/* ---- Allergies (Optional) ---- */}
            <View style={LAYOUT_STYLES.fieldGroup}>
              <Text style={STYLES.label}>Allergies (Optional)</Text>
              <TextInput
                style={[STYLES.input, { minHeight: 60 }]}
                placeholder="List any allergies (comma separated)"
                placeholderTextColor={COLORS.placeholder}
                value={allergies}
                onChangeText={setAllergies}
                multiline
              />
            </View>

            {/* ---- Current Medications (Optional) ---- */}
            <View style={LAYOUT_STYLES.fieldGroup}>
              <Text style={STYLES.label}>Current Medications (Optional)</Text>
              <TextInput
                style={[STYLES.input, { minHeight: 60 }]}
                placeholder="List current medications (comma separated)"
                placeholderTextColor={COLORS.placeholder}
                value={medications}
                onChangeText={setMedications}
                multiline
              />
            </View>

            {/* ---- Telemedicine Checkbox ---- */}
            <TouchableOpacity 
              style={styles.checkboxRow}
              onPress={() => setAgreedToTelemedicine(!agreedToTelemedicine)}>
              <View style={[styles.checkbox, agreedToTelemedicine && styles.checkboxChecked]}>
                {agreedToTelemedicine && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxText}>
                This is telemedicine. Some issues need in-person care. Your data is protected by NDPA. Do you agree? <Text style={{color: COLORS.primary}}>*</Text>
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
          style={[styles.nextBtn, !isFormComplete && styles.nextBtnDisabled]}
          disabled={!isFormComplete}
          onPress={() => navigation.navigate('Reg5')}>
          <Text style={styles.nextBtnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Unified Pill System - Same as CONDITIONS styling
  pillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
  },
  pill: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  pillText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  pillTextSelected: {
    color: COLORS.white,
  },
  // Checkbox
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 4,
    marginRight: 10,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxText: {
    fontSize: 12,
    color: COLORS.textDark,
    fontFamily: 'Poppins',
    flex: 1,
    lineHeight: 18,
  },
  // Bottom Navigation
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