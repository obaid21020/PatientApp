import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS } from '../themes/regTheme';

export default function VitalCard({ 
  vital, 
  onAdd, 
  onHistory, 
  color = COLORS.primary 
}) {
  return (
    <TouchableOpacity 
      style={[styles.card]}
      onPress={onHistory}
      activeOpacity={0.9}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
          <Ionicons name={vital.icon} size={24} color={color} />
        </View>
        
        {/* + Button for adding today's reading */}
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: color }]}
          onPress={(e) => {
            e.stopPropagation(); // Prevent card navigation when clicking +
            onAdd();
          }}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.name}>{vital.name}</Text>
      
      {vital.lastValue ? (
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{vital.lastValue}</Text>
          <Text style={styles.unit}>{vital.unit}</Text>
        </View>
      ) : (
        <Text style={styles.noData}>Tap + to add your first reading</Text>
      )}

      {vital.lastRecorded && (
        <Text style={styles.date}>Last recorded: {vital.lastRecorded}</Text>
      )}

      {/* Visual indicator that card is clickable */}
      <View style={styles.historyIndicator}>
        <Text style={[styles.tapHint, { color }]}>Tap to view history</Text>
        <Ionicons name="chevron-forward" size={16} color={color} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
    marginBottom: 4,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginTop: 4,
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
  },
  unit: {
    fontSize: 14,
    color: '#757575',
    fontFamily: FONTS.Poppins,
  },
  noData: {
    fontSize: 14,
    color: '#999',
    fontFamily: FONTS.Poppins,
    fontStyle: 'italic',
    marginVertical: 8,
  },
  date: {
    fontSize: 12,
    color: '#757575',
    fontFamily: FONTS.Poppins,
    marginTop: 6,
  },
  historyIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  tapHint: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: FONTS.Poppins,
    marginRight: 4,
    opacity: 0.8,
  },
});