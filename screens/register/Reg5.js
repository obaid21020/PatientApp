import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView, Platform, ScrollView,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import NairaLogo from '../../components/NairaLogo';
import ProgressHeader from '../../components/ProgressHeader';
import { COLORS, FONTS, STYLES } from '../../themes/regTheme';

export default function Reg5({ navigation }) {
  const [pin, setPin] = useState(['', '', '', '', '']);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [sosContactAdded, setSosContactAdded] = useState(false);

  // Safe area insets
  const insets = useSafeAreaInsets();

  // Create refs for PIN inputs
  const pinRefs = useRef([]);

  const handlePinChange = (value, index) => {
    // Only allow single digit
    if (!/^\d?$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto-focus to next field if digit entered
    if (value && index < 4) {
      pinRefs.current[index + 1]?.focus();
    }
  };

  const handlePinKeyPress = (e, index) => {
    // Handle backspace to move to previous field
    if (e.nativeEvent.key === 'Backspace' && pin[index] === '' && index > 0) {
      pinRefs.current[index - 1]?.focus();
    }
  };

  const isPinComplete = pin.every((digit) => digit !== '');
  const isFormComplete = isPinComplete;

  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <ProgressHeader current={5} total={6} />
      <NairaLogo />

      {/* ---- title & subtitle at top ---- */}
      <Text style={[FONTS.title, { paddingTop: 10 }]}>Protect your account</Text>
      <Text style={FONTS.sub}>
        Set up security and emergency contacts
      </Text>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}>
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={true}>
          <View style={styles.container}>

            {/* ---- Create PIN ---- */}
            <View style={styles.section}>
              <Text style={STYLES.label}>Create 5 digit PIN <Text style={{color: COLORS.primary}}>*</Text></Text>
              
              {/* PIN Input Boxes */}
              <View style={styles.pinContainer}>
                {pin.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      pinRefs.current[index] = ref;
                    }}
                    style={styles.pinBox}
                    value={digit}
                    onChangeText={(value) => handlePinChange(value, index)}
                    onKeyPress={(e) => handlePinKeyPress(e, index)}
                    keyboardType="phone-pad"
                    maxLength={1}
                    textAlign="center"
                    secureTextEntry
                  />
                ))}
              </View>

              {/* Clear Button */}
              <TouchableOpacity onPress={() => setPin(['', '', '', '', ''])}>
                <Text style={styles.clearBtn}>Clear</Text>
              </TouchableOpacity>
            </View>

            {/* ---- Biometric Authentication Card ---- */}
            <View style={styles.biometricCard}>
              <View style={styles.lockIconContainer}>
                <Ionicons name="lock-closed" size={48} color={COLORS.primary} />
              </View>

              <Text style={styles.biometricTitle}>Biometric Authentication</Text>
              <Text style={styles.biometricSubtitle}>
                Enable Fingerprint for faster login alongside your PIN.
              </Text>

              <TouchableOpacity 
                style={styles.enableBiometricBtn}
                onPress={() => setBiometricEnabled(!biometricEnabled)}>
                <Text style={styles.enableBiometricBtnText}>Enable Biometric</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.skipLink}>Skip for now</Text>
              </TouchableOpacity>
            </View>

            {/* ---- Add SOS/Emergency Contact ---- */}
            <TouchableOpacity 
              style={styles.sosBtn}
              onPress={() => setSosContactAdded(!sosContactAdded)}>
              <Text style={styles.sosBtnText}>Add SOS/Emergency Contact</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ---- Bottom Buttons ---- */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom || 16 }]}> 
        <TouchableOpacity
          style={styles.prevBtn}
          onPress={() => navigation.goBack()}>
          <Text style={styles.prevBtnText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.nextBtn, !isFormComplete && styles.nextBtnDisabled]}
          disabled={!isFormComplete}
          onPress={() => navigation.navigate('Main')}>
          <Text style={styles.nextBtnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  container: { flex: 1, backgroundColor: COLORS.bg, justifyContent: 'center', alignItems: 'stretch', paddingHorizontal: 24, paddingTop: 40 },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    gap: 8,
  },
  pinBox: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 8,
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.textDark,
    backgroundColor: COLORS.white,
  },
  clearBtn: {
    textAlign: 'center',
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
    fontFamily: 'Poppins',
  },
  biometricCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  lockIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  biometricTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 8,
    fontFamily: 'Poppins',
  },
  biometricSubtitle: {
    fontSize: 13,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Poppins',
    lineHeight: 18,
  },
  enableBiometricBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  enableBiometricBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  skipLink: {
    color: COLORS.primary,
    fontSize: 13,
    fontFamily: 'Poppins',
  },
  sosBtn: {
    backgroundColor: '#DC143C',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginVertical: 20,
  },
  sosBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
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
  nextBtnDisabled: {
    backgroundColor: COLORS.border,
    opacity: 0.5,
  },
  nextBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
});
