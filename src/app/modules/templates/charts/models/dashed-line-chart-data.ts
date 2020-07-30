export interface DashedLineChartData {
  series: Series[],
  categories: string[]
}

interface Series {
  name: string,
  data: number[]
}
