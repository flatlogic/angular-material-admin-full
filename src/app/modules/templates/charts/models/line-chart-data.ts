export interface LineChartData {
  series: Series[],
  categories: string[]
}

interface Series {
  name: string,
  data: number[]
}
