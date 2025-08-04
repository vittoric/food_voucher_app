"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Phone,
  CheckCircle,
  QrCode,
  Wallet,
  ArrowRight,
  Clock,
  MapPin,
  Filter,
  RefreshCw,
  Lock,
  Smartphone,
  Zap,
  Star,
  AlertTriangle,
  Loader2,
  Signal,
  Fingerprint,
  Eye,
} from "lucide-react"

// Componente de Verificación Mejorada
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
      name: 'Verificación de Número',
      icon: Smartphone,
      description: 'Confirmando que este número te pertenece',
      duration: 2000
    },
    {
      id: 'sim_check', 
      name: 'Detección SIM Swap',
      icon: Signal,
      description: 'Verificando la integridad de tu SIM card',
      duration: 1500
    },
    {
      id: 'biometric',
      name: 'Verificación Biométrica',
      icon: Eye,
      description: 'Confirmación adicional requerida',
      duration: 1000,
      conditional: true
    }
  ];

  const startVerification = async () => {
    setVerificationState(prev => ({ ...prev, phase: 'phone_check' }));
    
    // Simular verificación paso a paso
    for (let i = 0; i < verificationSteps.length; i++) {
      const step = verificationSteps[i];
      
      // Saltar biométrica si no es requerida
      if (step.conditional && !verificationState.requiresBiometric) {
        continue;
      }
      
      setCurrentCheck(step);
      setProgress(((i + 1) / verificationSteps.length) * 100);
      
      await new Promise(resolve => setTimeout(resolve, step.duration));
      
      // Simular resultados
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
              Verificación de Seguridad
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
                Verificación Multi-Factor
              </h2>
              <p className="text-gray-600">
                Utilizamos Open Gateway APIs para máxima seguridad
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
                <span className="text-sm text-blue-600">Procesando...</span>
              </div>
            </>
          )}

          {verificationState.phase === 'complete' && (
            <>
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Verificación Completada
              </h2>
              <p className="text-gray-600">
                Tu identidad ha sido verificada con éxito
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
                        {verificationState.simSwapCheck === 'secure' ? 'Seguro' : 'Riesgo Detectado'}
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
                  <p className="font-medium text-orange-800">Verificación Adicional Requerida</p>
                  <p className="text-sm text-orange-700">Se detectó actividad inusual en tu SIM card</p>
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
            Iniciar Verificación Segura
          </Button>
        ) : verificationState.phase === 'complete' ? (
          <Button
            onClick={() => onComplete(verificationState)}
            className="w-full h-14 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl shadow-lg"
          >
            Continuar a la Aplicación
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        ) : (
          <div className="w-full h-14 bg-gray-100 rounded-xl flex items-center justify-center">
            <Loader2 className="w-5 h-5 text-gray-500 animate-spin mr-2" />
            <span className="text-gray-600 font-medium">Verificando...</span>
          </div>
        )}

        {/* Security Footer */}
        <div className="bg-blue-50 rounded-xl p-4 mt-6">
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-blue-600 mr-2" />
            <div>
              <p className="text-sm font-medium text-blue-800">Protegido por Open Gateway</p>
              <p className="text-xs text-blue-700">Verificación de operadora + análisis de riesgo en tiempo real</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente Principal
