import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter, Slot } from 'expo-router';
import { ThemeProvider } from 'styled-components';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

interface LayoutProps {
  loaded: boolean;
  isAuthenticated: boolean;
  segments: string[];
  colorScheme: 'light' | 'dark';
}

const Layout: React.FC<LayoutProps> = ({ loaded, isAuthenticated, segments, colorScheme }) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().then(() => {
        setIsMounted(true);
      });
    }
  }, [loaded]);

  useEffect(() => {
    if (isMounted) {
      const inAuthGroup = segments[0] === '(auth)';

      if (!isAuthenticated && !inAuthGroup) {
        router.replace('/(auth)/login');
      } else if (isAuthenticated && inAuthGroup) {
        router.replace('/');
      }
    }
  }, [isAuthenticated, segments, isMounted]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Slot />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
};

export default Layout;