import { StyleSheet } from 'react-native';

export const COLORS = {
  bg:          '#FFFFFF',      // pure white page background
  cardBg:      '#FFFFFF',      // white card (same as page)
  primary:     '#0F766E',      // NairaClinic green (buttons / accent)
  textDark:    '#333333',      // labels, title
  textLight:   '#666666',
  ndpa:        '#6f65fc',      // subtitle, NDPA
  placeholder: '#888888',
  border:      '#CCCCCC',
  white:       '#FFFFFF',
  chromeyellow:      '#a8762a',
};

export const FONTS = {
  title:   { fontSize: 22, color: COLORS.textDark, textAlign: 'center', fontWeight: '700', fontFamily: 'Poppins', marginTop: 20, paddingTop: 50 },
  sub:     { fontSize: 14, color: COLORS.textLight, textAlign: 'center', marginTop: 8, lineHeight: 20, fontFamily: 'Poppins' },
  label:   { fontSize: 14, color: COLORS.textDark, marginBottom: 8, fontFamily: 'Poppins' },
  ndpa:    { fontSize: 11, color: COLORS.ndpa, marginTop: 12, lineHeight: 16, textAlign: 'center', fontFamily: 'Poppins' },
  btn:     { fontSize: 16, color: COLORS.white, fontWeight: '600', fontFamily: 'Poppins' },
};

/* inside-input lock icon size & tint */
export const ICON = {
  size: 18,
  color: COLORS.placeholder,
};

/* full screen container style */
export const SCREEN_STYLES = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },
});

/* layout component styles */
export const LAYOUT_STYLES = StyleSheet.create({
  fieldGroup: { marginBottom: 16 },
});

/* reusable component styles */
export const STYLES = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, justifyContent: 'flex-start', alignItems: 'stretch', paddingHorizontal: 24, paddingTop: 40 },
  card:      { backgroundColor: COLORS.cardBg, borderRadius: 12, padding: 24, elevation: 0 }, // flat white card
  label:     { fontSize: 14, fontWeight: '500', color: COLORS.textDark, marginBottom: 8, fontFamily: 'Poppins' },
  inputWrap: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 8 },
  input:     { flex: 1, fontSize: 16, marginLeft: 8, color: COLORS.textDark, fontFamily: 'Poppins' },
  validationText: { fontSize: 12, fontWeight: '500', marginBottom: 16, fontFamily: 'Poppins' },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 },
  otpBox:    { width: 50, height: 50, borderWidth: 2, borderColor: COLORS.border, borderRadius: 8, fontSize: 20, fontWeight: '600', color: COLORS.textDark, backgroundColor: COLORS.white },
  clearBtn:  { textAlign: 'center', color: COLORS.primary, fontSize: 14, fontWeight: '600', marginVertical: 8, fontFamily: 'Poppins' },
  resendText: { textAlign: 'center', color: COLORS.textLight, fontSize: 12, marginTop: 12, fontFamily: 'Poppins' },
  radioRow:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 16 },
  radioDot:  { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.primary, marginRight: 6 },
  radioText: { fontSize: 12, color: COLORS.textLight, fontFamily: 'Poppins' },
  sendBtn:   { backgroundColor: COLORS.primary, borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginTop: 12 },
});
