import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Linking,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Vibration,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../themes/regTheme';

const { width } = Dimensions.get('window');
const LONG_PRESS_DURATION = 3000; // 3 seconds

export default function SOS() {
  const navigation = useNavigation();
  
  // SOS Button States
  const [isPressed, setIsPressed] = useState(false);
  const [pressDuration, setPressDuration] = useState(0);
  const [isActivated, setIsActivated] = useState(false);
  const pressStartTime = useRef(null);
  const pressInterval = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Settings States
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [editingContactIndex, setEditingContactIndex] = useState(null);
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', phone: '+234 801 234 5678', relationship: 'Father' },
    { id: 2, name: 'Jane Doe', phone: '+234 802 345 6789', relationship: 'Mother' },
  ]);
  
  // New contact form
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    relationship: '',
  });

  // Pulse animation for SOS button
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  // Handle SOS button press
  useEffect(() => {
    if (isPressed && !pressStartTime.current) {
      pressStartTime.current = Date.now();
      Vibration.vibrate([0, 100]); // Short vibration on press start
      
      pressInterval.current = setInterval(() => {
        if (pressStartTime.current) {
          const elapsed = Date.now() - pressStartTime.current;
          setPressDuration(elapsed);
          
          // Update progress animation
          Animated.timing(progressAnim, {
            toValue: Math.min(elapsed / LONG_PRESS_DURATION, 1),
            duration: 50,
            useNativeDriver: false,
          }).start();
          
          if (elapsed >= LONG_PRESS_DURATION) {
            handleSOSActivation();
          }
        }
      }, 50);
    } else if (!isPressed && pressInterval.current) {
      clearInterval(pressInterval.current);
      pressInterval.current = null;
      pressStartTime.current = null;
      setPressDuration(0);
      
      // Reset progress animation
      Animated.timing(progressAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isPressed]);

  const handleSOSActivation = () => {
    setIsActivated(true);
    setIsPressed(false);
    clearInterval(pressInterval.current);
    pressInterval.current = null;
    pressStartTime.current = null;
    setPressDuration(0);
    
    // Long vibration pattern for activation
    Vibration.vibrate([0, 500, 100, 500, 100, 500]);
    
    console.log('SOS ACTIVATED - Emergency protocols initiated');
    
    // Reset after 5 seconds
    setTimeout(() => {
      setIsActivated(false);
      progressAnim.setValue(0);
    }, 5000);
  };

  const handlePressStart = () => {
    if (!isActivated) {
      setIsPressed(true);
    }
  };

  const handlePressEnd = () => {
    setIsPressed(false);
  };

  const progressPercentage = (pressDuration / LONG_PRESS_DURATION) * 100;

  const handleEnableLocation = () => {
    setLocationEnabled(true);
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      if (editingContactIndex !== null) {
        // Edit existing contact
        const updatedContacts = [...contacts];
        updatedContacts[editingContactIndex] = {
          ...updatedContacts[editingContactIndex],
          ...newContact,
        };
        setContacts(updatedContacts);
      } else {
        // Add new contact
        setContacts([...contacts, { id: Date.now(), ...newContact }]);
      }
      setNewContact({ name: '', phone: '', relationship: '' });
      setEditingContactIndex(null);
      setShowAddContactModal(false);
    }
  };

  const handleEditContact = (index) => {
    setEditingContactIndex(index);
    setNewContact(contacts[index]);
    setShowAddContactModal(true);
  };

  const handleDeleteContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  const handleCallEmergency = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency SOS</Text>
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
        {/* Warning Banner */}
        <View style={styles.warningBanner}>
          <View style={styles.warningIcon}>
            <Ionicons name="warning" size={24} color="#F57C00" />
          </View>
          <View style={styles.warningContent}>
            <Text style={styles.warningTitle}>Emergency Setup</Text>
            <Text style={styles.warningDescription}>
              Configure your emergency contacts and location permissions for SOS activation.
            </Text>
          </View>
        </View>

        {/* SOS Button Section */}
        <View style={styles.sosSection}>
          <Text style={styles.sosSectionTitle}>SOS Emergency Button</Text>
          <Text style={styles.sosSectionSubtitle}>
            Press and hold for 3 seconds to activate emergency alert
          </Text>

          {/* SOS Button */}
          <View style={styles.sosButtonContainer}>
            {isActivated && (
              <View style={styles.activatedBadge}>
                <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
                <Text style={styles.activatedText}>SOS ACTIVATED!</Text>
              </View>
            )}
            
            <Animated.View
              style={[
                styles.sosButtonOuter,
                { transform: [{ scale: isPressed ? 0.95 : pulseAnim }] },
                isActivated && styles.sosButtonActivated,
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.sosButton,
                  isActivated && styles.sosButtonGreen,
                ]}
                onPressIn={handlePressStart}
                onPressOut={handlePressEnd}
                activeOpacity={0.9}
              >
                {/* Progress Ring */}
                {isPressed && !isActivated && (
                  <View style={styles.progressRing}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${progressPercentage}%` },
                      ]}
                    />
                  </View>
                )}
                
                {/* Button Content */}
                {isActivated ? (
                  <Ionicons name="checkmark" size={40} color="#FFFFFF" />
                ) : (
                  <>
                    <Text style={styles.sosText}>SOS</Text>
                    {isPressed && (
                      <Text style={styles.sosCountdown}>
                        {Math.ceil((LONG_PRESS_DURATION - pressDuration) / 1000)}s
                      </Text>
                    )}
                  </>
                )}
              </TouchableOpacity>
            </Animated.View>

            <Text style={styles.sosHint}>
              {isActivated
                ? 'Emergency contacts have been notified'
                : isPressed
                ? 'Keep holding...'
                : 'Hold for 3 seconds to activate'}
            </Text>
          </View>
        </View>

        {/* Quick Emergency Numbers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Emergency Numbers</Text>
          <View style={styles.emergencyNumbersGrid}>
            <TouchableOpacity
              style={[styles.emergencyCard, { backgroundColor: '#FFEBEE' }]}
              onPress={() => handleCallEmergency('112')}
            >
              <View style={[styles.emergencyIcon, { backgroundColor: '#FFCDD2' }]}>
                <Ionicons name="call" size={24} color="#C62828" />
              </View>
              <Text style={styles.emergencyNumber}>112</Text>
              <Text style={styles.emergencyLabel}>Emergency</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.emergencyCard, { backgroundColor: '#E3F2FD' }]}
              onPress={() => handleCallEmergency('199')}
            >
              <View style={[styles.emergencyIcon, { backgroundColor: '#BBDEFB' }]}>
                <Ionicons name="shield" size={24} color="#1565C0" />
              </View>
              <Text style={styles.emergencyNumber}>199</Text>
              <Text style={styles.emergencyLabel}>Police</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.emergencyCard, { backgroundColor: '#FFF3E0' }]}
              onPress={() => handleCallEmergency('191')}
            >
              <View style={[styles.emergencyIcon, { backgroundColor: '#FFE0B2' }]}>
                <Ionicons name="flame" size={24} color="#E65100" />
              </View>
              <Text style={styles.emergencyNumber}>191</Text>
              <Text style={styles.emergencyLabel}>Fire Service</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.emergencyCard, { backgroundColor: '#E8F5E9' }]}
              onPress={() => handleCallEmergency('767')}
            >
              <View style={[styles.emergencyIcon, { backgroundColor: '#C8E6C9' }]}>
                <Ionicons name="medkit" size={24} color="#2E7D32" />
              </View>
              <Text style={styles.emergencyNumber}>767</Text>
              <Text style={styles.emergencyLabel}>Ambulance</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Emergency Contacts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={{ flex: 1, marginRight: -30 }}>
              <Text style={styles.sectionTitle}>Emergency Contacts</Text>
              <Text style={styles.sectionSubtitle}>
                Up to 3 contacts will be notified when you activate SOS
              </Text>
            </View>
            {contacts.length < 3 && (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  setEditingContactIndex(null);
                  setNewContact({ name: '', phone: '', relationship: '' });
                  setShowAddContactModal(true);
                }}
              >
                <Ionicons name="add" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>

          {contacts.length === 0 ? (
            <View style={styles.emptyContacts}>
              <Ionicons name="people-outline" size={48} color="#BDBDBD" />
              <Text style={styles.emptyTitle}>No Emergency Contacts</Text>
              <Text style={styles.emptySubtitle}>
                Add contacts who will be notified during emergencies
              </Text>
              <TouchableOpacity
                style={styles.addContactButton}
                onPress={() => setShowAddContactModal(true)}
              >
                <Ionicons name="add-circle" size={20} color="#FFFFFF" />
                <Text style={styles.addContactButtonText}>Add Contact</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.contactsList}>
              {contacts.map((contact, index) => (
                <View key={contact.id} style={styles.contactCard}>
                  <View style={styles.contactAvatar}>
                    <Text style={styles.contactInitial}>
                      {contact.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    <Text style={styles.contactPhone}>{contact.phone}</Text>
                    <View style={styles.relationshipBadge}>
                      <Text style={styles.relationshipText}>{contact.relationship}</Text>
                    </View>
                  </View>
                  <View style={styles.contactActions}>
                    <TouchableOpacity
                      style={styles.contactActionButton}
                      onPress={() => handleCallEmergency(contact.phone)}
                    >
                      <Ionicons name="call" size={18} color="#2E7D32" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.contactActionButton}
                      onPress={() => handleEditContact(index)}
                    >
                      <Ionicons name="pencil" size={18} color="#1976D2" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.contactActionButton}
                      onPress={() => handleDeleteContact(index)}
                    >
                      <Ionicons name="trash" size={18} color="#C62828" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Location Permission */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Ionicons name="location" size={22} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Location Permission</Text>
          </View>
          <Text style={styles.sectionDescription}>
            Allow location access to share your coordinates during emergencies. Your location
            will only be shared when you activate SOS.
          </Text>

          {locationEnabled ? (
            <View style={styles.locationEnabled}>
              <View style={styles.locationEnabledIcon}>
                <Ionicons name="checkmark-circle" size={24} color="#2E7D32" />
              </View>
              <View style={styles.locationEnabledContent}>
                <Text style={styles.locationEnabledTitle}>Location Enabled</Text>
                <Text style={styles.locationEnabledSubtitle}>
                  Your location can be shared in emergencies
                </Text>
              </View>
            </View>
          ) : (
            <>
              <View style={styles.locationWarning}>
                <Ionicons name="warning" size={20} color="#F57C00" />
                <View style={styles.locationWarningContent}>
                  <Text style={styles.locationWarningTitle}>Location Not Enabled</Text>
                  <Text style={styles.locationWarningSubtitle}>
                    Enable location to share your coordinates during emergencies
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.enableLocationButton}
                onPress={handleEnableLocation}
              >
                <Ionicons name="location" size={20} color="#FFFFFF" />
                <Text style={styles.enableLocationText}>Enable Location</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* How to Use SOS */}
        <View style={[styles.section, styles.howToSection]}>
          <View style={styles.sectionHeaderRow}>
            <Ionicons name="bulb" size={22} color={COLORS.primary} />
            <Text style={[styles.sectionTitle, { color: COLORS.primary }]}>
              How to Use SOS
            </Text>
          </View>

          <View style={styles.stepsContainer}>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Locate the SOS Button</Text>
                <Text style={styles.stepDescription}>
                  Find the red SOS button above or use the floating button on your dashboard
                </Text>
              </View>
            </View>

            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Hold for 3 Seconds</Text>
                <Text style={styles.stepDescription}>
                  Press and hold the SOS button continuously. A countdown will appear.
                </Text>
              </View>
            </View>

            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Release When Activated</Text>
                <Text style={styles.stepDescription}>
                  The button will turn green and vibrate when activated.
                </Text>
              </View>
            </View>

            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Emergency Alert Sent</Text>
                <Text style={styles.stepDescription}>
                  Your emergency contacts and medical team will be notified with your location.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.importantNotice}>
            <Ionicons name="alert-circle" size={20} color="#C62828" />
            <View style={styles.importantNoticeContent}>
              <Text style={styles.importantNoticeTitle}>Important Notice</Text>
              <Text style={styles.importantNoticeText}>
                Only use SOS in genuine emergencies. False alarms may result in charges and
                delayed response for actual emergencies.
              </Text>
            </View>
          </View>
        </View>

        {/* What Happens During SOS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What Happens During SOS</Text>
          <View style={styles.whatHappensGrid}>
            <View style={[styles.whatHappensCard, { backgroundColor: '#FFEBEE' }]}>
              <View style={[styles.whatHappensIcon, { backgroundColor: '#FFCDD2' }]}>
                <Ionicons name="alert-circle" size={22} color="#C62828" />
              </View>
              <Text style={styles.whatHappensTitle}>Immediate Alert</Text>
              <Text style={styles.whatHappensDescription}>
                Emergency contacts are notified instantly via SMS and call
              </Text>
            </View>

            <View style={[styles.whatHappensCard, { backgroundColor: '#E3F2FD' }]}>
              <View style={[styles.whatHappensIcon, { backgroundColor: '#BBDEFB' }]}>
                <Ionicons name="location" size={22} color="#1565C0" />
              </View>
              <Text style={styles.whatHappensTitle}>Location Shared</Text>
              <Text style={styles.whatHappensDescription}>
                Your GPS coordinates are sent to medical team and contacts
              </Text>
            </View>

            <View style={[styles.whatHappensCard, { backgroundColor: '#E8F5E9' }]}>
              <View style={[styles.whatHappensIcon, { backgroundColor: '#C8E6C9' }]}>
                <Ionicons name="medical" size={22} color="#2E7D32" />
              </View>
              <Text style={styles.whatHappensTitle}>Medical Team</Text>
              <Text style={styles.whatHappensDescription}>
                NairaClinic medical team is alerted for quick response
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add/Edit Contact Modal */}
      <Modal
        visible={showAddContactModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddContactModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingContactIndex !== null ? 'Edit Contact' : 'Add Emergency Contact'}
              </Text>
              <TouchableOpacity onPress={() => setShowAddContactModal(false)}>
                <Ionicons name="close" size={24} color="#757575" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Contact Name</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="person-outline" size={20} color="#9E9E9E" />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter contact name"
                    placeholderTextColor="#9E9E9E"
                    value={newContact.name}
                    onChangeText={(text) => setNewContact({ ...newContact, name: text })}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="call-outline" size={20} color="#9E9E9E" />
                  <TextInput
                    style={styles.input}
                    placeholder="+234..."
                    placeholderTextColor="#9E9E9E"
                    keyboardType="phone-pad"
                    value={newContact.phone}
                    onChangeText={(text) => setNewContact({ ...newContact, phone: text })}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Relationship</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="heart-outline" size={20} color="#9E9E9E" />
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., Father, Mother, Spouse, Friend"
                    placeholderTextColor="#9E9E9E"
                    value={newContact.relationship}
                    onChangeText={(text) => setNewContact({ ...newContact, relationship: text })}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.saveButton,
                  (!newContact.name || !newContact.phone) && styles.saveButtonDisabled,
                ]}
                onPress={handleAddContact}
                disabled={!newContact.name || !newContact.phone}
              >
                <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                <Text style={styles.saveButtonText}>
                  {editingContactIndex !== null ? 'Update Contact' : 'Save Contact'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
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
  content: {
    flex: 1,
  },

  // Warning Banner
  warningBanner: {
    flexDirection: 'row',
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginBottom: 8,
    alignItems: 'flex-start',
    borderLeftWidth: 4,
    borderLeftColor: '#F57C00',
  },
  warningIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFE0B2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  warningContent: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E65100',
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
  warningDescription: {
    fontSize: 13,
    color: '#795548',
    fontFamily: 'Poppins',
    lineHeight: 18,
  },

  // SOS Section
  sosSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 16,
    marginTop: 8,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  sosSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
  sosSectionSubtitle: {
    fontSize: 13,
    color: '#757575',
    fontFamily: 'Poppins',
    marginBottom: 24,
    textAlign: 'center',
  },
  sosButtonContainer: {
    alignItems: 'center',
  },
  activatedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
    gap: 6,
  },
  activatedText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
  sosButtonOuter: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(220, 38, 38, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosButtonActivated: {
    backgroundColor: 'rgba(46, 125, 50, 0.15)',
  },
  sosButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#DC2626',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  sosButtonGreen: {
    backgroundColor: '#2E7D32',
    shadowColor: '#2E7D32',
  },
  progressRing: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
  },
  progressFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  sosText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
  sosCountdown: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    marginTop: 4,
  },
  sosHint: {
    fontSize: 13,
    color: '#757575',
    fontFamily: 'Poppins',
    marginTop: 16,
    textAlign: 'center',
  },

  // Emergency Numbers Grid
  emergencyNumbersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
  },
  emergencyCard: {
    width: (width - 64 - 10) / 2,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  emergencyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  emergencyNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
  },
  emergencyLabel: {
    fontSize: 12,
    color: '#757575',
    fontFamily: 'Poppins',
    marginTop: 2,
  },

  // Section
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
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#757575',
    fontFamily: 'Poppins',
    marginTop: 2,
  },
  sectionDescription: {
    fontSize: 13,
    color: '#757575',
    fontFamily: 'Poppins',
    lineHeight: 20,
    marginBottom: 16,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Contacts List
  contactsList: {
    gap: 12,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  contactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInitial: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
  },
  contactPhone: {
    fontSize: 13,
    color: '#757575',
    fontFamily: 'Poppins',
    marginTop: 2,
  },
  relationshipBadge: {
    backgroundColor: `${COLORS.primary}15`,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  relationshipText: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  contactActions: {
    flexDirection: 'row',
    gap: 8,
  },
  contactActionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Empty Contacts
  emptyContacts: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#424242',
    fontFamily: 'Poppins',
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#9E9E9E',
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 16,
  },
  addContactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    gap: 8,
  },
  addContactButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },

  // Location Permission
  locationEnabled: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  locationEnabledIcon: {
    marginRight: 12,
  },
  locationEnabledContent: {
    flex: 1,
  },
  locationEnabledTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32',
    fontFamily: 'Poppins',
  },
  locationEnabledSubtitle: {
    fontSize: 12,
    color: '#388E3C',
    fontFamily: 'Poppins',
    marginTop: 2,
  },
  locationWarning: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF8E1',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FFE082',
    marginBottom: 12,
  },
  locationWarningContent: {
    flex: 1,
    marginLeft: 10,
  },
  locationWarningTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E65100',
    fontFamily: 'Poppins',
  },
  locationWarningSubtitle: {
    fontSize: 12,
    color: '#F57C00',
    fontFamily: 'Poppins',
    marginTop: 2,
  },
  enableLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6F00',
    borderRadius: 8,
    paddingVertical: 14,
    gap: 8,
  },
  enableLocationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },

  // How to Use Section
  howToSection: {
    backgroundColor: `${COLORS.primary}10`,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  stepsContainer: {
    gap: 16,
    marginTop: 8,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: 'Poppins',
    marginBottom: 2,
  },
  stepDescription: {
    fontSize: 13,
    color: '#666666',
    fontFamily: 'Poppins',
    lineHeight: 18,
  },
  importantNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  importantNoticeContent: {
    flex: 1,
    marginLeft: 10,
  },
  importantNoticeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#C62828',
    fontFamily: 'Poppins',
  },
  importantNoticeText: {
    fontSize: 12,
    color: '#757575',
    fontFamily: 'Poppins',
    lineHeight: 18,
    marginTop: 2,
  },

  // What Happens Grid
  whatHappensGrid: {
    gap: 12,
    marginTop: 12,
  },
  whatHappensCard: {
    borderRadius: 12,
    padding: 16,
  },
  whatHappensIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  whatHappensTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
  whatHappensDescription: {
    fontSize: 12,
    color: '#757575',
    fontFamily: 'Poppins',
    lineHeight: 18,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: 'Poppins',
    paddingVertical: 14,
    marginLeft: 10,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 16,
    marginTop: 8,
    marginBottom: 24,
    gap: 0,
  },
  saveButtonDisabled: {
    backgroundColor: '#BDBDBD',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
});
