import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withSpring,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

export default function SplashScreen({ onAnimationComplete }: SplashScreenProps) {
  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(-height);

  useEffect(() => {
    // Drop animation
    translateY.value = withSpring(0, {
      damping: 12,
      stiffness: 80,
      mass: 2.5,
    }, (finished) => {
      if (finished) {
        // After bounce, wait then scale up MUCH bigger to fill screen
        scale.value = withSequence(
          // Pause at normal size
          withTiming(1, { duration: 500 }),
          // Scale up MASSIVELY to ensure the white logo fills entire screen
          withTiming(15, { // Increased from 3 to 15 - this will definitely fill the screen
            duration: 800,
            easing: Easing.in(Easing.cubic),
          }, (finished) => {
            if (finished) {
              // Fade out at the end
              opacity.value = withTiming(0, {
                duration: 300,
              }, (finished) => {
                if (finished) {
                  runOnJS(onAnimationComplete)();
                }
              });
            }
          })
        );
      }
    });

    // Initial scale animation
    scale.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.cubic),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { scale: scale.value }
      ],
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, animatedStyle]}>
        <Image
          source={require('@/public/images/logo1.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#462307',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.6,
    height: height * 0.6,
  },
});