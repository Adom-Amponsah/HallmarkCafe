# Custom Country Picker Component

## 🎯 Why Custom?

Instead of using `react-native-country-picker-modal` which has dependency issues, we created a **lightweight, zero-dependency** country picker that works perfectly with Expo!

## ✨ Features

- ✅ **40+ Countries** with flags and dial codes
- ✅ **Search Functionality** - Search by country name or dial code
- ✅ **No External Dependencies** - Pure React Native
- ✅ **Beautiful UI** - Clean modal design
- ✅ **Emoji Flags** - Native emoji support (works everywhere)
- ✅ **Fully Typed** - TypeScript support
- ✅ **Responsive** - Works on all screen sizes

## 📦 Location

```
components/CountryPicker.tsx
```

## 🔧 Usage

### Import

```typescript
import CountryPicker, { Country, COUNTRIES } from '../../../components/CountryPicker';
```

### Basic Usage

```typescript
const [selectedCountry, setSelectedCountry] = useState<Country>(
  COUNTRIES.find(c => c.code === 'GH') || COUNTRIES[0]
);

<CountryPicker
  selectedCountry={selectedCountry}
  onSelect={setSelectedCountry}
/>
```

### Country Object Structure

```typescript
interface Country {
  name: string;        // e.g., "Ghana"
  code: string;        // e.g., "GH"
  dialCode: string;    // e.g., "+233"
  flag: string;        // e.g., "🇬🇭"
}
```

## 🌍 Included Countries

The picker includes 40 popular countries sorted alphabetically:

- 🇬🇭 Ghana (+233)
- 🇳🇬 Nigeria (+234)
- 🇰🇪 Kenya (+254)
- 🇿🇦 South Africa (+27)
- 🇺🇸 United States (+1)
- 🇬🇧 United Kingdom (+44)
- 🇨🇦 Canada (+1)
- 🇫🇷 France (+33)
- 🇩🇪 Germany (+49)
- 🇮🇳 India (+91)
- And 30 more...

## 🎨 Design

### Trigger Button
- Shows selected flag, dial code, and dropdown arrow
- Matches the input field styling
- Positioned as left section of phone input

### Modal
- Full-screen slide-up animation
- Search bar at top with clear button
- Scrollable country list
- Checkmark for selected country
- Close button (X) in header

### Colors
- Background: White
- Selected: Teal (#16a085)
- Text: Black/Gray
- Borders: Light gray (#eee, #f0f0f0)

## 📝 Adding More Countries

To add more countries, edit `components/CountryPicker.tsx`:

```typescript
const COUNTRIES: Country[] = [
  // Add your country here
  { name: 'Your Country', code: 'XX', dialCode: '+XXX', flag: '🏳️' },
  // ... existing countries
].sort((a, b) => a.name.localeCompare(b.name));
```

### Finding Country Codes

- **ISO Code**: 2-letter country code (e.g., GH, NG, US)
- **Dial Code**: International calling code with + (e.g., +233, +234, +1)
- **Flag Emoji**: Use country flag emoji (e.g., 🇬🇭, 🇳🇬, 🇺🇸)

## 🔍 Search Feature

Users can search by:
- Country name (e.g., "Ghana", "United")
- Dial code (e.g., "+233", "233")

Search is case-insensitive and filters in real-time.

## ✅ Advantages Over External Packages

| Feature | Custom Picker | react-native-country-picker-modal |
|---------|--------------|-----------------------------------|
| Dependencies | 0 | Multiple (causes conflicts) |
| Bundle Size | ~5KB | ~500KB+ |
| Expo Compatible | ✅ Yes | ⚠️ Sometimes |
| Customizable | ✅ Fully | ❌ Limited |
| Maintenance | ✅ You control | ❌ Wait for updates |
| TypeScript | ✅ Built-in | ⚠️ May need @types |

## 🚀 Performance

- **Fast**: No external dependencies to load
- **Lightweight**: Only includes countries you need
- **Efficient**: Uses FlatList for smooth scrolling
- **Optimized**: Memoized search filtering

## 🎯 Integration

Already integrated in:
- ✅ `src/screens/auth/LoginScreen.tsx`
- ✅ `src/screens/auth/RegisterScreen.tsx`

Both screens use Ghana (🇬🇭 +233) as the default country.

## 🔄 Future Enhancements

Possible additions:
- [ ] Popular countries section at top
- [ ] Recent selections
- [ ] Country grouping by region
- [ ] Custom flag images (if emoji not preferred)
- [ ] Localization support
