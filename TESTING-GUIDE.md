# 🎮 eSabong - Quick Start Guide

## ✅ What's Been Done

### 1. Mobile-First UI Redesign
- ✅ Teller dashboard completely redesigned to match your mobile image
- ✅ Dark theme (bg-gray-900)
- ✅ MERON (red), DRAW (green), WALA (blue) fighter buttons
- ✅ Calculator-style number pad (7-9, 4-6, 1-3, ., 0, CLEAR)
- ✅ Cash In/Out modals
- ✅ Summary view
- ✅ Ready-made bet amounts display

### 2. Capacitor Setup Complete
- ✅ Capacitor installed and configured
- ✅ Android platform added
- ✅ Server URL configured for emulator (`http://10.0.2.2:8000`)
- ✅ Build system ready

## 🚀 Test the Mobile UI Right Now

### Option 1: Test in Browser (Fastest)

1. Start Laravel server:
   ```powershell
   php artisan serve
   ```

2. Open browser and resize to mobile view:
   ```
   http://localhost:8000/login
   ```

3. Login as Teller:
   - Email: `teller@esabong.com`
   - Password: `password`

4. Press **F12** → Click device toolbar icon → Select mobile device

### Option 2: Build APK for Android Studio Testing

1. Make sure Laravel is running:
   ```powershell
   php artisan serve
   ```

2. Open Android project:
   ```powershell
   npx cap open android
   ```

3. Wait for Android Studio to open and sync Gradle

4. Click the **Run** button (▶️) to test on emulator

**OR** to build APK manually:
- Build → Build Bundle(s) / APK(s) → Build APK(s)
- APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

## 📱 Current Features

### Teller Dashboard (Mobile UI)
- Fighter selection (MERON/WALA/DRAW)
- Number pad for bet amounts
- Submit bet button (color-coded by selection)
- Cash In modal with number pad
- Cash Out modal with number pad
- Summary reports view
- Payout/Cancel scan buttons

### Admin Dashboard (Still in Card UI - Needs Tablet Design)
- Fight management
- Open/Close betting
- User management

### Declarator Dashboard (Still in Card UI - Needs Tablet Design)
- Result declaration
- Payout processing

## 🎯 Next Steps

### Immediate Testing
1. Test mobile UI in browser (resize to mobile)
2. Test all teller functions (place bet, cash in/out, summary)
3. Verify fighter button selection works
4. Test number pad functionality

### Android Testing
1. Open in Android Studio: `npx cap open android`
2. Run on emulator or device
3. Test with actual Laravel backend
4. Verify touch interactions work smoothly

### Remaining UI Work
- [ ] Redesign Admin dashboard to match tablet image
- [ ] Redesign Declarator dashboard to match tablet image
- [ ] Add any missing UI elements from your images

## 🔧 Quick Commands

```powershell
# Start Laravel server
php artisan serve

# Build React assets
npm run build

# Sync with Android
npx cap sync android

# Open Android Studio
npx cap open android

# Full rebuild workflow
npm run build; npx cap sync android
```

## 📝 Test Accounts

- **Admin**: admin@esabong.com / password
- **Declarator**: declarator@esabong.com / password
- **Teller**: teller@esabong.com / password

## 🐛 If Something's Wrong

### Mobile UI issues?
- Refresh browser (Ctrl+F5)
- Check console for errors (F12)

### APK issues?
- Make sure `php artisan serve` is running
- Update server URL in `capacitor.config.ts` if needed
- For physical device: Change URL to your computer's IP

### Build errors?
- Run `npm run build` first
- Then `npx cap sync android`
- Clean Android project in Android Studio

## 📚 Full Documentation

- **System Overview**: [README-SYSTEM.md](README-SYSTEM.md)
- **Architecture**: [ARCHITECTURE.md](ARCHITECTURE.md)
- **Android Build**: [ANDROID-BUILD.md](ANDROID-BUILD.md)
- **Database ERD**: [database/ERD.md](database/ERD.md)

---

**Ready to test!** Start with Option 1 (browser) to see the new mobile UI immediately. 🎉
