export interface RadarChartData {
  series: Series[],
  categories: string[]
}

interface Series {
  name: string,
  data: number[]
}
