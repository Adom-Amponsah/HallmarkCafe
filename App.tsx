import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { CountryModalProvider } from 'react-native-country-picker-modal';

import './global.css';
import AppNavigator from '@/navigation/AppNavigator';
import { useAppReady } from '@/hooks/useAppReady';

/**
 * Main App Component
 * Handles app initialization and renders the AppNavigator
 * Flow: Splash → Onboarding → Home
 */
export default function App() {
  const { isReady, onLayoutRootView } = useAppReady();

  if (!isReady) {
    return null;
  }

  return (
    <CountryModalProvider>
      <View className="flex-1" onLayout={onLayoutRootView}>
        <AppNavigator />
        <StatusBar style="auto" />
      </View>
    </CountryModalProvider>
  );
}
