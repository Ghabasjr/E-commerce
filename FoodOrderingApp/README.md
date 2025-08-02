# Food Ordering Management System

A comprehensive mobile application built with React Native and Expo CLI that enhances user experience and improves efficiency in food service operations.

## 🎯 Project Objectives

1. **User-Friendly Interface**: Develop intuitive interfaces for customers to browse menus, select items, and place orders
2. **Secure Payment Integration**: Implement secure payment gateways for cashless transactions
3. **Real-Time Order Tracking**: Provide customers with live order status updates
4. **Restaurant Management**: Offer restaurant owners an efficient dashboard for order and menu management

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React Native with Expo CLI
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation v6
- **UI Components**: React Native Elements, Expo Vector Icons
- **Storage**: AsyncStorage for local data persistence
- **Mock Services**: Simulated backend with realistic delays

### Project Structure
```
FoodOrderingApp/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── common/          # Shared components
│   │   ├── customer/        # Customer-specific components
│   │   └── restaurant/      # Restaurant-specific components
│   ├── navigation/          # Navigation configuration
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   ├── CustomerNavigator.tsx
│   │   └── RestaurantNavigator.tsx
│   ├── screens/             # Screen components
│   │   ├── auth/           # Authentication screens
│   │   ├── customer/       # Customer screens
│   │   └── restaurant/     # Restaurant screens
│   ├── services/           # API services
│   │   ├── authService.ts
│   │   ├── restaurantService.ts
│   │   ├── cartService.ts
│   │   └── orderService.ts
│   ├── store/              # Redux store configuration
│   │   ├── index.ts
│   │   └── slices/         # Redux slices
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
└── App.tsx                 # Main application component
```

## ✨ Features

### 🔐 Authentication System
- **Login/Register**: Secure user authentication with role-based access
- **Password Recovery**: Forgot password functionality
- **Role Management**: Separate interfaces for customers and restaurant owners
- **Demo Accounts**: Pre-configured test accounts for easy testing

### 👤 Customer Features
- **Home Dashboard**: Personalized greeting and restaurant discovery
- **Restaurant Browse**: View restaurants with ratings, delivery times, and cuisine filters
- **Search Functionality**: Find restaurants by name, cuisine, or description
- **Menu Browsing**: Detailed menu items with descriptions and pricing
- **Shopping Cart**: Add/remove items with quantity management
- **Order Checkout**: Secure payment processing and order placement
- **Order History**: Track past orders and reorder functionality
- **Real-Time Tracking**: Live order status updates
- **Profile Management**: Update personal information and preferences

### 🏪 Restaurant Owner Features
- **Dashboard**: Overview of restaurant performance and orders
- **Order Management**: View and update order statuses
- **Menu Management**: Add, edit, and manage menu items
- **Analytics**: Sales and performance insights
- **Profile Management**: Restaurant information and settings

### 🛒 Cart & Ordering System
- **Smart Cart**: Automatically calculates taxes and delivery fees
- **Item Customization**: Special instructions and modifications
- **Order Validation**: Cart validation before checkout
- **Real-Time Updates**: Automatic order status progression
- **Payment Processing**: Mock payment gateway integration

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FoodOrderingApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   ```bash
   # iOS (requires macOS)
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

### Demo Accounts

For testing purposes, use these pre-configured accounts:

**Customer Account:**
- Email: `customer@example.com`
- Password: `password123`

**Restaurant Owner Account:**
- Email: `restaurant@example.com`
- Password: `password123`

## 🔧 Development

### State Management
The application uses Redux Toolkit for state management with the following slices:
- **Auth**: User authentication and session management
- **Restaurant**: Restaurant data and menu information
- **Cart**: Shopping cart functionality
- **Order**: Order management and tracking

### Mock Services
All backend functionality is simulated with realistic delays:
- **Authentication**: Login, registration, password recovery
- **Restaurant Data**: Restaurant listings, menu items, search
- **Cart Management**: Add/remove items, calculate totals
- **Order Processing**: Create orders, status updates, tracking

### Navigation Structure
- **Authentication Flow**: Login → Register → Forgot Password
- **Customer Flow**: Home → Restaurant Details → Menu → Cart → Checkout
- **Restaurant Flow**: Dashboard → Orders → Menu Management → Analytics

## 📱 User Interface

### Design System
- **Primary Color**: `#FF6B35` (Orange)
- **Secondary Color**: `#F7931E` (Light Orange)
- **Success Color**: `#4CAF50` (Green)
- **Typography**: System fonts with consistent sizing
- **Spacing**: 8px grid system
- **Border Radius**: 12px for cards, 8px for smaller elements

### Responsive Design
- Optimized for mobile devices
- Safe area handling for iOS devices
- Consistent spacing and touch targets
- Accessible font sizes and contrast ratios

## 🔄 Real-Time Features

### Order Tracking
- Automatic status progression: Pending → Confirmed → Preparing → Ready → Out for Delivery → Delivered
- Simulated delivery times with realistic delays
- Real-time status updates without manual refresh

### Cart Updates
- Instant price calculations
- Tax and delivery fee computation
- Free delivery threshold detection

## 🔒 Security Features

### Data Protection
- Secure token-based authentication
- Encrypted local storage for sensitive data
- Input validation and sanitization
- Protection against common vulnerabilities

### Mock Security
- Simulated secure payment processing
- Mock transaction IDs and receipts
- Fake but realistic error handling

## 🎨 UI/UX Features

### Modern Interface
- Gradient backgrounds and smooth animations
- Card-based layouts with shadows
- Intuitive navigation patterns
- Consistent iconography using Expo Vector Icons

### User Experience
- Pull-to-refresh functionality
- Loading states and skeleton screens
- Empty state illustrations
- Error handling with user-friendly messages

## 📊 Performance

### Optimization
- Efficient Redux state management
- Image optimization and caching
- Lazy loading for large lists
- Minimal re-renders with proper memoization

### Mock Performance
- Realistic API delays (300-1000ms)
- Simulated network conditions
- Progressive data loading

## 🧪 Testing

### Available Scripts
```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web browser
npm run web

# Check for linting errors
npm run lint

# Type checking
npm run type-check
```

## 🚧 Future Enhancements

### Planned Features
1. **Advanced Order Tracking**: GPS tracking and delivery maps
2. **Payment Integration**: Real payment gateway (Stripe, PayPal)
3. **Push Notifications**: Order updates and promotional messages
4. **Social Features**: Reviews, ratings, and social sharing
5. **Advanced Analytics**: Detailed reporting for restaurant owners
6. **Inventory Management**: Stock tracking and low inventory alerts
7. **Multi-language Support**: Internationalization
8. **Dark Mode**: Theme switching capability

### Technical Improvements
1. **Real Backend**: Replace mock services with actual API
2. **Database Integration**: Real-time data synchronization
3. **Image Upload**: Camera integration for menu items
4. **Offline Support**: Caching and offline functionality
5. **Performance Monitoring**: Analytics and crash reporting

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For questions and support, please contact the development team or create an issue in the repository.

---

**Built with ❤️ using React Native and Expo**