export interface ExaltedResult {
  probability: number;
  averageAttempts: number;
  costEstimate: number;
  standardDeviation: number;
  confidenceInterval: {
    min: number;
    max: number;
  };
} 