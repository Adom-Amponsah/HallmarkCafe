# Country Picker - Using react-native-country-picker-modal

## 📦 Package Information

**Package**: `react-native-country-picker-modal`  
**Version**: 2.0.0  
**Status**: ✅ Installed and Working

## 🚀 Installation

```bash
yarn add react-native-country-picker-modal react-native-modal react-async-hook
```

**Required Dependencies:**
- `react-native-country-picker-modal` - Main package
- `react-native-modal` - Modal component
- `react-async-hook` - Async data fetching (peer dependency)

## 💻 Implementation

### Import

```typescript
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';
```

### State Management

```typescript
const [countryCode, setCountryCode] = useState<CountryCode>('GH');
const [callingCode, setCallingCode] = useState('233');
```

### Component Usage

```typescript
<View style={styles.countryPickerContainer}>
  <CountryPicker
    countryCode={countryCode}
    withFilter
    withFlag
    withCallingCode
    withEmoji
    onSelect={(country) => {
      setCountryCode(country.cca2);
      setCallingCode(country.callingCode[0]);
    }}
    containerButtonStyle={styles.countryPickerButton}
  />
  <Text style={styles.callingCode}>+{callingCode}</Text>
</View>
```

## ✨ Features Enabled

- ✅ `withFilter` - Search/filter countries
- ✅ `withFlag` - Show country flags
- ✅ `withCallingCode` - Show calling codes
- ✅ `withEmoji` - Use emoji flags

## 🎨 Styling

```typescript
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
```

## 📱 Integrated In

- ✅ `src/screens/auth/LoginScreen.tsx`
- ✅ `src/screens/auth/RegisterScreen.tsx`

## 🌍 Default Country

**Ghana** (GH)
- Country Code: `GH`
- Calling Code: `+233`
- Flag: 🇬🇭

## 📝 Country Object Structure

When a country is selected, you receive:

```typescript
{
  cca2: string;           // 2-letter country code (e.g., "GH")
  callingCode: string[];  // Array of calling codes (e.g., ["233"])
  name: string;           // Country name (e.g., "Ghana")
  flag: string;           // Flag emoji (e.g., "🇬🇭")
  // ... other properties
}
```

## 🔧 Accessing Values

```typescript
onSelect={(country) => {
  const countryCode = country.cca2;           // "GH"
  const callingCode = country.callingCode[0]; // "233"
  const countryName = country.name;           // "Ghana"
  const flag = country.flag;                  // "🇬🇭"
}}
```

## 🎯 Props Reference

| Prop | Type | Description |
|------|------|-------------|
| `countryCode` | CountryCode | Current selected country (2-letter code) |
| `withFilter` | boolean | Enable search/filter functionality |
| `withFlag` | boolean | Show country flag |
| `withCallingCode` | boolean | Show calling code in modal |
| `withEmoji` | boolean | Use emoji flags instead of images |
| `onSelect` | function | Callback when country is selected |
| `containerButtonStyle` | StyleProp | Custom button container style |

## 📚 Additional Props (Optional)

```typescript
<CountryPicker
  // ... required props
  theme={{
    backgroundColor: '#fff',
    onBackgroundTextColor: '#000',
  }}
  translation="eng"
  preferredCountries={['GH', 'NG', 'KE']}
  excludeCountries={['AQ']}
/>
```

## ⚠️ Notes

1. **Country Code Format**: Uses ISO 3166-1 alpha-2 codes (2 letters)
2. **Calling Code**: Returns array, use `[0]` for primary code
3. **Modal**: Opens full-screen modal with search
4. **Performance**: Lazy loads country data

## 🐛 Troubleshooting

### Error: "Unable to resolve react-async-hook"
```bash
yarn add react-async-hook
yarn start --clear
```

### If you see TypeScript errors:
```bash
# Clear cache and reinstall
rm -rf node_modules
yarn install
```

### If modal doesn't open:
- Make sure `react-native-modal` is installed
- Check that you're not blocking modals in parent components

### If flags don't show:
- Ensure `withEmoji` is set to `true`
- Check device/emulator supports emoji

## 🔄 Migration from Custom Picker

The custom `components/CountryPicker.tsx` is now deprecated. The package provides:
- More countries (all countries vs 40)
- Better search
- Official maintenance
- Standard API

## 📖 Documentation

Full documentation: https://github.com/xcarpentier/react-native-country-picker-modal
