import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NairaLogo from '../components/NairaLogo';
import { COLORS } from '../themes/theme';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header Text */}
      

      {/* White Card with Logo */}
      <View style={styles.card}>
        <NairaLogo />
        <Text style={styles.headerText}>Patient Application</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.signUpBtn]} 
            onPress={() => navigation.navigate('Reg1')}>
            <Text style={[styles.buttonText, styles.signUpBtnText]}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.signUpBtnText]} 
            onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.buttonText, styles.signUpBtnText]}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.primary, 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.black,
    marginTop: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 40,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
 
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginTop: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  signUpBtn: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
  },
  loginBtn: {
    backgroundColor: 'transparent',
    borderColor: COLORS.white,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  signUpBtnText: {
    color: COLORS.primary,
  },
  loginBtnText: {
    color: COLORS.white,
  },
});