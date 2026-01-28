import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import {
  KeyboardAvoidingView, Platform, ScrollView,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';
import LangChips from '../../components/LangChips';
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

const BLOOD_GROUPS = ['Select Blood Group', 'O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
const GENOTYPES = ['Unknown', 'AA', 'AS', 'SS', 'AC', 'SC', 'CC'];

export default function Reg4({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [dob, setDob] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [sex, setSex] = useState('');
  const [conditions, setConditions] = useState('None');
  const [bloodGroup, setBloodGroup] = useState('Select Blood Group');
  const [genotype, setGenotype] = useState('Unknown');
  const [allergies, setAllergies] = useState('');
  const [medications, setMedications] = useState('');
  const [agreedToTelemedicine, setAgreedToTelemedicine] = useState(false);

  const toggleCondition = (condition) => {
    setConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  // Calculate age from date of birth
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
  const dobString = dob ? dob.toLocaleDateString('en-GB') : ''; // Format: dd/mm/yyyy

  // Check if all required fields are filled
  const isFormComplete = 
    firstName.trim() !== '' &&
    dob !== '' &&
    isAgeValid &&
    sex !== '' &&
    conditions.length > 0 &&
    bloodGroup !== 'Select Blood Group' &&
    genotype !== '' &&
    agreedToTelemedicine;


  return (
    <View style={SCREEN_STYLES.screen}>
      <ProgressHeader current={4} total={6} />
      <NairaLogo />

      {/* ---- title & subtitle at top ---- */}
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
            <View style={styles.fieldGroup}>
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

            {/* ---- Sex at Birth (Radio) ---- */}
            <View style={styles.section}>
              <Text style={STYLES.label}>Sex at Birth <Text style={{color: COLORS.primary}}>*</Text></Text>
              <View style={styles.radioGroup}>
                {['Female', 'Male'].map((option) => (
                  <TouchableOpacity 
                    key={option}
                    style={styles.radioRow}
                    onPress={() => setSex(option)}>
                    <View style={[styles.radio, sex === option && styles.radioSelected]}>
                      {sex === option && <View style={styles.radioDot} />}
                    </View>
                    <Text style={styles.radioLabel}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* ---- Conditions (Multi-select pills) ---- */}
            <View style={styles.section}>
              <Text style={STYLES.label}>Any conditions we should factor in?</Text>
              <View style={styles.conditionGrid}>
                {CONDITIONS.map((condition) => {
                  const isSelected = conditions.includes(condition);
                  return (
                    <TouchableOpacity
                      key={condition}
                      style={[
                        styles.conditionPill,
                        isSelected && styles.conditionPillSelected
                      ]}
                      onPress={() => toggleCondition(condition)}>
                      <Text style={[
                        styles.conditionText,
                        isSelected && styles.conditionTextSelected
                      ]}>
                        {condition}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* ---- Blood Group (Chips) ---- */}
            <LangChips 
              label="Blood Group"
              selected={bloodGroup}
              setSelected={setBloodGroup}
              options={BLOOD_GROUPS}
            />

            {/* ---- Genotype (Chips) ---- */}
            <LangChips 
              label="Genotype"
              selected={genotype}
              setSelected={setGenotype}
              options={GENOTYPES}
            />

            {/* ---- Allergies (Optional) ---- */}
            <View style={styles.fieldGroup}>
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
            <View style={styles.fieldGroup}>
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
  screen: { 
    flex: 1, 
    backgroundColor: COLORS.bg,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  radioGroup: {
    marginTop: 8,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radio: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  radioSelected: {
    borderColor: COLORS.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  radioLabel: {
    fontSize: 14,
    color: COLORS.textDark,
    fontFamily: 'Poppins',
  },
  conditionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
  },
  conditionPill: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
    marginBottom: 8,
  },
  conditionPillSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  conditionText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  conditionTextSelected: {
    color: COLORS.white,
  },
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
