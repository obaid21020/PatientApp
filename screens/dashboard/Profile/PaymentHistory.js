import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../../themes/regTheme';

export default function History() {
  const navigation = useNavigation();

  const transactions = [
    { id: 1, date: '2024-12-15', type: 'Subscription', amount: -6000, status: 'Completed', description: 'Family Plan - December 2024' },
    { id: 2, date: '2024-12-10', type: 'Consultation', amount: -5000, status: 'Completed', description: 'Video consultation with Dr. Johnson' },
    { id: 3, date: '2024-12-08', type: 'Payment', amount: 20000, status: 'Completed', description: 'Wallet Top-up' },
    { id: 4, date: '2024-12-01', type: 'Consultation', amount: -3500, status: 'Completed', description: 'Text chat consultation' },
    { id: 5, date: '2024-11-28', type: 'Subscription', amount: -6000, status: 'Completed', description: 'Family Plan - November 2024' },
    { id: 6, date: '2024-11-15', type: 'Consultation', amount: -8000, status: 'Completed', description: 'Specialist consultation' },
  ];

  const formatAmount = (amount) => '₦' + Math.abs(amount).toLocaleString();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment History</Text>
        <TouchableOpacity>
          <Ionicons name="filter-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.transactionsList}>
          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={styles.transactionHeader}>
                  <View style={[styles.dot, { backgroundColor: transaction.amount > 0 ? '#4CAF50' : '#F44336' }]} />
                  <Text style={styles.transactionType}>{transaction.type}</Text>
                </View>
                <Text style={styles.transactionDesc}>{transaction.description}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <View style={styles.transactionRight}>
                <Text style={[styles.transactionAmount, { color: transaction.amount > 0 ? '#4CAF50' : '#F44336' }]}>
                  {transaction.amount > 0 ? '+' : '-'}{formatAmount(transaction.amount)}
                </Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{transaction.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All Transactions</Text>
        </TouchableOpacity>
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
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.primary, fontFamily: 'Poppins' },
  content: { flex: 1, padding: 16 },
  transactionsList: { gap: 10 },
  transactionItem: {
    flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white',
    borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#F0F0F0',
  },
  transactionLeft: { flex: 1 },
  transactionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  transactionType: { fontSize: 15, fontWeight: '600', color: '#1A1A1A', fontFamily: 'Poppins' },
  transactionDesc: { fontSize: 13, color: '#666', fontFamily: 'Poppins', marginBottom: 4 },
  transactionDate: { fontSize: 12, color: '#999', fontFamily: 'Poppins' },
  transactionRight: { alignItems: 'flex-end' },
  transactionAmount: { fontSize: 15, fontWeight: '700', fontFamily: 'Poppins', marginBottom: 6 },
  statusBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  statusText: { fontSize: 10, fontWeight: '600', color: '#2E7D32', fontFamily: 'Poppins' },
  viewAllButton: {
    borderWidth: 1, borderColor: COLORS.primary, borderRadius: 8, paddingVertical: 12,
    alignItems: 'center', marginTop: 20,
  },
  viewAllText: { fontSize: 14, fontWeight: '600', color: COLORS.primary, fontFamily: 'Poppins' },
});