
import React from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-30 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-20 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-accent/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container-custom relative z-10 flex flex-col items-center justify-center py-20">
        <div className="w-full max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex gap-4 px-4 py-2 glass rounded-full animate-fade-in">
            <span className="text-sm font-medium text-muted-foreground">Advanced AI Technology</span>
          </div>
          
          <h1 className="h1 mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
            Detect <span className="text-gradient">Fake News</span> with Precision and Confidence
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
            Our state-of-the-art AI analyzes news headlines to identify misinformation, bias, and fabricated content, helping you stay accurately informed in today's complex media landscape.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              className="btn-shine"
              onClick={() => navigate('/verify')}
            >
              Verify Headlines
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full">
          {[
            {
              icon: <CheckCircle className="h-8 w-8 text-truth" />,
              title: "Accurate Detection",
              description: "Our AI algorithms precisely analyze text patterns to identify genuine news with high accuracy.",
              delay: "0.8s"
            },
            {
              icon: <AlertTriangle className="h-8 w-8 text-neutral" />,
              title: "Bias Analysis",
              description: "Detect political bias and slanted reporting that may distort your perception of events.",
              delay: "1s"
            },
            {
              icon: <XCircle className="h-8 w-8 text-falsehood" />,
              title: "Fake News Alerts",
              description: "Get instant alerts when our system detects fabricated information or false reporting.",
              delay: "1.2s"
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="glass glass-hover p-6 rounded-xl animate-fade-in opacity-0" 
              style={{ animationDelay: feature.delay }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
