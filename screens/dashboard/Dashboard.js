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
import NairaLogo from '../../components/NairaLogo';
import { COLORS, FONTS } from '../../themes/regTheme';

const { width } = Dimensions.get('window');

export default function Dashboard() {
  const navigation = useNavigation();
  const [greeting] = useState('Good afternoon, John!');


  const healthMetrics = [
    { id: 1, title: 'Health Score', value: '85%', icon: 'heart-outline', color: '#FF6B6B' },
    {id: 5, title : 'Next Appointment', value: 'Jan 15, 2025', icon: 'calendar-outline', color: '#FFA500' },
    {id: 6, title : 'Number of Active Medications', value: '3', icon: 'medkit-outline', color: '#32CD32' },
    {id: 7, title : 'Balance', value: '₦12,500', icon: 'wallet-outline', color: '#20B2AA' },
  ];

  const dailyTips = [
    { id: 1, title: 'Stay Hydrated', description: 'Drink 8 glasses of water daily', icon: 'water-outline' },
    { id: 2, title: 'Exercise Daily', description: '30 minutes of physical activity', icon: 'fitness-outline' },
    { id: 3, title: 'Get Sleep', description: 'Sleep 7-8 hours per night', icon: 'moon-outline' },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      doctorName: 'Dr. Amara Okoye',
      specialty: 'Cardiologist',
      date: 'Jan 15, 2025',
      time: '2:00 PM',
      status: 'Confirmed',
      statusColor: COLORS.primary,
    },
    {
      id: 2,
      doctorName: 'Dr. Chisom Adeyemi',
      specialty: 'General Practitioner',
      date: 'Jan 18, 2025',
      time: '10:00 AM',
      status: 'Pending',
      statusColor: '#FFC107',
    },
    {
      id: 3,
      doctorName: 'Dr. Tunde Bello',
      specialty: 'Ophthalmologist',
      date: 'Jan 20, 2025',
      time: '3:30 PM',
      status: 'Confirmed',
      statusColor: COLORS.primary,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Sticky Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color={COLORS.primary} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <NairaLogo size={25} />
        </View>

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
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingText}>{greeting}</Text>
          <Text style={styles.greetingSubtext}>How are you feeling today?</Text>
        </View>

        {/* Quick Action Buttons */}


        {/* Health Metrics Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Health Metrics</Text>
          <View style={styles.metricsGrid}>
            {healthMetrics.slice(0, 4).map((metric) => (
              <View key={metric.id} style={styles.metricCard}>
                <View style={[styles.metricIcon, { backgroundColor: `${metric.color}20` }]}>
                  <Ionicons name={metric.icon} size={24} color={metric.color} />
                </View>
                <Text style={styles.metricTitle}>{metric.title}</Text>
                <Text style={styles.metricValue}>{metric.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Daily Tips Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Daily Health Tips</Text>
          {dailyTips.map((tip) => (
            <View key={tip.id} style={styles.tipCard}>
              <View style={styles.tipIcon}>
                <Ionicons name={tip.icon} size={20} color={COLORS.primary} />
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipDescription}>{tip.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Upcoming Appointments Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
          </View>

          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={styles.appointmentsScroll}
          >
            {upcomingAppointments.map((apt) => (
              <View key={apt.id} style={styles.appointmentCard}>
                <View style={styles.appointmentHeader}>
                  <Text style={styles.doctorName}>{apt.doctorName}</Text>
                  <Text
                    style={[
                      styles.appointmentStatus,
                      { color: apt.statusColor },
                    ]}
                  >
                    {apt.status}
                  </Text>
                </View>
                <Text style={styles.specialty}>{apt.specialty}</Text>
                <View style={styles.appointmentTime}>
                  <Ionicons name="calendar-outline" size={16} color={COLORS.primary} />
                  <Text style={styles.dateText}>{apt.date}</Text>
                </View>
                <View style={styles.appointmentTime}>
                  <Ionicons name="time-outline" size={16} color={COLORS.primary} />
                  <Text style={styles.timeText}>{apt.time}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Sticky SOS Button */}
      <TouchableOpacity style={styles.sosButton} onPress={() => navigation.navigate('SOS')}>
        <Ionicons name="alert-circle" size={32} color="white" />
      </TouchableOpacity>
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
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: FONTS.Poppins,
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
    paddingHorizontal: 16,
  },
  greetingSection: {
    marginTop: 20,
    marginBottom: 16,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
    marginBottom: 4,
  },
  greetingSubtext: {
    fontSize: 14,
    color: '#999',
    fontFamily: FONTS.Poppins,
  },
  quickActionsContainer: {
    marginBottom: 24,
  },
  quickActionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionButton: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
  },
  seeAll: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
    fontFamily: FONTS.Poppins,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: (width - 52) / 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricTitle: {
    fontSize: 12,
    color: '#999',
    fontFamily: FONTS.Poppins,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
  },
  tipCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  tipIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${COLORS.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
    marginBottom: 2,
  },
  tipDescription: {
    fontSize: 12,
    color: '#999',
    fontFamily: FONTS.Poppins,
  },
  appointmentsScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  appointmentCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignSelf: 'center',
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  doctorName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
    flex: 1,
  },
  appointmentStatus: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: FONTS.Poppins,
  },
  specialty: {
    fontSize: 12,
    color: '#999',
    fontFamily: FONTS.Poppins,
    marginBottom: 10,
  },
  appointmentTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    fontFamily: FONTS.Poppins,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    fontFamily: FONTS.Poppins,
  },
  sosButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#FF6B6B',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
});