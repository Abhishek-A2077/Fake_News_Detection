import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

type ResultCardProps = {
  result: {
    isVerified: boolean;
    truthScore: number;
    message: string;
  };
  headline: string;
};

const ResultCard = ({ result, headline }: ResultCardProps) => {
  // Simplified logic based on isVerified boolean
  const getColor = (isVerified: boolean) => {
    return isVerified ? 'text-truth' : 'text-falsehood';
  };

  const getBgColor = (isVerified: boolean) => {
    return isVerified ? 'bg-truth' : 'bg-falsehood';
  };

  const getIcon = (isVerified: boolean) => {
    return isVerified 
      ? <CheckCircle className="h-6 w-6 text-truth" />
      : <XCircle className="h-6 w-6 text-falsehood" />;
  };

  const getVerdict = (isVerified: boolean) => {
    return isVerified ? 'Looking Real News' : 'Looking Fake News';
  };

  // For progress bar, we'll still use the truthScore
  const progressValue = result.isVerified ? result.truthScore : 100 - result.truthScore;

  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-2">
            {getIcon(result.isVerified)}
            <h3 className={`text-xl font-bold ${getColor(result.isVerified)}`}>
              {getVerdict(result.isVerified)}
            </h3>
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            Confidence: {Math.round(result.truthScore)}%
          </div>
        </div>

        <div className="mb-6">
          <div className="text-sm font-medium text-muted-foreground mb-2">Headline analyzed:</div>
          <div className="p-3 bg-background/40 rounded-md border border-border text-foreground">
            "{headline}"
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Fake</span>
              <span>Real</span>
            </div>
            <Progress 
              value={progressValue} 
              className={cn("h-2", getBgColor(result.isVerified))} 
            />
          </div>

          <div className="p-4 rounded-md bg-background/40 border border-border">
            <h4 className="text-sm font-medium mb-2">Analysis:</h4>
            <p className="text-sm text-muted-foreground">{result.message}</p>
          </div>
        </div>
      </div>

      <div className="bg-background/60 px-6 py-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Our AI-powered analysis provides an indication of the headline's credibility based on pattern recognition and comparison with verified sources. Results should be used as guidance and not as definitive proof.
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
