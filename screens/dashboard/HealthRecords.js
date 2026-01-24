import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../themes/regTheme';

const { width } = Dimensions.get('window');

export default function HealthRecords() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('consultHistory');

  // Helper function to calculate BMI
  const calculateBMI = (weight, height) => {
    if (!weight || !height) return null;
    const bmi = weight / Math.pow(height / 100, 2);
    return bmi.toFixed(1);
  };

  const height = 175; // cm
  const weight = 75; // kg
  const calculatedBMI = calculateBMI(weight, height);

  const vitals = [
    { name: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'normal', trend: 'up', icon: 'heart-outline', color: '#FF6B6B' },
    { name: 'Heart Rate', value: '72', unit: 'bpm', status: 'normal', trend: 'stable', icon: 'pulse-outline', color: '#E91E63' },
    { name: 'Temperature', value: '98.6', unit: '°F', status: 'normal', trend: 'stable', icon: 'thermometer-outline', color: '#FF9800' },
    { name: 'Weight', value: '75', unit: 'kg', status: 'normal', trend: 'down', icon: 'scale-outline', color: '#9C27B0' },
    { name: 'Height', value: '175', unit: 'cm', status: 'normal', trend: 'stable', icon: 'resize-outline', color: '#3F51B5' },
    { name: 'BMI', value: calculatedBMI || '--', unit: 'kg/m²', status: calculatedBMI && parseFloat(calculatedBMI) < 25 ? 'normal' : 'elevated', trend: 'stable', icon: 'body-outline', color: '#00BCD4' },
    { name: 'Blood Sugar', value: '95', unit: 'mg/dL', status: 'normal', trend: 'stable', icon: 'water-outline', color: '#4CAF50' },
    { name: 'Mood', value: 'Good', unit: '', status: 'positive', trend: 'stable', icon: 'happy-outline', color: '#FFC107' },
  ];

  const consultations = [
    {
      id: 1,
      date: '2024-12-10',
      doctor: 'Dr. Sarah Johnson',
      type: 'Follow-up',
      reason: 'Routine check-up',
      status: 'Completed',
      diagnosis: 'Hypertension - Controlled',
    },
    {
      id: 2,
      date: '2024-11-25',
      doctor: 'Dr. Michael Brown',
      type: 'Consultation',
      reason: 'Chest pain evaluation',
      status: 'Completed',
      diagnosis: 'GERD - On medication',
    },
    {
      id: 3,
      date: '2024-11-10',
      doctor: 'Dr. Emily Davis',
      type: 'Emergency',
      reason: 'High fever',
      status: 'Completed',
      diagnosis: 'Viral infection - Resolved',
    },
  ];

  const prescriptions = [
    {
      id: 1,
      medication: 'Lisinopril 10mg',
      dosage: 'Take 1 tablet daily',
      frequency: 'Morning',
      duration: '30 days',
      startDate: '2024-12-01',
      endDate: '2024-12-31',
      status: 'Active',
    },
    {
      id: 2,
      medication: 'Omeprazole 20mg',
      dosage: 'Take 1 capsule daily',
      frequency: 'Morning',
      duration: '14 days',
      startDate: '2024-11-25',
      endDate: '2024-12-09',
      status: 'Active',
    },
    {
      id: 3,
      medication: 'Ibuprofen 400mg',
      dosage: 'Take 1 tablet as needed',
      frequency: 'As needed',
      duration: '10 days',
      startDate: '2024-11-20',
      endDate: '2024-11-30',
      status: 'Completed',
    },
  ];

  const labs = [
    {
      id: 1,
      test: 'Complete Blood Count (CBC)',
      doctor: 'Dr. Sarah Johnson',
      date: '2024-12-05',
      results: 'Normal ranges',
      status: 'Available',
    },
    {
      id: 2,
      test: 'Lipid Panel',
      doctor: 'Dr. Sarah Johnson',
      date: '2024-12-05',
      results: 'Normal ranges',
      status: 'Available',
    },
    {
      id: 3,
      test: 'X-Ray Chest',
      doctor: 'Dr. Michael Brown',
      date: '2024-11-25',
      results: 'Clear, no abnormalities',
      status: 'Available',
    },
  ];

  const referrals = [
    {
      id: 1,
      specialist: 'Dr. Emily Wilson',
      specialty: 'Cardiology',
      hospital: 'Heart Care Center',
      date: '2024-12-15',
      reason: 'Echocardiogram assessment',
      status: 'Pending',
      referredBy: 'Dr. Sarah Johnson',
    },
    {
      id: 2,
      specialist: 'Dr. James Martinez',
      specialty: 'Orthopedic',
      hospital: 'Bone & Joint Clinic',
      date: '2024-11-20',
      reason: 'Knee pain evaluation',
      status: 'Completed',
      referredBy: 'Dr. Michael Brown',
    },
  ];

  const tabs = [
    { id: 'consultHistory', label: 'Consults', icon: 'calendar-outline' },
    { id: 'ePrescription', label: 'Rx', icon: 'medkit-outline' },
    { id: 'labs', label: 'Labs', icon: 'flask-outline' },
    { id: 'referrals', label: 'Referrals', icon: 'document-text-outline' },
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return { name: 'trending-up', color: '#4CAF50' };
      case 'down':
        return { name: 'trending-down', color: '#F44336' };
      default:
        return { name: 'remove-outline', color: '#9E9E9E' };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
      case 'positive':
        return { bg: '#E8F5E9', text: '#2E7D32' };
      case 'elevated':
        return { bg: '#FFF3E0', text: '#E65100' };
      default:
        return { bg: '#E0E0E0', text: '#616161' };
    }
  };

  const renderVitalCard = (vital, index) => {
    const trendIcon = getTrendIcon(vital.trend);
    const statusColor = getStatusColor(vital.status);

    return (
      <View key={index} style={styles.vitalCard}>
        <View style={[styles.vitalIconContainer, { backgroundColor: `${vital.color}20` }]}>
          <Ionicons name={vital.icon} size={22} color={vital.color} />
        </View>
        <Text style={styles.vitalName}>{vital.name}</Text>
        <View style={styles.vitalValueRow}>
          <Text style={styles.vitalValue}>{vital.value}</Text>
          <Text style={styles.vitalUnit}>{vital.unit}</Text>
        </View>
        <View style={styles.vitalStatusRow}>
          <View style={[styles.statusBadge, { backgroundColor: statusColor.bg }]}>
            <Text style={[styles.statusText, { color: statusColor.text }]}>{vital.status}</Text>
          </View>
          <Ionicons name={trendIcon.name} size={16} color={trendIcon.color} />
        </View>
      </View>
    );
  };

  const renderConsultHistory = () => (
    <View style={styles.tabContent}>
      <View style={styles.tabHeader}>
        <Text style={styles.tabTitle}>Consultation History</Text>
        <TouchableOpacity style={styles.exportButton}>
          <Ionicons name="download-outline" size={18} color={COLORS.primary} />
          <Text style={styles.exportText}>Export</Text>
        </TouchableOpacity>
      </View>
      {consultations.map((consult) => (
        <View key={consult.id} style={styles.recordCard}>
          <View style={styles.recordHeader}>
            <View style={styles.recordTitleRow}>
              <Text style={styles.recordTitle}>{consult.doctor}</Text>
              <View style={styles.typeBadge}>
                <Text style={styles.typeText}>{consult.type}</Text>
              </View>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: '#E8F5E9' }]}>
              <Text style={[styles.statusText, { color: '#2E7D32' }]}>{consult.status}</Text>
            </View>
          </View>
          <Text style={styles.recordSubtitle}>{consult.reason}</Text>
          <Text style={styles.recordDate}>{consult.date}</Text>
          <View style={styles.diagnosisContainer}>
            <Text style={styles.diagnosisLabel}>Diagnosis:</Text>
            <Text style={styles.diagnosisText}>{consult.diagnosis}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderPrescriptions = () => (
    <View style={styles.tabContent}>
      <View style={styles.tabHeader}>
        <Text style={styles.tabTitle}>E-Prescriptions</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={18} color={COLORS.primary} />
          <Text style={styles.addText}>New</Text>
        </TouchableOpacity>
      </View>
      {prescriptions.map((prescription) => (
        <View key={prescription.id} style={styles.recordCard}>
          <View style={styles.recordHeader}>
            <Text style={styles.recordTitle}>{prescription.medication}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: prescription.status === 'Active' ? '#E8F5E9' : '#F5F5F5' }
            ]}>
              <Text style={[
                styles.statusText,
                { color: prescription.status === 'Active' ? '#2E7D32' : '#757575' }
              ]}>{prescription.status}</Text>
            </View>
          </View>
          <Text style={styles.recordSubtitle}>{prescription.dosage}</Text>
          <View style={styles.prescriptionDetails}>
            <Text style={styles.detailText}>{prescription.frequency}</Text>
            <Text style={styles.detailDot}>•</Text>
            <Text style={styles.detailText}>{prescription.duration}</Text>
          </View>
          {prescription.status === 'Active' && (
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.outlineButton}>
                <Ionicons name="alarm-outline" size={16} color={COLORS.primary} />
                <Text style={styles.outlineButtonText}>Set Reminder</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryButton}>
                <Ionicons name="cart-outline" size={16} color="#FFFFFF" />
                <Text style={styles.primaryButtonText}>Order Now</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </View>
  );

  const renderLabs = () => (
    <View style={styles.tabContent}>
      <View style={styles.tabHeader}>
        <Text style={styles.tabTitle}>Laboratory Tests</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={18} color={COLORS.primary} />
          <Text style={styles.addText}>Book Test</Text>
        </TouchableOpacity>
      </View>
      {labs.map((lab) => (
        <View key={lab.id} style={styles.recordCard}>
          <View style={styles.recordHeader}>
            <Text style={[styles.recordTitle, { flex: 1 }]}>{lab.test}</Text>
            <View style={[styles.statusBadge, { backgroundColor: '#E8F5E9' }]}>
              <Text style={[styles.statusText, { color: '#2E7D32' }]}>{lab.status}</Text>
            </View>
          </View>
          <Text style={styles.recordSubtitle}>{lab.doctor}</Text>
          <Text style={styles.recordDate}>{lab.date}</Text>
          <Text style={styles.resultsText}>{lab.results}</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.outlineButton}>
              <Ionicons name="download-outline" size={16} color={COLORS.primary} />
              <Text style={styles.outlineButtonText}>Download Result</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderReferrals = () => (
    <View style={styles.tabContent}>
      <View style={styles.tabHeader}>
        <Text style={styles.tabTitle}>Medical Referrals</Text>
        <TouchableOpacity style={styles.exportButton}>
          <Ionicons name="download-outline" size={18} color={COLORS.primary} />
          <Text style={styles.exportText}>Export</Text>
        </TouchableOpacity>
      </View>
      {referrals.map((referral) => (
        <View key={referral.id} style={styles.recordCard}>
          <View style={styles.recordHeader}>
            <Text style={[styles.recordTitle, { flex: 1 }]}>{referral.specialist}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: referral.status === 'Completed' ? '#E8F5E9' : '#FFF8E1' }
            ]}>
              <Text style={[
                styles.statusText,
                { color: referral.status === 'Completed' ? '#2E7D32' : '#F9A825' }
              ]}>{referral.status}</Text>
            </View>
          </View>
          <Text style={styles.specialtyText}>{referral.specialty} • {referral.hospital}</Text>
          <Text style={styles.recordDate}>Date: {referral.date}</Text>
          <Text style={styles.recordSubtitle}>
            <Text style={styles.labelText}>Reason: </Text>{referral.reason}
          </Text>
          <Text style={styles.referredByText}>
            <Text style={styles.labelText}>Referred by: </Text>{referral.referredBy}
          </Text>
          {referral.status === 'Completed' && (
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.outlineButton}>
                <Ionicons name="download-outline" size={16} color={COLORS.primary} />
                <Text style={styles.outlineButtonText}>Download Report</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'consultHistory':
        return renderConsultHistory();
      case 'ePrescription':
        return renderPrescriptions();
      case 'labs':
        return renderLabs();
      case 'referrals':
        return renderReferrals();
      default:
        return renderConsultHistory();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Health Records</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationIcon}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.primary} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
          <Image
            source={{ uri: 'https://via.placeholder.com/40' }}
            style={styles.profileImage}
          />
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerIcon}>
            <Ionicons name="folder-open-outline" size={24} color={COLORS.primary} />
          </View>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Health Records</Text>
            <Text style={styles.bannerDescription}>
              Access your complete medical history, prescriptions, lab results, and referrals in one place.
            </Text>
          </View>
        </View>

        {/* Vitals Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="stats-chart-outline" size={22} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Vitals</Text>
            </View>
          </View>
          <View style={styles.vitalsGrid}>
            {vitals.map((vital, index) => renderVitalCard(vital, index))}
          </View>
          <View style={styles.vitalsActions}>
            <TouchableOpacity style={[styles.actionBtn, styles.outlineActionBtn]}>
              <Ionicons name="add-outline" size={18} color={COLORS.primary} />
              <Text style={styles.outlineActionText}>Add Vitals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, styles.outlineActionBtn]}>
              <Ionicons name="time-outline" size={18} color={COLORS.primary} />
              <Text style={styles.outlineActionText}>View History</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Women's Health Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="heart" size={22} color="#EC407A" />
              <Text style={styles.sectionTitle}>Women's Health</Text>
            </View>
          </View>
          <View style={styles.womensHealthGrid}>
            {/* Menstrual Cycle */}
            <View style={[styles.womensHealthCard, styles.menstrualCard]}>
              <View style={styles.womensCardHeader}>
                <Ionicons name="calendar-outline" size={20} color="#EC407A" />
                <Text style={styles.womensCardTitle}>Menstrual Cycle</Text>
              </View>
              <View style={styles.womensCardContent}>
                <Text style={styles.womensInfoText}>
                  <Text style={styles.womensLabelText}>Last Period: </Text>Dec 1, 2024
                </Text>
                <Text style={styles.womensInfoText}>
                  <Text style={styles.womensLabelText}>Next Expected: </Text>Dec 29, 2024
                </Text>
                <Text style={styles.womensInfoText}>
                  <Text style={styles.womensLabelText}>Cycle Length: </Text>28 days
                </Text>
              </View>
              <TouchableOpacity style={styles.womensActionBtn}>
                <Text style={styles.womensActionText}>Log Period</Text>
              </TouchableOpacity>
            </View>

            {/* Pregnancy Monitoring */}
            <View style={[styles.womensHealthCard, styles.pregnancyCard]}>
              <View style={styles.womensCardHeader}>
                <Ionicons name="heart-outline" size={20} color="#AB47BC" />
                <Text style={[styles.womensCardTitle, { color: '#7B1FA2' }]}>Pregnancy</Text>
              </View>
              <View style={styles.womensCardContent}>
                <Text style={[styles.womensInfoText, { color: '#7B1FA2' }]}>
                  <Text style={styles.womensLabelText}>Status: </Text>Not Pregnant
                </Text>
                <Text style={[styles.womensInfoText, { color: '#7B1FA2' }]}>
                  <Text style={styles.womensLabelText}>Last Test: </Text>Nov 15, 2024
                </Text>
                <Text style={[styles.womensInfoText, { color: '#7B1FA2' }]}>
                  <Text style={styles.womensLabelText}>TTC: </Text>No
                </Text>
              </View>
              <TouchableOpacity style={[styles.womensActionBtn, styles.pregnancyActionBtn]}>
                <Text style={[styles.womensActionText, { color: '#7B1FA2' }]}>Log Test Result</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.vitalsActions}>
            <TouchableOpacity style={[styles.actionBtn, styles.outlineActionBtn]}>
              <Ionicons name="calendar-outline" size={18} color={COLORS.primary} />
              <Text style={styles.outlineActionText}>View Calendar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, styles.outlineActionBtn]}>
              <Ionicons name="bulb-outline" size={18} color={COLORS.primary} />
              <Text style={styles.outlineActionText}>Health Tips</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Medical Records Tabs */}
        <View style={styles.section}>
          <View style={styles.tabsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabsScroll}
            >
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab.id}
                  style={[
                    styles.tab,
                    activeTab === tab.id && styles.activeTab,
                  ]}
                  onPress={() => setActiveTab(tab.id)}
                >
                  <Ionicons
                    name={tab.icon}
                    size={18}
                    color={activeTab === tab.id ? COLORS.primary : '#9E9E9E'}
                  />
                  <Text
                    style={[
                      styles.tabLabel,
                      activeTab === tab.id && styles.activeTabLabel,
                    ]}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          {renderTabContent()}
        </View>
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
    fontFamily: 'Poppins',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationIcon: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
  },
  content: {
    flex: 1,
  },
  banner: {
    flexDirection: 'row',
    backgroundColor: `${COLORS.primary}10`,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginBottom: 8,
    alignItems: 'flex-start',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  bannerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${COLORS.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
  bannerDescription: {
    fontSize: 13,
    color: '#666666',
    fontFamily: 'Poppins',
    lineHeight: 18,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 16,
    marginTop: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
  },
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  vitalCard: {
    width: (width - 74) / 2,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  vitalIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  vitalName: {
    fontSize: 11,
    color: '#757575',
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
  vitalValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginBottom: 6,
  },
  vitalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
  vitalUnit: {
    fontSize: 11,
    color: '#9E9E9E',
    fontFamily: 'Poppins',
  },
  vitalStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'Poppins',
    textTransform: 'capitalize',
  },
  vitalsActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  outlineActionBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  outlineActionText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
  womensHealthGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  womensHealthCard: {
    flex: 1,
    borderRadius: 10,
    padding: 12,
  },
  menstrualCard: {
    backgroundColor: '#FCE4EC',
    borderWidth: 1,
    borderColor: '#F8BBD9',
  },
  pregnancyCard: {
    backgroundColor: '#F3E5F5',
    borderWidth: 1,
    borderColor: '#E1BEE7',
  },
  womensCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  womensCardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#C2185B',
    fontFamily: 'Poppins',
  },
  womensCardContent: {
    marginBottom: 10,
  },
  womensInfoText: {
    fontSize: 12,
    color: '#C2185B',
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
  womensLabelText: {
    fontWeight: '600',
  },
  womensActionBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#F48FB1',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  pregnancyActionBtn: {
    borderColor: '#CE93D8',
  },
  womensActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#C2185B',
    fontFamily: 'Poppins',
  },
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 16,
    marginHorizontal: -16,
  },
  tabsScroll: {
    paddingHorizontal: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    gap: 6,
  },
  activeTab: {
    borderBottomColor: COLORS.primary,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#9E9E9E',
    fontFamily: 'Poppins',
  },
  activeTabLabel: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  tabContent: {
    minHeight: 300,
  },
  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tabTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 6,
  },
  exportText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 6,
  },
  addText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
  recordCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  recordTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  recordTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
  },
  typeBadge: {
    backgroundColor: `${COLORS.primary}15`,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
  recordSubtitle: {
    fontSize: 12,
    color: '#757575',
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
  recordDate: {
    fontSize: 11,
    color: '#9E9E9E',
    fontFamily: 'Poppins',
    marginBottom: 8,
  },
  diagnosisContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
    marginTop: 6,
  },
  diagnosisLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#616161',
    fontFamily: 'Poppins',
  },
  diagnosisText: {
    fontSize: 12,
    color: '#424242',
    fontFamily: 'Poppins',
  },
  prescriptionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  detailText: {
    fontSize: 11,
    color: '#9E9E9E',
    fontFamily: 'Poppins',
  },
  detailDot: {
    fontSize: 11,
    color: '#9E9E9E',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  outlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 6,
  },
  outlineButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  primaryButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
  resultsText: {
    fontSize: 12,
    color: '#424242',
    fontFamily: 'Poppins',
  },
  specialtyText: {
    fontSize: 12,
    color: '#757575',
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
  labelText: {
    fontWeight: '600',
  },
  referredByText: {
    fontSize: 11,
    color: '#9E9E9E',
    fontFamily: 'Poppins',
  },
});
