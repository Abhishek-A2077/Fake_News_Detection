
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { ChevronRight, Shield, Brain, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <Hero />

      {/* How It Works Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="h2 mb-4 animate-fade-in opacity-0">How TruthLens Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
              Our advanced AI system analyzes news content through a multi-stage verification process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="h-10 w-10 text-primary" />,
                title: "AI Analysis",
                description: "Our sophisticated algorithms analyze the linguistic patterns, context, and content structure of news headlines.",
                delay: "0.3s"
              },
              {
                icon: <FileText className="h-10 w-10 text-primary" />,
                title: "Source Verification",
                description: "We cross-reference information with trusted sources and databases to validate claims and statements.",
                delay: "0.5s"
              },
              {
                icon: <Shield className="h-10 w-10 text-primary" />,
                title: "Trust Score",
                description: "A comprehensive trust score is calculated based on multiple factors including source credibility and content analysis.",
                delay: "0.7s"
              }
            ].map((step, index) => (
              <div 
                key={index}
                className="relative glass glass-hover p-6 rounded-xl flex flex-col items-center text-center animate-fade-in opacity-0"
                style={{ animationDelay: step.delay }}
              >
                <div className="w-16 h-16 glass flex items-center justify-center rounded-full mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>

                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ChevronRight className="h-8 w-8 text-muted-foreground/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-14 animate-fade-in opacity-0" style={{ animationDelay: '0.9s' }}>
            <Button 
              size="lg" 
              className="btn-shine"
              onClick={() => navigate('/verify')}
            >
              Try It Now
            </Button>
          </div>
        </div>
      </section>

      {/* Why Use TruthLens Section */}
      <section className="py-20 bg-muted/20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="h2 mb-4 animate-fade-in opacity-0">Why Use TruthLens</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
              In a world overflowing with information, finding truth has never been more challenging
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Instant Verification",
                description: "Get immediate results about the credibility of news headlines without extensive research.",
                delay: "0.3s"
              },
              {
                title: "Unbiased Analysis",
                description: "Our AI evaluates content based on facts and patterns, not political or ideological preferences.",
                delay: "0.4s"
              },
              {
                title: "Educational Insights",
                description: "Learn what makes news credible or suspicious with detailed analysis explanations.",
                delay: "0.5s"
              },
              {
                title: "Stay Informed",
                description: "Make better information consumption choices by knowing which sources to trust.",
                delay: "0.6s"
              }
            ].map((benefit, index) => (
              <div 
                key={index}
                className="glass glass-hover p-6 rounded-xl animate-fade-in opacity-0"
                style={{ animationDelay: benefit.delay }}
              >
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="relative flex items-center">
                <CheckCircle className="text-truth w-5 h-5 absolute transform -translate-x-0" />
                <AlertTriangle className="text-falsehood w-5 h-5 absolute transform translate-x-2.5" />
              </div>
              <span className="text-lg font-bold font-display ml-6 text-gradient">TruthLens</span>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} TruthLens. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
