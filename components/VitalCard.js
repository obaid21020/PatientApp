import { Ionicons } from '@expo/vector-icons';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS } from '../themes/regTheme';


export default function VitalCard({ 
  vital, 
  onAdd, 
  onHistory, 
  color = COLORS.primary 
}) {
  // Responsive sizing
  const { width } = Dimensions.get('window');
  let cardWidth = (width - 74) / 2;
  let iconSize = 24;
  let addBtnSize = 36;
  let iconContainer = 44;
  let valueFont = 28;
  let nameFont = 16;
  let unitFont = 14;
  let tapHintFont = 12;
  if (width <= 360) {
    cardWidth = (width - 54) / 2;
    iconSize = 18;
    addBtnSize = 28;
    iconContainer = 32;
    valueFont = 20;
    nameFont = 13;
    unitFont = 11;
    tapHintFont = 10;
  } else if (width <= 400) {
    cardWidth = (width - 64) / 2;
    iconSize = 20;
    addBtnSize = 32;
    iconContainer = 36;
    valueFont = 24;
    nameFont = 14;
    unitFont = 12;
    tapHintFont = 11;
  }
  return (
    <TouchableOpacity 
      style={[styles.card, { width: cardWidth }]}
      onPress={onHistory}
      activeOpacity={0.9}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}20`, width: iconContainer, height: iconContainer, borderRadius: iconContainer / 2 }]}> 
          <Ionicons name={vital.icon} size={iconSize} color={color} />
        </View>
        {/* + Button for adding today's reading */}
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: color, width: addBtnSize, height: addBtnSize, borderRadius: addBtnSize / 2 }]}
          onPress={(e) => {
            e.stopPropagation(); // Prevent card navigation when clicking +
            onAdd();
          }}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={iconSize} color="#FFF" />
        </TouchableOpacity>
      </View>

      <Text style={[styles.name, { fontSize: nameFont }]}>{vital.name}</Text>
      
      {vital.lastValue ? (
        <View style={styles.valueContainer}>
          <Text style={[styles.value, { fontSize: valueFont }]}>{vital.lastValue}</Text>
          <Text style={[styles.unit, { fontSize: unitFont }]}>{vital.unit}</Text>
        </View>
      ) : (
        <Text style={[styles.noData, { fontSize: unitFont }]}>Tap + to add your first reading</Text>
      )}

      {vital.lastRecorded && (
        <Text style={[styles.date, { fontSize: tapHintFont }]}>{`Last recorded: ${vital.lastRecorded}`}</Text>
      )}

      {/* Visual indicator that card is clickable */}
      <View style={styles.historyIndicator}>
        <Text style={[styles.tapHint, { color, fontSize: tapHintFont }]}>Tap to view history</Text>
        <Ionicons name="chevron-forward" size={iconSize - 6} color={color} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  name: {
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
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
  },
  unit: {
    color: '#757575',
    fontFamily: FONTS.Poppins,
  },
  noData: {
    color: '#999',
    fontFamily: FONTS.Poppins,
    fontStyle: 'italic',
    marginVertical: 8,
  },
  date: {
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
    fontWeight: '500',
    fontFamily: FONTS.Poppins,
    marginRight: 4,
    opacity: 0.8,
  },
});