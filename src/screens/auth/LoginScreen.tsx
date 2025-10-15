import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';

const { width, height } = Dimensions.get('window');

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

export default function LoginScreen({ onLoginSuccess, onBack }: LoginScreenProps) {
  const [countryCode, setCountryCode] = useState<CountryCode>('GH');
  const [callingCode, setCallingCode] = useState('233');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleContinue = () => {
    // TODO: Validate phone number
    if (phoneNumber.length >= 9) {
      // Navigate to OTP screen
      onLoginSuccess();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          
          {/* Logo - Centered in header */}
          <View style={styles.headerLogoContainer}>
            <Image 
              source={require('@/public/images/hallmarkcup.png')} 
              style={styles.headerLogo}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.backButton} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Enter your phone number to login to your account
          </Text>

          {/* Phone Number Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Phone number <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.phoneInputWrapper}>
              <View style={styles.countryPickerContainer}>
                <CountryPicker
                  countryCode={countryCode}
                  withFilter
                  withFlag
                  withCallingCodeButton
                  withFlagButton
                  withCallingCode
                  onSelect={(country) => {
                    setCountryCode(country.cca2);
                    setCallingCode(country.callingCode[0]);
                  }}
                  containerButtonStyle={styles.countryPickerButton}
                />
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder="0800000000"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                maxLength={15}
              />
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={[
              styles.continueButton,
              phoneNumber.length < 9 && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={phoneNumber.length < 9}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: height * 0.03,
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.00,
  },
  headerLogoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerLogo: {
    width: width * 0.35,
    height: width * 0.35,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backText: {
    fontSize: 28,
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: width * 0.06,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  required: {
    color: '#e74c3c',
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  countryPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  countryPickerButton: {
    paddingVertical: 16,
  },
  callingCode: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    marginLeft: 5,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 16,
    fontSize: 16,
    color: '#000',
  },
  continueButton: {
    backgroundColor: '#653e17',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonDisabled: {
    backgroundColor: '#ccc',
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
