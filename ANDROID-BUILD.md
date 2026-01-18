# Android APK Build Guide

## Prerequisites

1. **Android Studio** installed (you already have this)
2. **Java JDK 17+** installed
3. **Laravel server running** on `http://localhost:8000`

## Build Steps

### 1. Build Web Assets

Every time you make changes to the React code:

```powershell
npm run build
```

### 2. Sync with Capacitor

After building web assets:

```powershell
npx cap sync android
```

This copies the built files to the Android project.

### 3. Open in Android Studio

```powershell
npx cap open android
```

This opens the Android project in Android Studio.

### 4. Build APK in Android Studio

1. In Android Studio, go to **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Wait for the build to complete
3. The APK will be generated in: `android/app/build/outputs/apk/debug/app-debug.apk`

### 5. Install on Device/Emulator

#### On Physical Device:
```powershell
# Enable USB debugging on your Android device first
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

#### On Emulator:
- Drag and drop the APK onto the emulator window
- Or use Android Studio's "Run" button (▶️)

## Important Notes

### Laravel Server Configuration

The app is configured to connect to `http://localhost:8000`. You have two options:

#### Option 1: Local Development (Recommended for Testing)
1. Make sure your Laravel server is running:
   ```powershell
   php artisan serve
   ```

2. Your Android device/emulator must be able to access your computer's localhost:
   - **For Emulator**: Use `http://10.0.2.2:8000` instead of `http://localhost:8000`
   - **For Physical Device**: Use your computer's IP address (e.g., `http://192.168.1.100:8000`)

#### Option 2: Production Server
Update `capacitor.config.ts` with your production server URL:
```typescript
server: {
    androidScheme: 'https',
    url: 'https://your-production-domain.com',
    cleartext: false  // Set to false for HTTPS
}
```

## Quick Commands Reference

```powershell
# Full rebuild and sync
npm run build; npx cap sync android

# Open Android Studio
npx cap open android

# Check Capacitor status
npx cap doctor

# Live reload (for development)
npx cap run android --livereload --external
```

## Troubleshooting

### APK not installing?
- Check Android device settings → Security → Allow installation from unknown sources

### White screen on app launch?
- Make sure Laravel server is running
- Check the server URL in `capacitor.config.ts`
- Run `npm run build` before `npx cap sync android`

### Build errors in Android Studio?
- File → Sync Project with Gradle Files
- Build → Clean Project
- Build → Rebuild Project

### Cannot connect to Laravel server?
- For emulator: Use `http://10.0.2.2:8000`
- For physical device: Use your computer's local IP
- Make sure firewall allows connections on port 8000

## Development Workflow

1. Make changes to React/Laravel code
2. Run `npm run build` (for frontend changes)
3. Run `npx cap sync android`
4. Test in Android Studio or rebuild APK

## Production Build

For a signed release APK:

1. Generate a keystore:
```powershell
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Update `capacitor.config.ts`:
```typescript
android: {
    buildOptions: {
        keystorePath: 'path/to/my-release-key.keystore',
        keystorePassword: 'your-password',
        keystoreAlias: 'my-key-alias',
        keystoreAliasPassword: 'your-alias-password',
        releaseType: 'APK'
    }
}
```

3. In Android Studio: Build → Generate Signed Bundle / APK → APK → Select keystore

## Testing Credentials

- **Admin**: admin@esabong.com / password
- **Declarator**: declarator@esabong.com / password
- **Teller**: teller@esabong.com / password

## Next Steps

1. Test the mobile UI on an actual device
2. Configure production server URL
3. Generate signed release APK
4. Test all role functionalities
5. Optimize for different screen sizes if needed
