export interface ChartData {
  type: string;
  data: Data;
  title: string;
}

export interface Data {
  labels: string[] | number[];
  datasets: DataSets[];
}

export interface DataSets {
  label: string;
  data: number[];
  borderWidth: number;
  pointRadius?: number;
}
