import { Stack } from "expo-router";
import { BudgetProvider } from "../src/context/BudgetContext";

export default function RootLayout() {
  return (
    <BudgetProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="detail/[id]"
          options={{ title: "Detail Transaksi" }}
        />
      </Stack>
    </BudgetProvider>
  );
}
