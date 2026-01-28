import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../../themes/regTheme';

export default function Privacy() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Your Privacy Matters</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Collection</Text>
          <Text style={styles.text}>
            We collect personal information that you provide to us such as name, address,
            contact information, passwords and security data, payment information, and medical history.
          </Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>• Personal identification information</Text>
            <Text style={styles.listItem}>• Medical history and health records</Text>
            <Text style={styles.listItem}>• Payment and billing information</Text>
            <Text style={styles.listItem}>• Usage data and device information</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How We Use Your Information</Text>
          <Text style={styles.text}>We use the information we collect or receive:</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>• To provide and maintain our healthcare services</Text>
            <Text style={styles.listItem}>• To facilitate consultations with healthcare providers</Text>
            <Text style={styles.listItem}>• To process payments and manage subscriptions</Text>
            <Text style={styles.listItem}>• To send you medical reminders and health updates</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Rights</Text>
          <Text style={styles.text}>Under NDPR, you have the following rights:</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>• Right to access your personal data</Text>
            <Text style={styles.listItem}>• Right to rectification of inaccurate data</Text>
            <Text style={styles.listItem}>• Right to erasure (right to be forgotten)</Text>
            <Text style={styles.listItem}>• Right to data portability</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.text}>
            If you have any questions about this Privacy Policy, please contact our
            Data Protection Officer at privacy@nairaclinic.com or +234 800 000 0000.
          </Text>
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
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.primary, fontFamily: 'Poppins' },
  content: { flex: 1, padding: 20 },
  pageTitle: { fontSize: 22, fontWeight: '700', color: '#1A1A1A', fontFamily: 'Poppins', marginBottom: 20 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A1A', fontFamily: 'Poppins', marginBottom: 10 },
  text: { fontSize: 14, color: '#555', fontFamily: 'Poppins', lineHeight: 22, marginBottom: 12 },
  list: { gap: 8, marginLeft: 4 },
  listItem: { fontSize: 14, color: '#666', fontFamily: 'Poppins', lineHeight: 20 },
});