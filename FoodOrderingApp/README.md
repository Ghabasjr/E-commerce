# Food Ordering App

A React Native food ordering application built with Expo, Firebase, and Redux Toolkit.

## Features

- User authentication (login/register)
- Restaurant browsing and search
- Menu viewing and ordering
- Shopping cart functionality
- Order history and tracking
- Restaurant owner dashboard
- Real-time order updates

## Custom Splash Screen

The app now features a beautiful custom splash screen that replaces the default Expo splash screen. The splash screen includes:

- **Animated Logo**: Restaurant icon with scale and opacity animations
- **Gradient Background**: Beautiful orange gradient matching the app theme
- **App Name & Tagline**: "FoodOrderingApp - Delicious food at your fingertips"
- **Loading Animation**: Animated dots that pulse in sequence
- **Minimum Duration**: Ensures users see the splash screen for at least 2 seconds

### Splash Screen Configuration

The splash screen is configured in:

- `app.json`: Static splash screen settings
- `src/screens/SplashScreen.tsx`: Custom animated splash screen component
- `src/navigation/AppNavigator.tsx`: Integration with app navigation

### Customization

To customize the splash screen:

1. **Colors**: Modify the gradient colors in `SplashScreen.tsx`
2. **Logo**: Replace the Ionicons restaurant icon with your own logo
3. **Text**: Update the app name and tagline
4. **Duration**: Adjust the minimum splash duration in `AppNavigator.tsx`
5. **Static Image**: Replace `assets/splash-icon.png` with your custom splash image

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Run on your preferred platform:
   ```bash
   npm run android
   npm run ios
   npm run web
   ```

## Dependencies

- React Native with Expo
- Firebase (Authentication, Firestore)
- Redux Toolkit for state management
- React Navigation for routing
- Expo Linear Gradient for beautiful gradients
- Ionicons for icons

## Project Structure

```
src/
├── navigation/          # Navigation configuration
├── screens/            # Screen components
│   ├── auth/          # Authentication screens
│   ├── customer/      # Customer screens
│   └── restaurant/    # Restaurant owner screens
├── services/          # API and Firebase services
├── store/             # Redux store and slices
└── types/             # TypeScript type definitions
```
