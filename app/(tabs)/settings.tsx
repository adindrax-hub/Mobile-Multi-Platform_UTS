import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO } from '../../src/styles/tokens';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pengaturan ⚙️</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Pengingat Harian</Text>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACE.l, backgroundColor: COLORS.background },
  header: { fontSize: TYPO.h1, fontWeight: '800', color: COLORS.text, marginBottom: SPACE.m, marginTop: SPACE.s },
  card: { backgroundColor: '#fff', padding: SPACE.l, borderRadius: RADIUS.card },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 16, fontWeight: '600', color: COLORS.text },
});