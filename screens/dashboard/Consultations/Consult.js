import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../../themes/regTheme';

const CONVERSATIONS = [
  {
    id: 1,
    participant: {
      name: 'Dr. Sarah Johnson',
      avatar: 'https://via.placeholder.com/150/1976D2/FFFFFF?text=SJ',
      status: 'Online',
    },
    lastMessage: 'Any nausea or sensitivity to light with these headaches?',
    timestamp: '9:36 AM',
    unreadCount: 1,
    type: 'doctor',
  },
  {
    id: 2,
    participant: {
      name: 'NairaClinic Pharmacy',
      avatar: 'https://via.placeholder.com/150/4CAF50/FFFFFF?text=RX',
      status: 'Online',
    },
    lastMessage: 'Would you like same-day delivery for your prescription?',
    timestamp: '2:16 PM',
    unreadCount: 0,
    type: 'pharmacy',
  },
  {
    id: 3,
    participant: {
      name: 'Lab Results',
      avatar: 'https://via.placeholder.com/150/FF9800/FFFFFF?text=LAB',
      status: 'Automated',
    },
    lastMessage: 'Your cholesterol is slightly elevated at 220 mg/dL.',
    timestamp: 'Yesterday',
    unreadCount: 2,
    type: 'lab',
  },
  {
    id: 4,
    participant: {
      name: 'Dr. Michael Chen',
      avatar: 'https://via.placeholder.com/150/9C27B0/FFFFFF?text=MC',
      status: 'Offline',
    },
    lastMessage: 'Excellent. Keep monitoring and we\'ll review at your next appointment.',
    timestamp: 'Yesterday',
    unreadCount: 0,
    type: 'doctor',
  },
];

export default function Consult() {
  const navigation = useNavigation();

  const renderChatItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatItem}
      onPress={() => navigation.navigate('ChatConversation', {
        conversationId: item.id,
        participant: item.participant,
      })}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.participant.avatar }} style={styles.avatar} />
        {item.participant.status === 'Online' && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName} numberOfLines={1}>{item.participant.name}</Text>
          <Text style={styles.chatTime}>{item.timestamp}</Text>
        </View>
        
        <View style={styles.chatFooter}>
          <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Consultations</Text>
        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#999" />
          <Text style={styles.searchPlaceholder}>Search conversations...</Text>
        </View>
      </View>

      {/* Chat List */}
      <FlatList
        data={CONVERSATIONS}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />

      {/* New Consultation FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('NewConsultation')}>
        <Ionicons name="chatbubble-outline" size={28} color="white" />
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
  },
  headerIcon: {
    padding: 4,
  },
  searchContainer: {
    padding: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchPlaceholder: {
    fontSize: 14,
    color: '#999',
    fontFamily: FONTS.Poppins,
  },
  list: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: 'white',
  },
  chatInfo: {
    flex: 1,
    marginLeft: 12,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
    flex: 1,
    marginRight: 8,
  },
  chatTime: {
    fontSize: 12,
    color: '#999',
    fontFamily: FONTS.Poppins,
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    fontFamily: FONTS.Poppins,
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    fontSize: 11,
    fontWeight: '700',
    color: 'white',
    fontFamily: FONTS.Poppins,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});