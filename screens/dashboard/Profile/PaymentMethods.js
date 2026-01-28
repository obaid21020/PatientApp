import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../../themes/regTheme';
export default function PaymentMethods() {
  const navigation = useNavigation();
  const [showAddCardModal, setShowAddCardModal] = useState(false);

  const savedCards = [
    {
      id: 1, type: 'Visa', lastFour: '4242', expires: '12/28', name: 'John Doe', 
      isPrimary: true, color: '#1976D2',
    },
    {
      id: 2, type: 'Mastercard', lastFour: '8888', expires: '09/27', name: 'John Doe',
      isPrimary: false, color: '#D32F2F',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <TouchableOpacity onPress={() => setShowAddCardModal(true)}>
          <Ionicons name="add" size={28} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.cardsList}>
          {savedCards.map((card) => (
            <View key={card.id} style={[styles.cardItem, card.isPrimary && styles.cardItemPrimary]}>
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
                  <View style={styles.primaryBadge}>
                    <Text style={styles.primaryBadgeText}>Primary</Text>
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
          <Ionicons name="shield-checkmark" size={20} color="#1976D2" />
          <View style={styles.securityNoteContent}>
            <Text style={styles.securityNoteTitle}>Secure Payment Processing</Text>
            <Text style={styles.securityNoteText}>
              Your payment information is encrypted and securely stored.
            </Text>
          </View>
        </View>
      </ScrollView>

      <Modal visible={showAddCardModal} transparent animationType="slide" onRequestClose={() => setShowAddCardModal(false)}>
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
                <TextInput style={styles.textInput} placeholder="1234 5678 9012 3456" keyboardType="numeric" maxLength={19} />
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.inputLabel}>Expiry Date</Text>
                  <TextInput style={styles.textInput} placeholder="MM/YY" maxLength={5} />
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.inputLabel}>CVV</Text>
                  <TextInput style={styles.textInput} placeholder="123" keyboardType="numeric" maxLength={3} secureTextEntry />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Cardholder Name</Text>
                <TextInput style={styles.textInput} placeholder="JOHN DOE" autoCapitalize="characters" />
              </View>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowAddCardModal(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={() => setShowAddCardModal(false)}>
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
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, backgroundColor: 'white',
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.primary, fontFamily: 'Poppins' },
  content: { flex: 1, padding: 16 },
  cardsList: { gap: 12 },
  cardItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: 'white', borderRadius: 12, padding: 16,
    borderWidth: 1, borderColor: '#E0E0E0',
  },
  cardItemPrimary: { borderColor: COLORS.primary, backgroundColor: `${COLORS.primary}08` },
  cardLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  cardIcon: { width: 40, height: 28, borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
  cardNumber: { fontSize: 15, fontWeight: '600', color: '#1A1A1A', fontFamily: 'Poppins' },
  cardExpiry: { fontSize: 12, color: '#757575', fontFamily: 'Poppins', marginTop: 2 },
  cardRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  primaryBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  primaryBadgeText: { fontSize: 10, fontWeight: '600', color: '#2E7D32', fontFamily: 'Poppins' },
  securityNote: {
    flexDirection: 'row', backgroundColor: '#E3F2FD', borderRadius: 12, padding: 14,
    marginTop: 20, gap: 12, borderWidth: 1, borderColor: '#BBDEFB',
  },
  securityNoteContent: { flex: 1 },
  securityNoteTitle: { fontSize: 14, fontWeight: '600', color: '#1565C0', fontFamily: 'Poppins', marginBottom: 2 },
  securityNoteText: { fontSize: 12, color: '#1976D2', fontFamily: 'Poppins' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '80%' },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16, borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A', fontFamily: 'Poppins' },
  modalBody: { padding: 16 },
  modalFooter: { flexDirection: 'row', gap: 12, padding: 16, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  inputGroup: { marginBottom: 12 },
  inputLabel: { fontSize: 13, fontWeight: '600', color: '#424242', fontFamily: 'Poppins', marginBottom: 6 },
  textInput: {
    borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, paddingHorizontal: 14,
    paddingVertical: 12, fontSize: 14, color: '#1A1A1A', fontFamily: 'Poppins', backgroundColor: '#FAFAFA',
  },
  inputRow: { flexDirection: 'row' },
  cancelButton: {
    flex: 1, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8,
    paddingVertical: 12, alignItems: 'center',
  },
  cancelButtonText: { fontSize: 14, fontWeight: '600', color: '#757575', fontFamily: 'Poppins' },
  submitButton: {
    flex: 1, backgroundColor: COLORS.primary, borderRadius: 8,
    paddingVertical: 12, alignItems: 'center',
  },
  submitButtonText: { fontSize: 14, fontWeight: '600', color: '#FFFFFF', fontFamily: 'Poppins' },
});