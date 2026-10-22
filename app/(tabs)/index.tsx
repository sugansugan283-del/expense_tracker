import React, {
  useMemo,
  useState,
} from 'react';

import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { PieChart } from 'react-native-chart-kit';

import AIBudgetAdvisor from '../components/AIBudgetAdvisor';
import ExpenseItem from '../components/ExpenseItem';
import { FinanceCharts } from '../components/FinanceCharts';
import FinancialHealthCard from '../components/FinancialHealthCard';
import SalarySummaryCard from '../components/SalarySummaryCard';
import SummaryCard from '../components/SummaryCard';
import { useExpenseStore } from '../store/expenseStore';
import { calculateFinancialHealth, } from '../utils/financialHealth';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [salary, setSalary] = useState('22000');
  const [showForm, setShowForm] = useState(false);

  const { expenses, addExpense, deleteExpense } =
    useExpenseStore();

  const categories = [
    'Food',
    'Travel',
    'Shopping',
    'Bills',
    'Other',
  ];


  const totalExpense = useMemo(() => {
    return expenses.reduce(
      (sum, item) => sum + item.amount,
      0
    );
  }, [expenses]);

  const health =
    calculateFinancialHealth(
      Number(salary),
      totalExpense
    );
  const chartData = useMemo(() => {
    const grouped: any = {};

    expenses.forEach((item) => {
      if (grouped[item.category]) {
        grouped[item.category] += item.amount;
      } else {
        grouped[item.category] = item.amount;
      }
    });

    const colors = [
      '#4F46E5',
      '#06B6D4',
      '#10B981',
      '#F59E0B',
      '#EF4444',
    ];


    // Removed unused FinancialHealthCard component
    return Object.keys(grouped).map(
      (key, index) => ({
        name: key,
        amount: grouped[key],
        color: colors[index % colors.length],
        legendFontColor: '#374151',
        legendFontSize: 14,
      })
    );
  }, [expenses]);

  const handleAddExpense = async () => {
    console.log('Button clicked');

    if (!title.trim() || !amount) {
      console.log('In Validation');

      return;
    }
    // const category =
    //   await hybridCategorizer(title);

    const expense = {
      id: Date.now().toString(),
      title,
      amount: Number(amount),
      category,
      date: new Date().toLocaleDateString(),
    };

    console.log('Adding expense:', expense);

    addExpense(expense);

    setTitle('');
    setAmount('');
    setCategory('Food');
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>
            👋 Welcome Back
          </Text>

          <Text style={styles.subtitle}>
            Track your finances smarter
          </Text>
          <Text>
            showForm = {showForm ? 'true' : 'false'}
          </Text>
        </View>
        <SummaryCard total={totalExpense} />

        <View style={styles.salaryContainer}>
          <Text style={styles.sectionTitle}>
            Enter Monthly Salary
          </Text>

          <TextInput
            placeholder="Monthly Salary"
            keyboardType="numeric"
            value={salary}
            onChangeText={setSalary}
            style={styles.input}
          />
        </View>

        <SalarySummaryCard
          salary={Number(salary)}
          expenses={totalExpense}
        />
        {showForm && (
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>
              Add Expense
            </Text>

            <TextInput
              placeholder="Expense Title"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />

            <TextInput
              placeholder="Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              style={styles.input}
            />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryContainer}
            >
              {categories.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.categoryButton,
                    category === item && styles.selectedCategory,
                  ]}
                  onPress={() => setCategory(item)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      category === item &&
                      styles.selectedCategoryText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>


            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddExpense}
            >
              <Text style={styles.addButtonText}>
                Add Expense
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <FinancialHealthCard
          score={health.score}
          status={health.status}
          message={health.message}
        />

        <FinanceCharts
          salary={Number(salary)}
          expenses={totalExpense}
          categoryData={chartData}
        />
        <AIBudgetAdvisor
          salary={Number(salary)}
          expenses={totalExpense}
        />
        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>
            Expense Breakdown
          </Text>

          {chartData.length > 0 ? (
            <PieChart
              data={chartData}
              width={screenWidth - 30}
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

            <View>
              <Text style={{ fontSize: 50 }}>
                📊
              </Text>

              <Text>
                No expenses yet
              </Text>

              <Text>
                Add your first expense
              </Text>
            </View>
          )}
        </View>

        <View style={styles.listContainer}>
          <Text style={styles.sectionTitle}>
            Expense History
          </Text>
          {/* <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            scrollEnabled={false} */}
          {expenses.map((item) => (
            <ExpenseItem
              key={item.id}
              item={item}
              onDelete={() => deleteExpense(item.id)}
            />
          ))}

        </View>
      </ScrollView >
      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          setShowForm(!showForm)
        }
      >
        <Text style={styles.fabText}>
          {showForm ? '×' : '+'}

        </Text>
      </TouchableOpacity>

    </SafeAreaView >
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
    marginTop: 10,
  },
  salaryContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },

  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#F9FAFB',
  },

  categoryContainer: {
    marginBottom: 15,
  },

  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    marginRight: 10,
  },

  selectedCategory: {
    backgroundColor: '#4F46E5',
  },

  categoryText: {
    color: '#111827',
    fontWeight: '600',
  },

  selectedCategoryText: {
    color: '#FFFFFF',
  },

  addButton: {
    backgroundColor: '#10B981',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },

  listContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    marginBottom: 40,
  },
  welcomeCard: {
    marginBottom: 20,
    alignItems: 'center',
  },

  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },

  subtitle: {
    color: '#6B7280',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 20,
    marginBottom: 20,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },

  fabText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
});