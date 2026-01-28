import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
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

export default function QuickProfile() {
  const navigation = useNavigation();

  const user = {
    name: 'Alexander Johnson',
    age: 56,
    dob: '05 Jul 1989',
    avatar: 'https://via.placeholder.com/60',
    email: 'alex.johnson@email.com',
  };

  const menuItems = [
    { id: 4, title: 'Subscription Plans', icon: 'shield-checkmark', screen: 'Subscriptions' },
    { id: 5, title: 'Payment Methods', icon: 'card', screen: 'PaymentMethods' },
    { id: 6, title: 'Wallet & Tokens', icon: 'wallet', screen: 'Wallet' },
    { id: 7, title: 'Payment History', icon: 'receipt', screen: 'History' },
    { id: 8, title: 'Notification settings', icon: 'notifications', screen: 'Notifications' },
    { id: 9, title: 'Privacy Policy', icon: 'shield', screen: 'Privacy' },
    { id: 10, title: 'Security Settings', icon: 'lock-closed', screen: 'Security' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <TouchableOpacity style={styles.profileCard} onPress={() => navigation.navigate('EditProfile')}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileMeta}>{user.age} y.o. ({user.dob})</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={COLORS.textLight} />
        </TouchableOpacity>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuItem, index === menuItems.length - 1 && styles.menuItemLast]}
              onPress={() => navigation.navigate(item.screen)}>
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon} size={22} color={COLORS.primary} />
              </View>
              <Text style={styles.menuText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={() => {}}>
            <View style={[styles.menuIconContainer, styles.logoutIcon]}>
              <Ionicons name="log-out-outline" size={22} color="#DC143C" />
            </View>
            <Text style={[styles.menuText, styles.logoutText]}>Log out</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, backgroundColor: 'white',
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: COLORS.textDark, fontFamily: FONTS.Poppins },
  content: { flex: 1, paddingHorizontal: 16 },
  profileCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'white',
    borderRadius: 16, padding: 16, marginTop: 20, marginBottom: 24,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 }, elevation: 3,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#E0E0E0' },
  profileInfo: { flex: 1, marginLeft: 16 },
  profileName: { fontSize: 17, fontWeight: '700', color: '#1A1A1A', fontFamily: FONTS.Poppins, marginBottom: 2 },
  profileMeta: { fontSize: 13, color: COLORS.textLight, fontFamily: FONTS.Poppins, marginBottom: 2 },
  profileEmail: { fontSize: 12, color: '#999', fontFamily: FONTS.Poppins },
  menuContainer: {
    backgroundColor: 'white', borderRadius: 16,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 }, elevation: 3, overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 16,
    borderBottomWidth: 1, borderBottomColor: '#F5F5F5',
  },
  menuItemLast: { borderBottomWidth: 0 },
  menuIconContainer: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: `${COLORS.primary}15`,
    justifyContent: 'center', alignItems: 'center', marginRight: 14,
  },
  menuText: { flex: 1, fontSize: 15, fontWeight: '600', color: '#1A1A1A', fontFamily: FONTS.Poppins },
  logoutItem: { borderTopWidth: 1, borderTopColor: '#F5F5F5', marginTop: 0 },
  logoutIcon: { backgroundColor: '#FFE5E5' },
  logoutText: { color: '#DC143C' },
});