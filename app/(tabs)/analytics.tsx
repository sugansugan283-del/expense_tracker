import React, { useMemo } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  LineChart,
  PieChart,
} from 'react-native-chart-kit';

import { useExpenseStore } from '../store/expenseStore';

const screenWidth = Dimensions.get('window').width;

export default function AnalyticsScreen() {
  const { expenses } = useExpenseStore();

  const totalExpense = useMemo(() => {
    return expenses.reduce(
      (sum, item) => sum + item.amount,
      0
    );
  }, [expenses]);

  const categoryData = useMemo(() => {
    const grouped: Record<string, number> = {};

    expenses.forEach((item) => {
      grouped[item.category] =
        (grouped[item.category] || 0) +
        item.amount;
    });

    const colors = [
      '#4F46E5',
      '#06B6D4',
      '#10B981',
      '#F59E0B',
      '#EF4444',
      '#8B5CF6',
    ];

    return Object.keys(grouped).map(
      (key, index) => ({
        name: key,
        amount: grouped[key],
        color:
          colors[index % colors.length],
        legendFontColor: '#374151',
        legendFontSize: 12,
      })
    );
  }, [expenses]);

  const monthlyTrendData = useMemo(() => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const totals = new Array(12).fill(0);

    expenses.forEach((expense) => {
      const date = new Date(expense.date);

      if (!isNaN(date.getTime())) {
        totals[date.getMonth()] +=
          expense.amount;
      }
    });

    return {
      labels: months,
      datasets: [
        {
          data: totals,
        },
      ],
    };
  }, [expenses]);

  const currentMonth =
    new Date().getMonth();

  const currentMonthExpense =
    monthlyTrendData.datasets[0].data[
      currentMonth
    ] || 0;

  const previousMonthExpense =
    monthlyTrendData.datasets[0].data[
      currentMonth - 1
    ] || 0;

  const trend =
    currentMonthExpense >
    previousMonthExpense
      ? 'increased'
      : currentMonthExpense <
        previousMonthExpense
      ? 'decreased'
      : 'remained the same';

  const topCategories = [...categoryData].sort(
    (a, b) => b.amount - a.amount
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>
        📊 Analytics
      </Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>
          Total Expenses
        </Text>

        <Text style={styles.summaryAmount}>
          ₹{totalExpense.toFixed(2)}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>
          💰 Spending Breakdown
        </Text>

        {categoryData.length > 0 ? (
          <PieChart
            data={categoryData}
            width={screenWidth - 40}
            height={220}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="10"
            absolute
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) =>
                `rgba(0,0,0,${opacity})`,
            }}
          />
        ) : (
          <Text style={styles.emptyText}>
            No expense data available
          </Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>
          📈 Monthly Trend
        </Text>

        <LineChart
          data={monthlyTrendData}
          width={screenWidth - 40}
          height={240}
          yAxisLabel="₹"
          bezier
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom:
              '#ffffff',
            backgroundGradientTo:
              '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) =>
              `rgba(79,70,229,${opacity})`,
            labelColor: (opacity = 1) =>
              `rgba(17,24,39,${opacity})`,
            propsForDots: {
              r: '5',
            },
          }}
          style={{
            borderRadius: 16,
          }}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>
          🏆 Top Spending Categories
        </Text>

        {topCategories.length > 0 ? (
          topCategories.map(
            (item, index) => (
              <View
                key={item.name}
                style={styles.categoryRow}
              >
                <Text>
                  {index + 1}. {item.name}
                </Text>

                <Text>
                  ₹{item.amount}
                </Text>
              </View>
            )
          )
        ) : (
          <Text style={styles.emptyText}>
            No categories available
          </Text>
        )}
      </View>

      <View style={styles.aiCard}>
        <Text style={styles.aiTitle}>
          🤖 AI Trend Insight
        </Text>

        <Text style={styles.aiText}>
          Your spending has {trend}
          compared to last month.
        </Text>

        <Text style={styles.aiText}>
          Current Month: ₹
          {currentMonthExpense}
        </Text>

        <Text style={styles.aiText}>
          Previous Month: ₹
          {previousMonthExpense}
        </Text>

        {topCategories.length > 0 && (
          <Text style={styles.aiText}>
            Highest spending category:
            {' '}
            {topCategories[0].name}
          </Text>
        )}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 15,
  },

  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111827',
  },

  summaryCard: {
    backgroundColor: '#4F46E5',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  summaryLabel: {
    color: '#E0E7FF',
    fontSize: 16,
  },

  summaryAmount: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#111827',
  },

  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  aiCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },

  aiTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  aiText: {
    marginBottom: 6,
    color: '#374151',
  },

  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
    marginVertical: 20,
  },
});