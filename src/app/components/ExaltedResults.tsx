'use client';

interface ExaltedResultsProps {
  result: {
    probability: number;
    averageAttempts: number;
    costEstimate: number;
    standardDeviation: number;
    confidenceInterval: {
      lower: number;
      upper: number;
    };
  } | null;
}

export default function ExaltedResults({ result }: ExaltedResultsProps) {
  if (!result) {
    return (
      <div className="text-center p-4 bg-slate-800/50 rounded-lg">
        <p className="text-slate-400">Paste item data to see predictions</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center p-4 bg-slate-800/50 rounded-lg">
        <div className="text-2xl font-bold text-amber-500">
          {result.probability.toFixed(2)}% chance
        </div>
        <div className="text-sm text-slate-400">
          Probability of getting desired rolls or better with a single Exalted Orb
        </div>
      </div>

      <div className="text-center p-4 bg-slate-800/50 rounded-lg">
        <div className="text-2xl font-bold text-amber-500">
          {result.averageAttempts.toFixed(1)} attempts
        </div>
        <div className="text-sm text-slate-400">
          Average number of Exalted Orbs needed
        </div>
      </div>

      <div className="text-center p-4 bg-slate-800/50 rounded-lg">
        <div className="text-2xl font-bold text-amber-500">
          {result.standardDeviation.toFixed(1)} attempts
        </div>
        <div className="text-sm text-slate-400">
          Standard deviation in number of attempts
        </div>
      </div>

      <div className="text-center p-4 bg-slate-800/50 rounded-lg">
        <div className="text-2xl font-bold text-amber-500">
          {result.confidenceInterval.lower.toFixed(1)} - {result.confidenceInterval.upper.toFixed(1)} attempts
        </div>
        <div className="text-sm text-slate-400">
          95% confidence interval for number of attempts needed
        </div>
      </div>

      <div className="text-center p-4 bg-slate-800/50 rounded-lg">
        <div className="text-2xl font-bold text-amber-500">
          {result.costEstimate.toFixed(0)} chaos
        </div>
        <div className="text-sm text-slate-400">
          Estimated cost based on current Exalted Orb price
        </div>
      </div>
    </div>
  );
} 