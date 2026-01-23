import { useState } from 'react';
import {
    KeyboardAvoidingView, Platform, ScrollView,
    StyleSheet,
    Text, TouchableOpacity,
    View
} from 'react-native';
import LangChips from '../../components/LangChips';
import NairaLogo from '../../components/NairaLogo';
import ProgressHeader from '../../components/ProgressHeader';
import { COLORS, FONTS, STYLES } from '../../themes/regTheme';

const LANGUAGES = ['None', 'English', 'Pidgin', 'Hausa', 'Yoruba', 'Igbo', 'Nigerian'];

export default function Reg3({ navigation }) {
  const [primaryLanguage, setPrimaryLanguage] = useState('English');
  const [altLanguage, setAltLanguage] = useState('None');
  const [commChannels, setCommChannels] = useState([]);
  const [commTone, setCommTone] = useState('professional');

  // Filter alternative language options to exclude primary language
  const altLanguageOptions = LANGUAGES.filter((lang) => lang !== primaryLanguage);

  // Toggle communication channel
  const toggleCommChannel = (channel) => {
    setCommChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((c) => c !== channel)
        : [...prev, channel]
    );
  };

  return (
    <View style={styles.screen}>
      <ProgressHeader current={3} total={6} />
      <NairaLogo />

      {/* ---- title & subtitle at top ---- */}
      <Text style={FONTS.title}>Pick how we talk</Text>
      <Text style={FONTS.sub}>
        Choose your preferred language and communication{'\n'}style
      </Text>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={true}>
          <View style={STYLES.container}>

            {/* ---- Language Chips ---- */}
            <LangChips 
              label="Primary Language"
              selected={primaryLanguage}
              setSelected={setPrimaryLanguage}
            />

            <LangChips 
              label="Alternative language (optional)"
              selected={altLanguage}
              setSelected={setAltLanguage}
            />

            {/* ---- Communication Channels (Multi-select) ---- */}
            <View style={styles.section}>
              <Text style={STYLES.label}>Communication Channels</Text>
              <View style={styles.checkboxGroup}>
                {['SMS', 'Email', 'WhatsApp', 'Phone Call'].map((channel) => (
                  <TouchableOpacity 
                    key={channel}
                    style={styles.checkboxRow}
                    onPress={() => toggleCommChannel(channel)}>
                    <View style={[styles.checkbox, commChannels.includes(channel) && styles.checkboxChecked]}>
                      {commChannels.includes(channel) && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <Text style={styles.checkboxLabel}>{channel}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* ---- Communication Tone (Radio) ---- */}
            <View style={styles.section}>
              <Text style={STYLES.label}>Communication Tone</Text>
              <View style={styles.radioGroup}>
                {['professional', 'casual', 'friendly'].map((tone) => (
                  <TouchableOpacity 
                    key={tone}
                    style={styles.radioRow}
                    onPress={() => setCommTone(tone)}>
                    <View style={[styles.radio, commTone === tone && styles.radioSelected]}>
                      {commTone === tone && <View style={styles.radioDot} />}
                    </View>
                    <Text style={styles.radioLabel}>
                      {tone.charAt(0).toUpperCase() + tone.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ---- Bottom Buttons ---- */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.prevBtn}
          onPress={() => navigation.goBack()}>
          <Text style={styles.prevBtnText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => navigation.navigate('Reg4')}>
          <Text style={styles.nextBtnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { 
    flex: 1, 
    backgroundColor: COLORS.bg,
  },
  section: {
    marginBottom: 24,
  },
  checkboxGroup: {
    marginTop: 8,
  },
  radioGroup: {
    marginTop: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  radio: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  radioSelected: {
    borderColor: COLORS.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: COLORS.textDark,
    fontFamily: 'Poppins',
  },
  radioLabel: {
    fontSize: 14,
    color: COLORS.textDark,
    fontFamily: 'Poppins',
  },
  bottomBar: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: COLORS.bg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  prevBtn: {
    flex: 1,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  prevBtnText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  nextBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  nextBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
});
