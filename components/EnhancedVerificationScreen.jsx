import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Smartphone, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Loader2,
  Signal,
  Eye,
  ArrowRight
} from 'lucide-react';

const EnhancedVerificationScreen = ({ onComplete }) => {
  const [verificationState, setVerificationState] = useState({
    phase: 'initial', // initial, phone_check, sim_check, biometric, complete
    phoneVerified: false,
    simSwapCheck: null,
    riskLevel: 'unknown',
    requiresBiometric: false
  });

  const [currentCheck, setCurrentCheck] = useState(null);
  const [progress, setProgress] = useState(0);

  const verificationSteps = [
    {
      id: 'phone_check',
      name: 'Number Verification',
      icon: Smartphone,
      description: 'Confirming this number belongs to you',
      duration: 2000
    },
    {
      id: 'sim_check', 
      name: 'SIM Swap Detection',
      icon: Signal,
      description: 'Verifying the integrity of your SIM card',
      duration: 1500
    },
    {
      id: 'biometric',
      name: 'Biometric Verification',
      icon: Eye,
      description: 'Additional confirmation required',
      duration: 1000,
      conditional: true
    }
  ];

  const startVerification = async () => {
    setVerificationState(prev => ({ ...prev, phase: 'phone_check' }));
    
    // Simulate step-by-step verification
    for (let i = 0; i < verificationSteps.length; i++) {
      const step = verificationSteps[i];
      
      // Skip biometric if not required
      if (step.conditional && !verificationState.requiresBiometric) {
        continue;
      }
      
      setCurrentCheck(step);
      setProgress(((i + 1) / verificationSteps.length) * 100);
      
      await new Promise(resolve => setTimeout(resolve, step.duration));
      
      // Simulate results
      if (step.id === 'phone_check') {
        setVerificationState(prev => ({ 
          ...prev, 
          phoneVerified: true 
        }));
      } else if (step.id === 'sim_check') {
        const simResult = Math.random() > 0.9 ? 'risk_detected' : 'secure';
        setVerificationState(prev => ({ 
          ...prev, 
          simSwapCheck: simResult,
          requiresBiometric: simResult === 'risk_detected',
          riskLevel: simResult === 'risk_detected' ? 'medium' : 'high'
        }));
      }
    }
    
    setVerificationState(prev => ({ ...prev, phase: 'complete' }));
    setCurrentCheck(null);
    
    setTimeout(() => {
      onComplete({
        verified: true,
        trustLevel: verificationState.riskLevel,
        securityProfile: {
          phoneVerified: true,
          simSwapRisk: verificationState.simSwapCheck === 'risk_detected'
        }
      });
    }, 1000);
  };

  const getRiskColor = (level) => {
    switch(level) {
      case 'high': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStepStatus = (stepId) => {
    if (verificationState.phase === 'complete') return 'completed';
    if (currentCheck?.id === stepId) return 'active';
    
    const stepIndex = verificationSteps.findIndex(s => s.id === stepId);
    const currentIndex = verificationSteps.findIndex(s => s.id === verificationState.phase);
    
    return stepIndex < currentIndex ? 'completed' : 'pending';
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div className="px-6 pt-12 pb-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Security Verification
            </span>
            <span className="text-sm font-medium text-blue-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Verification Status */}
        <div className="text-center mb-8">
          {verificationState.phase === 'initial' && (
            <>
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Multi-Factor Verification
              </h2>
              <p className="text-gray-600">
                We use Open Gateway APIs for maximum security
              </p>
            </>
          )}

          {currentCheck && (
            <>
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <currentCheck.icon className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {currentCheck.name}
              </h2>
              <p className="text-gray-600 mb-4">{currentCheck.description}</p>
              <div className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600 mr-2" />
                <span className="text-sm text-blue-600">Processing...</span>
              </div>
            </>
          )}

          {verificationState.phase === 'complete' && (
            <>
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Verification Completed
              </h2>
              <p className="text-gray-600">
                Your identity has been successfully verified
              </p>
            </>
          )}
        </div>

        {/* Verification Steps */}
        <div className="space-y-3 mb-8">
          {verificationSteps.map((step) => {
            if (step.conditional && !verificationState.requiresBiometric) return null;
            
            const status = getStepStatus(step.id);
            return (
              <Card key={step.id} className={`border transition-all ${
                status === 'active' ? 'border-blue-500 bg-blue-50' :
                status === 'completed' ? 'border-green-500 bg-green-50' :
                'border-gray-200'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      status === 'active' ? 'bg-blue-500' :
                      status === 'completed' ? 'bg-green-500' :
                      'bg-gray-300'
                    }`}>
                      {status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : status === 'active' ? (
                        <Loader2 className="w-5 h-5 text-white animate-spin" />
                      ) : (
                        <step.icon className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{step.name}</p>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                    {step.id === 'sim_check' && verificationState.simSwapCheck && (
                      <Badge variant={verificationState.simSwapCheck === 'secure' ? 'default' : 'destructive'}>
                        {verificationState.simSwapCheck === 'secure' ? 'Secure' : 'Risk Detected'}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Security Alerts */}
        {verificationState.simSwapCheck === 'risk_detected' && (
          <Card className="border-orange-200 bg-orange-50 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                <div>
                  <p className="font-medium text-orange-800">Additional Verification Required</p>
                  <p className="text-sm text-orange-700">Unusual activity detected on your SIM card</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Button */}
        {verificationState.phase === 'initial' ? (
          <Button
            onClick={startVerification}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg"
          >
            <Shield className="w-5 h-5 mr-2" />
            Start Secure Verification
          </Button>
        ) : verificationState.phase === 'complete' ? (
          <Button
            onClick={() => onComplete(verificationState)}
            className="w-full h-14 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl shadow-lg"
          >
            Continue to App
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        ) : (
          <div className="w-full h-14 bg-gray-100 rounded-xl flex items-center justify-center">
            <Loader2 className="w-5 h-5 text-gray-500 animate-spin mr-2" />
            <span className="text-gray-600 font-medium">Verifying...</span>
          </div>
        )}

        {/* Security Footer */}
        <div className="bg-blue-50 rounded-xl p-4 mt-6">
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-blue-600 mr-2" />
            <div>
              <p className="text-sm font-medium text-blue-800">Protected by Open Gateway</p>
              <p className="text-xs text-blue-700">Carrier verification + real-time risk analysis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedVerificationScreen;