import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useBudget } from '../../src/context/BudgetContext';
import { COLORS, SPACE, RADIUS, TYPO } from '../../src/styles/tokens';

const CATEGORIES = ['Makan', 'Transport', 'Kuliah', 'Kiriman', 'Lainnya'];

export default function CreateScreen() {
  const router = useRouter();
  const { addTransaction } = useBudget();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'in' | 'out'>('out');
  const [category, setCategory] = useState('Makan');
  const [notes, setNotes] = useState('');

  const canSave = title.trim().length > 0 && Number(amount) > 0;

  const handleSave = () => {
    if (!canSave) return;
    addTransaction({
      title: title.trim(),
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
      notes: notes.trim(),
    });
    setTitle(''); setAmount(''); setNotes('');
    router.replace('/');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Tambah Transaksi 📝</Text>

      <View style={styles.typeSelector}>
        <Pressable
          onPress={() => setType('out')}
          style={[styles.typeBtn, type === 'out' && { backgroundColor: COLORS.danger }]}
        >
          <Text style={[styles.typeText, type === 'out' && styles.activeText]}>Pengeluaran (-)</Text>
        </Pressable>
        <Pressable
          onPress={() => setType('in')}
          style={[styles.typeBtn, type === 'in' && { backgroundColor: COLORS.success }]}
        >
          <Text style={[styles.typeText, type === 'in' && styles.activeText]}>Pemasukan (+)</Text>
        </Pressable>
      </View>

      <View style={styles.group}>
        <Text style={styles.label}>Nama Transaksi</Text>
        <TextInput value={title} onChangeText={setTitle} placeholder="Cth: Nasi Goreng" style={styles.input} />
      </View>

      <View style={styles.group}>
        <Text style={styles.label}>Nominal (Rp)</Text>
        <TextInput value={amount} onChangeText={setAmount} placeholder="Cth: 15000" keyboardType="numeric" style={styles.input} />
      </View>

      <View style={styles.group}>
        <Text style={styles.label}>Kategori</Text>
        <View style={styles.catRow}>
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => setCategory(cat)}
              style={[styles.catBtn, category === cat && styles.catBtnActive]}
            >
              <Text style={[styles.catText, category === cat && styles.catTextActive]}>{cat}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.group}>
        <Text style={styles.label}>Catatan (Opsional)</Text>
        <TextInput value={notes} onChangeText={setNotes} placeholder="Keterangan tambahan..." multiline style={[styles.input, styles.notesInput]} />
      </View>

      <Pressable onPress={handleSave} disabled={!canSave} style={[styles.saveBtn, !canSave && styles.disabledBtn]}>
        <Text style={styles.saveText}>Simpan Transaksi</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACE.l, gap: SPACE.m, paddingBottom: 40 },
  header: { fontSize: TYPO.h1, fontWeight: '800', color: COLORS.text, marginBottom: SPACE.s },
  typeSelector: { flexDirection: 'row', backgroundColor: '#E2E8F0', borderRadius: RADIUS.button, padding: 4 },
  typeBtn: { flex: 1, paddingVertical: 12, borderRadius: RADIUS.button - 2, alignItems: 'center' },
  typeText: { fontWeight: '700', color: COLORS.muted },
  activeText: { color: '#fff' },
  group: { gap: 6 },
  label: { fontSize: 13, fontWeight: '700', color: COLORS.muted },
  input: { borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.button, padding: 12, backgroundColor: '#fff', fontSize: 15 },
  notesInput: { minHeight: 80, textAlignVertical: 'top' },
  catRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  catBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, backgroundColor: '#fff' },
  catBtnActive: { borderColor: COLORS.primary, backgroundColor: '#EFF6FF' },
  catText: { fontSize: 13, color: COLORS.text },
  catTextActive: { color: COLORS.primary, fontWeight: '700' },
  saveBtn: { backgroundColor: COLORS.primary, padding: 16, borderRadius: RADIUS.pill, alignItems: 'center', marginTop: SPACE.m },
  disabledBtn: { opacity: 0.5 },
  saveText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});