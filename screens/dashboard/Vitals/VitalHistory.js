import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../../themes/regTheme';

const { width } = Dimensions.get('window');

export default function VitalHistory() {
  const navigation = useNavigation();
  const route = useRoute();
  const { vital } = route.params;
  const [timeRange, setTimeRange] = useState('week'); // day, week, month, year

  // Mock data for different time ranges
  const data = {
    day: [
      { label: '6AM', value: 98 },
      { label: '9AM', value: 97 },
      { label: '12PM', value: 99 },
      { label: '3PM', value: 98 },
      { label: '6PM', value: 97 },
      { label: '9PM', value: 98 },
    ],
    week: [
      { label: 'Mon', value: 98 },
      { label: 'Tue', value: 97 },
      { label: 'Wed', value: 98 },
      { label: 'Thu', value: 99 },
      { label: 'Fri', value: 98 },
      { label: 'Sat', value: 97 },
      { label: 'Sun', value: 98 },
    ],
    month: [
      { label: 'W1', value: 97.5 },
      { label: 'W2', value: 98 },
      { label: 'W3', value: 97.8 },
      { label: 'W4', value: 98.2 },
    ],
    year: [
      { label: 'Jan', value: 97 },
      { label: 'Feb', value: 98 },
      { label: 'Mar', value: 97 },
      { label: 'Apr', value: 98 },
      { label: 'May', value: 99 },
      { label: 'Jun', value: 98 },
      { label: 'Jul', value: 97 },
      { label: 'Aug', value: 98 },
      { label: 'Sep', value: 99 },
      { label: 'Oct', value: 98 },
      { label: 'Nov', value: 97 },
      { label: 'Dec', value: 98 },
    ],
  };

  const currentData = data[timeRange];
  const maxValue = Math.max(...currentData.map(d => d.value)) * 1.1;
  const minValue = Math.min(...currentData.map(d => d.value)) * 0.9;
  const range = maxValue - minValue;

  const calculateAverage = () => {
    const sum = currentData.reduce((acc, item) => acc + item.value, 0);
    return (sum / currentData.length).toFixed(1);
  };

  const getTrend = () => {
    const first = currentData[0].value;
    const last = currentData[currentData.length - 1].value;
    if (last > first) return { icon: 'trending-up', color: '#4CAF50', text: 'Increasing' };
    if (last < first) return { icon: 'trending-down', color: '#F44336', text: 'Decreasing' };
    return { icon: 'remove-outline', color: '#757575', text: 'Stable' };
  };

  const trend = getTrend();

  const renderGraph = () => {
    const barWidth = (width - 80) / currentData.length - 8;
    
    return (
      <View style={styles.graphContainer}>
        <View style={styles.barsContainer}>
          {currentData.map((item, index) => {
            const height = ((item.value - minValue) / range) * 200;
            return (
              <View key={index} style={styles.barWrapper}>
                <View style={styles.barColumn}>
                  <Text style={styles.barValue}>{item.value}</Text>
                  <View 
                    style={[
                      styles.bar, 
                      { 
                        height: Math.max(height, 20), 
                        width: barWidth,
                        backgroundColor: vital.color || COLORS.primary,
                        opacity: 0.8 + (index % 3) * 0.1,
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.barLabel}>{item.label}</Text>
              </View>
            );
          })}
        </View>
        
        {/* Grid lines */}
        <View style={styles.gridLines}>
          {[0, 1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.gridLine} />
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{vital.name} History</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RecordVital', { vital })}>
          <Ionicons name="add" size={28} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* iOS-style Segmented Control */}
        <View style={styles.segmentContainer}>
          <View style={styles.segmentBackground}>
            {['day', 'week', 'month', 'year'].map((range) => (
              <TouchableOpacity
                key={range}
                style={[
                  styles.segmentButton,
                  timeRange === range && styles.segmentButtonActive,
                ]}
                onPress={() => setTimeRange(range)}
              >
                <Text
                  style={[
                    styles.segmentText,
                    timeRange === range && styles.segmentTextActive,
                  ]}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stats Summary */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{calculateAverage()}</Text>
            <Text style={styles.statLabel}>Average {vital.unit}</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: `${trend.color}15` }]}>
            <Ionicons name={trend.icon} size={24} color={trend.color} />
            <Text style={[styles.statLabel, { color: trend.color, marginTop: 4 }]}>{trend.text}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{currentData.length}</Text>
            <Text style={styles.statLabel}>Records</Text>
          </View>
        </View>

        {/* Graph */}
        <View style={styles.graphCard}>
          <Text style={styles.graphTitle}>Trend Overview</Text>
          {renderGraph()}
        </View>

        {/* Recent Entries */}
        <View style={styles.entriesSection}>
          <Text style={styles.entriesTitle}>Recent Entries</Text>
          {[...currentData].reverse().slice(0, 5).map((item, index) => (
            <View key={index} style={styles.entryRow}>
              <View style={styles.entryLeft}>
                <View style={[styles.entryDot, { backgroundColor: vital.color || COLORS.primary }]} />
                <Text style={styles.entryLabel}>{item.label}</Text>
              </View>
              <Text style={styles.entryValue}>{item.value} {vital.unit}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
    fontFamily: FONTS.Poppins,
  },
  segmentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  segmentBackground: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    padding: 2,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  segmentButtonActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#757575',
    fontFamily: FONTS.Poppins,
  },
  segmentTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
    fontFamily: FONTS.Poppins,
    marginTop: 4,
  },
  graphCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  graphTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
    marginBottom: 20,
  },
  graphContainer: {
    height: 240,
    justifyContent: 'flex-end',
  },
  gridLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 30,
    justifyContent: 'space-between',
  },
  gridLine: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 200,
    paddingBottom: 30,
  },
  barWrapper: {
    alignItems: 'center',
  },
  barColumn: {
    alignItems: 'center',
  },
  barValue: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
    marginBottom: 4,
  },
  bar: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    minHeight: 20,
  },
  barLabel: {
    fontSize: 11,
    color: '#757575',
    fontFamily: FONTS.Poppins,
    marginTop: 8,
  },
  entriesSection: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  entriesTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
    marginBottom: 16,
  },
  entryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  entryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  entryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  entryLabel: {
    fontSize: 14,
    color: '#424242',
    fontFamily: FONTS.Poppins,
  },
  entryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
  },
});