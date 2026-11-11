import { StyleSheet, Text, View } from "react-native";
import { COLORS, RADIUS, SHADOWS, SPACE } from "../styles/tokens";

type Props = {
  balance: number;
  income: number;
  expense: number;
};

export default function BalanceSummary({ balance, income, expense }: Props) {
  const formatRupiah = (num: number) => {
    return "Rp " + num.toLocaleString("id-ID");
  };

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Total Saldo Mahasiswa</Text>
      <Text style={styles.balance}>{formatRupiah(balance)}</Text>

      <View style={styles.row}>
        <View style={styles.item}>
          <Text style={styles.subLabel}>↓ Pemasukan</Text>
          <Text style={[styles.amount, { color: COLORS.success }]}>
            {formatRupiah(income)}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.item}>
          <Text style={styles.subLabel}>↑ Pengeluaran</Text>
          <Text style={[styles.amount, { color: COLORS.danger }]}>
            {formatRupiah(expense)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.card,
    padding: SPACE.l,
    marginBottom: SPACE.m,
    ...SHADOWS.soft,
  },
  label: { color: "#DBEAFE", fontSize: 13, fontWeight: "600" },
  balance: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    marginVertical: SPACE.xs,
  },
  row: {
    flexDirection: "row",
    marginTop: SPACE.m,
    paddingTop: SPACE.m,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
  },
  item: { flex: 1 },
  subLabel: { color: "#93C5FD", fontSize: 12 },
  amount: { fontSize: 15, fontWeight: "700", marginTop: 2 },
  divider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginHorizontal: SPACE.m,
  },
});
