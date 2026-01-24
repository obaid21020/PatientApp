import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
    Dimensions,
    Image,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../themes/regTheme';

const { width } = Dimensions.get('window');

export default function Orders() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showOrderMedicationModal, setShowOrderMedicationModal] = useState(false);
  const [showBookLabTestModal, setShowBookLabTestModal] = useState(false);

  // Order Medication Modal States
  const [selectedMedications, setSelectedMedications] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('delivery');

  // Book Lab Test Modal States
  const [selectedTests, setSelectedTests] = useState([]);
  const [selectedLaboratory, setSelectedLaboratory] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Toggle medication selection
  const toggleMedicationSelection = (medId) => {
    setSelectedMedications((prev) =>
      prev.includes(medId)
        ? prev.filter((id) => id !== medId)
        : [...prev, medId]
    );
  };

  // Toggle test selection
  const toggleTestSelection = (testId) => {
    setSelectedTests((prev) =>
      prev.includes(testId)
        ? prev.filter((id) => id !== testId)
        : [...prev, testId]
    );
  };

  // Format date for display (with weekday)
  const formatDateWithWeekday = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Format time for display
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Handle date change
  const onDateChange = (event, date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
    }
  };

  // Handle time change
  const onTimeChange = (event, time) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
    if (time) {
      setSelectedTime(time);
    }
  };

  const medications = [
    {
      id: 'MED001',
      name: 'Paracetamol 500mg',
      pharmacy: 'HealthPlus Pharmacy',
      prescribedBy: 'Dr. Sarah Johnson',
      date: '2024-12-10',
      status: 'Delivered',
      quantity: '30 tablets',
      price: '₦2,500',
      type: 'medication',
      icon: 'medkit-outline',
    },
    {
      id: 'MED002',
      name: 'Amoxicillin 250mg',
      pharmacy: 'MedCare Pharmacy',
      prescribedBy: 'Dr. Michael Chen',
      date: '2024-12-08',
      status: 'Processing',
      quantity: '21 capsules',
      price: '₦4,200',
      type: 'medication',
      icon: 'medkit-outline',
    },
    {
      id: 'MED003',
      name: 'Ibuprofen 400mg',
      pharmacy: 'WellCare Pharmacy',
      prescribedBy: 'Dr. Sarah Johnson',
      date: '2024-12-05',
      status: 'Ready for Pickup',
      quantity: '20 tablets',
      price: '₦1,800',
      type: 'medication',
      icon: 'medkit-outline',
    },
  ];

  const labTests = [
    {
      id: 'LAB001',
      name: 'Complete Blood Count (CBC)',
      laboratory: 'PathCare Laboratory',
      orderedBy: 'Dr. Michael Chen',
      date: '2024-12-12',
      status: 'Scheduled',
      appointment: '2024-12-15 09:00 AM',
      price: '₦8,500',
      type: 'lab-test',
      icon: 'flask-outline',
    },
    {
      id: 'LAB002',
      name: 'Lipid Profile',
      laboratory: 'LifeCare Diagnostics',
      orderedBy: 'Dr. Sarah Johnson',
      date: '2024-12-09',
      status: 'Results Ready',
      appointment: '2024-12-10 02:00 PM',
      price: '₦6,200',
      type: 'lab-test',
      icon: 'flask-outline',
    },
    {
      id: 'LAB003',
      name: 'Thyroid Function Test',
      laboratory: 'MedLab Diagnostics',
      orderedBy: 'Dr. Michael Chen',
      date: '2024-12-06',
      status: 'Sample Collected',
      appointment: '2024-12-07 11:00 AM',
      price: '₦12,000',
      type: 'lab-test',
      icon: 'flask-outline',
    },
  ];

  const tabs = [
    { id: 'all', label: 'All Orders', icon: 'list-outline' },
    { id: 'medications', label: 'Medications', icon: 'medkit-outline' },
    { id: 'lab-tests', label: 'Lab Tests', icon: 'flask-outline' },
  ];

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
      case 'results ready':
        return { bg: '#E8F5E9', text: '#2E7D32', icon: 'checkmark-circle' };
      case 'processing':
      case 'sample collected':
        return { bg: '#FFF8E1', text: '#F9A825', icon: 'time' };
      case 'ready for pickup':
      case 'scheduled':
        return { bg: '#E3F2FD', text: '#1976D2', icon: 'information-circle' };
      default:
        return { bg: '#F5F5F5', text: '#757575', icon: 'ellipse' };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getFilteredOrders = () => {
    if (activeTab === 'medications') return medications;
    if (activeTab === 'lab-tests') return labTests;
    return [...medications, ...labTests].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const renderOrderCard = (order) => {
    const statusStyle = getStatusStyle(order.status);
    const isMedication = order.type === 'medication';

    return (
      <View key={order.id} style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View style={styles.orderIconContainer}>
            <View style={styles.orderIcon}>
              <Ionicons
                name={isMedication ? 'medkit' : 'flask'}
                size={18}
                color={COLORS.primary}
              />
            </View>
          </View>
          <View style={styles.orderInfo}>
            <Text style={styles.orderName} numberOfLines={1}>{order.name}</Text>
            <Text style={styles.orderSubtext} numberOfLines={1}>
              {isMedication
                ? `${order.pharmacy} • ${order.prescribedBy}`
                : `${order.laboratory} • ${order.orderedBy}`}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
            <Ionicons name={statusStyle.icon} size={12} color={statusStyle.text} />
            <Text style={[styles.statusText, { color: statusStyle.text }]}>
              {order.status}
            </Text>
          </View>
        </View>

        <View style={styles.orderDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Order ID</Text>
            <Text style={styles.detailValue}>{order.id}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Date Ordered</Text>
            <Text style={styles.detailValue}>{formatDate(order.date)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>
              {isMedication ? 'Quantity' : 'Appointment'}
            </Text>
            <Text style={styles.detailValue} numberOfLines={1}>
              {isMedication ? order.quantity : order.appointment}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Price</Text>
            <Text style={styles.detailValuePrice}>{order.price}</Text>
          </View>
        </View>

        <View style={styles.orderActions}>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => handleViewDetails(order)}
          >
            <Text style={styles.detailsButtonText}>View Details</Text>
          </TouchableOpacity>
          {order.status === 'Ready for Pickup' && (
            <TouchableOpacity style={styles.pickupButton}>
              <Ionicons name="location-outline" size={16} color="#FFFFFF" />
              <Text style={styles.pickupButtonText}>Get Directions</Text>
            </TouchableOpacity>
          )}
          {order.status === 'Results Ready' && (
            <TouchableOpacity style={styles.downloadButton}>
              <Ionicons name="download-outline" size={16} color="#FFFFFF" />
              <Text style={styles.downloadButtonText}>Download</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const filteredOrders = getFilteredOrders();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Orders & Tests</Text>
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
            <Ionicons name="cube" size={24} color={COLORS.primary} />
          </View>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Orders & Tests</Text>
            <Text style={styles.bannerDescription}>
              Monitor your medication orders and laboratory test appointments in one place.
            </Text>
          </View>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="medkit" size={20} color="#1976D2" />
            </View>
            <Text style={styles.summaryValue}>{medications.length}</Text>
            <Text style={styles.summaryLabel}>Medications</Text>
          </View>
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, { backgroundColor: '#F3E5F5' }]}>
              <Ionicons name="flask" size={20} color="#7B1FA2" />
            </View>
            <Text style={styles.summaryValue}>{labTests.length}</Text>
            <Text style={styles.summaryLabel}>Lab Tests</Text>
          </View>
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="checkmark-circle" size={20} color="#2E7D32" />
            </View>
            <Text style={styles.summaryValue}>
              {[...medications, ...labTests].filter(
                (o) => o.status === 'Delivered' || o.status === 'Results Ready'
              ).length}
            </Text>
            <Text style={styles.summaryLabel}>Completed</Text>
          </View>
        </View>

        {/* Filter Dropdown */}
        <View style={styles.dropdownWrapper}>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <View style={styles.dropdownLeft}>
                <Ionicons
                  name={tabs.find((t) => t.id === activeTab)?.icon || 'list-outline'}
                  size={18}
                  color={COLORS.primary}
                />
                <Text style={styles.dropdownText}>
                  {tabs.find((t) => t.id === activeTab)?.label || 'All Orders'}
                </Text>
              </View>
              <Ionicons
                name={showDropdown ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#757575"
              />
            </TouchableOpacity>
            {showDropdown && (
              <View style={styles.dropdownMenu}>
                {tabs.map((tab) => (
                  <TouchableOpacity
                    key={tab.id}
                    style={[
                      styles.dropdownItem,
                      activeTab === tab.id && styles.dropdownItemActive,
                    ]}
                    onPress={() => {
                      setActiveTab(tab.id);
                      setShowDropdown(false);
                    }}
                  >
                    <Ionicons
                      name={tab.icon}
                      size={18}
                      color={activeTab === tab.id ? COLORS.primary : '#757575'}
                    />
                    <Text
                      style={[
                        styles.dropdownItemText,
                        activeTab === tab.id && styles.dropdownItemTextActive,
                      ]}
                    >
                      {tab.label}
                    </Text>
                    {activeTab === tab.id && (
                      <Ionicons name="checkmark" size={18} color={COLORS.primary} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Orders List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {activeTab === 'all'
                ? 'All Orders'
                : activeTab === 'medications'
                ? 'Medication Orders'
                : 'Lab Test Orders'}
            </Text>
            <Text style={styles.orderCount}>{filteredOrders.length} orders</Text>
          </View>

          {filteredOrders.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="cube-outline" size={48} color="#BDBDBD" />
              <Text style={styles.emptyTitle}>No Orders Found</Text>
              <Text style={styles.emptySubtitle}>
                You haven't placed any orders yet. Orders for medications and lab tests will appear here.
              </Text>
            </View>
          ) : (
            <View style={styles.ordersList}>
              {filteredOrders.map(renderOrderCard)}
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => setShowOrderMedicationModal(true)}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#E3F2FD' }]}>
                <Ionicons name="add-circle" size={24} color="#1976D2" />
              </View>
              <Text style={styles.quickActionTitle}>Order Medication</Text>
              <Text style={styles.quickActionSubtitle}>From your prescriptions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => setShowBookLabTestModal(true)}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#F3E5F5' }]}>
                <Ionicons name="calendar" size={24} color="#7B1FA2" />
              </View>
              <Text style={styles.quickActionTitle}>Book Lab Test</Text>
              <Text style={styles.quickActionSubtitle}>Schedule an appointment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Order Details Modal */}
      <Modal
        visible={showDetailsModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDetailsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Order Details</Text>
              <TouchableOpacity onPress={() => setShowDetailsModal(false)}>
                <Ionicons name="close" size={24} color="#757575" />
              </TouchableOpacity>
            </View>

            {selectedOrder && (
              <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                {/* Order Status */}
                <View style={styles.modalStatusCard}>
                  <View
                    style={[
                      styles.modalStatusIcon,
                      { backgroundColor: getStatusStyle(selectedOrder.status).bg },
                    ]}
                  >
                    <Ionicons
                      name={getStatusStyle(selectedOrder.status).icon}
                      size={28}
                      color={getStatusStyle(selectedOrder.status).text}
                    />
                  </View>
                  <Text style={styles.modalStatusLabel}>Status</Text>
                  <Text
                    style={[
                      styles.modalStatusValue,
                      { color: getStatusStyle(selectedOrder.status).text },
                    ]}
                  >
                    {selectedOrder.status}
                  </Text>
                </View>

                {/* Order Info */}
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Order Information</Text>
                  <View style={styles.modalInfoRow}>
                    <Text style={styles.modalInfoLabel}>Order ID</Text>
                    <Text style={styles.modalInfoValue}>{selectedOrder.id}</Text>
                  </View>
                  <View style={styles.modalInfoRow}>
                    <Text style={styles.modalInfoLabel}>Item</Text>
                    <Text style={styles.modalInfoValue}>{selectedOrder.name}</Text>
                  </View>
                  <View style={styles.modalInfoRow}>
                    <Text style={styles.modalInfoLabel}>Date Ordered</Text>
                    <Text style={styles.modalInfoValue}>
                      {formatDate(selectedOrder.date)}
                    </Text>
                  </View>
                  <View style={styles.modalInfoRow}>
                    <Text style={styles.modalInfoLabel}>
                      {selectedOrder.type === 'medication' ? 'Pharmacy' : 'Laboratory'}
                    </Text>
                    <Text style={styles.modalInfoValue}>
                      {selectedOrder.type === 'medication'
                        ? selectedOrder.pharmacy
                        : selectedOrder.laboratory}
                    </Text>
                  </View>
                  <View style={styles.modalInfoRow}>
                    <Text style={styles.modalInfoLabel}>
                      {selectedOrder.type === 'medication' ? 'Prescribed By' : 'Ordered By'}
                    </Text>
                    <Text style={styles.modalInfoValue}>
                      {selectedOrder.type === 'medication'
                        ? selectedOrder.prescribedBy
                        : selectedOrder.orderedBy}
                    </Text>
                  </View>
                  <View style={styles.modalInfoRow}>
                    <Text style={styles.modalInfoLabel}>
                      {selectedOrder.type === 'medication' ? 'Quantity' : 'Appointment'}
                    </Text>
                    <Text style={styles.modalInfoValue}>
                      {selectedOrder.type === 'medication'
                        ? selectedOrder.quantity
                        : selectedOrder.appointment}
                    </Text>
                  </View>
                </View>

                {/* Payment Info */}
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Payment</Text>
                  <View style={styles.modalPaymentCard}>
                    <Text style={styles.modalPaymentLabel}>Total Amount</Text>
                    <Text style={styles.modalPaymentValue}>{selectedOrder.price}</Text>
                  </View>
                </View>

                {/* Actions */}
                <View style={styles.modalActions}>
                  {selectedOrder.status === 'Ready for Pickup' && (
                    <TouchableOpacity style={styles.modalPrimaryButton}>
                      <Ionicons name="location" size={18} color="#FFFFFF" />
                      <Text style={styles.modalPrimaryButtonText}>Get Directions</Text>
                    </TouchableOpacity>
                  )}
                  {selectedOrder.status === 'Results Ready' && (
                    <TouchableOpacity style={styles.modalPrimaryButton}>
                      <Ionicons name="download" size={18} color="#FFFFFF" />
                      <Text style={styles.modalPrimaryButtonText}>Download Results</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity style={styles.modalSecondaryButton}>
                    <Ionicons name="help-circle-outline" size={18} color={COLORS.primary} />
                    <Text style={styles.modalSecondaryButtonText}>Need Help?</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* Order Medication Modal */}
      <Modal
        visible={showOrderMedicationModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowOrderMedicationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Order Medication</Text>
              <TouchableOpacity onPress={() => setShowOrderMedicationModal(false)}>
                <Ionicons name="close" size={24} color="#757575" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              {/* Medication Selection */}
              <View style={styles.quickActionModalSection}>
                <Text style={styles.quickActionModalLabel}>Select Medication(s)</Text>
                <TouchableOpacity
                  style={[
                    styles.medicationCard,
                    selectedMedications.includes('paracetamol') && styles.selectedCard,
                  ]}
                  onPress={() => toggleMedicationSelection('paracetamol')}
                >
                  <View style={[styles.medicationIcon, { backgroundColor: '#E8F5E9' }]}>
                    <Ionicons name="medkit" size={20} color="#2E7D32" />
                  </View>
                  <View style={styles.medicationInfo}>
                    <Text style={styles.medicationName}>Paracetamol 500mg</Text>
                    <Text style={styles.medicationDetails}>30 tablets • Dr. Sarah Johnson</Text>
                    <Text style={styles.medicationPrice}>₦2,500</Text>
                  </View>
                  <View
                    style={[
                      styles.checkBox,
                      selectedMedications.includes('paracetamol') && styles.checkBoxSelected,
                    ]}
                  >
                    {selectedMedications.includes('paracetamol') && (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.medicationCard,
                    selectedMedications.includes('amoxicillin') && styles.selectedCard,
                  ]}
                  onPress={() => toggleMedicationSelection('amoxicillin')}
                >
                  <View style={[styles.medicationIcon, { backgroundColor: '#E3F2FD' }]}>
                    <Ionicons name="medkit" size={20} color="#1976D2" />
                  </View>
                  <View style={styles.medicationInfo}>
                    <Text style={styles.medicationName}>Amoxicillin 250mg</Text>
                    <Text style={styles.medicationDetails}>21 capsules • Dr. Michael Chen</Text>
                    <Text style={styles.medicationPrice}>₦4,200</Text>
                  </View>
                  <View
                    style={[
                      styles.checkBox,
                      selectedMedications.includes('amoxicillin') && styles.checkBoxSelected,
                    ]}
                  >
                    {selectedMedications.includes('amoxicillin') && (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.medicationCard,
                    selectedMedications.includes('ibuprofen') && styles.selectedCard,
                  ]}
                  onPress={() => toggleMedicationSelection('ibuprofen')}
                >
                  <View style={[styles.medicationIcon, { backgroundColor: '#FFF3E0' }]}>
                    <Ionicons name="medkit" size={20} color="#E65100" />
                  </View>
                  <View style={styles.medicationInfo}>
                    <Text style={styles.medicationName}>Ibuprofen 400mg</Text>
                    <Text style={styles.medicationDetails}>20 tablets • Dr. Sarah Johnson</Text>
                    <Text style={styles.medicationPrice}>₦1,800</Text>
                  </View>
                  <View
                    style={[
                      styles.checkBox,
                      selectedMedications.includes('ibuprofen') && styles.checkBoxSelected,
                    ]}
                  >
                    {selectedMedications.includes('ibuprofen') && (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.medicationCard,
                    selectedMedications.includes('metformin') && styles.selectedCard,
                  ]}
                  onPress={() => toggleMedicationSelection('metformin')}
                >
                  <View style={[styles.medicationIcon, { backgroundColor: '#F3E5F5' }]}>
                    <Ionicons name="medkit" size={20} color="#7B1FA2" />
                  </View>
                  <View style={styles.medicationInfo}>
                    <Text style={styles.medicationName}>Metformin 500mg</Text>
                    <Text style={styles.medicationDetails}>60 tablets • Dr. Michael Chen</Text>
                    <Text style={styles.medicationPrice}>₦3,500</Text>
                  </View>
                  <View
                    style={[
                      styles.checkBox,
                      selectedMedications.includes('metformin') && styles.checkBoxSelected,
                    ]}
                  >
                    {selectedMedications.includes('metformin') && (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              {/* Pharmacy Selection */}
              <View style={styles.quickActionModalSection}>
                <Text style={styles.quickActionModalLabel}>Select Pharmacy</Text>
                <TouchableOpacity
                  style={[
                    styles.pharmacyCard,
                    selectedPharmacy === 'healthplus' && styles.selectedCard,
                  ]}
                  onPress={() => setSelectedPharmacy('healthplus')}
                >
                  <View style={[styles.pharmacyIcon, { backgroundColor: '#E8F5E9' }]}>
                    <Ionicons name="storefront" size={20} color="#2E7D32" />
                  </View>
                  <View style={styles.pharmacyInfo}>
                    <Text style={styles.pharmacyName}>HealthPlus Pharmacy</Text>
                    <Text style={styles.pharmacyAddress}>12 Marina Road, Lagos</Text>
                    <View style={styles.pharmacyMeta}>
                      <Ionicons name="star" size={12} color="#FFC107" />
                      <Text style={styles.pharmacyRating}>4.8</Text>
                      <Text style={styles.pharmacyDistance}>• 2.5 km away</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.radioButton,
                      selectedPharmacy === 'healthplus' && styles.radioButtonSelected,
                    ]}
                  >
                    {selectedPharmacy === 'healthplus' && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.pharmacyCard,
                    selectedPharmacy === 'medcare' && styles.selectedCard,
                  ]}
                  onPress={() => setSelectedPharmacy('medcare')}
                >
                  <View style={[styles.pharmacyIcon, { backgroundColor: '#E3F2FD' }]}>
                    <Ionicons name="storefront" size={20} color="#1976D2" />
                  </View>
                  <View style={styles.pharmacyInfo}>
                    <Text style={styles.pharmacyName}>MedCare Pharmacy</Text>
                    <Text style={styles.pharmacyAddress}>45 Broad Street, Lagos</Text>
                    <View style={styles.pharmacyMeta}>
                      <Ionicons name="star" size={12} color="#FFC107" />
                      <Text style={styles.pharmacyRating}>4.6</Text>
                      <Text style={styles.pharmacyDistance}>• 3.8 km away</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.radioButton,
                      selectedPharmacy === 'medcare' && styles.radioButtonSelected,
                    ]}
                  >
                    {selectedPharmacy === 'medcare' && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              {/* Delivery Option */}
              <View style={styles.quickActionModalSection}>
                <Text style={styles.quickActionModalLabel}>Delivery Option</Text>
                <View style={styles.deliveryOptionsRow}>
                  <TouchableOpacity
                    style={[
                      styles.deliveryOption,
                      selectedDeliveryOption === 'delivery' && styles.deliveryOptionActive,
                    ]}
                    onPress={() => setSelectedDeliveryOption('delivery')}
                  >
                    <Ionicons
                      name="bicycle"
                      size={24}
                      color={selectedDeliveryOption === 'delivery' ? COLORS.primary : '#757575'}
                    />
                    <Text
                      style={[
                        styles.deliveryOptionText,
                        selectedDeliveryOption !== 'delivery' && { color: '#757575' },
                      ]}
                    >
                      Delivery
                    </Text>
                    <Text
                      style={[
                        styles.deliveryOptionPrice,
                        selectedDeliveryOption !== 'delivery' && { color: '#757575' },
                      ]}
                    >
                      ₦1,500
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.deliveryOption,
                      selectedDeliveryOption === 'pickup' && styles.deliveryOptionActive,
                    ]}
                    onPress={() => setSelectedDeliveryOption('pickup')}
                  >
                    <Ionicons
                      name="walk"
                      size={24}
                      color={selectedDeliveryOption === 'pickup' ? COLORS.primary : '#757575'}
                    />
                    <Text
                      style={[
                        styles.deliveryOptionText,
                        selectedDeliveryOption !== 'pickup' && { color: '#757575' },
                      ]}
                    >
                      Pickup
                    </Text>
                    <Text
                      style={[
                        styles.deliveryOptionPrice,
                        selectedDeliveryOption !== 'pickup' && { color: '#757575' },
                      ]}
                    >
                      Free
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Submit Button */}
              <View style={styles.quickActionModalActions}>
                <TouchableOpacity
                  style={styles.modalPrimaryButton}
                  onPress={() => setShowOrderMedicationModal(false)}
                >
                  <Ionicons name="cart" size={18} color="#FFFFFF" />
                  <Text style={styles.modalPrimaryButtonText}>Place Order</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Book Lab Test Modal */}
      <Modal
        visible={showBookLabTestModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowBookLabTestModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Book Lab Test</Text>
              <TouchableOpacity onPress={() => setShowBookLabTestModal(false)}>
                <Ionicons name="close" size={24} color="#757575" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              {/* Test Selection */}
              <View style={styles.quickActionModalSection}>
                <Text style={styles.quickActionModalLabel}>Select Test(s)</Text>
                <TouchableOpacity
                  style={[
                    styles.testCard,
                    selectedTests.includes('cbc') && styles.selectedCard,
                  ]}
                  onPress={() => toggleTestSelection('cbc')}
                >
                  <View style={[styles.testIcon, { backgroundColor: '#FCE4EC' }]}>
                    <Ionicons name="water" size={20} color="#C2185B" />
                  </View>
                  <View style={styles.testInfo}>
                    <Text style={styles.testName}>Complete Blood Count (CBC)</Text>
                    <Text style={styles.testPrice}>₦8,500</Text>
                  </View>
                  <View
                    style={[
                      styles.checkBox,
                      selectedTests.includes('cbc') && styles.checkBoxSelected,
                    ]}
                  >
                    {selectedTests.includes('cbc') && (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.testCard,
                    selectedTests.includes('lipid') && styles.selectedCard,
                  ]}
                  onPress={() => toggleTestSelection('lipid')}
                >
                  <View style={[styles.testIcon, { backgroundColor: '#FFF3E0' }]}>
                    <Ionicons name="heart" size={20} color="#E65100" />
                  </View>
                  <View style={styles.testInfo}>
                    <Text style={styles.testName}>Lipid Profile</Text>
                    <Text style={styles.testPrice}>₦6,200</Text>
                  </View>
                  <View
                    style={[
                      styles.checkBox,
                      selectedTests.includes('lipid') && styles.checkBoxSelected,
                    ]}
                  >
                    {selectedTests.includes('lipid') && (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.testCard,
                    selectedTests.includes('thyroid') && styles.selectedCard,
                  ]}
                  onPress={() => toggleTestSelection('thyroid')}
                >
                  <View style={[styles.testIcon, { backgroundColor: '#E8F5E9' }]}>
                    <Ionicons name="fitness" size={20} color="#2E7D32" />
                  </View>
                  <View style={styles.testInfo}>
                    <Text style={styles.testName}>Thyroid Function Test</Text>
                    <Text style={styles.testPrice}>₦12,000</Text>
                  </View>
                  <View
                    style={[
                      styles.checkBox,
                      selectedTests.includes('thyroid') && styles.checkBoxSelected,
                    ]}
                  >
                    {selectedTests.includes('thyroid') && (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.testCard,
                    selectedTests.includes('glucose') && styles.selectedCard,
                  ]}
                  onPress={() => toggleTestSelection('glucose')}
                >
                  <View style={[styles.testIcon, { backgroundColor: '#E3F2FD' }]}>
                    <Ionicons name="analytics" size={20} color="#1976D2" />
                  </View>
                  <View style={styles.testInfo}>
                    <Text style={styles.testName}>Blood Glucose (Fasting)</Text>
                    <Text style={styles.testPrice}>₦3,500</Text>
                  </View>
                  <View
                    style={[
                      styles.checkBox,
                      selectedTests.includes('glucose') && styles.checkBoxSelected,
                    ]}
                  >
                    {selectedTests.includes('glucose') && (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              {/* Laboratory Selection */}
              <View style={styles.quickActionModalSection}>
                <Text style={styles.quickActionModalLabel}>Select Laboratory</Text>
                <TouchableOpacity
                  style={[
                    styles.pharmacyCard,
                    selectedLaboratory === 'pathcare' && styles.selectedCard,
                  ]}
                  onPress={() => setSelectedLaboratory('pathcare')}
                >
                  <View style={[styles.pharmacyIcon, { backgroundColor: '#F3E5F5' }]}>
                    <Ionicons name="flask" size={20} color="#7B1FA2" />
                  </View>
                  <View style={styles.pharmacyInfo}>
                    <Text style={styles.pharmacyName}>PathCare Laboratory</Text>
                    <Text style={styles.pharmacyAddress}>25 Awolowo Road, Ikoyi</Text>
                    <View style={styles.pharmacyMeta}>
                      <Ionicons name="star" size={12} color="#FFC107" />
                      <Text style={styles.pharmacyRating}>4.9</Text>
                      <Text style={styles.pharmacyDistance}>• 4.2 km away</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.radioButton,
                      selectedLaboratory === 'pathcare' && styles.radioButtonSelected,
                    ]}
                  >
                    {selectedLaboratory === 'pathcare' && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.pharmacyCard,
                    selectedLaboratory === 'lifecare' && styles.selectedCard,
                  ]}
                  onPress={() => setSelectedLaboratory('lifecare')}
                >
                  <View style={[styles.pharmacyIcon, { backgroundColor: '#E0F7FA' }]}>
                    <Ionicons name="flask" size={20} color="#00796B" />
                  </View>
                  <View style={styles.pharmacyInfo}>
                    <Text style={styles.pharmacyName}>LifeCare Diagnostics</Text>
                    <Text style={styles.pharmacyAddress}>18 Adeola Odeku, VI</Text>
                    <View style={styles.pharmacyMeta}>
                      <Ionicons name="star" size={12} color="#FFC107" />
                      <Text style={styles.pharmacyRating}>4.7</Text>
                      <Text style={styles.pharmacyDistance}>• 5.1 km away</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.radioButton,
                      selectedLaboratory === 'lifecare' && styles.radioButtonSelected,
                    ]}
                  >
                    {selectedLaboratory === 'lifecare' && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              {/* Date & Time Selection */}
              <View style={styles.quickActionModalSection}>
                <Text style={styles.quickActionModalLabel}>Select Date & Time</Text>
                <View style={styles.dateTimeRow}>
                  <TouchableOpacity
                    style={styles.dateTimeButton}
                    onPress={() => {
                      setShowTimePicker(false);
                      setShowDatePicker(true);
                    }}
                  >
                    <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
                    <Text style={styles.dateTimeText}>{formatDateWithWeekday(selectedDate)}</Text>
                    <Ionicons name="chevron-down" size={16} color="#9E9E9E" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dateTimeButton}
                    onPress={() => {
                      setShowDatePicker(false);
                      setShowTimePicker(true);
                    }}
                  >
                    <Ionicons name="time-outline" size={20} color={COLORS.primary} />
                    <Text style={styles.dateTimeText}>{formatTime(selectedTime)}</Text>
                    <Ionicons name="chevron-down" size={16} color="#9E9E9E" />
                  </TouchableOpacity>
                </View>

                {/* Date Picker */}
                {showDatePicker && (
                  <View style={styles.dateTimePickerContainer}>
                    <DateTimePicker
                      value={selectedDate}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={onDateChange}
                      minimumDate={new Date()}
                      style={styles.dateTimePicker}
                    />
                    {Platform.OS === 'ios' && (
                      <TouchableOpacity
                        style={styles.pickerDoneButton}
                        onPress={() => setShowDatePicker(false)}
                      >
                        <Text style={styles.pickerDoneText}>Done</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}

                {/* Time Picker */}
                {showTimePicker && (
                  <View style={styles.dateTimePickerContainer}>
                    <DateTimePicker
                      value={selectedTime}
                      mode="time"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={onTimeChange}
                      minuteInterval={30}
                      style={styles.dateTimePicker}
                    />
                    {Platform.OS === 'ios' && (
                      <TouchableOpacity
                        style={styles.pickerDoneButton}
                        onPress={() => setShowTimePicker(false)}
                      >
                        <Text style={styles.pickerDoneText}>Done</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>

              {/* Submit Button */}
              <View style={styles.quickActionModalActions}>
                <TouchableOpacity
                  style={styles.modalPrimaryButton}
                  onPress={() => setShowBookLabTestModal(false)}
                >
                  <Ionicons name="calendar-outline" size={18} color="#FFFFFF" />
                  <Text style={styles.modalPrimaryButtonText}>Book Appointment</Text>
                </TouchableOpacity>
              </View>
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

  // Dropdown Filter
  dropdownWrapper: {
    paddingHorizontal: 16,
    marginBottom: 8,
    zIndex: 100,
  },
  dropdownContainer: {
    position: 'relative',
    zIndex: 100,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dropdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    zIndex: 101,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemActive: {
    backgroundColor: `${COLORS.primary}08`,
  },
  dropdownItemText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#424242',
    fontFamily: 'Poppins',
  },
  dropdownItemTextActive: {
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
  summaryRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 8,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
  },
  summaryLabel: {
    fontSize: 11,
    color: '#757575',
    fontFamily: 'Poppins',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
  },
  orderCount: {
    fontSize: 12,
    color: '#9E9E9E',
    fontFamily: 'Poppins',
  },
  ordersList: {
    gap: 12,
  },
  orderCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderIconContainer: {
    marginRight: 12,
  },
  orderIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderInfo: {
    flex: 1,
  },
  orderName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
    marginBottom: 2,
  },
  orderSubtext: {
    fontSize: 11,
    color: '#757575',
    fontFamily: 'Poppins',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  orderDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 12,
    marginBottom: 12,
  },
  detailItem: {
    width: '50%',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 10,
    color: '#9E9E9E',
    fontFamily: 'Poppins',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '500',
    color: '#424242',
    fontFamily: 'Poppins',
  },
  detailValuePrice: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
  orderActions: {
    flexDirection: 'row',
    gap: 8,
  },
  detailsButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
  },
  detailsButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
  pickupButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1976D2',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  pickupButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
  downloadButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  downloadButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#424242',
    fontFamily: 'Poppins',
    marginTop: 12,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#9E9E9E',
    fontFamily: 'Poppins',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickActionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
    marginBottom: 2,
  },
  quickActionSubtitle: {
    fontSize: 11,
    color: '#757575',
    fontFamily: 'Poppins',
    textAlign: 'center',
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
    maxHeight: '85%',
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
  modalStatusCard: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalStatusIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalStatusLabel: {
    fontSize: 12,
    color: '#9E9E9E',
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
  modalStatusValue: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Poppins',
  },
  modalSection: {
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#424242',
    fontFamily: 'Poppins',
    marginBottom: 12,
  },
  modalInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalInfoLabel: {
    fontSize: 13,
    color: '#757575',
    fontFamily: 'Poppins',
  },
  modalInfoValue: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
    maxWidth: '55%',
    textAlign: 'right',
  },
  modalPaymentCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalPaymentLabel: {
    fontSize: 14,
    color: '#757575',
    fontFamily: 'Poppins',
  },
  modalPaymentValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
  modalActions: {
    gap: 10,
    marginTop: 8,
    paddingBottom: 16,
  },
  modalPrimaryButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  modalPrimaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
  modalSecondaryButton: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  modalSecondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },

  // Quick Action Modal Styles
  quickActionModalSection: {
    marginBottom: 20,
  },
  quickActionModalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#424242',
    fontFamily: 'Poppins',
    marginBottom: 12,
  },
  quickActionModalActions: {
    marginTop: 8,
    paddingBottom: 16,
  },

  // Prescription Card
  prescriptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  prescriptionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  prescriptionInfo: {
    flex: 1,
  },
  prescriptionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
    marginBottom: 2,
  },
  prescriptionSubtitle: {
    fontSize: 12,
    color: '#757575',
    fontFamily: 'Poppins',
  },

  // Pharmacy Card
  pharmacyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  pharmacyIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pharmacyInfo: {
    flex: 1,
  },
  pharmacyName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
    marginBottom: 2,
  },
  pharmacyAddress: {
    fontSize: 12,
    color: '#757575',
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
  pharmacyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pharmacyRating: {
    fontSize: 12,
    fontWeight: '600',
    color: '#424242',
    fontFamily: 'Poppins',
    marginLeft: 4,
  },
  pharmacyDistance: {
    fontSize: 12,
    color: '#9E9E9E',
    fontFamily: 'Poppins',
    marginLeft: 4,
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#BDBDBD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: COLORS.primary,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },

  // Selected Card Style
  selectedCard: {
    backgroundColor: `${COLORS.primary}08`,
    borderColor: COLORS.primary,
    borderWidth: 1.5,
  },

  // Delivery Options
  deliveryOptionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  deliveryOption: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  deliveryOptionActive: {
    backgroundColor: `${COLORS.primary}10`,
    borderColor: COLORS.primary,
  },
  deliveryOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: 'Poppins',
    marginTop: 8,
  },
  deliveryOptionPrice: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.primary,
    fontFamily: 'Poppins',
    marginTop: 2,
  },

  // Test Card
  testCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  testIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  testInfo: {
    flex: 1,
  },
  testName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
    marginBottom: 2,
  },
  testPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
  checkBox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#BDBDBD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  // Date Time Selection
  dateTimeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateTimeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 6,
  },
  dateTimeText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#424242',
    fontFamily: 'Poppins',
  },

  // DateTimePicker Container
  dateTimePickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  dateTimePicker: {
    width: '100%',
    height: 150,
  },
  pickerDoneButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 8,
  },
  pickerDoneText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },

  // Medication Card
  medicationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  medicationIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
    marginBottom: 2,
  },
  medicationDetails: {
    fontSize: 12,
    color: '#757575',
    fontFamily: 'Poppins',
    marginBottom: 2,
  },
  medicationPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: 'Poppins',
  },
});
