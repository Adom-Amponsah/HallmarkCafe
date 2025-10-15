# Project Structure & Navigation Flow

## 📁 Project Structure

```
my-expo-app/
├── src/
│   ├── navigation/
│   │   └── AppNavigator.tsx      # Main navigation flow controller
│   ├── screens/
│   │   ├── SplashScreen.tsx      # Animated splash screen
│   │   ├── OnboardingScreen.tsx  # 3-screen onboarding carousel
│   │   └── Home.tsx              # Main app home screen
│   ├── hooks/
│   │   └── useAppReady.tsx       # App initialization hook
│   └── public/
│       └── images/
│           └── image01.png       # Splash screen logo
├── App.tsx                        # Root component
└── package.json
```

## 🔄 Navigation Flow

```
App.tsx
  └─> AppNavigator.tsx (Flow Controller)
        │
        ├─> 1. SplashScreen (2.7s animation)
        │     └─> onAnimationComplete()
        │
        ├─> 2. OnboardingScreen (3 screens)
        │     └─> onComplete()
        │
        └─> 3. Home (Main App)
```

## 📱 Screen Flow Details

### 1. **Splash Screen** (`SplashScreen.tsx`)
- **Duration**: ~2.7 seconds
- **Animation**: Logo scales from 50% → 100% → 300% then fades out
- **Trigger**: Automatically transitions to Onboarding
- **Technology**: React Native Reanimated

### 2. **Onboarding Screen** (`OnboardingScreen.tsx`)
- **Screens**: 3 swipeable screens
- **Features**:
  - Swipe left/right navigation
  - "Next" button
  - "Skip" button (top-right)
  - Dot indicators
  - "Get Started" on final screen
- **Trigger**: User completes or skips → transitions to Home

### 3. **Home Screen** (`Home.tsx`)
- Main application content

## 🎨 Design System

### Colors
```typescript
const colors = {
  darkBrown: '#462307',      // Primary background
  lightBeige: '#f9f5ec',     // Secondary background
  coffeeBrown: '#653e17',    // Accent
  white: '#ffffff',          // Text/buttons
};
```

### Layout Guidelines
- **Onboarding Images**: 70% of screen width, centered
- **Spacing**: 50px between image and text
- **Padding**: 100px top (for skip button), 30px horizontal
- **Button**: Full-width with 40px horizontal padding

## 🔧 How to Modify

### Add/Remove Onboarding Screens
Edit `onboardingData` array in `OnboardingScreen.tsx`:
```typescript
const onboardingData = [
  {
    id: '1',
    image: 'URL',
    title: 'Title',
    description: 'Description',
  },
  // Add more...
];
```

### Change Navigation Flow
Edit `AppNavigator.tsx` to modify the screen sequence or add new screens.

### Skip Onboarding (Development)
In `AppNavigator.tsx`, change initial state:
```typescript
const [currentScreen, setCurrentScreen] = useState<AppState>('home');
```

## 🚀 Running the App

```bash
# Start development server
yarn start

# Run on specific platform
yarn android
yarn ios
yarn web
```

## 📝 Notes

- All navigation logic is centralized in `AppNavigator.tsx`
- Each screen receives callbacks for transitions
- State management is clean and predictable
- No external navigation libraries needed for this simple flow
