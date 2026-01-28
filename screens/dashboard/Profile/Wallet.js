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
export default function Wallet() {
  const navigation = useNavigation();
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [walletBalance, setWalletBalance] = useState(12500);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wallet & Tokens</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.walletCard}>
          <Text style={styles.walletLabel}>Current Balance</Text>
          <Text style={styles.walletBalance}>₦{walletBalance.toLocaleString()}</Text>
          <Text style={styles.walletSubtext}>Available for consultations</Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={() => setShowTopUpModal(true)}>
            <Ionicons name="add" size={18} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Top Up Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="document-text-outline" size={18} color={COLORS.primary} />
            <Text style={styles.secondaryButtonText}>View Token History</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickTopUpSection}>
          <Text style={styles.sectionLabel}>Quick Top-Up Options</Text>
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
      </ScrollView>

      <Modal visible={showTopUpModal} transparent animationType="slide" onRequestClose={() => setShowTopUpModal(false)}>
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
                <TextInput style={styles.textInput} placeholder="Enter amount" keyboardType="numeric" />
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
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowTopUpModal(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={() => setShowTopUpModal(false)}>
                <Text style={styles.submitButtonText}>Top Up</Text>
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
  walletCard: {
    backgroundColor: COLORS.primary, borderRadius: 16, padding: 24, marginBottom: 20,
  },
  walletLabel: { fontSize: 14, color: 'rgba(255, 255, 255, 0.8)', fontFamily: 'Poppins', marginBottom: 8 },
  walletBalance: { fontSize: 36, fontWeight: '700', color: '#FFFFFF', fontFamily: 'Poppins', marginBottom: 4 },
  walletSubtext: { fontSize: 13, color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'Poppins' },
  actionsContainer: { gap: 12, marginBottom: 24 },
  primaryButton: {
    flexDirection: 'row', backgroundColor: COLORS.primary, borderRadius: 12,
    paddingVertical: 14, alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  primaryButtonText: { fontSize: 15, fontWeight: '600', color: '#FFFFFF', fontFamily: 'Poppins' },
  secondaryButton: {
    flexDirection: 'row', backgroundColor: '#F0F0F0', borderRadius: 12,
    paddingVertical: 14, alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  secondaryButtonText: { fontSize: 15, fontWeight: '600', color: '#424242', fontFamily: 'Poppins' },
  quickTopUpSection: { marginTop: 8 },
  sectionLabel: { fontSize: 16, fontWeight: '600', color: '#1A1A1A', fontFamily: 'Poppins', marginBottom: 12 },
  quickTopUpGrid: { flexDirection: 'row', gap: 10 },
  quickTopUpItem: {
    flex: 1, backgroundColor: 'white', borderRadius: 12, paddingVertical: 16,
    alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0',
  },
  quickTopUpAmount: { fontSize: 14, fontWeight: '700', color: COLORS.primary, fontFamily: 'Poppins' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '80%' },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16, borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A', fontFamily: 'Poppins' },
  modalBody: { padding: 16 },
  modalFooter: { flexDirection: 'row', gap: 12, padding: 16, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 13, fontWeight: '600', color: '#424242', fontFamily: 'Poppins', marginBottom: 6 },
  textInput: {
    borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, paddingHorizontal: 14,
    paddingVertical: 12, fontSize: 14, color: '#1A1A1A', fontFamily: 'Poppins', backgroundColor: '#FAFAFA',
  },
  quickSelectLabel: { fontSize: 14, fontWeight: '600', color: '#424242', fontFamily: 'Poppins', marginBottom: 10 },
  quickSelectGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  quickSelectItem: {
    width: '48%', backgroundColor: '#FAFAFA', borderRadius: 8, paddingVertical: 14,
    alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0',
  },
  quickSelectAmount: { fontSize: 14, fontWeight: '600', color: '#424242', fontFamily: 'Poppins' },
  selectInput: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, paddingHorizontal: 14,
    paddingVertical: 12, backgroundColor: '#FAFAFA',
  },
  selectText: { fontSize: 14, color: '#1A1A1A', fontFamily: 'Poppins' },
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