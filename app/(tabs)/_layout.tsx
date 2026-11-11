import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../src/styles/tokens';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary || '#2563EB',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="wallet-outline" size={24} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Tambah',
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" size={26} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Kategori',
          tabBarIcon: ({ color }) => (
            <Ionicons name="pie-chart-outline" size={24} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Pengaturan',
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color as string} />
          ),
        }}
      />
    </Tabs>
  );
}