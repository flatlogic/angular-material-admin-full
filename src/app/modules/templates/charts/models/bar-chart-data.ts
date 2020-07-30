export interface BarChartData {
  series: Series[],
  categories: string[]
}

interface Series {
  name: string,
  data: number[]
}
