import React, { useState, useEffect } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import ResultCard from './ResultCard';
import { predictNews } from '@/services/api';

interface VerificationFormProps {
  onSubmit?: (newsText: string) => Promise<void>;
}

type VerificationResult = {
  isVerified: boolean;
  truthScore: number;
  message: string;
};

const VerificationForm = ({ onSubmit }: VerificationFormProps) => {
  const [headline, setHeadline] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [isResultVisible, setIsResultVisible] = useState(false);

  // Reset result visibility when headline changes
  useEffect(() => {
    if (result) {
      setIsResultVisible(false);
    }
  }, [headline]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!headline.trim()) {
      toast({
        title: "Empty headline",
        description: "Please enter a news headline to verify.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Call the API to get the prediction
      const apiResult = await predictNews(headline);
      
      // If onSubmit prop exists, call it too (for any parent component handling)
      if (onSubmit) {
        await onSubmit(headline);
      }
      
      // Transform the API result to match our component's expected format
      const verificationResult: VerificationResult = {
        isVerified: apiResult.prediction === 'real',
        truthScore: apiResult.confidence * 100,
        message: apiResult.prediction === 'real'
          ? "This headline appears to be truthful and is consistent with verified sources."
          : "This headline contains significant false information and should be treated as unreliable.",
      };
      
      setResult(verificationResult);
      
      // Animate the result in after a short delay
      setTimeout(() => {
        setIsResultVisible(true);
      }, 100);
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "An error occurred while verifying the headline.",
        variant: "destructive",
      });
      console.error("Error verifying news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 w-full max-w-3xl mx-auto">
      <div className="glass rounded-xl p-6 md:p-8 animate-blur-in">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="headline" className="text-sm font-medium">
              News Headline
            </Label>
            <Textarea
              id="headline"
              placeholder="Enter a news headline to verify..."
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="resize-none h-24 bg-background/50"
            />
            <p className="text-xs text-muted-foreground">
              <AlertCircle className="inline h-3 w-3 mr-1" />
              For best results, enter the complete headline without modifications.
            </p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full btn-shine" 
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </span>
            ) : (
              <span className="flex items-center">
                <Search className="mr-2 h-4 w-4" />
                Verify Headline
              </span>
            )}
          </Button>
        </form>
      </div>

      {result && (
        <div className={`transition-all duration-500 transform ${isResultVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <ResultCard result={result} headline={headline} />
        </div>
      )}
    </div>
  );
};

export default VerificationForm;
