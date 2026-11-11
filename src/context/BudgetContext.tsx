import React, { createContext, useContext, useMemo, useState } from "react";
import { Transaction } from "../components/TransactionCard";

type BudgetContextType = {
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: number) => void;
  getById: (id: number | string) => Transaction | undefined;
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
};

const INITIAL_DATA: Transaction[] = [
  {
    id: 1,
    title: "Kirim Uang Ortu",
    amount: 500000,
    type: "in",
    category: "Kiriman",
    date: "2026-11-10",
    notes: "Uang jajan pertengahan bulan",
  },
  {
    id: 2,
    title: "Makan Siang Warteg",
    amount: 18000,
    type: "out",
    category: "Makan",
    date: "2026-11-10",
    notes: "Nasi rendang + es teh",
  },
  {
    id: 3,
    title: "Bensin Motor",
    amount: 25000,
    type: "out",
    category: "Transport",
    date: "2026-11-09",
    notes: "Pertalite full tank",
  },
  {
    id: 4,
    title: "Beli Buku Modul",
    amount: 45000,
    type: "out",
    category: "Kuliah",
    date: "2026-11-08",
    notes: "Modul praktikum",
  },
];

const BudgetContext = createContext<BudgetContextType | null>(null);

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_DATA);

  const addTransaction = (tx: Omit<Transaction, "id">) => {
    setTransactions((prev) => [{ id: Date.now(), ...tx }, ...prev]);
  };

  const deleteTransaction = (id: number) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id));
  };

  const getById = (id: number | string) => {
    return transactions.find((item) => item.id === Number(id));
  };

  // Optimization dengan useMemo untuk perhitungan saldo
  const { totalIncome, totalExpense, totalBalance } = useMemo(() => {
    let inc = 0;
    let exp = 0;
    transactions.forEach((t) => {
      if (t.type === "in") inc += t.amount;
      else exp += t.amount;
    });
    return {
      totalIncome: inc,
      totalExpense: exp,
      totalBalance: inc - exp,
    };
  }, [transactions]);

  const value = useMemo(
    () => ({
      transactions,
      addTransaction,
      deleteTransaction,
      getById,
      totalBalance,
      totalIncome,
      totalExpense,
    }),
    [transactions, totalBalance, totalIncome, totalExpense],
  );

  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (!context)
    throw new Error("useBudget harus digunakan di dalam BudgetProvider");
  return context;
}
