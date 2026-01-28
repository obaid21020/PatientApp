import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../../themes/regTheme';

export default function EditProfile() {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/120');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+234 800 123 4567',
    dob: '1990-01-15',
    address: '123 Main Street, Lagos, Nigeria',
    emergencyContact: '+234 800 765 4321',
  });
    const dobString = dob ? dob.toLocaleDateString('en-GB') : '';

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };
   const handleDateChange = (event, selectedDate) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }
      if (selectedDate) {
        setDob(selectedDate);
      }
    };
    
  const handleChangeProfileImage = () => {
    Alert.alert(
      'Change Profile Photo',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: () => console.log('Open camera') },
        { text: 'Choose from Gallery', onPress: () => console.log('Open gallery') },
        { text: 'Remove Photo', onPress: () => setProfileImage('https://via.placeholder.com/120'), style: 'destructive' },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileImageSection}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: profileImage }} style={styles.profileImageLarge} />
            <TouchableOpacity style={styles.editImageButton} onPress={handleChangeProfileImage}>
              <Ionicons name="camera" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleChangeProfileImage}>
            <Text style={styles.changePhotoText}>Change Profile Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formGrid}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.textInput}
              value={profile.fullName}
              onChangeText={(value) => handleProfileChange('fullName', value)}
              placeholder="Enter full name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              value={profile.email}
              onChangeText={(value) => handleProfileChange('email', value)}
              placeholder="Enter email"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.textInput}
              value={profile.phone}
              onChangeText={(value) => handleProfileChange('phone', value)}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={{ marginBottom: 16 }}>
              <Text style={STYLES.label}>Date of Birth <Text style={{color: COLORS.primary}}>*</Text></Text>
              <TouchableOpacity
                style={STYLES.inputWrap}
                onPress={() => setShowDatePicker(true)}>
                <Ionicons name="calendar" size={20} color={COLORS.placeholder} />
                <Text style={[STYLES.input, { marginLeft: 8 }]}>
                  {dobString || 'Select date'}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={dob || new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                  onTouchCancel={() => setShowDatePicker(false)}
                />
              )}
            </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Address</Text>
            <TextInput
              style={styles.textInput}
              value={profile.address}
              onChangeText={(value) => handleProfileChange('address', value)}
              placeholder="Enter address"
              multiline
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Emergency Contact</Text>
            <TextInput
              style={styles.textInput}
              value={profile.emergencyContact}
              onChangeText={(value) => handleProfileChange('emergencyContact', value)}
              placeholder="Enter emergency contact"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.formActions}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.primary, fontFamily: 'Poppins' },
  content: { flex: 1, padding: 16 },
  profileImageSection: { alignItems: 'center', marginBottom: 24, paddingTop: 8 },
  profileImageContainer: { position: 'relative', marginBottom: 12 },
  profileImageLarge: {
    width: 120, height: 120, borderRadius: 60, backgroundColor: '#E0E0E0', borderWidth: 4, borderColor: COLORS.primary,
  },
  editImageButton: {
    position: 'absolute', bottom: 4, right: 4, width: 36, height: 36, borderRadius: 18,
    backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#FFFFFF',
  },
  changePhotoText: { fontSize: 14, fontWeight: '600', color: COLORS.primary, fontFamily: 'Poppins' },
  formGrid: { gap: 12 },
  inputGroup: { marginBottom: 12 },
  inputLabel: { fontSize: 13, fontWeight: '600', color: '#424242', fontFamily: 'Poppins', marginBottom: 6 },
  textInput: {
    borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 14, color: '#1A1A1A', fontFamily: 'Poppins', backgroundColor: '#FAFAFA',
  },
  formActions: { flexDirection: 'row', gap: 12, marginTop: 24, marginBottom: 40 },
  primaryButton: {
    flex: 1, backgroundColor: COLORS.primary, borderRadius: 8, paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: { fontSize: 14, fontWeight: '600', color: '#FFFFFF', fontFamily: 'Poppins' },
  secondaryButton: {
    flex: 1, backgroundColor: '#F5F5F5', borderRadius: 8, paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryButtonText: { fontSize: 14, fontWeight: '600', color: COLORS.primary, fontFamily: 'Poppins' },
});