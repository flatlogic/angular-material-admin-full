export interface HeatmapChartData {
  series: Serie[];
}

interface Serie {
  name: string;
  data: number[];
}
