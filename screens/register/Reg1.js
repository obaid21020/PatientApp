import { Ionicons } from '@expo/vector-icons'; // lock icon
import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView, Platform, ScrollView,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';
import NairaLogo from '../../components/NairaLogo';
import ProgressHeader from '../../components/ProgressHeader';
import { COLORS, FONTS, SCREEN_STYLES, STYLES } from '../../themes/regTheme';

export default function Reg1_Phone({ navigation }) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [sendViaSMS, setSendViaSMS] = useState(true);

  // Create refs for OTP inputs
  const otpRefs = useRef([]);

  // Validate phone number: 11-13 digits with optional +
  const isValidPhone = () => {
    const phoneDigits = phone.replace(/\D/g, ''); // remove non-digits
    return phoneDigits.length >= 11 && phoneDigits.length <= 13;
  };

  const handleOtpChange = (value, index) => {
    // Only allow single digit
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus to next field if digit entered
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (e, index) => {
    // Handle backspace to move to previous field
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Check if all fields are complete
  const isOtpComplete = otp.every((digit) => digit !== '');
  const isFormComplete = isValidPhone() && isOtpComplete;

  return (
    <View style={SCREEN_STYLES.screen}>
      <ProgressHeader current={1} total={6} />
      <NairaLogo />
      
      {/* ---- title & subtitle at top ---- */}
      <Text style={FONTS.title}>Verify Your Phone</Text>
      <Text style={FONTS.sub}>
        We'll send you a 6-digit code to verify your phone number
      </Text>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}>
        <ScrollView contentContainerStyle={STYLES.container} keyboardShouldPersistTaps="handled">

          {/* ----  centered content  ---- */}

          {/* ----  phone input with lock  ---- */}
          <View>
            <Text style={STYLES.label}>Phone Number <Text style={{color: COLORS.primary}}>*</Text></Text>
            <View style={STYLES.inputWrap}>
              <Ionicons name="lock-closed" size={STYLES.iconSize} color={COLORS.placeholder} />
              <TextInput
                style={STYLES.input}
                placeholder="08012345678 or +2348012345678"
                placeholderTextColor={COLORS.placeholder}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                returnKeyType="done"
              />
              {isValidPhone() && <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />}
            </View>

            {/* Validation message */}
            {isValidPhone() && (
              <Text style={[STYLES.validationText, { color: COLORS.primary }]}>✓ Valid phone number</Text>
            )}
          </View>

          {/* ----  OTP Input Section (show when phone is valid) ---- */}
          {isValidPhone() && (
            <View style={{ marginTop: 24 }}>
              <Text style={STYLES.label}>Enter 6-digit code sent to {phone} via SMS</Text>
              
              {/* OTP Input Boxes */}
              <View style={STYLES.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      otpRefs.current[index] = ref;
                    }}
                    style={STYLES.otpBox}
                    value={digit}
                    onChangeText={(value) => handleOtpChange(value, index)}
                    onKeyPress={(e) => handleOtpKeyPress(e, index)}
                    keyboardType="phone-pad"
                    keyboardVerticalOffset={180}
                    maxLength={1}
                    textAlign="center"
                  />
                ))}
              </View>

              {/* Clear Button */}
              <TouchableOpacity onPress={() => setOtp(['', '', '', '', '', ''])}>
                <Text style={STYLES.clearBtn}>Clear</Text>
              </TouchableOpacity>

              {/* Resend Timer */}
              <Text style={STYLES.resendText}>Resend code in 4:53</Text>
            </View>
          )}

          {/* ----  radio row  ---- */}
          <TouchableOpacity 
            style={STYLES.radioRow}
            onPress={() => setSendViaSMS(!sendViaSMS)}>
            {sendViaSMS && <View style={STYLES.radioDot} />}
            <Text style={STYLES.radioText}>Send OTP via SMS</Text>
          </TouchableOpacity>

          {/* ----  NDPA footer  ---- */}
          <Text style={FONTS.ndpa}>
            NDPA Protected: Your data is protected by the Nigerian Data Protection Act.
            We use your phone number only for verification and important health updates.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ---- Bottom Next Button ---- */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.nextBtn, !isFormComplete && styles.nextBtnDisabled]}
          disabled={!isFormComplete}
          onPress={() => navigation.navigate('InitialPicks')}>
          <Text style={styles.nextBtnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },
  iconSize: 18,
  bottomBar: {
    padding: 16,
    backgroundColor: COLORS.bg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  nextBtn: {
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