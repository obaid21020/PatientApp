import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS } from '../themes/regTheme';

// You can adjust the props as needed for flexibility
export default function DashboardHeader({
  profileImageUrl,
  healthScore = '85%',
  userName = 'John',
  isPro = true,
  isCollapsed = false,
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      {/* Notification Icon */}
      <TouchableOpacity style={styles.notificationIcon} onPress={() => navigation.navigate('Notifications')}>
        <Ionicons name="notifications-outline" size={26} color={COLORS.white} />
        <View style={styles.notificationBadge} />
      </TouchableOpacity>

      {/* Center Content: Expanded or Collapsed */}
      <View style={styles.centerContent}>
        {isCollapsed ? (
          <Text style={styles.nairaClinicText}>NairaClinic</Text>
        ) : (
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.greetingText}>Good morning, {userName}!</Text>
            <View style={styles.tagsRow}>
              <View style={styles.healthTag}>
                <Ionicons name="checkmark-circle" size={16} color="#22C55E" style={{ marginRight: 4 }} />
                <Text style={styles.healthText}>{healthScore} Healthy</Text>
              </View>
              {isPro && (
                <View style={styles.proTag}>
                  <Ionicons name="star" size={14} color="#FBBF24" style={{ marginRight: 3 }} />
                  <Text style={styles.proText}>Pro Member</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </View>

      {/* Profile Pic */}
      <TouchableOpacity onPress={() => navigation.navigate('QuickProfile')}>
        <Image
          source={{ uri: profileImageUrl || 'https://via.placeholder.com/40' }}
          style={styles.profileImage}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0F766E',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    zIndex: 10,
  },
  notificationIcon: {
    position: 'relative',
    padding: 4,
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6B6B',
    borderWidth: 2,
    borderColor: '#0F766E',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nairaClinicText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: FONTS.Poppins,
    letterSpacing: 1,
  },
  greetingText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: FONTS.Poppins,
    marginBottom: 20,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  healthTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 6,
  },
  healthText: {
    color: '#22C55E', // bright green
    fontWeight: '700',
    fontSize: 13,
    fontFamily: FONTS.Poppins,
  },
  proTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  proText: {
    color: '#F59E42',
    fontWeight: '700',
    fontSize: 13,
    fontFamily: FONTS.Poppins,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    borderWidth: 2,
    borderColor: '#fff',
  },
});
