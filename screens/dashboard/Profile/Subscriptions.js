import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../../themes/regTheme';
export default function Subscriptions() {
  const navigation = useNavigation();
  const [activeSubscription, setActiveSubscription] = useState('family');

  const subscriptions = [
    {
      id: 'individual', name: 'Individual Plan', price: '₦2,500', period: 'Monthly',
      features: ['Unlimited consultations', '24/7 support', 'Health records'], popular: false,
    },
    {
      id: 'couple', name: 'Couple Plan', price: '₦4,000', period: 'Monthly',
      features: ['Everything in Individual', '2 accounts', 'Shared records'], popular: false,
    },
    {
      id: 'family', name: 'Family Plan', price: '₦6,000', period: 'Monthly',
      features: ['Everything in Couple', 'Up to 5 members', 'Priority support'], popular: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subscription Plans</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.subscriptionsList}>
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

              <View style={styles.planHeader}>
                <Text style={styles.planName}>{plan.name}</Text>
                <View style={styles.planPriceRow}>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                  <Text style={styles.planPeriod}>/{plan.period}</Text>
                </View>
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
                <Text style={[styles.planButtonText, plan.id === activeSubscription ? styles.planButtonTextActive : styles.planButtonTextOutline]}>
                  {plan.id === activeSubscription ? 'Current Plan' : 'Switch Plan'}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
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
  content: { flex: 1, padding: 16 },
  subscriptionsList: { gap: 12 },
  subscriptionCard: {
    backgroundColor: '#FAFAFA', borderRadius: 12, padding: 16, borderWidth: 2,
    borderColor: '#E0E0E0', position: 'relative',
  },
  subscriptionCardActive: {
    borderColor: COLORS.primary, backgroundColor: `${COLORS.primary}08`,
  },
  popularBadge: {
    position: 'absolute', top: -10, right: 16, backgroundColor: COLORS.primary,
    paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12,
  },
  popularText: { fontSize: 10, fontWeight: '600', color: '#FFFFFF', fontFamily: 'Poppins' },
  activeCheck: { position: 'absolute', top: 12, left: 12 },
  planHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 12, paddingLeft: 32,
  },
  planName: { fontSize: 16, fontWeight: '600', color: '#1A1A1A', fontFamily: 'Poppins', flex: 1 },
  planPriceRow: { flexDirection: 'row', alignItems: 'baseline' },
  planPrice: { fontSize: 20, fontWeight: '700', color: COLORS.primary, fontFamily: 'Poppins' },
  planPeriod: { fontSize: 12, color: '#757575', fontFamily: 'Poppins', marginLeft: 4 },
  planFeatures: { marginBottom: 16, paddingLeft: 32 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  featureText: { fontSize: 13, color: '#616161', fontFamily: 'Poppins' },
  planButton: {
    marginLeft: 32, borderRadius: 8, paddingVertical: 12, alignItems: 'center',
  },
  planButtonActive: { backgroundColor: COLORS.primary },
  planButtonOutline: { borderWidth: 1, borderColor: COLORS.primary },
  planButtonText: { fontSize: 14, fontWeight: '600', fontFamily: 'Poppins' },
  planButtonTextActive: { color: '#FFFFFF' },
  planButtonTextOutline: { color: COLORS.primary },
});