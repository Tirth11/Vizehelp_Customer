import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, Platform, StyleSheet } from 'react-native';
import { COLORS } from './src/constants/theme';

import SplashScreen from './src/screens/SplashScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import OTPScreen from './src/screens/OTPScreen';
import ProfileSetupScreen from './src/screens/ProfileSetupScreen';
import HomeScreen from './src/screens/HomeScreen';
import LocationScreen from './src/screens/LocationScreen';
import ServiceListScreen from './src/screens/ServiceListScreen';
import ServiceDetailScreen from './src/screens/ServiceDetailScreen';
import ServiceInputScreen from './src/screens/ServiceInputScreen';
import AddressScreen from './src/screens/AddressScreen';
import DateTimeScreen from './src/screens/DateTimeScreen';
import InstructionsScreen from './src/screens/InstructionsScreen';
import BookingSummaryScreen from './src/screens/BookingSummaryScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import BookingConfirmationScreen from './src/screens/BookingConfirmationScreen';
import BuddyAssignedScreen from './src/screens/BuddyAssignedScreen';
import LiveTrackingScreen from './src/screens/LiveTrackingScreen';
import BuddyArrivalScreen from './src/screens/BuddyArrivalScreen';
import ServiceProgressScreen from './src/screens/ServiceProgressScreen';
import ServiceCompletionScreen from './src/screens/ServiceCompletionScreen';
import RatingScreen from './src/screens/RatingScreen';
import BookingHistoryScreen from './src/screens/BookingHistoryScreen';
import BookingDetailScreen from './src/screens/BookingDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import SupportScreen from './src/screens/SupportScreen';
import RaiseIssueScreen from './src/screens/RaiseIssueScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabIcon({ label, focused }) {
  const icons = { Home: '🏠', Bookings: '📋', Notifications: '🔔', Support: '💬', Profile: '👤' };
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>{icons[label]}</Text>
      <Text style={{ fontSize: 10, color: focused ? COLORS.primary : COLORS.gray }}>{label}</Text>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: { height: 65, paddingBottom: 8, paddingTop: 8 } }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ focused }) => <TabIcon label="Home" focused={focused} /> }} />
      <Tab.Screen name="Bookings" component={BookingHistoryScreen} options={{ tabBarIcon: ({ focused }) => <TabIcon label="Bookings" focused={focused} /> }} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} options={{ tabBarIcon: ({ focused }) => <TabIcon label="Notifications" focused={focused} /> }} />
      <Tab.Screen name="Support" component={SupportScreen} options={{ tabBarIcon: ({ focused }) => <TabIcon label="Support" focused={focused} /> }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ({ focused }) => <TabIcon label="Profile" focused={focused} /> }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2500);
  }, []);

  if (isLoading) return <MobileFrame><SplashScreen /></MobileFrame>;

  return (
    <MobileFrame>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="OTP" component={OTPScreen} />
          <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="Location" component={LocationScreen} />
          <Stack.Screen name="ServiceList" component={ServiceListScreen} />
          <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
          <Stack.Screen name="ServiceInput" component={ServiceInputScreen} />
          <Stack.Screen name="Address" component={AddressScreen} />
          <Stack.Screen name="DateTime" component={DateTimeScreen} />
          <Stack.Screen name="Instructions" component={InstructionsScreen} />
          <Stack.Screen name="BookingSummary" component={BookingSummaryScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
          <Stack.Screen name="BuddyAssigned" component={BuddyAssignedScreen} />
          <Stack.Screen name="LiveTracking" component={LiveTrackingScreen} />
          <Stack.Screen name="BuddyArrival" component={BuddyArrivalScreen} />
          <Stack.Screen name="ServiceProgress" component={ServiceProgressScreen} />
          <Stack.Screen name="ServiceCompletion" component={ServiceCompletionScreen} />
          <Stack.Screen name="Rating" component={RatingScreen} />
          <Stack.Screen name="BookingDetail" component={BookingDetailScreen} />
          <Stack.Screen name="RaiseIssue" component={RaiseIssueScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </MobileFrame>
  );
}

function MobileFrame({ children }) {
  if (Platform.OS !== 'web') return children;
  return (
    <View style={frameStyles.container}>
      <View style={frameStyles.phone}>
        <View style={frameStyles.notch} />
        <View style={frameStyles.screen}>{children}</View>
        <View style={frameStyles.homeBar} />
      </View>
    </View>
  );
}

const frameStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' },
  phone: { width: 390, height: 844, backgroundColor: '#000', borderRadius: 50, padding: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.4, shadowRadius: 40, elevation: 20 },
  notch: { width: 120, height: 28, backgroundColor: '#000', borderRadius: 14, alignSelf: 'center', marginBottom: 4, zIndex: 10 },
  screen: { flex: 1, borderRadius: 38, overflow: 'hidden', backgroundColor: '#fff' },
  homeBar: { width: 130, height: 5, backgroundColor: '#555', borderRadius: 3, alignSelf: 'center', marginTop: 8 },
});
