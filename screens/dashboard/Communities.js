import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../themes/regTheme';

const { width } = Dimensions.get('window');

export default function Communities() {
  const navigation = useNavigation();
  const [joinedGroups, setJoinedGroups] = useState(['diabetes', 'hypertension']);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'free', 'paid'
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const allGroups = [
    {
      id: 'diabetes',
      name: 'Diabetes Support Group',
      category: 'Chronic Conditions',
      members: 1250,
      posts: 756,
      price: 'Free',
      isPaid: false,
      description: 'Connect with others managing diabetes. Share tips, experiences, and support.',
      icon: 'checkmark-circle-outline',
      color: '#4CAF50',
      badge: 'Active',
    },
    {
      id: 'hypertension',
      name: 'Hypertension Management',
      category: 'Chronic Conditions',
      members: 890,
      posts: 423,
      price: '₦2,500/month',
      isPaid: true,
      description: 'Learn about managing high blood pressure and lifestyle changes.',
      icon: 'heart-outline',
      color: '#E91E63',
      badge: 'Popular',
    },
    {
      id: 'pregnancy',
      name: 'Expecting Mothers',
      category: 'Maternal Health',
      members: 2100,
      posts: 1234,
      price: 'Free',
      isPaid: false,
      description: 'A safe space for expecting and new mothers to share experiences.',
      icon: 'people-outline',
      color: '#9C27B0',
      badge: 'Trending',
    },
    {
      id: 'mental',
      name: 'Mental Wellness Circle',
      category: 'Mental Health',
      members: 1650,
      posts: 892,
      price: '₦1,800/month',
      isPaid: true,
      description: 'Support for mental health and emotional well-being.',
      icon: 'bulb-outline',
      color: '#FF9800',
      badge: null,
    },
    {
      id: 'cancer',
      name: 'Cancer Survivors Network',
      category: 'Chronic Conditions',
      members: 750,
      posts: 345,
      price: 'Free',
      isPaid: false,
      description: 'Support network for cancer patients and survivors.',
      icon: 'shield-checkmark-outline',
      color: '#2196F3',
      badge: null,
    },
    {
      id: 'nutrition',
      name: 'Healthy Living & Nutrition',
      category: 'Lifestyle',
      members: 3200,
      posts: 1876,
      price: 'Free',
      isPaid: false,
      description: 'Tips on healthy eating, meal planning, and nutrition.',
      icon: 'book-outline',
      color: '#00BCD4',
      badge: 'Popular',
    },
  ];

  const chatRooms = [
    {
      id: 'general',
      name: 'General Discussion',
      online: 45,
      description: 'General health discussions and Q&A',
      isModerated: true,
      recentActivity: '2 mins ago',
    },
    {
      id: 'questions',
      name: 'Ask a Doctor',
      online: 12,
      description: 'Get answers from medical professionals',
      isModerated: true,
      recentActivity: '5 mins ago',
    },
    {
      id: 'tips',
      name: 'Health Tips & Tricks',
      online: 78,
      description: 'Share health tips and wellness advice',
      isModerated: true,
      recentActivity: 'Just now',
    },
    {
      id: 'support',
      name: 'Peer Support Room',
      online: 34,
      description: 'Emotional support and encouragement',
      isModerated: true,
      recentActivity: '8 mins ago',
    },
  ];

  const handleJoinGroup = (groupId) => {
    if (!joinedGroups.includes(groupId)) {
      setJoinedGroups([...joinedGroups, groupId]);
    }
  };

  const handleLeaveGroup = (groupId) => {
    setJoinedGroups(joinedGroups.filter((id) => id !== groupId));
  };

  // Filter groups based on search and filter type
  const filteredGroups = allGroups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'free' && !group.isPaid) ||
      (filterType === 'paid' && group.isPaid);
    return matchesSearch && matchesFilter;
  });

  const myGroups = allGroups.filter((group) => joinedGroups.includes(group.id));
  const discoverGroups = filteredGroups.filter((group) => !joinedGroups.includes(group.id));

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const renderMyGroupCard = (group) => (
    <TouchableOpacity key={group.id} style={styles.myGroupCard}>
      <View style={styles.myGroupHeader}>
        <View style={[styles.groupIconSmall, { backgroundColor: `${group.color}20` }]}>
          <Ionicons name={group.icon} size={20} color={group.color} />
        </View>
        <View style={styles.myGroupInfo}>
          <Text style={styles.myGroupName} numberOfLines={1}>{group.name}</Text>
          <Text style={styles.myGroupMembers}>{formatNumber(group.members)} members</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderDiscoverGroupCard = (group) => (
    <View key={group.id} style={styles.discoverGroupCard}>
      <View style={styles.discoverGroupHeader}>
        <View style={[styles.groupIcon, { backgroundColor: `${group.color}20` }]}>
          <Ionicons name={group.icon} size={24} color={group.color} />
        </View>
        <View style={styles.discoverGroupInfo}>
          <View style={styles.discoverGroupTitleRow}>
            <Text style={styles.discoverGroupName} numberOfLines={1}>{group.name}</Text>
            <View style={[
              styles.priceBadge,
              { backgroundColor: group.isPaid ? '#FFF3E0' : '#E8F5E9' }
            ]}>
              <Text style={[
                styles.priceText,
                { color: group.isPaid ? '#E65100' : '#2E7D32' }
              ]}>{group.price}</Text>
            </View>
          </View>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{group.category}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.groupDescription} numberOfLines={2}>{group.description}</Text>

      <View style={styles.groupStats}>
        <View style={styles.statItem}>
          <Ionicons name="people-outline" size={14} color="#757575" />
          <Text style={styles.statText}>{formatNumber(group.members)} members</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="chatbubble-outline" size={14} color="#757575" />
          <Text style={styles.statText}>{group.posts} posts</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.discoverButton}>
        <Text style={styles.discoverButtonText}>Discover</Text>
      </TouchableOpacity>
    </View>
  );

  const renderChatRoomCard = (room) => (
    <TouchableOpacity key={room.id} style={styles.chatRoomCard}>
      <View style={styles.chatRoomLeft}>
        <View style={styles.chatRoomIconContainer}>
          <View style={styles.chatRoomIcon}>
            <Ionicons name="chatbubbles" size={20} color="#FFFFFF" />
          </View>
          <View style={styles.onlineIndicator} />
        </View>
        <View style={styles.chatRoomInfo}>
          <View style={styles.chatRoomTitleRow}>
            <Text style={styles.chatRoomName}>{room.name}</Text>
            {room.isModerated && (
              <View style={styles.moderatedBadge}>
                <Ionicons name="shield-checkmark" size={10} color="#1976D2" />
                <Text style={styles.moderatedText}>Moderated</Text>
              </View>
            )}
          </View>
          <Text style={styles.chatRoomDescription} numberOfLines={1}>{room.description}</Text>
          <View style={styles.chatRoomMeta}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>{room.online} online</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.activityText}>{room.recentActivity}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.enterButton}>
        <Text style={styles.enterButtonText}>Enter</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Communities</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationIcon} onPress={() => navigation.navigate('Notifications')}>
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
            <Ionicons name="people" size={24} color={COLORS.primary} />
          </View>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Communities</Text>
            <Text style={styles.bannerDescription}>
              Connect with others, share experiences, and find support in our health communities.
            </Text>
          </View>
        </View>

        {/* My Communities Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="heart" size={22} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>My Communities</Text>
            </View>
            <TouchableOpacity 
              style={styles.addCommunityButton}
              onPress={() => setShowCreateModal(true)}
            >
              <Ionicons name="add" size={16} color={COLORS.primary} />
              <Text style={styles.addCommunityText}>Add</Text>
            </TouchableOpacity>
          </View>

          {myGroups.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="people-outline" size={48} color="#BDBDBD" />
              <Text style={styles.emptyTitle}>No communities joined yet</Text>
              <Text style={styles.emptySubtitle}>Discover and join communities below to get started</Text>
            </View>
          ) : (
            <View style={styles.myGroupsGrid}>
              {myGroups.map(renderMyGroupCard)}
            </View>
          )}
        </View>

        {/* Discover Communities Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="search" size={22} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Discover Communities</Text>
            </View>
          </View>

          {/* Search and Filter */}
          <View style={styles.searchFilterRow}>
            <View style={styles.searchContainer}>
              <Ionicons name="search-outline" size={18} color="#9E9E9E" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search communities..."
                placeholderTextColor="#9E9E9E"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => setShowFilterModal(true)}
            >
              <Ionicons name="filter-outline" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {/* Filter Pills */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.filterPillsScroll}
            contentContainerStyle={styles.filterPillsContent}
          >
            {['all', 'free', 'paid'].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterPill,
                  filterType === filter && styles.filterPillActive
                ]}
                onPress={() => setFilterType(filter)}
              >
                <Text style={[
                  styles.filterPillText,
                  filterType === filter && styles.filterPillTextActive
                ]}>
                  {filter === 'all' ? 'All' : filter === 'free' ? 'Free' : 'Paid'}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Discover Groups Grid */}
          {discoverGroups.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={40} color="#BDBDBD" />
              <Text style={styles.emptyTitle}>No communities found</Text>
              <Text style={styles.emptySubtitle}>Try adjusting your search or filter</Text>
            </View>
          ) : (
            <View style={styles.discoverGroupsGrid}>
              {discoverGroups.map(renderDiscoverGroupCard)}
            </View>
          )}
        </View>

        {/* Chat Rooms Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="chatbubbles" size={22} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Chat Rooms</Text>
            </View>
            <Text style={styles.roomCount}>{chatRooms.length} active</Text>
          </View>

          <View style={styles.chatRoomsList}>
            {chatRooms.map(renderChatRoomCard)}
          </View>

          {/* Moderated Rooms Info */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={20} color={COLORS.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>About Moderated Rooms</Text>
              <Text style={styles.infoText}>
                All chat rooms are monitored by healthcare professionals to ensure safe, 
                respectful, and informative discussions.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Create Community Modal */}
      <Modal
        visible={showCreateModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Community</Text>
              <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                <Ionicons name="close" size={24} color="#757575" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Community Name</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter community name"
                  placeholderTextColor="#9E9E9E"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  placeholder="Describe your community"
                  placeholderTextColor="#9E9E9E"
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Category</Text>
                <TouchableOpacity style={styles.selectInput}>
                  <Text style={styles.selectPlaceholder}>Select category</Text>
                  <Ionicons name="chevron-down" size={20} color="#9E9E9E" />
                </TouchableOpacity>
              </View>

              <View style={styles.approvalNote}>
                <Ionicons name="information-circle" size={18} color="#1976D2" />
                <View style={styles.approvalNoteContent}>
                  <Text style={styles.approvalNoteTitle}>Admin Approval Required</Text>
                  <Text style={styles.approvalNoteText}>
                    Your community request will be reviewed by our admin team within 24-48 hours.
                  </Text>
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowCreateModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.submitButton}
                onPress={() => setShowCreateModal(false)}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowFilterModal(false)}
        >
          <View style={styles.filterModalContent}>
            <Text style={styles.filterModalTitle}>Filter Communities</Text>
            {['all', 'free', 'paid'].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={styles.filterOption}
                onPress={() => {
                  setFilterType(filter);
                  setShowFilterModal(false);
                }}
              >
                <Text style={styles.filterOptionText}>
                  {filter === 'all' ? 'All Communities' : filter === 'free' ? 'Free Communities' : 'Paid Communities'}
                </Text>
                {filterType === filter && (
                  <Ionicons name="checkmark" size={20} color={COLORS.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addCommunityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 6,
  },
  addCommunityText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#757575',
    fontFamily: 'Poppins',
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#9E9E9E',
    fontFamily: 'Poppins',
    marginTop: 4,
    textAlign: 'center',
  },
  myGroupsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  myGroupCard: {
    width: (width - 76) / 2,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  myGroupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  groupIconSmall: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myGroupInfo: {
    flex: 1,
  },
  myGroupName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
  },
  myGroupMembers: {
    fontSize: 11,
    color: '#757575',
    fontFamily: 'Poppins',
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
  searchFilterRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: 'Poppins',
    padding: 0,
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: `${COLORS.primary}10`,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterPillsScroll: {
    marginBottom: 16,
    marginHorizontal: -16,
  },
  filterPillsContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  filterPillActive: {
    backgroundColor: COLORS.primary,
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#757575',
    fontFamily: 'Poppins',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
  },
  discoverGroupsGrid: {
    gap: 12,
  },
  discoverGroupCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  discoverGroupHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 10,
  },
  groupIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discoverGroupInfo: {
    flex: 1,
  },
  discoverGroupTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  discoverGroupName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
    flex: 1,
    marginRight: 8,
  },
  priceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priceText: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  categoryBadge: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 10,
    color: '#757575',
    fontFamily: 'Poppins',
  },
  groupDescription: {
    fontSize: 13,
    color: '#616161',
    fontFamily: 'Poppins',
    lineHeight: 18,
    marginBottom: 12,
  },
  groupStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 11,
    color: '#757575',
    fontFamily: 'Poppins',
  },
  discoverButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
  },
  discoverButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
  roomCount: {
    fontSize: 12,
    color: '#9E9E9E',
    fontFamily: 'Poppins',
  },
  chatRoomsList: {
    gap: 10,
  },
  chatRoomCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 12,
  },
  chatRoomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  chatRoomIconContainer: {
    position: 'relative',
  },
  chatRoomIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#F5F5F5',
  },
  chatRoomInfo: {
    flex: 1,
  },
  chatRoomTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
    marginBottom: 2,
  },
  chatRoomName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
  },
  moderatedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    gap: 3,
  },
  moderatedText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#1976D2',
    fontFamily: 'Poppins',
  },
  chatRoomDescription: {
    fontSize: 11,
    color: '#757575',
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
  chatRoomMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
  },
  onlineText: {
    fontSize: 10,
    color: '#9E9E9E',
    fontFamily: 'Poppins',
  },
  metaDot: {
    fontSize: 10,
    color: '#9E9E9E',
  },
  activityText: {
    fontSize: 10,
    color: '#9E9E9E',
    fontFamily: 'Poppins',
  },
  enterButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  enterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: `${COLORS.primary}10`,
    borderRadius: 10,
    padding: 14,
    marginTop: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: `${COLORS.primary}30`,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#616161',
    fontFamily: 'Poppins',
    lineHeight: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
  },
  modalBody: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#424242',
    fontFamily: 'Poppins',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: 'Poppins',
    backgroundColor: '#FAFAFA',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  selectInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
  },
  selectPlaceholder: {
    fontSize: 14,
    color: '#9E9E9E',
    fontFamily: 'Poppins',
  },
  approvalNote: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  approvalNoteContent: {
    flex: 1,
  },
  approvalNoteTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1565C0',
    fontFamily: 'Poppins',
    marginBottom: 2,
  },
  approvalNoteText: {
    fontSize: 12,
    color: '#1976D2',
    fontFamily: 'Poppins',
    lineHeight: 16,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#757575',
    fontFamily: 'Poppins',
  },
  submitButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
  filterModalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 32,
    marginTop: 'auto',
    marginBottom: 'auto',
    padding: 16,
  },
  filterModalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
    marginBottom: 12,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#424242',
    fontFamily: 'Poppins',
  },
});
