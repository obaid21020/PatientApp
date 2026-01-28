import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS } from '../../themes/regTheme';

export default function Refill({ route, navigation }) {
  const { prescription } = route.params;
  const [autoRefill, setAutoRefill] = useState(false);
  const [reminderDays, setReminderDays] = useState(3);
  const [deliveryChecked, setDeliveryChecked] = useState(true);

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color={COLORS.primary} />
      </TouchableOpacity>
      {/* Sticky Card */}
      <View style={styles.stickyCard}>
        <View style={styles.row}>
          <View style={styles.iconWrap}>
            <Ionicons name="medkit-outline" size={32} color={COLORS.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.medName}>{prescription.medication}</Text>
            <Text style={styles.medDesc}>{prescription.dosage}</Text>
            <Text style={styles.prescribedBy}>Prescribed by {prescription.prescribedBy || 'your doctor'}</Text>
            <Text style={styles.supply}>{prescription.duration} supply</Text>
          </View>
        </View>
      </View>
      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContent} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Automatic Refill Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Automatic Refill</Text>
          <Text style={styles.sectionDesc}>
            Helps you avoid running out of your medication, with doctor oversight. You'll be reminded before each refill. You stay in control.
          </Text>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Enable automatic refill</Text>
            <Switch
              value={autoRefill}
              onValueChange={setAutoRefill}
              trackColor={{ false: '#E5E7EB', true: COLORS.primary }}
              thumbColor={autoRefill ? COLORS.primary : '#f4f3f4'}
            />
          </View>
        </View>
        {/* Refill Preferences */}
        {autoRefill && (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Refill preferences</Text>
            <Text style={styles.sectionDesc}>When should we remind you?</Text>
            {[3, 5, 7].map((days) => (
              <TouchableOpacity
                key={days}
                style={styles.radioRow}
                onPress={() => setReminderDays(days)}
                activeOpacity={0.7}
              >
                <View style={[styles.radioOuter, reminderDays === days && styles.radioOuterActive]}>
                  {reminderDays === days && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioLabel}>{days} days before refill</Text>
              </TouchableOpacity>
            ))}
            <Text style={[styles.sectionDesc, { marginTop: 16 }]}>How would you like to receive your medication?</Text>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setDeliveryChecked(!deliveryChecked)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, deliveryChecked && styles.checkboxChecked]}>
                {deliveryChecked && <Ionicons name="checkmark" size={16} color="#fff" />}
              </View>
              <Text style={styles.checkboxLabel}>
                Before every refill, we'll ask a few quick health questions to make sure this medication is still right for you.
              </Text>
            </TouchableOpacity>
            <Text style={styles.pauseText}>Pause auto-refill: You can turn this off at any time.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    position: 'relative',
  },
  backArrow: {
    position: 'absolute',
    top: 18,
    left: 10,
    zIndex: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  stickyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 16,
    marginBottom: 0,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  medName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: FONTS.Poppins,
  },
  medDesc: {
    fontSize: 13,
    color: '#666',
    fontFamily: FONTS.Poppins,
    marginBottom: 2,
  },
  prescribedBy: {
    fontSize: 12,
    color: '#888',
    fontFamily: FONTS.Poppins,
  },
  supply: {
    fontSize: 12,
    color: '#888',
    fontFamily: FONTS.Poppins,
  },
  scrollContent: {
    flex: 1,
    marginTop: 12,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 18,
    padding: 18,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: FONTS.Poppins,
    marginBottom: 6,
  },
  sectionDesc: {
    fontSize: 13,
    color: '#666',
    fontFamily: FONTS.Poppins,
    marginBottom: 10,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  switchLabel: {
    fontSize: 13,
    color: '#222',
    fontFamily: FONTS.Poppins,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioOuterActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#E0F2FE',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  radioLabel: {
    fontSize: 13,
    color: '#222',
    fontFamily: FONTS.Poppins,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 14,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkboxLabel: {
    fontSize: 13,
    color: '#222',
    fontFamily: FONTS.Poppins,
    flex: 1,
  },
  pauseText: {
    fontSize: 12,
    color: '#888',
    fontFamily: FONTS.Poppins,
    marginTop: 18,
  },
});
