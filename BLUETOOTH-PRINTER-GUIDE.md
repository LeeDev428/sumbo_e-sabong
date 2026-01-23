# Bluetooth Thermal Printer Setup Guide

## ✅ What Was Fixed

The error "Cannot read properties of undefined (reading 'requestDevice')" has been resolved by:

1. **Installed Capacitor Bluetooth LE Plugin** (`@capacitor-community/bluetooth-le`)
2. **Added Android Bluetooth Permissions** in AndroidManifest.xml
3. **Created Thermal Printer Utility** (`thermalPrinter.ts`) that works with Capacitor
4. **Updated Printer Settings Page** to use native Bluetooth scanning
5. **Integrated with Teller Dashboard** for automatic thermal printing

## 🔧 New APK Location

The updated APK with Bluetooth support is located at:
```
android/app/build/outputs/apk/release/app-release-unsigned.apk
```

## 📱 How to Test Locally

### 1. Install the New APK
```bash
# Copy APK to your device or install via USB
adb install android/app/build/outputs/apk/release/app-release-unsigned.apk
```

### 2. Connect Bluetooth Printer

1. **Turn on your PT-210 thermal printer** (or compatible printer)
2. **Make sure Bluetooth is enabled** on your Android device
3. **Open the app** → Login as Teller
4. **Go to Settings** (⚙️ icon at bottom)
5. **Tap "Printer" tab**
6. **Grant Bluetooth permissions** when prompted
7. **Tap "Scan for Printers"** button
8. **Wait 5 seconds** for scan to complete
9. **Tap on your printer** from the list (e.g., "PT-210")
10. **Wait for "Connected" status**

### 3. Test Print

1. **Tap "Test Print"** button
2. **Check if receipt prints** from thermal printer
3. If successful, you'll see: "Test print sent successfully!"

### 4. Test Live Betting Receipt

1. **Go back to Dashboard**
2. **Place a bet** (select side, enter amount, submit)
3. **Receipt will automatically print** to thermal printer
4. **Ticket modal will also show** on screen

## 🔌 Supported Printers

- **PT-210** (Primary)
- Any ESC/POS compatible thermal printer
- Bluetooth printers with namePrefix "PT"

## ⚙️ Bluetooth Permissions

The app now requests these Android permissions:
- `BLUETOOTH` (Android ≤ 11)
- `BLUETOOTH_ADMIN` (Android ≤ 11)
- `BLUETOOTH_SCAN` (Android 12+)
- `BLUETOOTH_CONNECT` (Android 12+)
- `ACCESS_FINE_LOCATION` (Required for Bluetooth scanning)

## 🚀 Production Server Setup

### 1. Update Capacitor Config for Production

Edit `capacitor.config.ts`:

```typescript
// Change from local IP to production domain
const SERVER_URL = 'https://your-production-domain.com'; // <-- Update this

const config: CapacitorConfig = {
  appId: 'com.sumbo.esabong',
  appName: 'eSabong',
  webDir: 'public/build',
  server: {
    androidScheme: 'https',
    url: SERVER_URL,
    cleartext: false // Set to false for HTTPS
  },
  // ... rest of config
};
```

### 2. Deploy to Production Server

```bash
# 1. SSH to your production server
ssh user@your-production-server.com

# 2. Navigate to project directory
cd /path/to/sumbo_e-sabong

# 3. Pull latest code
git pull origin master

# 4. Install dependencies
npm install
composer install --no-dev

# 5. Build production assets
npm run build

# 6. Clear Laravel cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# 7. Run migrations (if any)
php artisan migrate --force
```

### 3. Build Production APK

```bash
# On your local machine:

# 1. Update capacitor config (as shown above)

# 2. Build frontend
npm run build

# 3. Sync with Android
npx cap sync android

# 4. Build release APK
cd android
./gradlew assembleRelease
cd ..

# APK will be at:
# android/app/build/outputs/apk/release/app-release-unsigned.apk
```

### 4. Sign the APK (For Google Play Store)

```bash
# Generate keystore (first time only)
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

# Sign the APK
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore my-release-key.keystore android/app/build/outputs/apk/release/app-release-unsigned.apk my-key-alias

# Align the APK
zipalign -v 4 android/app/build/outputs/apk/release/app-release-unsigned.apk sumbo-esabong-release.apk
```

## 🐛 Troubleshooting

### Printer Not Found During Scan
- Make sure printer is **ON** and **in pairing mode**
- Check printer battery level
- Try turning printer OFF and ON again
- Enable Location Services on Android (required for BLE scanning)

### Connection Fails
- Forget the printer in Android Bluetooth settings
- Restart the printer
- Restart the app
- Try scanning again

### Print Doesn't Work
- Check printer paper
- Make sure printer is fully connected (green status)
- Try "Test Print" button first
- Check printer is not in sleep mode

### Permissions Denied
- Go to Android Settings → Apps → eSabong → Permissions
- Enable "Nearby devices" or "Bluetooth"
- Enable "Location" (required for BLE scanning)

## 📋 Receipt Format

The thermal printer will print receipts with:
- **Header**: "EVENTITLE"
- **Fight Number**
- **Receipt ID** (truncated)
- **Date & Time**
- **Bet Side** (MERON/WALA/DRAW) with amount
- **Odds** and **Potential Win**
- **Footer**: "OFFICIAL BETTING RECEIPT"
- **Paper Cut** (automatic)

## 🔄 Fallback Behavior

If thermal printer is **not connected**, the app will:
1. Show ticket modal on screen (with QR code)
2. Use browser print dialog as fallback
3. Allow manual printing via "PRINT" button

## ✨ Features

- ✅ Automatic printer reconnection (remembers last printer)
- ✅ Real-time connection status
- ✅ Automatic thermal printing on bet submission
- ✅ Test print functionality
- ✅ Works with most ESC/POS thermal printers
- ✅ Fallback to browser print if not connected
- ✅ Toast notifications for print status

## 📞 Need Help?

If you encounter issues:
1. Check the browser console (if using web version)
2. Check Android logcat: `adb logcat -s Capacitor`
3. Verify printer is ESC/POS compatible
4. Test with "Test Print" button first
5. Make sure app has all required permissions

---

**Note**: This Bluetooth printing feature only works in the Android APK. Web browsers do not support this level of Bluetooth access.
