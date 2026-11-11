import { useEffect, useMemo, useState } from "react";
import { Transaction } from "../components/TransactionCard";

export function useTransactionSearch(transactions: Transaction[]) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Debounce side-effect menggunakan useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 350);
    return () => clearTimeout(timer); // Cleanup function
  }, [query]);

  const filteredTransactions = useMemo(() => {
    let result = transactions;

    if (selectedCategory) {
      result = result.filter((t) => t.category === selectedCategory);
    }

    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return result;

    return result.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.date.includes(q),
    );
  }, [transactions, debouncedQuery, selectedCategory]);

  const resetFilters = () => {
    setQuery("");
    setSelectedCategory(null);
  };

  return {
    query,
    setQuery,
    selectedCategory,
    setSelectedCategory,
    filteredTransactions,
    resetFilters,
  };
}
