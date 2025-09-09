"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  CheckCircle,
  QrCode,
  Wallet,
  ArrowRight,
  Clock,
  MapPin,
  Filter,
  Lock,
  Smartphone,
  Zap,
  Star,
  AlertTriangle,
  Loader2,
  Signal,
  Eye,
  XCircle,
  Menu,
  ShoppingBag
} from "lucide-react"

// Re-creating shadcn/ui components for a single-file demo
const Input = ({ value, onChange, placeholder, className = '' }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`
      flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-base ring-offset-background
      file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
      disabled:cursor-not-allowed disabled:opacity-50
      ${className}
    `}
  />
);

const EnhancedVerificationScreen = ({ onComplete }) => {
  const FAILED_NUMBER = '660555444';

  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationState, setVerificationState] = useState({
    phase: 'initial', // initial, verifying, success, fail, complete
    progress: 0,
    message: 'Verificación de Seguridad'
  });

  const verificationSteps = [
    {
      id: 'phone_check',
      name: 'Verificación de Número',
      icon: Smartphone,
      description: 'Confirmando que el número te pertenece',
      duration: 1500
    },
    {
      id: 'sim_check',
      name: 'Detección de SIM Swap',
      icon: Signal,
      description: 'Verificando la integridad de tu tarjeta SIM',
      duration: 1000
    }
  ];

  const handleVerifyPhoneNumber = async () => {
    // Basic number validation to prevent empty submissions
    if (phoneNumber.length < 9) {
      setVerificationState(prev => ({ ...prev, phase: 'fail', message: 'Número de teléfono inválido.' }));
      return;
    }

    // Simulate fake verification result
    const isFailedNumber = phoneNumber === FAILED_NUMBER;

    if (isFailedNumber) {
      setVerificationState(prev => ({
        ...prev,
        phase: 'fail',
        message: '¡Error de Verificación! El número no coincide con el dispositivo. Por favor, elige otra opción de verificación.'
      }));
    } else {
      setVerificationState({
        phase: 'verifying',
        progress: 10,
        message: 'Verificando número...'
      });

      await startFullVerification();
    }
  };

  const startFullVerification = async () => {
    let currentProgress = 0;
    const totalSteps = verificationSteps.length;

    for (const step of verificationSteps) {
      currentProgress += (100 / totalSteps);
      setVerificationState(prev => ({ 
        ...prev, 
        phase: 'verifying',
        progress: Math.round(currentProgress),
        message: step.name
      }));
      await new Promise(resolve => setTimeout(resolve, step.duration));
    }
    
    setVerificationState(prev => ({ ...prev, phase: 'success', progress: 100, message: 'Verificación Completa' }));
    
    setTimeout(() => {
      onComplete(); // Simulate completion after a delay
    }, 1000);
  };
  
  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="w-full max-w-lg mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden p-8 transition-all duration-500">
        
        {/* Header - Security Shield */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Verificación Multi-Factor
          </h2>
          <p className="text-lg text-gray-600">
            Usamos las APIs de Open Gateway para máxima seguridad
          </p>
        </div>

        {/* Input and Action Button */}
        {(verificationState.phase === 'initial' || verificationState.phase === 'fail') && (
          <div className="mb-8">
            <div className="flex items-center rounded-xl overflow-hidden mb-4">
              <span className="bg-gray-200 text-gray-600 h-12 flex items-center px-4 font-bold rounded-l-xl">+34</span>
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Número de teléfono"
                className="rounded-l-none"
              />
            </div>
            
            <Button
              onClick={handleVerifyPhoneNumber}
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Shield className="w-5 h-5 mr-2" />
              Verificar Número
            </Button>
            
            {verificationState.phase === 'fail' && (
              <div className="mt-4 flex items-center justify-center p-4 text-center rounded-xl bg-red-50 border border-red-200">
                <XCircle className="w-6 h-6 text-red-500 mr-3 animate-pulse-slow" />
                <p className="text-red-700 text-sm font-medium">
                  {verificationState.message}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Verification in Progress/Success/Fail */}
        {verificationState.phase !== 'initial' && verificationState.phase !== 'fail' && (
          <div className="text-center mb-8">
            <div className={`
              w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4
              ${verificationState.phase === 'success' ? 'bg-green-500' : 'bg-gradient-to-br from-blue-500 to-blue-600 animate-pulse-slow'}
            `}>
              {verificationState.phase === 'success' ? (
                <CheckCircle className="w-12 h-12 text-white" />
              ) : (
                <Loader2 className="w-12 h-12 text-white animate-spin" />
              )}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {verificationState.message}
            </h2>
            <p className="text-gray-600">
              Estamos verificando tu identidad de forma segura.
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${verificationState.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button after Verification */}
        {verificationState.phase === 'success' && (
          <Button
            onClick={onComplete}
            className="w-full h-14 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Continuar a la App
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        )}

        {/* Security Footer */}
        <div className="bg-blue-50 rounded-xl p-4 mt-6">
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-blue-600 mr-2" />
            <div>
              <p className="text-sm font-medium text-blue-800">
                Protegido por Open Gateway
              </p>
              <p className="text-xs text-blue-700">
                Verificación de operadora con la API de Number Verification
              </p>
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

  const screens = ["Tarjeta Virtual Generada", "Historial de Transacciones"]

  // Manejar resultado de verificación
  const handleVerificationComplete = (verificationResult) => {
    setAppState(prev => ({
      ...prev,
      verification: {
        status: 'verified',
        trustLevel: verificationResult?.trustLevel || 'high',
        securityProfile: verificationResult?.securityProfile || { phoneVerified: true, simSwapRisk: false }
      },
      user: {
        verified: true,
        phone: '+34 6XX XXX XXX',
        securityLevel: verificationResult?.trustLevel || 'high',
        joinDate: new Date().toISOString()
      },
      card: {
        ...prev.card,
        deviceBound: true,
        isGenerated: true
      },
      security: {
        lastVerification: new Date().toISOString(),
        alertLevel: verificationResult?.securityProfile?.simSwapRisk ? 'warning' : 'normal'
      }
    }));
    setCurrentScreen(1); // Updated to show the "Virtual Card" screen after verification
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
            {/* Screen 1: Enhanced Phone Verification Process */}
            {currentScreen === 0 && (
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <EnhancedVerificationScreen onComplete={handleVerificationComplete} />
              </div>
            )}
            {/* Screen 2: Virtual Card Generated */}
            {currentScreen === 1 && (
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="px-6 pt-12 pb-8">
                  {/* Success Animation */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Tarjeta Generada con Éxito!</h2>
                  <p className="text-gray-600 text-center mb-8">Tu cheque de comida seguro está listo para usar</p>

                  {/* Security Status */}
                  {appState.security.alertLevel === 'warning' && (
                    <Card className="border-orange-200 bg-orange-50 mb-6">
                      <CardContent className="p-4">
                        <div className="flex items-center">
                          <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                          <div>
                            <p className="font-medium text-orange-800">Seguridad Mejorada Activa</p>
                            <p className="text-sm text-orange-700">Puede que se requieran verificaciones adicionales</p>
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
                          <p className="text-gray-300 text-sm">Cheque de Comida</p>
                          <p className="text-white font-semibold">Beneficios Corporativos</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-white rounded opacity-80"></div>
                          {appState.card.deviceBound && (
                            <Badge className="bg-green-600 text-white">
                              <Lock className="w-3 h-3 mr-1" />
                              Vinculada al Dispositivo
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-gray-300 text-xs mb-1">NÚMERO DE TARJETA</p>
                        <p className="text-white font-mono text-lg tracking-wider">•••• •••• •••• 8429</p>
                      </div>

                      <div className="flex justify-between">
                        <div>
                          <p className="text-gray-300 text-xs">CADUCIDAD</p>
                          <p className="text-white font-mono">12/27</p>
                        </div>
                        <div>
                          <p className="text-gray-300 text-xs">SALDO</p>
                          <p className="text-white font-semibold">€{getCurrentBalance()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* QR Code */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6 text-center">
                    <QrCode className="w-16 h-16 mx-auto text-gray-700 mb-2" />
                    <p className="text-sm text-gray-600">Escanea para pagar en restaurantes</p>
                  </div>

                  {/* Add to Wallet Buttons */}
                  <div className="space-y-3 mb-6">
                    <Button className="w-full h-12 bg-black hover:bg-gray-800 text-white rounded-xl">
                      <Wallet className="w-5 h-5 mr-2" />
                      Añadir a Apple Pay
                    </Button>
                    <Button variant="outline" className="w-full h-12 border-gray-300 rounded-xl bg-transparent">
                      <Wallet className="w-5 h-5 mr-2" />
                      Añadir a Google Pay
                    </Button>
                  </div>

                  {/* Security Message */}
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 text-blue-600 mr-2" />
                      <div>
                        <div className="text-sm text-blue-800">
                          <span className="font-medium">Esta tarjeta es única para tu dispositivo</span>
                          <br />
                          Nivel de Confianza: <Badge className="ml-1 bg-green-100 text-green-700">
                            {appState.verification.trustLevel?.toUpperCase() || 'VERIFICADO'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Screen 3: Transaction History & Management */}
            {currentScreen === 2 && (
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="px-6 pt-8 pb-8">
                  {/* Header with Balance */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h1 className="text-2xl font-bold text-gray-900">Tarjeta de Comida</h1>
                      <Button variant="ghost" size="sm">
                        <Filter className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 text-white">
                      <p className="text-blue-100 text-sm">Saldo Disponible</p>
                      <p className="text-2xl font-bold">€{getCurrentBalance()}</p>
                      <p className="text-blue-100 text-sm mt-1">
                        Gastado este mes: €{(appState.card.balance - getCurrentBalance()).toFixed(2)}
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
                          {appState.security.alertLevel === 'warning' ? 'Seguridad Mejorada Activa' : 'Totalmente Verificado'}
                        </p>
                        <p className={`text-xs ${
                          appState.security.alertLevel === 'warning' ? 'text-orange-700' : 'text-green-700'
                        }`}>
                          Última verificación: Hoy a las 12:30 PM
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Transaction List */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 mb-3">Transacciones Recientes</h3>

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
                                      Verificado
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
                    <p className="text-sm text-gray-500">Arrastra hacia abajo para refrescar</p>
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
