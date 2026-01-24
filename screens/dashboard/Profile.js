import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
    Alert,
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

export default function Profile() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('profile');
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/120');

  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+234 800 123 4567',
    dob: '1990-01-15',
    address: '123 Main Street, Lagos, Nigeria',
    emergencyContact: '+234 800 765 4321',
  });

  const [activeSubscription, setActiveSubscription] = useState('family');
  const [walletBalance, setWalletBalance] = useState(12500);

  const subscriptions = [
    {
      id: 'individual',
      name: 'Individual Plan',
      price: '₦2,500',
      period: 'Monthly',
      features: ['Unlimited consultations', '24/7 support', 'Health records'],
      popular: false,
    },
    {
      id: 'couple',
      name: 'Couple Plan',
      price: '₦4,000',
      period: 'Monthly',
      features: ['Everything in Individual', '2 accounts', 'Shared records'],
      popular: false,
    },
    {
      id: 'family',
      name: 'Family Plan',
      price: '₦6,000',
      period: 'Monthly',
      features: ['Everything in Couple', 'Up to 5 members', 'Priority support'],
      popular: true,
    },
  ];

  const transactions = [
    {
      id: 1,
      date: '2024-12-15',
      type: 'Subscription',
      amount: -6000,
      status: 'Completed',
      description: 'Family Plan - December 2024',
    },
    {
      id: 2,
      date: '2024-12-10',
      type: 'Consultation',
      amount: -5000,
      status: 'Completed',
      description: 'Video consultation with Dr. Johnson',
    },
    {
      id: 3,
      date: '2024-12-08',
      type: 'Payment',
      amount: 20000,
      status: 'Completed',
      description: 'Wallet Top-up',
    },
    {
      id: 4,
      date: '2024-12-01',
      type: 'Consultation',
      amount: -3500,
      status: 'Completed',
      description: 'Text chat consultation',
    },
  ];

  const savedCards = [
    {
      id: 1,
      type: 'Visa',
      lastFour: '4242',
      expires: '12/28',
      name: 'John Doe',
      isPrimary: true,
      color: '#1976D2',
    },
    {
      id: 2,
      type: 'Mastercard',
      lastFour: '8888',
      expires: '09/27',
      name: 'John Doe',
      isPrimary: false,
      color: '#D32F2F',
    },
  ];

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'person-outline' },
    { id: 'privacy', label: 'Privacy', icon: 'shield-outline' },
    { id: 'security', label: 'Security', icon: 'lock-closed-outline' },
  ];

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleChangeProfileImage = () => {
    Alert.alert(
      'Change Profile Photo',
      'Choose an option',
      [
        {
          text: 'Take Photo',
          onPress: () => {
            // Here you would integrate with expo-image-picker camera
            console.log('Open camera');
          },
        },
        {
          text: 'Choose from Gallery',
          onPress: () => {
            // Here you would integrate with expo-image-picker gallery
            console.log('Open gallery');
          },
        },
        {
          text: 'Remove Photo',
          onPress: () => setProfileImage('https://via.placeholder.com/120'),
          style: 'destructive',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const formatAmount = (amount) => {
    const absAmount = Math.abs(amount);
    return '₦' + absAmount.toLocaleString();
  };

  const renderProfileTab = () => (
    <>
      {/* Edit Profile */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="person" size={22} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Edit Profile</Text>
          </View>
        </View>

        {/* Profile Image Upload */}
        <View style={styles.profileImageSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: profileImage }}
              style={styles.profileImageLarge}
            />
            <TouchableOpacity
              style={styles.editImageButton}
              onPress={handleChangeProfileImage}
            >
              <Ionicons name="camera" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleChangeProfileImage}>
            <Text style={styles.changePhotoText}>Change Profile Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formGrid}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.textInput}
              value={profile.fullName}
              onChangeText={(value) => handleProfileChange('fullName', value)}
              placeholder="Enter full name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              value={profile.email}
              onChangeText={(value) => handleProfileChange('email', value)}
              placeholder="Enter email"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.textInput}
              value={profile.phone}
              onChangeText={(value) => handleProfileChange('phone', value)}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Date of Birth</Text>
            <TextInput
              style={styles.textInput}
              value={profile.dob}
              onChangeText={(value) => handleProfileChange('dob', value)}
              placeholder="YYYY-MM-DD"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Address</Text>
            <TextInput
              style={styles.textInput}
              value={profile.address}
              onChangeText={(value) => handleProfileChange('address', value)}
              placeholder="Enter address"
              multiline
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Emergency Contact</Text>
            <TextInput
              style={styles.textInput}
              value={profile.emergencyContact}
              onChangeText={(value) => handleProfileChange('emergencyContact', value)}
              placeholder="Enter emergency contact"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.formActions}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Subscriptions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="shield-checkmark" size={22} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Subscriptions</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.subscriptionsScroll}
          contentContainerStyle={styles.subscriptionsContent}
        >
          {subscriptions.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.subscriptionCard,
                plan.id === activeSubscription && styles.subscriptionCardActive,
              ]}
              onPress={() => setActiveSubscription(plan.id)}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>Popular</Text>
                </View>
              )}
              
              {plan.id === activeSubscription && (
                <View style={styles.activeCheck}>
                  <Ionicons name="checkmark-circle" size={22} color={COLORS.primary} />
                </View>
              )}

              <Text style={styles.planName}>{plan.name}</Text>
              <View style={styles.planPriceRow}>
                <Text style={styles.planPrice}>{plan.price}</Text>
                <Text style={styles.planPeriod}>/{plan.period}</Text>
              </View>

              <View style={styles.planFeatures}>
                {plan.features.map((feature, idx) => (
                  <View key={idx} style={styles.featureRow}>
                    <Ionicons name="checkmark" size={14} color="#4CAF50" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={[
                  styles.planButton,
                  plan.id === activeSubscription ? styles.planButtonActive : styles.planButtonOutline,
                ]}
              >
                <Text
                  style={[
                    styles.planButtonText,
                    plan.id === activeSubscription
                      ? styles.planButtonTextActive
                      : styles.planButtonTextOutline,
                  ]}
                >
                  {plan.id === activeSubscription ? 'Current Plan' : 'Switch Plan'}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Payment Methods */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="card" size={22} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Payment Methods</Text>
          </View>
          <TouchableOpacity
            style={styles.addCardButton}
            onPress={() => setShowAddCardModal(true)}
          >
            <Ionicons name="add" size={16} color={COLORS.primary} />
            <Text style={styles.addCardText}>Add Card</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardsList}>
          {savedCards.map((card) => (
            <View
              key={card.id}
              style={[
                styles.cardItem,
                card.isPrimary && styles.cardItemPrimary,
              ]}
            >
              <View style={styles.cardLeft}>
                <View style={[styles.cardIcon, { backgroundColor: card.color }]}>
                  <Ionicons name="card" size={18} color="#FFFFFF" />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardNumber}>•••• •••• •••• {card.lastFour}</Text>
                  <Text style={styles.cardExpiry}>Expires {card.expires}</Text>
                </View>
              </View>
              <View style={styles.cardRight}>
                {card.isPrimary && (
                  <View style={styles.primaryCardBadge}>
                    <Text style={styles.primaryCardText}>Primary</Text>
                  </View>
                )}
                <TouchableOpacity>
                  <Ionicons name="ellipsis-vertical" size={18} color="#9E9E9E" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.securityNote}>
          <Ionicons name="shield-checkmark" size={18} color="#1976D2" />
          <View style={styles.securityNoteContent}>
            <Text style={styles.securityNoteTitle}>Secure Payment Processing</Text>
            <Text style={styles.securityNoteText}>
              Your payment information is encrypted and securely stored.
            </Text>
          </View>
        </View>
      </View>

      {/* Wallet & Tokens */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="wallet" size={22} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Tokens & Wallet</Text>
          </View>
        </View>

        <View style={styles.walletCard}>
          <Text style={styles.walletLabel}>Current Balance</Text>
          <Text style={styles.walletBalance}>₦{walletBalance.toLocaleString()}</Text>
          <Text style={styles.walletSubtext}>Available for consultations</Text>
        </View>

        <View style={styles.walletActions}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setShowTopUpModal(true)}
          >
            <Ionicons name="add" size={18} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Top Up Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="document-text-outline" size={18} color={COLORS.primary} />
            <Text style={styles.secondaryButtonText}>View Token History</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickTopUp}>
          <Text style={styles.quickTopUpTitle}>Quick Top-Up Options</Text>
          <View style={styles.quickTopUpGrid}>
            {[5000, 10000, 20000].map((amount) => (
              <TouchableOpacity
                key={amount}
                style={styles.quickTopUpItem}
                onPress={() => setWalletBalance((prev) => prev + amount)}
              >
                <Text style={styles.quickTopUpAmount}>₦{amount.toLocaleString()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Payment History */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="receipt" size={22} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Payment History</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="filter-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsList}>
          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={styles.transactionDotRow}>
                  <View
                    style={[
                      styles.transactionDot,
                      { backgroundColor: transaction.amount > 0 ? '#4CAF50' : '#F44336' },
                    ]}
                  />
                  <Text style={styles.transactionType}>{transaction.type}</Text>
                </View>
                <Text style={styles.transactionDesc}>{transaction.description}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <View style={styles.transactionRight}>
                <Text
                  style={[
                    styles.transactionAmount,
                    { color: transaction.amount > 0 ? '#4CAF50' : '#F44336' },
                  ]}
                >
                  {transaction.amount > 0 ? '+' : '-'}{formatAmount(transaction.amount)}
                </Text>
                <View style={styles.transactionStatus}>
                  <Text style={styles.transactionStatusText}>{transaction.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All Transactions</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderPrivacyTab = () => (
    <View style={styles.section}>
      <Text style={styles.privacyTitle}>Privacy Policy</Text>

      <View style={styles.privacySection}>
        <Text style={styles.privacySectionTitle}>Data Collection</Text>
        <Text style={styles.privacyText}>
          We collect personal information that you provide to us such as name, address,
          contact information, passwords and security data, payment information, and medical history.
        </Text>
        <View style={styles.privacyList}>
          <View style={styles.privacyListItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.privacyListText}>Personal identification information</Text>
          </View>
          <View style={styles.privacyListItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.privacyListText}>Medical history and health records</Text>
          </View>
          <View style={styles.privacyListItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.privacyListText}>Payment and billing information</Text>
          </View>
          <View style={styles.privacyListItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.privacyListText}>Usage data and device information</Text>
          </View>
        </View>
      </View>

      <View style={styles.privacySection}>
        <Text style={styles.privacySectionTitle}>How We Use Your Information</Text>
        <Text style={styles.privacyText}>We use the information we collect or receive:</Text>
        <View style={styles.privacyList}>
          <View style={styles.privacyListItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.privacyListText}>To provide and maintain our healthcare services</Text>
          </View>
          <View style={styles.privacyListItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.privacyListText}>To facilitate consultations with healthcare providers</Text>
          </View>
          <View style={styles.privacyListItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.privacyListText}>To process payments and manage subscriptions</Text>
          </View>
          <View style={styles.privacyListItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.privacyListText}>To send you medical reminders and health updates</Text>
          </View>
        </View>
      </View>

      <View style={styles.privacySection}>
        <Text style={styles.privacySectionTitle}>Your Rights</Text>
        <Text style={styles.privacyText}>Under NDPR, you have the following rights:</Text>
        <View style={styles.privacyList}>
          <View style={styles.privacyListItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.privacyListText}>Right to access your personal data</Text>
          </View>
          <View style={styles.privacyListItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.privacyListText}>Right to rectification of inaccurate data</Text>
          </View>
          <View style={styles.privacyListItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.privacyListText}>Right to erasure (right to be forgotten)</Text>
          </View>
          <View style={styles.privacyListItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.privacyListText}>Right to data portability</Text>
          </View>
        </View>
      </View>

      <View style={styles.privacySection}>
        <Text style={styles.privacySectionTitle}>Contact Us</Text>
        <Text style={styles.privacyText}>
          If you have any questions about this Privacy Policy, please contact our
          Data Protection Officer at privacy@nairaclinic.com or +234 800 000 0000.
        </Text>
      </View>
    </View>
  );

  const renderSecurityTab = () => (
    <View style={styles.section}>
      <Text style={styles.privacyTitle}>Security</Text>

      <View style={styles.securitySection}>
        <Text style={styles.privacySectionTitle}>Data Encryption</Text>
        <Text style={styles.privacyText}>
          All your medical records and personal information are encrypted using
          industry-standard AES-256 encryption, both in transit and at rest.
        </Text>
        <View style={styles.securityStatusCard}>
          <Ionicons name="shield-checkmark" size={20} color="#4CAF50" />
          <View style={styles.securityStatusContent}>
            <Text style={styles.securityStatusTitle}>Your data is secure</Text>
            <Text style={styles.securityStatusText}>
              We use bank-level encryption to protect your information
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.securitySection}>
        <Text style={styles.privacySectionTitle}>Access Control</Text>
        <Text style={styles.privacyText}>
          Only authorized healthcare professionals involved in your care can access
          your medical records. All access is logged and monitored.
        </Text>
        <View style={styles.accessControlGrid}>
          <View style={styles.accessControlCard}>
            <Ionicons name="lock-closed" size={22} color={COLORS.primary} />
            <Text style={styles.accessControlTitle}>PIN Protection</Text>
            <Text style={styles.accessControlText}>5-digit PIN required</Text>
          </View>
          <View style={styles.accessControlCard}>
            <Ionicons name="finger-print" size={22} color={COLORS.primary} />
            <Text style={styles.accessControlTitle}>Biometric Auth</Text>
            <Text style={styles.accessControlText}>Fingerprint or Face ID</Text>
          </View>
        </View>
      </View>

      <View style={styles.securitySection}>
        <Text style={styles.privacySectionTitle}>Compliance & Certifications</Text>
        <Text style={styles.privacyText}>
          NairaClinic is fully compliant with Nigerian Data Protection Regulation (NDPR)
          and follows international healthcare data standards.
        </Text>
        <View style={styles.complianceGrid}>
          {[
            { name: 'NDPR', status: 'Compliant' },
            { name: 'ISO 27001', status: 'Certified' },
            { name: 'HIPAA', status: 'Aligned' },
            { name: 'SSL/TLS', status: 'Encrypted' },
          ].map((item, idx) => (
            <View key={idx} style={styles.complianceItem}>
              <Text style={styles.complianceName}>{item.name}</Text>
              <Text style={styles.complianceStatus}>{item.status}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.securitySection}>
        <Text style={styles.privacySectionTitle}>Reporting Security Issues</Text>
        <Text style={styles.privacyText}>
          If you discover a security vulnerability, please report it immediately to our security team.
        </Text>
        <TouchableOpacity style={styles.reportButton}>
          <Text style={styles.reportButtonText}>Report Security Issue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile & Wallet</Text>
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

      {/* Tab Navigation */}
      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.tabActive]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Ionicons
                name={tab.icon}
                size={18}
                color={activeTab === tab.id ? COLORS.primary : '#9E9E9E'}
              />
              <Text
                style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerIcon}>
            <Ionicons name="person-circle" size={24} color={COLORS.primary} />
          </View>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Profile & Wallet</Text>
            <Text style={styles.bannerDescription}>
              Manage your account settings, subscriptions, tokens, and payments.
            </Text>
          </View>
        </View>

        {activeTab === 'profile' && renderProfileTab()}
        {activeTab === 'privacy' && renderPrivacyTab()}
        {activeTab === 'security' && renderSecurityTab()}
      </ScrollView>

      {/* Top Up Modal */}
      <Modal
        visible={showTopUpModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTopUpModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Top Up Wallet</Text>
              <TouchableOpacity onPress={() => setShowTopUpModal(false)}>
                <Ionicons name="close" size={24} color="#757575" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Amount (₦)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter amount"
                  keyboardType="numeric"
                />
              </View>

              <Text style={styles.quickSelectLabel}>Quick Select</Text>
              <View style={styles.quickSelectGrid}>
                {[5000, 10000, 20000, 50000].map((amount) => (
                  <TouchableOpacity key={amount} style={styles.quickSelectItem}>
                    <Text style={styles.quickSelectAmount}>₦{amount.toLocaleString()}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Payment Method</Text>
                <TouchableOpacity style={styles.selectInput}>
                  <Text style={styles.selectText}>•••• 4242 (Visa)</Text>
                  <Ionicons name="chevron-down" size={20} color="#9E9E9E" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowTopUpModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => setShowTopUpModal(false)}
              >
                <Text style={styles.submitButtonText}>Top Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Card Modal */}
      <Modal
        visible={showAddCardModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddCardModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Card</Text>
              <TouchableOpacity onPress={() => setShowAddCardModal(false)}>
                <Ionicons name="close" size={24} color="#757575" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Card Number</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="1234 5678 9012 3456"
                  keyboardType="numeric"
                  maxLength={19}
                />
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.inputLabel}>Expiry Date</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.inputLabel}>CVV</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="123"
                    keyboardType="numeric"
                    maxLength={3}
                    secureTextEntry
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Cardholder Name</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="JOHN DOE"
                  autoCapitalize="characters"
                />
              </View>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddCardModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => setShowAddCardModal(false)}
              >
                <Text style={styles.submitButtonText}>Add Card</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
  tabsContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabsContent: {
    paddingHorizontal: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    gap: 6,
  },
  tabActive: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9E9E9E',
    fontFamily: 'Poppins',
  },
  tabTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
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
  profileImageSection: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 8,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  profileImageLarge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E0E0E0',
    borderWidth: 4,
    borderColor: COLORS.primary,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  changePhotoText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
  formGrid: {
    gap: 12,
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#424242',
    fontFamily: 'Poppins',
    marginBottom: 6,
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
  formActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
  subscriptionsScroll: {
    marginHorizontal: -16,
  },
  subscriptionsContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  subscriptionCard: {
    width: width * 0.65,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginRight: 12,
  },
  subscriptionCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: `${COLORS.primary}08`,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    left: '50%',
    transform: [{ translateX: -30 }],
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
  activeCheck: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  planName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
    marginBottom: 8,
    marginTop: 4,
  },
  planPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
  planPeriod: {
    fontSize: 12,
    color: '#757575',
    fontFamily: 'Poppins',
    marginLeft: 4,
  },
  planFeatures: {
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  featureText: {
    fontSize: 12,
    color: '#616161',
    fontFamily: 'Poppins',
  },
  planButton: {
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  planButtonActive: {
    backgroundColor: COLORS.primary,
  },
  planButtonOutline: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: 'transparent',
  },
  planButtonText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  planButtonTextActive: {
    color: '#FFFFFF',
  },
  planButtonTextOutline: {
    color: COLORS.primary,
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 6,
  },
  addCardText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
  cardsList: {
    gap: 12,
  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cardItemPrimary: {
    borderColor: COLORS.primary,
    backgroundColor: `${COLORS.primary}08`,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardIcon: {
    width: 40,
    height: 28,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: {},
  cardNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
  },
  cardExpiry: {
    fontSize: 11,
    color: '#757575',
    fontFamily: 'Poppins',
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  primaryCardBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  primaryCardText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#2E7D32',
    fontFamily: 'Poppins',
  },
  securityNote: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  securityNoteContent: {
    flex: 1,
  },
  securityNoteTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1565C0',
    fontFamily: 'Poppins',
    marginBottom: 2,
  },
  securityNoteText: {
    fontSize: 12,
    color: '#1976D2',
    fontFamily: 'Poppins',
  },
  walletCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  walletLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
  walletBalance: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
  walletSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Poppins',
  },
  walletActions: {
    gap: 10,
    marginBottom: 16,
  },
  quickTopUp: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 16,
  },
  quickTopUpTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#424242',
    fontFamily: 'Poppins',
    marginBottom: 12,
  },
  quickTopUpGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  quickTopUpItem: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  quickTopUpAmount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#424242',
    fontFamily: 'Poppins',
  },
  transactionsList: {
    gap: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 14,
  },
  transactionLeft: {
    flex: 1,
  },
  transactionDotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  transactionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  transactionType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
  },
  transactionDesc: {
    fontSize: 12,
    color: '#757575',
    fontFamily: 'Poppins',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 11,
    color: '#9E9E9E',
    fontFamily: 'Poppins',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
  transactionStatus: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  transactionStatusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#2E7D32',
    fontFamily: 'Poppins',
  },
  viewAllButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
  privacyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
    marginBottom: 20,
  },
  privacySection: {
    marginBottom: 24,
  },
  privacySectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
    marginBottom: 10,
  },
  privacyText: {
    fontSize: 14,
    color: '#616161',
    fontFamily: 'Poppins',
    lineHeight: 22,
    marginBottom: 12,
  },
  privacyList: {
    gap: 8,
  },
  privacyListItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#616161',
    lineHeight: 22,
  },
  privacyListText: {
    flex: 1,
    fontSize: 14,
    color: '#616161',
    fontFamily: 'Poppins',
    lineHeight: 22,
  },
  securitySection: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 24,
  },
  securityStatusCard: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  securityStatusContent: {
    flex: 1,
  },
  securityStatusTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32',
    fontFamily: 'Poppins',
    marginBottom: 2,
  },
  securityStatusText: {
    fontSize: 12,
    color: '#4CAF50',
    fontFamily: 'Poppins',
  },
  accessControlGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  accessControlCard: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  accessControlTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
    marginTop: 8,
    marginBottom: 2,
  },
  accessControlText: {
    fontSize: 11,
    color: '#757575',
    fontFamily: 'Poppins',
  },
  complianceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
  },
  complianceItem: {
    width: (width - 88) / 2,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  complianceName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
  },
  complianceStatus: {
    fontSize: 11,
    color: '#757575',
    fontFamily: 'Poppins',
    marginTop: 2,
  },
  reportButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  reportButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: 'Poppins',
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
  inputRow: {
    flexDirection: 'row',
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
  selectText: {
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: 'Poppins',
  },
  quickSelectLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#424242',
    fontFamily: 'Poppins',
    marginBottom: 10,
  },
  quickSelectGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  quickSelectItem: {
    width: (width - 74) / 2,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  quickSelectAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#424242',
    fontFamily: 'Poppins',
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
});
