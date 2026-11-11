import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS, RADIUS, SHADOWS, SPACE, TYPO } from "../styles/tokens";

export type Transaction = {
  id: number;
  title: string;
  amount: number;
  type: "in" | "out";
  category: string;
  date: string;
  notes?: string;
};

type Props = {
  item: Transaction;
  onPress: () => void;
  onDelete: () => void;
};

export default function TransactionCard({ item, onPress, onDelete }: Props) {
  const isIncome = item.type === "in";

  return (
    <View style={styles.card}>
      <Pressable onPress={onPress} style={styles.main}>
        <View
          style={[
            styles.iconBox,
            { backgroundColor: isIncome ? "#D1FAE5" : "#FEE2E2" },
          ]}
        >
          <Ionicons
            name={isIncome ? "arrow-down" : "arrow-up"}
            size={22}
            color={isIncome ? COLORS.success : COLORS.danger}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.subtitle}>
            {item.category} • {item.date}
          </Text>
        </View>

        <Text
          style={[
            styles.amount,
            { color: isIncome ? COLORS.success : COLORS.danger },
          ]}
        >
          {isIncome ? "+" : "-"} Rp {item.amount.toLocaleString("id-ID")}
        </Text>
      </Pressable>

      <Pressable onPress={onDelete} style={styles.deleteBtn}>
        <Ionicons name="trash-outline" size={18} color={COLORS.muted} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACE.s,
    ...SHADOWS.soft,
  },
  main: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: SPACE.m,
    gap: SPACE.m,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },
  info: { flex: 1 },
  title: { fontSize: TYPO.body, fontWeight: "700", color: COLORS.text },
  subtitle: { fontSize: TYPO.caption, color: COLORS.muted, marginTop: 2 },
  amount: { fontSize: 15, fontWeight: "700" },
  deleteBtn: { padding: SPACE.m },
});
