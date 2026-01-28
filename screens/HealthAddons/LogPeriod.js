import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../themes/regTheme';

// Default export - THIS IS CRUCIAL
export default function LogPeriod() {
  const navigation = useNavigation();

  // Date state
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Period flow (single selection)
  const [flow, setFlow] = useState('medium');
  const flowOptions = [
    { id: 'light', label: 'Light', icon: 'water-outline', color: '#FFB74D' },
    { id: 'medium', label: 'Medium', icon: 'water', color: '#FF9800' },
    { id: 'heavy', label: 'Heavy', icon: 'warning-outline', color: '#F44336' },
  ];

  // Mood (single selection)
  const [mood, setMood] = useState('happy');
  const moodOptions = [
    { id: 'calm', label: 'Calm', icon: 'leaf-outline' },
    { id: 'happy', label: 'Happy', icon: 'happy-outline' },
    { id: 'anxious', label: 'Anxious', icon: 'alert-circle-outline' },
    { id: 'irritable', label: 'Irritable', icon: 'thunderstorm-outline' },
    { id: 'sad', label: 'Sad', icon: 'rainy-outline' },
    { id: 'energetic', label: 'Energetic', icon: 'flash-outline' },
    { id: 'stressed', label: 'Stressed', icon: 'battery-dead-outline' },
    { id: 'distracted', label: 'Distracted', icon: 'git-compare-outline' },
  ];

  // Symptoms (single selection - most prominent one)
  const [symptom, setSymptom] = useState(null);
  const symptomOptions = [
    { id: 'none', label: 'No Symptoms', icon: 'checkmark-circle-outline' },
    { id: 'cramps', label: 'Cramps', icon: 'fitness-outline' },
    { id: 'headache', label: 'Headache', icon: 'medical-outline' },
    { id: 'bloating', label: 'Bloating', icon: 'expand-outline' },
    { id: 'acne', label: 'Acne', icon: 'sad-outline' },
    { id: 'fatigue', label: 'Fatigue', icon: 'battery-half-outline' },
    { id: 'nausea', label: 'Nausea', icon: 'nuclear-outline' },
    { id: 'cravings', label: 'Cravings', icon: 'ice-cream-outline' },
    { id: 'backache', label: 'Backache', icon: 'body-outline' },
    { id: 'insomnia', label: 'Insomnia', icon: 'moon-outline' },
  ];

  // Discharge (single selection)
  const [discharge, setDischarge] = useState(null);
  const dischargeOptions = [
    { id: 'none', label: 'None', icon: 'close-circle-outline' },
    { id: 'spotting', label: 'Spotting', icon: 'water-outline' },
    { id: 'creamy', label: 'Creamy', icon: 'ellipse-outline' },
    { id: 'sticky', label: 'Sticky', icon: 'git-merge-outline' },
  ];

  // Pain level (single selection)
  const [painLevel, setPainLevel] = useState(0);
  const painOptions = [
    { id: 1, label: 'No Pain', color: '#4CAF50' },
    { id: 2, label: 'Mild', color: '#8BC34A' },
    { id: 3, label: 'Moderate', color: '#FFC107' },
    { id: 4, label: 'Severe', color: '#FF9800' },
    { id: 5, label: 'Extreme', color: '#F44336' },
  ];

  // Sleep quality (single selection)
  const [sleep, setSleep] = useState('good');
  const sleepOptions = [
    { id: 'poor', label: 'Poor', icon: 'battery-dead-outline' },
    { id: 'fair', label: 'Fair', icon: 'battery-half-outline' },
    { id: 'good', label: 'Good', icon: 'battery-full-outline' },
    { id: 'excellent', label: 'Excellent', icon: 'battery-charging-outline' },
  ];

  // Exercise (single selection)
  const [exercise, setExercise] = useState('light');
  const exerciseOptions = [
    { id: 'none', label: 'No Exercise', icon: 'bed-outline' },
    { id: 'light', label: 'Light', icon: 'walk-outline' },
    { id: 'moderate', label: 'Moderate', icon: 'bicycle-outline' },
    { id: 'intense', label: 'Intense', icon: 'barbell-outline' },
  ];

  const onDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  const handleSave = () => {
    // Save logic here
    navigation.goBack();
  };

  // Reusable pill selector component (single selection)
  const renderPillGroup = (label, options, selected, setSelected, showIcon = true) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{label}</Text>
      <View style={styles.pillGrid}>
        {options.map((option) => {
          const isSelected = selected === option.id;
          const optionColor = option.color || COLORS.primary;
          
          return (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.pill,
                isSelected && { 
                  backgroundColor: optionColor,
                  borderColor: optionColor 
                }
              ]}
              onPress={() => setSelected(option.id)}
            >
              {showIcon && option.icon && (
                <Ionicons 
                  name={option.icon} 
                  size={18} 
                  color={isSelected ? '#FFF' : optionColor}
                  style={styles.pillIcon}
                />
              )}
              <Text style={[
                styles.pillText,
                isSelected && styles.pillTextSelected
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  // Special render for pain level (visual bar)
  const renderPainLevel = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Pain Level</Text>
      <View style={styles.painContainer}>
        {painOptions.map((option) => {
          const isSelected = painLevel === option.id;
          return (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.painDot,
                isSelected && { 
                  backgroundColor: option.color,
                  transform: [{ scale: 1.2 }]
                }
              ]}
              onPress={() => setPainLevel(option.id)}
            >
              {isSelected && (
                <Text style={styles.painNumber}>{option.id}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.painLabels}>
        {painOptions.map((option) => (
          <Text 
            key={option.id} 
            style={[
              styles.painLabel, 
              painLevel === option.id && { 
                color: option.color,
                fontWeight: '700' 
              }
            ]}
          >
            {painLevel === option.id ? option.label : ''}
          </Text>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Log Period</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Ionicons name="calendar-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* Date Display */}
        <TouchableOpacity 
          style={styles.dateCard}
          onPress={() => setShowDatePicker(true)}
        >
          <Ionicons name="calendar" size={20} color={COLORS.primary} />
          <Text style={styles.dateText}>
            {selectedDate.toLocaleDateString('en-GB', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#999" />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
            maximumDate={new Date()}
          />
        )}

        {/* Menstrual Flow */}
        {renderPillGroup('Menstrual Flow', flowOptions, flow, setFlow)}

        {/* Pain Level */}
        {renderPainLevel()}

        {/* Mood */}
        {renderPillGroup('Mood', moodOptions, mood, setMood)}

        {/* Symptoms */}
        {renderPillGroup('Symptoms', symptomOptions, symptom, setSymptom)}

        {/* Discharge */}
        {renderPillGroup('Vaginal Discharge', dischargeOptions, discharge, setDischarge)}

        {/* Sleep Quality */}
        {renderPillGroup('Sleep Quality', sleepOptions, sleep, setSleep)}

        {/* Exercise */}
        {renderPillGroup('Exercise', exerciseOptions, exercise, setExercise)}

        {/* Info Cards */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Did you know?</Text>
          <Text style={styles.infoText}>
            Tracking your period regularly helps predict your next cycle and identify patterns in your symptoms.
          </Text>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Entry</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: FONTS.Poppins,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  dateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    gap: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  dateText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
    marginBottom: 12,
  },
  pillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'white',
    minWidth: '30%',
    justifyContent: 'center',
  },
  pillIcon: {
    marginRight: 6,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.primary,
    fontFamily: FONTS.Poppins,
  },
  pillTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  painContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  painDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    elevation: 2,
  },
  painNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  painLabels: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    height: 20,
  },
  painLabel: {
    fontSize: 13,
    color: '#757575',
    fontFamily: FONTS.Poppins,
    textAlign: 'center',
  },
  infoSection: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E65100',
    fontFamily: FONTS.Poppins,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#F57C00',
    fontFamily: FONTS.Poppins,
    lineHeight: 18,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: FONTS.Poppins,
  },
});