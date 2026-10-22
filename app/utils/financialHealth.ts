export interface HealthResult {
    score: number;
    status: string;
    message: string;
  }
  
  export const calculateFinancialHealth = (
    salary: number,
    expenses: number
  ): HealthResult => {
    if (salary <= 0) {
      return {
        score: 0,
        status: 'Poor',
        message: 'Please enter salary',
      };
    }
  
    const savings = salary - expenses;
  
    const savingsRate =
      (savings / salary) * 100;
  
    const expenseRate =
      (expenses / salary) * 100;
  
    let score = 0;
  
    // Savings Score (40)
    if (savingsRate >= 30) {
      score += 40;
    } else if (savingsRate >= 20) {
      score += 30;
    } else if (savingsRate >= 10) {
      score += 20;
    } else {
      score += 10;
    }
  
    // Expense Score (30)
    if (expenseRate <= 50) {
      score += 30;
    } else if (expenseRate <= 70) {
      score += 20;
    } else if (expenseRate <= 85) {
      score += 10;
    }
  
    // Budget Discipline (20)
    if (expenseRate <= 70) {
      score += 20;
    } else {
      score += 10;
    }
  
    // Emergency Buffer (10)
    if (savings > 10000) {
      score += 10;
    } else if (savings > 5000) {
      score += 5;
    }
  
    let status = 'Poor';
  
    if (score >= 80) {
      status = 'Excellent';
    } else if (score >= 60) {
      status = 'Good';
    } else if (score >= 40) {
      status = 'Average';
    }
  
    return {
      score,
      status,
      message: getHealthMessage(score),
    };
  };
  
  function getHealthMessage(score: number) {
    if (score >= 80) {
      return 'Excellent financial management.';
    }
  
    if (score >= 60) {
      return 'Good financial health with room for improvement.';
    }
  
    if (score >= 40) {
      return 'Average financial health. Reduce expenses.';
    }
  
    return 'Financial health needs attention.';
  }