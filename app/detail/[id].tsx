import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useBudget } from '../../src/context/BudgetContext';
import { COLORS, SPACE, RADIUS, TYPO, SHADOWS } from '../../src/styles/tokens';

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getById, deleteTransaction } = useBudget();

  const item = getById(id);

  if (!item) {
    return (
      <View style={styles.center}>
        <Text>Transaksi tidak ditemukan.</Text>
      </View>
    );
  }

  const isIncome = item.type === 'in';

  const handleDelete = () => {
    deleteTransaction(item.id);
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Rincian Transaksi' }} />
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.badge}>{item.category}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={[styles.amount, { color: isIncome ? COLORS.success : COLORS.danger }]}>
            {isIncome ? '+' : '-'} Rp {item.amount.toLocaleString('id-ID')}
          </Text>
          <Text style={styles.date}>Tanggal: {item.date}</Text>

          <View style={styles.divider} />

          <Text style={styles.label}>Catatan:</Text>
          <Text style={styles.notes}>{item.notes || 'Tidak ada catatan.'}</Text>
        </View>

        <Pressable onPress={handleDelete} style={styles.deleteBtn}>
          <Text style={styles.deleteText}>Hapus Transaksi Ini</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACE.l, backgroundColor: COLORS.background },
  card: { backgroundColor: '#fff', padding: SPACE.xl, borderRadius: RADIUS.card, ...SHADOWS.soft },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, backgroundColor: '#EFF6FF', color: COLORS.primary, fontWeight: '700', fontSize: 12, marginBottom: SPACE.s },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.text, marginBottom: 4 },
  amount: { fontSize: 26, fontWeight: '800', marginBottom: 4 },
  date: { fontSize: TYPO.caption, color: COLORS.muted },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: SPACE.l },
  label: { fontSize: 13, fontWeight: '700', color: COLORS.muted, marginBottom: 4 },
  notes: { fontSize: 15, color: COLORS.text, lineHeight: 22 },
  deleteBtn: { marginTop: SPACE.xl, padding: 16, borderRadius: RADIUS.pill, backgroundColor: '#FEE2E2', alignItems: 'center' },
  deleteText: { color: COLORS.danger, fontWeight: '700' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});