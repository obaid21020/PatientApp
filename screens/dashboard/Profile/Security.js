import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../../themes/regTheme';

const { width } = Dimensions.get('window');

export default function Security() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Security</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Encryption</Text>
          <Text style={styles.text}>
            All your medical records and personal information are encrypted using
            industry-standard AES-256 encryption, both in transit and at rest.
          </Text>
          <View style={styles.statusCard}>
            <Ionicons name="shield-checkmark" size={24} color="#4CAF50" />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={styles.statusTitle}>Your data is secure</Text>
              <Text style={styles.statusText}>We use bank-level encryption to protect your information</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Access Control</Text>
          <Text style={styles.text}>
            Only authorized healthcare professionals involved in your care can access
            your medical records. All access is logged and monitored.
          </Text>
          <View style={styles.accessGrid}>
            <View style={styles.accessCard}>
              <Ionicons name="lock-closed" size={24} color={COLORS.primary} />
              <Text style={styles.accessTitle}>PIN Protection</Text>
              <Text style={styles.accessText}>5-digit PIN required</Text>
            </View>
            <View style={styles.accessCard}>
              <Ionicons name="finger-print" size={24} color={COLORS.primary} />
              <Text style={styles.accessTitle}>Biometric Auth</Text>
              <Text style={styles.accessText}>Fingerprint or Face ID</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compliance & Certifications</Text>
          <Text style={styles.text}>
            NairaClinic is fully compliant with Nigerian Data Protection Regulation (NDPR)
            and follows international healthcare data standards.
          </Text>
          <View style={styles.complianceGrid}>
            {[ { name: 'NDPR', status: 'Compliant' }, { name: 'ISO 27001', status: 'Certified' }, 
               { name: 'HIPAA', status: 'Aligned' }, { name: 'SSL/TLS', status: 'Encrypted' } ].map((item, idx) => (
              <View key={idx} style={styles.complianceItem}>
                <Text style={styles.complianceName}>{item.name}</Text>
                <Text style={styles.complianceStatus}>{item.status}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.reportButton}>
          <Text style={styles.reportButtonText}>Report Security Issue</Text>
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
  content: { flex: 1, padding: 20 },
  section: { marginBottom: 24, borderBottomWidth: 1, borderBottomColor: '#E0E0E0', paddingBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A1A', fontFamily: 'Poppins', marginBottom: 10 },
  text: { fontSize: 14, color: '#555', fontFamily: 'Poppins', lineHeight: 22, marginBottom: 16 },
  statusCard: {
    flexDirection: 'row', backgroundColor: '#E8F5E9', borderRadius: 12, padding: 16,
    alignItems: 'center', borderWidth: 1, borderColor: '#C8E6C9',
  },
  statusTitle: { fontSize: 15, fontWeight: '600', color: '#2E7D32', fontFamily: 'Poppins' },
  statusText: { fontSize: 13, color: '#4CAF50', fontFamily: 'Poppins', marginTop: 2 },
  accessGrid: { flexDirection: 'row', gap: 12 },
  accessCard: {
    flex: 1, backgroundColor: 'white', borderRadius: 12, padding: 16, alignItems: 'center',
    borderWidth: 1, borderColor: '#E0E0E0',
  },
  accessTitle: { fontSize: 14, fontWeight: '600', color: '#1A1A1A', fontFamily: 'Poppins', marginTop: 8, marginBottom: 4 },
  accessText: { fontSize: 12, color: '#757575', fontFamily: 'Poppins' },
  complianceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  complianceItem: {
    width: (width - 60) / 2, backgroundColor: 'white', borderRadius: 10, padding: 14,
    alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0',
  },
  complianceName: { fontSize: 14, fontWeight: '600', color: '#1A1A1A', fontFamily: 'Poppins' },
  complianceStatus: { fontSize: 12, color: '#757575', fontFamily: 'Poppins', marginTop: 2 },
  reportButton: {
    borderWidth: 1, borderColor: COLORS.primary, borderRadius: 8, paddingVertical: 12,
    paddingHorizontal: 20, alignSelf: 'flex-start', marginBottom: 30,
  },
  reportButtonText: { fontSize: 14, fontWeight: '600', color: COLORS.primary, fontFamily: 'Poppins' },
});