import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useBudget } from '../../src/context/BudgetContext';
import { COLORS, SPACE, RADIUS, TYPO } from '../../src/styles/tokens';

export default function StatsScreen() {
  const { transactions } = useBudget();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Statistik Kategori 📊</Text>
      <View style={styles.card}>
        <Text style={styles.info}>Total Transaksi Tercatat:</Text>
        <Text style={styles.count}>{transactions.length} Item</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACE.l, backgroundColor: COLORS.background },
  header: { fontSize: TYPO.h1, fontWeight: '800', color: COLORS.text, marginBottom: SPACE.m, marginTop: SPACE.s },
  card: { backgroundColor: '#fff', padding: SPACE.l, borderRadius: RADIUS.card, alignItems: 'center' },
  info: { color: COLORS.muted, fontSize: 14 },
  count: { fontSize: 32, fontWeight: '800', color: COLORS.primary, marginTop: 4 },
});