import React, { useCallback, useRef } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useBudget } from '../../src/context/BudgetContext';
import { useTransactionSearch } from '../../src/hooks/useTransactionSearch';
import BalanceSummary from '../../src/components/BalanceSummary';
import TransactionCard from '../../src/components/TransactionCard';
import { COLORS, SPACE, TYPO } from '../../src/styles/tokens';

const CATEGORIES = ['Makan', 'Transport', 'Kuliah', 'Kiriman', 'Lainnya'];

export default function HomeScreen() {
  const router = useRouter();
  const { transactions, deleteTransaction, totalBalance, totalIncome, totalExpense } = useBudget();
  const { query, setQuery, selectedCategory, setSelectedCategory, filteredTransactions, resetFilters } = useTransactionSearch(transactions);

  const searchRef = useRef<React.ElementRef<typeof TextInput>>(null);

  // Menggunakan template string agar Expo Router Typed Routes tidak error
  const openDetail = useCallback((id: number) => {
    router.push(`/detail/${id}` as any);
  }, [router]);

  const clearAndFocus = useCallback(() => {
    resetFilters();
    searchRef.current?.focus();
  }, [resetFilters]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>PocketBudget 💰</Text>

      <BalanceSummary balance={totalBalance} income={totalIncome} expense={totalExpense} />

      <View style={styles.searchRow}>
        <TextInput
          ref={searchRef}
          value={query}
          onChangeText={setQuery}
          placeholder="Cari transaksi..."
          style={styles.search}
        />
        <Pressable onPress={clearAndFocus} style={styles.resetBtn}>
          <Text style={styles.resetText}>Reset</Text>
        </Pressable>
      </View>

      <View style={styles.filterWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              style={[styles.chip, selectedCategory === cat && styles.chipActive]}
            >
              <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextActive]}>{cat}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TransactionCard
            item={item}
            onPress={() => openDetail(item.id)}
            onDelete={() => deleteTransaction(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Tidak ada transaksi ditemukan.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACE.l, backgroundColor: COLORS.background },
  header: { fontSize: TYPO.h1, fontWeight: '800', color: COLORS.text, marginBottom: SPACE.m, marginTop: SPACE.s },
  searchRow: { flexDirection: 'row', gap: SPACE.s, marginBottom: SPACE.m },
  search: { flex: 1, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, padding: 12, backgroundColor: '#fff' },
  resetBtn: { justifyContent: 'center', paddingHorizontal: 16, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, backgroundColor: '#fff' },
  resetText: { fontWeight: '600', color: COLORS.muted },
  filterWrapper: { marginBottom: SPACE.m },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border, backgroundColor: '#fff', marginRight: SPACE.xs },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { fontSize: 13, color: COLORS.text, fontWeight: '500' },
  chipTextActive: { color: '#fff', fontWeight: '700' },
  list: { paddingBottom: SPACE.xl },
  empty: { textAlign: 'center', color: COLORS.muted, marginTop: 40 },
});