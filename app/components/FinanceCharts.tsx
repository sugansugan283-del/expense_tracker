import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import {
    BarChart,
    PieChart,
} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

interface FinanceChartsProps {
  salary: number;
  expenses: number;
  categoryData: any[];
}

export function FinanceCharts({
  salary,
  expenses,
  categoryData,
}: FinanceChartsProps) {
  const savings = salary - expenses;

  const incomeExpenseData = {
    labels: ['Income', 'Expenses', 'Savings'],
    datasets: [
      {
        data: [salary, expenses, savings > 0 ? savings : 0],
      },
    ],
  };

  return (
    <View style={chartStyles.container}>
      <Text style={chartStyles.header}>
        Financial Analytics
      </Text>

      <Text style={chartStyles.chartTitle}>
        Income vs Expenses
      </Text>

      <BarChart
        data={incomeExpenseData}
        width={screenWidth - 40}
        height={240}
        yAxisLabel={'₹'}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) =>
            `rgba(79,70,229,${opacity})`,
          labelColor: (opacity = 1) =>
            `rgba(17,24,39,${opacity})`,
          borderRadius: 16,
        }}
        style={chartStyles.chart}
      />

      <Text style={chartStyles.chartTitle}>
        Category-wise Spending
      </Text>

      {categoryData.length > 0 ? (
        <PieChart
          data={categoryData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) =>
              `rgba(0,0,0,${opacity})`,
          }}
          accessor={'amount'}
          backgroundColor={'transparent'}
          paddingLeft={'10'}
          absolute
        />
      ) : (
        <Text style={chartStyles.emptyText}>
          No expense data available
        </Text>
      )}
    </View>
  );
}

const chartStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },

  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111827',
  },

  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    color: '#374151',
  },

  chart: {
    borderRadius: 16,
  },

  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
    marginVertical: 20,
  },
});