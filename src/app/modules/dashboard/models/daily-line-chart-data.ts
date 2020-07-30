export interface DailyLineChartData {
  dailyData: TimeData;
  weeklyData: TimeData;
  monthlyData: TimeData;
  labels: string[];
}

export interface TimeData {
  mobile: number[];
  desktop: number[];
  tablet: number[];
}
