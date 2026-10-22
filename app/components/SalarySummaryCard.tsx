import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SalarySummaryProps {
  salary: number;
  expenses: number;
}

export default function SalarySummaryCard({
  salary,
  expenses,
}: SalarySummaryProps) {
  const savings = salary - expenses;

  const expenseRatio =
    salary > 0
      ? ((expenses / salary) * 100).toFixed(1)
      : '0';

  const savingsRatio =
    salary > 0
      ? ((savings / salary) * 100).toFixed(1)
      : '0';

  return (
    <View style={salaryStyles.container}>
      <Text style={salaryStyles.header}>
        Salary Analytics
      </Text>

      <View style={salaryStyles.statsRow}>
        <View style={salaryStyles.statCard}>
          <Text style={salaryStyles.statTitle}>
            Income
          </Text>

          <Text style={salaryStyles.incomeValue}>
            ₹{salary}
          </Text>
        </View>

        <View style={salaryStyles.statCard}>
          <Text style={salaryStyles.statTitle}>
            Savings
          </Text>

          <Text style={salaryStyles.savingsValue}>
            ₹{savings}
          </Text>
        </View>
      </View>

      <View style={salaryStyles.statCardLarge}>
        <Text style={salaryStyles.statTitle}>
          Expenses
        </Text>

        <Text style={salaryStyles.expenseValue}>
          ₹{expenses}
        </Text>
      </View>

      <View style={salaryStyles.ratioContainer}>
        <View style={salaryStyles.ratioCard}>
          <Text style={salaryStyles.ratioTitle}>
            Expense Ratio
          </Text>

          <Text style={salaryStyles.ratioValue}>
            {expenseRatio}%
          </Text>
        </View>

        <View style={salaryStyles.ratioCard}>
          <Text style={salaryStyles.ratioTitle}>
            Savings Ratio
          </Text>

          <Text style={salaryStyles.ratioValue}>
            {savingsRatio}%
          </Text>
        </View>
      </View>

      {Number(expenseRatio) > 80 && (
        <Text style={salaryStyles.warning}>
          Warning: Expenses are above 80% of salary
        </Text>
      )}
    </View>
  );
}

const salaryStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },

  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#111827',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  label: {
    color: '#374151',
    fontSize: 15,
  },


  value: {
    fontWeight: 'bold',
    color: '#4F46E5',
  },

  expense: {
    fontWeight: 'bold',
    color: '#EF4444',
  },

  savings: {
    fontWeight: 'bold',
    color: '#10B981',
  },

  ratioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  ratioCard: {
    backgroundColor: '#F3F4F6',
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },

  ratioTitle: {
    color: '#6B7280',
    marginBottom: 8,
  },

  ratioValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },

  warning: {
    marginTop: 15,
    color: '#DC2626',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  statTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 5,
  },

  expenseValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  statCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  
  statCardLarge: {
    marginTop: 10,
    backgroundColor: '#F9FAFB',
    padding: 15,
    borderRadius: 15,
  },

  savingsValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#10B981',
  },

  incomeValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
});