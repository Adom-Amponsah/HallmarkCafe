# Onboarding Flow

## Overview
The app features a complete onboarding experience with:
1. **Splash Screen** - Animated logo zoom
2. **Onboarding Carousel** - 3 swipeable screens
3. **Main App** - Home screen

## Brand Colors
```
Dark brown (primary):    #462307
Light beige background:  #f9f5ec
Medium coffee brown:     #653e17
```

## Onboarding Screens

### Screen 1: Delicious Burgers
- **Image**: Burger photo
- **Title**: "Delicious Burgers"
- **Description**: "Discover the best burgers in town, made fresh daily with premium ingredients"

### Screen 2: Fresh & Healthy
- **Image**: Salad photo
- **Title**: "Fresh & Healthy"
- **Description**: "Enjoy our selection of fresh salads and healthy options for every taste"

### Screen 3: Fast Delivery
- **Image**: Delivery photo
- **Title**: "Fast Delivery"
- **Description**: "Get your favorite meals delivered hot and fresh right to your doorstep"

## Features
- ✅ Swipe to navigate between screens
- ✅ "Next" button to advance
- ✅ "Skip" button to jump to app
- ✅ Dot indicators showing current screen
- ✅ "Get Started" button on final screen
- ✅ Dark brown background with white text
- ✅ Smooth animations

## Customization

### Change Content
Edit the `onboardingData` array in `src/screens/OnboardingScreen.tsx`:
```typescript
const onboardingData = [
  {
    id: '1',
    image: 'YOUR_IMAGE_URL',
    title: 'Your Title',
    description: 'Your description',
  },
  // Add more screens...
];
```

### Change Colors
Edit the styles in `OnboardingScreen.tsx`:
```typescript
backgroundColor: '#462307', // Dark brown background
color: '#ffffff', // White text
```

### Add/Remove Screens
Simply add or remove objects from the `onboardingData` array. The component automatically adjusts.

## User Flow
1. App launches → Splash screen plays (2.7 seconds)
2. Onboarding screen 1 appears
3. User swipes or clicks "Next" through 3 screens
4. User clicks "Get Started" or "Skip"
5. Main app (Home screen) appears
