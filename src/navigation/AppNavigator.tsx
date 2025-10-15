import React, { useState } from 'react';
import SplashScreen from '@/screens/SplashScreen';
import OnboardingScreen from '@/screens/OnboardingScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import RegisterScreen from '@/screens/auth/RegisterScreen';
import OTPScreen from '@/screens/auth/OTPScreen';
import Home from '@/screens/Home';

/**
 * App Navigation Flow:
 * 1. Splash Screen (animated logo)
 * 2. Onboarding Screen (3-screen carousel)
 * 3a. Login → OTP → Home
 * 3b. Register → OTP → Home
 */

type AppState = 'splash' | 'onboarding' | 'login' | 'register' | 'otp-login' | 'otp-register' | 'home';

export default function AppNavigator() {
  const [currentScreen, setCurrentScreen] = useState<AppState>('splash');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSplashComplete = () => {
    setCurrentScreen('onboarding');
  };

  const handleLogin = () => {
    setCurrentScreen('login');
  };

  const handleRegister = () => {
    setCurrentScreen('register');
  };

  const handleLoginSubmit = () => {
    // TODO: Get phone number from login screen
    setPhoneNumber('+233 0800000000'); // Placeholder
    setCurrentScreen('otp-login');
  };

  const handleRegisterSubmit = () => {
    // TODO: Get phone number from register screen
    setPhoneNumber('+233 0800000000'); // Placeholder
    setCurrentScreen('otp-register');
  };

  const handleOTPVerified = () => {
    setCurrentScreen('home');
  };

  const handleBackToOnboarding = () => {
    setCurrentScreen('onboarding');
  };

  const handleBackToLogin = () => {
    setCurrentScreen('login');
  };

  const handleBackToRegister = () => {
    setCurrentScreen('register');
  };

  // Render current screen based on state
  switch (currentScreen) {
    case 'splash':
      return <SplashScreen onAnimationComplete={handleSplashComplete} />;
    
    case 'onboarding':
      return (
        <OnboardingScreen
          onComplete={handleRegister}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      );
    
    case 'login':
      return (
        <LoginScreen
          onLoginSuccess={handleLoginSubmit}
          onBack={handleBackToOnboarding}
        />
      );
    
    case 'register':
      return (
        <RegisterScreen
          onRegisterSuccess={handleRegisterSubmit}
          onBack={handleBackToOnboarding}
        />
      );
    
    case 'otp-login':
      return (
        <OTPScreen
          phoneNumber={phoneNumber}
          onVerifySuccess={handleOTPVerified}
          onBack={handleBackToLogin}
        />
      );
    
    case 'otp-register':
      return (
        <OTPScreen
          phoneNumber={phoneNumber}
          onVerifySuccess={handleOTPVerified}
          onBack={handleBackToRegister}
        />
      );
    
    case 'home':
      return <Home />;
    
    default:
      return <SplashScreen onAnimationComplete={handleSplashComplete} />;
  }
}
