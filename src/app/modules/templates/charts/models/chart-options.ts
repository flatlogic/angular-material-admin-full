type ChartCompatObject = Record<string, unknown>;

export type ChartOptions = {
  series: unknown[] | number[];
  chart: ChartCompatObject;
  xaxis: ChartCompatObject;
  yaxis: ChartCompatObject | ChartCompatObject[];
  stroke: ChartCompatObject;
  tooltip: ChartCompatObject;
  theme: ChartCompatObject;
  dataLabels: ChartCompatObject;
  plotOptions: ChartCompatObject;
  legend: ChartCompatObject;
  colors: string[] | string;
  markers: ChartCompatObject;
  grid: ChartCompatObject;
  labels: Array<string | number>;
  responsive: ChartCompatObject[];
  fill: ChartCompatObject;
};
