import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

interface OnboardingItem {
  id: string;
  image: any;
  title: string;
  description: string;
}

const onboardingData: OnboardingItem[] = [
  {
    id: '1',
    image: require('@/public/images/onboarding/image01.jpg'),
    title: 'Delicious Burgers',
    description: 'Discover the best burgers in town, made fresh daily with premium ingredients',
  },
  {
    id: '2',
    image: require('@/public/images/onboarding/image02.jpg'),
    title: 'Fresh & Healthy',
    description: 'Enjoy our selection of fresh salads and healthy options for every taste',
  },
  {
    id: '3',
    image: require('@/public/images/onboarding/image03.jpg'),
    title: 'Fast Delivery',
    description: 'Get your favorite meals delivered hot and fast',
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

export default function OnboardingScreen({ onComplete, onLogin, onRegister }: OnboardingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const autoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-scroll effect
  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollTimer.current) {
        clearInterval(autoScrollTimer.current);
      }
    };
  }, [currentIndex]);

  const startAutoScroll = () => {
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
    }
    
    autoScrollTimer.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % onboardingData.length;
        flatListRef.current?.scrollToOffset({
          offset: nextIndex * width,
          animated: true,
        });
        return nextIndex;
      });
    }, 4000); // Change every 4 seconds
  };

  const stopAutoScroll = () => {
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
    }
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / width);
        if (index !== currentIndex) {
          setCurrentIndex(index);
        }
      },
    }
  );

  const renderItem = ({ item, index }: { item: OnboardingItem; index: number }) => {
    return (
      <View style={styles.slide}>
        {/* Image Section with Wave Bottom */}
        <View style={styles.imageContainer}>
          <View style={styles.imageSection}>
            <Image source={item.image} style={styles.image} resizeMode="cover" />
          </View>
          
          {/* Wave SVG Overlay */}
          <Svg 
            height={height * 0.15}
            width={width}
            style={styles.wave}
            viewBox={`0 0 ${width} ${height * 0.15}`}
            preserveAspectRatio="none"
          >
            <Path
              d={`M 0 ${height * 0.05} Q ${width * 0.25} 0 ${width * 0.5} ${height * 0.05} T ${width} ${height * 0.05} L ${width} ${height * 0.15} L 0 ${height * 0.15} Z`}
              fill="#462307"
            />
          </Svg>
        </View>
        
        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Dots Indicator - at top of bottom section */}
          {renderDots()}
          
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {onboardingData.map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 30, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                width: dotWidth,
                opacity,
                backgroundColor: '#ffffff',
              }
            ]}
          />
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Carousel */}
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        snapToInterval={width}
        snapToAlignment="center"
        decelerationRate="fast"
        removeClippedSubviews={false}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={3}
        onScrollBeginDrag={stopAutoScroll}
        onScrollEndDrag={startAutoScroll}
      />

      {/* Buttons - Always visible */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.secondaryButton} onPress={onLogin}>
          <Text style={styles.secondaryButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onRegister}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#462307',
  },

  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  skipText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  slide: {
    width: width,
    height: height,
    backgroundColor: '#462307',
  },
  imageContainer: {
    height: height * 0.6,
    width: width,
    position: 'relative',
  },
  imageSection: {
    height: '100%',
    width: '100%',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  wave: {
    position: 'absolute',
    bottom: -2,
    left: 0,
  },
  bottomSection: {
    height: height * 0.4,
    paddingTop: height * 0.01,
    paddingHorizontal: width * 0.08,
    paddingBottom: height * 0.15,
    justifyContent: 'flex-start',
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.9,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.01,
    marginBottom: height * 0.02,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: height * 0.06,
    left: width * 0.1,
    right: width * 0.1,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#462307',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#ffffff',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});