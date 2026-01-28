import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import VitalCard from '../../../components/VitalCard';
import { COLORS, FONTS } from '../../../themes/regTheme';

const { width } = Dimensions.get('window');

export default function AddVitals() {
  const navigation = useNavigation();

  // Predefined vitals not in HealthRecords
  const [predefinedVitals, setPredefinedVitals] = useState([
    {
      id: 'spo2',
      name: 'Oxygen Saturation',
      unit: '%',
      icon: 'water-outline',
      color: '#2196F3',
      lastValue: '98',
      lastRecorded: 'Today, 8:30 AM',
    },
    {
      id: 'respiratory',
      name: 'Respiratory Rate',
      unit: 'breaths/min',
      icon: 'sync-outline',
      color: '#FF9800',
      lastValue: '16',
      lastRecorded: 'Yesterday',
    },
    {
      id: 'sleep',
      name: 'Sleep Duration',
      unit: 'hours',
      icon: 'moon-outline',
      color: '#673AB7',
      lastValue: '7.5',
      lastRecorded: 'Today, 6:00 AM',
    },
    {
      id: 'water',
      name: 'Water Intake',
      unit: 'ml',
      icon: 'water-outline',
      color: '#00BCD4',
      lastValue: '1,250',
      lastRecorded: '2 hours ago',
    },
    {
      id: 'steps',
      name: 'Daily Steps',
      unit: 'steps',
      icon: 'footsteps-outline',
      color: '#4CAF50',
      lastValue: '4,234',
      lastRecorded: 'Just now',
    },
    {
      id: 'bodyfat',
      name: 'Body Fat %',
      unit: '%',
      icon: 'body-outline',
      color: '#E91E63',
      lastValue: '22.5',
      lastRecorded: 'Last week',
    },
    {
      id: 'waist',
      name: 'Waist Circumference',
      unit: 'cm',
      icon: 'resize-outline',
      color: '#795548',
      lastValue: '85',
      lastRecorded: '2 weeks ago',
    },
    {
      id: 'hrv',
      name: 'Heart Rate Variability',
      unit: 'ms',
      icon: 'pulse-outline',
      color: '#9C27B0',
      lastValue: '45',
      lastRecorded: 'Today, 8:30 AM',
    },
  ]);

  const [customVitals, setCustomVitals] = useState([
    {
      id: 'custom1',
      name: 'Blood Ketones',
      unit: 'mmol/L',
      icon: 'flask-outline',
      color: '#F44336',
      lastValue: '0.5',
      lastRecorded: '3 days ago',
    },
  ]);

  const handleAddVital = (vital) => {
    navigation.navigate('RecordVital', { vital });
  };

  const handleViewHistory = (vital) => {
    navigation.navigate('VitalHistory', { vital });
  };

  const handleAddCustom = () => {
    navigation.navigate('CustomVital');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Vitals</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Common Vitals</Text>
          <View style={styles.vitalsGrid}>
            {predefinedVitals.map((vital) => (
              <View key={vital.id} style={styles.vitalCardWrapper}>
                <VitalCard
                  vital={vital}
                  color={vital.color}
                  onAdd={() => handleAddVital(vital)}
                  onHistory={() => handleViewHistory(vital)}
                />
              </View>
            ))}
          </View>
        </View>

        {customVitals.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Custom Vitals</Text>
            <View style={styles.vitalsGrid}>
              {customVitals.map((vital) => (
                <View key={vital.id} style={styles.vitalCardWrapper}>
                  <VitalCard
                    vital={vital}
                    color={vital.color}
                    onAdd={() => handleAddVital(vital)}
                    onHistory={() => handleViewHistory(vital)}
                  />
                </View>
              ))}
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.addCustomButton} onPress={handleAddCustom}>
          <View style={styles.addCustomIcon}>
            <Ionicons name="add" size={28} color={COLORS.primary} />
          </View>
          <View style={styles.addCustomText}>
            <Text style={styles.addCustomTitle}>Add Custom Vital</Text>
            <Text style={styles.addCustomSubtitle}>Track your own metrics</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={COLORS.primary} />
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
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
    marginBottom: 16,
  },
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  vitalCardWrapper: {
    width: (width - 42) / 2, // 2 columns with gap consideration
    marginBottom: 10,
  },
  addCustomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.primary,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  addCustomIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  addCustomText: {
    flex: 1,
  },
  addCustomTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: FONTS.Poppins,
  },
  addCustomSubtitle: {
    fontSize: 13,
    color: '#757575',
    fontFamily: FONTS.Poppins,
    marginTop: 2,
  },
});