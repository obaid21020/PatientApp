import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../themes/regTheme';

export default function Notifications() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Today');

  // Static notification data
  const urgentNotifications = [
    {
      id: 1,
      title: 'Heartbeat Abnormal ⚠️',
      message: 'Our AI think you have an abnormal heartbeat. Please call doctor!',
      icon: 'heart-outline',
      iconColor: '#DC143C',
      bgColor: '#FFE5E5',
      action: 'Schedule Appointment',
      actionIcon: 'call-outline',
    }
  ];

  const earlierNotifications = [
    {
      id: 2,
      title: 'Medication Reminder',
      message: 'You need 500mg Diazepam today!',
      icon: 'medical-outline',
      iconColor: '#4CAF50',
      bgColor: '#E8F5E9',
      hasProgress: true,
      progressColor: '#4CAF50',
    },
    {
      id: 3,
      title: 'Appointment with Dr. Gray',
      message: 'You have an appointment in 2h 15m!',
      time: '09:00 AM - 10:00 AM',
      icon: 'calendar-outline',
      iconColor: '#FF9800',
      bgColor: '#FFF3E0',
    },
    {
      id: 4,
      title: 'Osler Score Increased!',
      message: 'Previous: 64.2 → Now: 84.5',
      icon: 'trending-up-outline',
      iconColor: '#E91E63',
      bgColor: '#FCE4EC',
    },
    {
      id: 5,
      title: '52 New AI Chatbot Message!',
      message: 'Osler AI sent you 52 messages.',
      icon: 'chatbubble-ellipses-outline',
      iconColor: '#9C27B0',
      bgColor: '#F3E5F5',
    },
  ];

  const lastWeekNotifications = [
    {
      id: 6,
      title: '4,413 Steps Taken',
      message: 'Steps completed',
      icon: 'footsteps-outline',
      iconColor: '#757575',
      bgColor: '#F5F5F5',
      completed: true,
    },
    {
      id: 7,
      title: 'Health Data Ready!',
      message: 'Enjoy your AI Data analysis for Jan!',
      icon: 'document-text-outline',
      iconColor: '#424242',
      bgColor: '#F5F5F5',
      action: 'Download PDF',
      actionIcon: 'download-outline',
    },
    {
      id: 8,
      title: 'Drink More Water!',
      message: 'You need 250ml of water for today!',
      icon: 'water-outline',
      iconColor: '#757575',
      bgColor: '#F5F5F5',
      hasProgress: true,
      progressColor: '#9E9E9E',
    },
  ];

  const renderNotificationCard = (item) => (
    <View key={item.id} style={[styles.card, { backgroundColor:  '#FFF' }]}>
      <View style={styles.cardContent}>
        <View style={[styles.iconContainer, { backgroundColor: `${item.iconColor}20` }]}>
          <Ionicons name={item.icon} size={24} color={item.iconColor} />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          
          {item.time && (
            <View style={styles.timeRow}>
              <Ionicons name="time-outline" size={14} color={COLORS.textLight} />
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          )}
          
          <Text style={styles.cardMessage}>{item.message}</Text>
          
          {item.hasProgress && (
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { backgroundColor: item.progressColor, width: '60%' }]} />
            </View>
          )}
          
          {item.action && (
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: item.iconColor }]}>
              <Text style={styles.actionButtonText}>{item.action}</Text>
              <Ionicons name={item.actionIcon} size={14} color="#FFF" style={styles.actionIcon} />
            </TouchableOpacity>
          )}
        </View>
        
        {item.completed && (
          <View style={styles.checkmark}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Curved Green Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#FFF" />
          </TouchableOpacity>
          
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Notifications</Text>
            <Text style={styles.headerSubtitle}>You have 184 Total Notifications!</Text>
          </View>
          
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={styles.profileImage}
          />
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Today' && styles.tabActive]}
            onPress={() => setActiveTab('Today')}>
            <Text style={[styles.tabText, activeTab === 'Today' && styles.tabTextActive]}>
              Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Last Week' && styles.tabActive]}
            onPress={() => setActiveTab('Last Week')}>
            <Text style={[styles.tabText, activeTab === 'Last Week' && styles.tabTextActive]}>
              Last Week
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        
        {activeTab === 'Today' && (
          <>
            {/* Urgent Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Urgent (1)</Text>
                <TouchableOpacity>
                  <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.textLight} />
                </TouchableOpacity>
              </View>
              {urgentNotifications.map(renderNotificationCard)}
            </View>

            {/* Earlier Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Earlier (25)</Text>
                <TouchableOpacity>
                  <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.textLight} />
                </TouchableOpacity>
              </View>
              {earlierNotifications.map(renderNotificationCard)}
            </View>
          </>
        )}

        {activeTab === 'Last Week' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Last Week (11)</Text>
              <TouchableOpacity>
                <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>
            {lastWeekNotifications.map(renderNotificationCard)}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  headerContainer: {
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 25,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    fontFamily: FONTS.Poppins,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontFamily: FONTS.Poppins,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    padding: 4,
    marginTop: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  tabActive: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    fontFamily: FONTS.Poppins,
  },
  tabTextActive: {
    color: COLORS.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
    marginBottom: 4,
    lineHeight: 20,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: COLORS.textLight,
    fontFamily: FONTS.Poppins,
  },
  cardMessage: {
    fontSize: 13,
    color: '#666',
    fontFamily: FONTS.Poppins,
    lineHeight: 18,
    marginTop: 2,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 2,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: FONTS.Poppins,
  },
  actionIcon: {
    marginLeft: 4,
  },
  checkmark: {
    marginLeft: 10,
    justifyContent: 'center',
  },
});