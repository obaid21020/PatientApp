import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../../themes/regTheme';

const ICON_OPTIONS = [
  'heart-outline', 'water-outline', 'moon-outline', 'footsteps-outline',
  'flask-outline', 'fitness-outline', 'body-outline', 'thermometer-outline',
  'speedometer-outline', 'barbell-outline', 'bicycle-outline', 'timer-outline',
];

export default function CustomVital() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('heart-outline');
  const [selectedColor, setSelectedColor] = useState('#4CAF50');

  const colors = [
    '#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336',
    '#00BCD4', '#795548', '#607D8B', '#E91E63', '#673AB7',
  ];

  const handleCreate = () => {
    if (!name.trim() || !unit.trim()) {
      Alert.alert('Missing Info', 'Please enter both name and unit');
      return;
    }
    // Create vital logic here
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Custom Vital</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Vital Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="e.g., Blood Ketones, Pain Level, etc."
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Measurement Unit</Text>
        <TextInput
          style={styles.input}
          value={unit}
          onChangeText={setUnit}
          placeholder="e.g., mmol/L, score (1-10), hours, etc."
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Select Icon</Text>
        <View style={styles.iconGrid}>
          {ICON_OPTIONS.map((icon) => (
            <TouchableOpacity
              key={icon}
              style={[
                styles.iconOption,
                selectedIcon === icon && styles.iconOptionSelected,
              ]}
              onPress={() => setSelectedIcon(icon)}
            >
              <Ionicons 
                name={icon} 
                size={24} 
                color={selectedIcon === icon ? COLORS.primary : '#757575'} 
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Select Color</Text>
        <View style={styles.colorGrid}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorOption,
                { backgroundColor: color },
                selectedColor === color && styles.colorOptionSelected,
              ]}
              onPress={() => setSelectedColor(color)}
            >
              {selectedColor === color && (
                <Ionicons name="checkmark" size={20} color="#FFF" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.preview}>
          <Text style={styles.previewLabel}>Preview</Text>
          <View style={[styles.previewCard, { borderLeftColor: selectedColor }]}>
            <View style={[styles.previewIcon, { backgroundColor: `${selectedColor}20` }]}>
              <Ionicons name={selectedIcon} size={28} color={selectedColor} />
            </View>
            <View>
              <Text style={styles.previewName}>{name || 'Vital Name'}</Text>
              <Text style={styles.previewUnit}>{unit || 'Unit'}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.createButton, (!name || !unit) && styles.createButtonDisabled]}
          onPress={handleCreate}
          disabled={!name || !unit}
        >
          <Text style={styles.createButtonText}>Create Vital</Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#424242',
    fontFamily: FONTS.Poppins,
    marginBottom: 12,
    marginTop: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  iconOption: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  iconOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: `${COLORS.primary}10`,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  colorOption: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  colorOptionSelected: {
    borderColor: '#1A1A1A',
  },
  preview: {
    marginTop: 24,
    marginBottom: 32,
  },
  previewLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#424242',
    fontFamily: FONTS.Poppins,
    marginBottom: 12,
  },
  previewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  previewIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  previewName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
  },
  previewUnit: {
    fontSize: 13,
    color: '#757575',
    fontFamily: FONTS.Poppins,
    marginTop: 2,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  createButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: FONTS.Poppins,
  },
});