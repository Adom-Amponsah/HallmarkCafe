# Authentication Flow Documentation

## 📱 Complete User Flow

```
Splash Screen (2.7s)
    ↓
Onboarding (3 screens)
    ↓
Last Onboarding Screen
    ├─→ [Login Button] → Login Screen → OTP Verification → Home
    └─→ [Get Started Button] → Register Screen → OTP Verification → Home
```

## 🔐 Authentication Screens

### 1. **Login Screen** (`src/screens/auth/LoginScreen.tsx`)
- **Purpose**: Existing users login with phone number
- **Fields**:
  - Country code selector (🇬🇭 +233)
  - Phone number input
- **Actions**:
  - Back button (returns to onboarding)
  - Continue button (proceeds to OTP)
- **Validation**: Phone number must be at least 9 digits

### 2. **Register Screen** (`src/screens/auth/RegisterScreen.tsx`)
- **Purpose**: New users create an account
- **Fields**:
  - Country code + Phone number *
  - Email address *
  - First name *
  - Last name *
  - Birthday (optional)
  - Referral code (optional)
- **Actions**:
  - Back button (returns to onboarding)
  - "Continue as guest" link (returns to onboarding)
  - Continue button (proceeds to OTP)
- **Validation**: Required fields must be filled
- **Features**:
  - Birthday info box with benefits message
  - Split name fields (First/Last)

### 3. **OTP Verification Screen** (`src/screens/auth/OTPScreen.tsx`)
- **Purpose**: Verify phone number via 6-digit code
- **Features**:
  - 6 individual input boxes for OTP digits
  - Auto-focus next input on digit entry
  - Auto-focus previous input on backspace
  - Visual feedback (filled inputs highlighted)
  - Resend code functionality
  - Displays phone number being verified
- **Actions**:
  - Back button (returns to login/register)
  - Resend link
  - Verify button (proceeds to Home)
- **Validation**: All 6 digits must be entered

## 🎨 Design System

### Colors
- **Primary Action**: `#653e17` (Coffee brown) - Login button
- **Secondary Action**: `#16a085` (Teal green) - Register button
- **Error/Required**: `#e74c3c` (Red)
- **Info Box**: `#e8f8f5` (Light teal background)
- **Borders**: `#ddd` (Light gray)
- **Background**: `#f9f9f9` (Off-white)
- **Text**: `#000` (Black), `#666` (Gray), `#999` (Light gray)

### Onboarding Last Screen
- **Login Button**: Transparent with white border, white text
- **Get Started Button**: White background, dark brown text

### Layout
- **Responsive**: All padding/spacing uses `width` and `height` percentages
- **Input Style**: Rounded (12px), light background, 1px border
- **Button Style**: Rounded (12px for auth, 30px for onboarding), bold text
- **Typography**: 
  - Title: 32px bold
  - Subtitle: 16px regular
  - Labels: 16px semi-bold
  - Buttons: 18px bold

## 🏗️ File Structure

```
src/
├── navigation/
│   └── AppNavigator.tsx          # Main flow controller
├── screens/
│   ├── SplashScreen.tsx          # Animated splash
│   ├── OnboardingScreen.tsx      # 3-screen carousel
│   ├── Home.tsx                  # Main app
│   └── auth/
│       ├── LoginScreen.tsx       # Phone login
│       ├── RegisterScreen.tsx    # User registration
│       └── OTPScreen.tsx         # OTP verification
```

## 🔄 Navigation States

The `AppNavigator` manages these states:
- `splash` - Initial loading screen
- `onboarding` - 3-screen carousel
- `login` - Login with phone number
- `register` - Registration form
- `otp-login` - OTP verification after login
- `otp-register` - OTP verification after registration
- `home` - Main application

## 🚀 Implementation Notes

### TODO Items
1. **Backend Integration**:
   - Connect login API
   - Connect registration API
   - Connect OTP send/verify API
   - Store authentication tokens

2. **Phone Number Handling**:
   - Pass actual phone number from login/register to OTP screen
   - Implement country code selector
   - Add phone number formatting

3. **Form Validation**:
   - Email format validation
   - Phone number format validation
   - Password requirements (if needed)

4. **Birthday Picker**:
   - Implement date picker modal
   - Format and store birthday

5. **Guest Mode**:
   - Implement "Continue as guest" functionality
   - Handle limited access for guests

6. **Error Handling**:
   - Display API errors
   - Handle network failures
   - Show validation errors

## 📝 Best Practices

✅ **Implemented**:
- Centralized navigation in AppNavigator
- Proper TypeScript interfaces
- Responsive design with percentages
- Clean component separation
- Callback-based navigation
- Keyboard-aware views
- Auto-focus for better UX

✅ **Code Organization**:
- Auth screens in dedicated folder
- Reusable styles
- Clear prop interfaces
- Documented flow in comments
