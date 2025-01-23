export interface WellnessMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  icon: string;
  color: string;
}

export interface MetricProgress {
  current: number;
  target: number;
  percentage: number;
}

export interface WellnessStats {
  steps: MetricProgress;
  water: MetricProgress;
  sleep: MetricProgress;
  nutrition: MetricProgress;
  calories: MetricProgress;
}