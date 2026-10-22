import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SummaryCardProps {
  total: number;
}

export default function SummaryCard({
  total,
}: SummaryCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Total Expenses
      </Text>

      <Text style={styles.amount}>
        ₹{total.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    color: '#6B7280',
  },

  amount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#EF4444',
    marginTop: 10,
  },
});