export default function Component() {
  const [currentScreen, setCurrentScreen] = useState(0)
  
  // Estado global mejorado
  const [appState, setAppState] = useState({
    user: null,
    verification: {
      status: 'pending', // pending, verifying, verified, failed
      trustLevel: 'new', // new, low, medium, high
      securityProfile: null
    },
    card: {
      isGenerated: false,
      balance: 250.00,
      isLocked: false,
      deviceBound: false,
      lastUsed: null
    },
    transactions: [
      { restaurant: "Subway Downtown", amount: "€12.50", time: "2:30 PM", verified: true, id: 1 },
      { restaurant: "Starbucks Coffee", amount: "€8.75", time: "10:15 AM", verified: true, id: 2 },
      { restaurant: "Pizza Palace", amount: "€18.25", time: "Yesterday", verified: true, id: 3 },
      { restaurant: "Green Salad Co.", amount: "€14.00", time: "2 days ago", verified: true, id: 4 },
      { restaurant: "Burger King", amount: "€10.00", time: "3 days ago", verified: true, id: 5 },
    ],
    security: {
      lastVerification: null,
      alertLevel: 'normal' // normal, warning, critical
    }
  });

  const screens = ["Welcome & Onboarding", "Phone Verification", "Virtual Card Generated", "Transaction History"]

  // Manejar resultado de verificación
  const handleVerificationComplete = (verificationResult) => {
    setAppState(prev => ({
      ...prev,
      verification: {
        status: 'verified',
        trustLevel: verificationResult.trustLevel,
        securityProfile: verificationResult.securityProfile
      },
      user: {
        verified: true,
        phone: '+34 6XX XXX XXX',
        securityLevel: verificationResult.trustLevel,
        joinDate: new Date().toISOString()
      },
      card: {
        ...prev.card,
        deviceBound: true,
        isGenerated: true
      },
      security: {
        lastVerification: new Date().toISOString(),
        alertLevel: verificationResult.securityProfile?.simSwapRisk ? 'warning' : 'normal'
      }
    }));
    setCurrentScreen(2);
  };

  // Calcular balance actualizado
  const getCurrentBalance = () => {
    const totalSpent = appState.transactions.reduce((total, transaction) => {
      return total + parseFloat(transaction.amount.replace('€', ''));
    }, 0);
    return (appState.card.balance - totalSpent).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Screen Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white rounded-full p-1 shadow-lg">
            {screens.map((screen, index) => (
              <button
                key={index}
                onClick={() => setCurrentScreen(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  currentScreen === index ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {screen}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Screens Container */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm mx-2.5">
            {/* Screen 1: Welcome & Onboarding */}
            {currentScreen === 0 && (
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="px-6 pt-12 pb-8">
                  {/* Hero Illustration */}
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <Shield className="w-16 h-16 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Headline */}
                  <h1 className="text-2xl font-bold text-gray-900 text-center mb-3">
                    Secure Food Benefits,
                    <br />
                    <span className="text-blue-600">Verified by You</span>
                  </h1>

                  {/* Subtext */}
                  <p className="text-gray-600 text-center mb-8 leading-relaxed">
                    Your personal food voucher, protected by advanced Open Gateway APIs
                  </p>

                  {/* CTA Button */}
                  <Button
                    onClick={() => setCurrentScreen(1)}
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Verify with Your Number
                  </Button>

                  {/* Trust Indicators */}
                  <div className="flex justify-center items-center mt-8 space-x-4">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                      <Lock className="w-3 h-3 mr-1" />
                      Bank-level Security
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                      <Zap className="w-3 h-3 mr-1" />
                      Instant Verification
                    </Badge>
                  </div>

                  <div className="text-center mt-6">
                    <p className="text-xs text-gray-500">Powered by Open Gateway</p>
                  </div>
                </div>
              </div>
            )}

            {/* Screen 2: Enhanced Phone Verification Process */}
            {currentScreen === 1 && (
              <EnhancedVerificationScreen onComplete={handleVerificationComplete} />
            )}

            {/* Screen 3: Virtual Card Generated */}
            {currentScreen === 2 && (
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="px-6 pt-12 pb-8">
                  {/* Success Animation */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Card Generated Successfully!</h2>
                  <p className="text-gray-600 text-center mb-8">Your secure food voucher is ready to use</p>

                  {/* Security Status */}
                  {appState.security.alertLevel === 'warning' && (
                    <Card className="border-orange-200 bg-orange-50 mb-6">
                      <CardContent className="p-4">
                        <div className="flex items-center">
                          <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                          <div>
                            <p className="font-medium text-orange-800">Enhanced Security Active</p>
                            <p className="text-sm text-orange-700">Additional verifications may be required</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Virtual Card Display */}
                  <Card className="mb-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white border-0 shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="text-gray-300 text-sm">Food Voucher</p>
                          <p className="text-white font-semibold">Corporate Benefits</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-white rounded opacity-80"></div>
                          {appState.card.deviceBound && (
                            <Badge className="bg-green-600 text-white">
                              <Lock className="w-3 h-3 mr-1" />
                              Device Bound
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-gray-300 text-xs mb-1">CARD NUMBER</p>
                        <p className="text-white font-mono text-lg tracking-wider">•••• •••• •••• 8429</p>
                      </div>

                      <div className="flex justify-between">
                        <div>
                          <p className="text-gray-300 text-xs">EXPIRES</p>
                          <p className="text-white font-mono">12/27</p>
                        </div>
                        <div>
                          <p className="text-gray-300 text-xs">BALANCE</p>
                          <p className="text-white font-semibold">€{getCurrentBalance()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* QR Code */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6 text-center">
                    <QrCode className="w-16 h-16 mx-auto text-gray-700 mb-2" />
                    <p className="text-sm text-gray-600">Scan to pay at restaurants</p>
                  </div>

                  {/* Add to Wallet Buttons */}
                  <div className="space-y-3 mb-6">
                    <Button className="w-full h-12 bg-black hover:bg-gray-800 text-white rounded-xl">
                      <Wallet className="w-5 h-5 mr-2" />
                      Add to Apple Pay
                    </Button>
                    <Button variant="outline" className="w-full h-12 border-gray-300 rounded-xl bg-transparent">
                      <Wallet className="w-5 h-5 mr-2" />
                      Add to Google Pay
                    </Button>
                  </div>

                  {/* Security Message */}
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 text-blue-600 mr-2" />
                      <div>
                        <div className="text-sm text-blue-800">
                          <span className="font-medium">This card is unique to your device</span>
                          <br />
                          Trust Level: <Badge className="ml-1 bg-green-100 text-green-700">
                            {appState.verification.trustLevel?.toUpperCase() || 'VERIFIED'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Screen 4: Transaction History & Management */}
            {currentScreen === 3 && (
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="px-6 pt-8 pb-8">
                  {/* Header with Balance */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h1 className="text-2xl font-bold text-gray-900">Food Card</h1>
                      <Button variant="ghost" size="sm">
                        <Filter className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 text-white">
                      <p className="text-blue-100 text-sm">Available Balance</p>
                      <p className="text-2xl font-bold">€{getCurrentBalance()}</p>
                      <p className="text-blue-100 text-sm mt-1">
                        Spent this month: €{(appState.card.balance - getCurrentBalance()).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Security Status */}
                  <div className={`rounded-xl p-3 mb-6 ${
                    appState.security.alertLevel === 'warning' ? 'bg-orange-50' : 'bg-green-50'
                  }`}>
                    <div className="flex items-center">
                      {appState.security.alertLevel === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 text-orange-600 mr-2" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      )}
                      <div>
                        <p className={`text-sm font-medium ${
                          appState.security.alertLevel === 'warning' ? 'text-orange-800' : 'text-green-800'
                        }`}>
                          {appState.security.alertLevel === 'warning' ? 'Enhanced Security Active' : 'Fully Verified'}
                        </p>
                        <p className={`text-xs ${
                          appState.security.alertLevel === 'warning' ? 'text-orange-700' : 'text-green-700'
                        }`}>
                          Last verified: Today at 12:30 PM
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Transaction List */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 mb-3">Recent Transactions</h3>

                    {appState.transactions.map((transaction) => (
                      <Card key={transaction.id} className="border border-gray-100 hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                                <MapPin className="w-5 h-5 text-gray-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{transaction.restaurant}</p>
                                <div className="flex items-center">
                                  <Clock className="w-3 h-3 text-gray-400 mr-1" />
                                  <p className="text-sm text-gray-500">{transaction.time}</p>
                                  {transaction.verified && (
                                    <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700 text-xs">
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <p className="font-semibold text-gray-900">{transaction.amount}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Pull to Refresh Indicator */}
                  <div className="text-center mt-6">
                    <p className="text-sm text-gray-500">Pull down to refresh</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}