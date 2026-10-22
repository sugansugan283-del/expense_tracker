
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  total: number;
}

export function SummaryCard({ total }: Props) {
  return (
    <View style={summaryStyles.card}>
      <Text style={summaryStyles.title}>
        Monthly Summary
      </Text>

      <Text style={summaryStyles.amount}>
        ₹{total.toFixed(2)}
      </Text>
    </View>
  );
}

const summaryStyles = StyleSheet.create({
  card: {
    backgroundColor: '#4F46E5',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },

  title: {
    color: '#E0E7FF',
    fontSize: 16,
  },

  amount: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
});