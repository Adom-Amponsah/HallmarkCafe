# Splash Screen Animation

## Overview
The splash screen features a smooth zoom-in animation using React Native Reanimated.

## Animation Sequence
1. **Initial State**: Image starts at 50% scale (smaller than normal)
2. **Phase 1** (800ms): Smoothly scales up to 100% (normal size)
3. **Phase 2** (600ms): Continues scaling to 300% (fills the screen)
4. **Phase 3** (300ms): Fades out
5. **Complete**: Main app is displayed

## Customization

### Timing
Edit the duration values in `src/screens/SplashScreen.tsx`:
```typescript
withTiming(1, { duration: 800 }) // Phase 1 duration
withTiming(3, { duration: 600 }) // Phase 2 duration
withTiming(0, { duration: 300 }) // Fade out duration
```

### Scale Values
- `scale.value = 0.5` - Initial size (50%)
- First `withTiming(1, ...)` - Normal size (100%)
- Second `withTiming(3, ...)` - Final zoom size (300%)

### Background Color
Change the background color in the styles:
```typescript
backgroundColor: '#ffffff', // Change to your brand color
```

### Image Size
Adjust the image dimensions:
```typescript
width: width * 0.6, // 60% of screen width
height: height * 0.6, // 60% of screen height
```

## Image Location
The splash image is located at:
`src/public/images/image01.png`
