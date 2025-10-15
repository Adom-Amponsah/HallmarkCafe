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
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';
// import DateTimePicker from '@react-native-community/datetimepicker';

const { width, height } = Dimensions.get('window');

interface RegisterScreenProps {
  onRegisterSuccess: () => void;
  onBack: () => void;
}

export default function RegisterScreen({ onRegisterSuccess, onBack }: RegisterScreenProps) {
  const [countryCode, setCountryCode] = useState<CountryCode>('GH');
  const [callingCode, setCallingCode] = useState('233');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    email: '',
    firstName: '',
    lastName: '',
    birthday: '',
    referralCode: '',
  });



  const handleContinue = () => {
    // TODO: Validate form data
    if (
      formData.phoneNumber.length >= 9 &&
      formData.email &&
      formData.firstName &&
      formData.lastName
    ) {
      // Navigate to OTP screen
      onRegisterSuccess();
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const isFormValid =
    formData.phoneNumber.length >= 9 &&
    formData.email.length > 0 &&
    formData.firstName.length > 0 &&
    formData.lastName.length > 0;

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
          {/* <TouchableOpacity onPress={onBack}>
            <Text style={styles.guestLink}>Continue as guest</Text>
          </TouchableOpacity> */}
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Let's get started</Text>
          <Text style={styles.subtitle}>
            We just need a bit more information. Please enter your details to get started.
          </Text>

          {/* Phone Number */}
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
                value={formData.phoneNumber}
                onChangeText={(value) => updateField('phoneNumber', value)}
                maxLength={15}
              />
            </View>
          </View>

          {/* Email Address */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Email address <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="example@email.com"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(value) => updateField('email', value)}
            />
          </View>

          {/* First Name & Last Name */}
          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.label}>
                First name <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="e.g John"
                placeholderTextColor="#999"
                value={formData.firstName}
                onChangeText={(value) => updateField('firstName', value)}
              />
            </View>

            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.label}>
                Last name <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="e.g Doe"
                placeholderTextColor="#999"
                value={formData.lastName}
                onChangeText={(value) => updateField('lastName', value)}
              />
            </View>
          </View>

          {/* Birthday */}
          {/* <View style={styles.inputContainer}>
            <Text style={styles.label}>Birthday</Text>
            <TouchableOpacity 
              style={styles.dateInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[
                styles.datePlaceholder,
                formData.birthday && styles.dateSelected
              ]}>
                {formatDisplayDate()}
              </Text>
              <Text style={styles.calendarIcon}>📅</Text>
            </TouchableOpacity>
            <View style={styles.infoBox}>
              <Text style={styles.infoIcon}>ⓘ</Text>
              <Text style={styles.infoText}>
                Get free delivery and discounts on your birthday
              </Text>
            </View>
          </View> */}

          {/* Date Picker Modal */}
          {/* {showDatePicker && (
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )} */}

          {/* Referral Code */}
          {/* <View style={styles.inputContainer}>
            <Text style={styles.label}>Referral code</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter a referral code"
              placeholderTextColor="#999"
              value={formData.referralCode}
              onChangeText={(value) => updateField('referralCode', value)}
            />
          </View> */}

          {/* Continue Button */}
          <TouchableOpacity
            style={[
              styles.continueButton,
              !isFormValid && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!isFormValid}
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
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: height * 0.06,
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.03,
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
  guestLink: {
    fontSize: 16,
    color: '#16a085',
    fontWeight: '500',
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
    marginBottom: 30,
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  required: {
    color: '#e74c3c',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#000',
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 16,
    backgroundColor: '#f9f9f9',
  },
  datePlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  dateSelected: {
    color: '#000',
  },
  calendarIcon: {
    fontSize: 20,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f8f5',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  infoIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#16a085',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#16a085',
  },
  continueButton: {
    backgroundColor: '#462307',
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
