import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { FONTS } from '../themes/regTheme';

export default function LoginScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assets/images/reference-1311037478.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.message}>This feature hasn't been built yet</Text>
        <TouchableOpacity style={styles.guestButton} onPress={() => navigation.navigate('Main', { screen: 'Home' })}>
          <Text style={styles.guestButtonText}>Guest Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 24,
  },
  message: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: FONTS.Poppins,
    textAlign: 'center',
    marginBottom: 24,
  },
  guestButton: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
  },
  guestButtonText: {
    color: '#FAFAFA',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FONTS.Poppins,
  },
});
