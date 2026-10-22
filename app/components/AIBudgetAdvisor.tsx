import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function AIBudgetAdvisor({
  salary,
  expenses,
}: any) {
  const savings = salary - expenses;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        🤖 AI Budget Advisor
      </Text>

      <Text style={styles.text}>
        Current savings:
        ₹{savings}
      </Text>

      {expenses > salary * 0.8 ? (
        <Text style={styles.warning}>
          Expenses are above 80% of salary.
        </Text>
      ) : (
        <Text style={styles.good}>
          Spending is under control.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#EEF2FF',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  text: {
    marginTop: 10,
  },

  warning: {
    color: '#EF4444',
    marginTop: 10,
  },

  good: {
    color: '#10B981',
    marginTop: 10,
  },
});