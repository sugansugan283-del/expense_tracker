export function calculateForecast(
    currentExpense: number,
    currentDay: number,
    totalDays: number = 30
  ) {
    if (currentDay === 0) return 0;
  
    const dailyAverage =
      currentExpense / currentDay;
  
    return Math.round(
      dailyAverage * totalDays
    );
  }