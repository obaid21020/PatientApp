import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../themes/regTheme';

const LANG = ['English', 'Pidgin', 'Hausa', 'Yoruba', 'Igbo'];

export default function LangChips({ label, selected, setSelected, options = LANG }) {
  return (
    <View style={{ marginVertical: 12 }}>
      <Text style={styles.label}>{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
        {options.map(l => (
          <TouchableOpacity
            key={l}
            style={[styles.chip, selected === l && styles.chipActive]}
            onPress={() => setSelected(l)}>
            <Text style={[styles.chipTxt, selected === l && styles.chipTxtActive]}>{l}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: COLORS.white,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
  },
  chipTxt: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  chipTxtActive: {
    color: COLORS.white,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textDark,
    marginBottom: 8,
    fontFamily: 'Poppins',
  },
});
