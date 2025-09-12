"use client"

import { useState, useEffect } from "react"
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
  Signal,
  XCircle,
  Trophy,
  Phone,
  ArrowDownCircle,
  RefreshCw,
  MoreVertical,
  Minus,
  Volume2
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

const TimelineStep = ({ icon, text, status }) => {
  const statusClasses = {
    pending: "text-gray-400",
    active: "text-blue-500 animate-pulse",
    success: "text-green-500",
    fail: "text-red-500",
  };

  const IconComponent = status === "success" ? CheckCircle : status === "fail" ? XCircle : icon;

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusClasses[status]} transition-colors`}>
        <IconComponent size={20} />
      </div>
      <p className={`text-sm font-medium ${statusClasses[status]}`}>{text}</p>
    </div>
  );
};

const IphoneMockup = ({ children }) => (
  <div className="relative w-96 h-[720px] bg-black rounded-[48px] shadow-2xl p-2 z-10 flex flex-col justify-between">
    {/* Buttons and Notch */}
    <div className="absolute top-16 -left-2 w-1.5 h-16 bg-gray-700 rounded-md"></div>
    <div className="absolute top-28 -left-2 w-1.5 h-20 bg-gray-700 rounded-md"></div>
    <div className="absolute top-20 -right-2 w-1.5 h-28 bg-gray-700 rounded-md"></div>
    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-36 h-6 bg-black rounded-b-xl z-20"></div>

    {/* Screen */}
    <div className="w-full h-full bg-white rounded-[40px] overflow-hidden">
      {children}
    </div>

    {/* Bottom Bar */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-36 h-1 bg-gray-500 rounded-full z-20"></div>
  </div>
);

// Componente de la pantalla de bienvenida
const WelcomeScreen = ({ onStartDemo }) => (
  <div className="flex flex-col items-center justify-center p-8 bg-white h-full text-center">
    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
      <Shield className="w-12 h-12 text-white" />
    </div>
    <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
      Verificación de Cheques Comida
    </h2>
    <p className="text-gray-600 mb-6 leading-relaxed">
      Demostración de un **Login/Recovery Pack** usando las APIs de **Open Gateway**.
    </p>
    <p className="text-sm text-gray-500 mb-8">
      Reemplazamos el SMS OTP por **Number Verification + SIM Swap** para una seguridad inquebrantable y sin fricción.
    </p>
    <Button
      onClick={onStartDemo}
      className="w-full h-12 bg-gray-900 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
    >
      Iniciar Demo
      <ArrowRight className="w-5 h-5 ml-2" />
    </Button>
  </div>
);

// Componente de Verificación Avanzada
const EnhancedVerificationScreen = ({ onComplete }) => {
  const FAILED_NUMBER = '660555444';

  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationState, setVerificationState] = useState({
    phase: 'initial', // initial, verifying, success, fail
    message: 'Verificación de Seguridad',
    currentStep: 0,
    showInput: true,
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
    if (phoneNumber.length < 9) {
      setVerificationState(prev => ({ ...prev, phase: 'fail', message: 'Número de teléfono inválido.' }));
      return;
    }

    setVerificationState(prev => ({ ...prev, showInput: false, phase: 'verifying' }));

    if (phoneNumber === FAILED_NUMBER) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setVerificationState(prev => ({
        ...prev,
        phase: 'fail',
        message: '¡Error de Verificación! El número no coincide con el dispositivo.',
      }));
    } else {
      for (let i = 0; i < verificationSteps.length; i++) {
        setVerificationState(prev => ({
          ...prev,
          message: verificationSteps[i].name,
          currentStep: i + 1,
        }));
        await new Promise(resolve => setTimeout(resolve, verificationSteps[i].duration));
      }

      setVerificationState(prev => ({
        ...prev,
        phase: 'success',
        message: 'Verificación Completa',
        currentStep: verificationSteps.length + 1,
      }));

      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center p-8 bg-white h-full text-center">
      <div>
        {/* Timeline */}
        <div className="flex justify-center items-center space-x-10 my-10">
          <TimelineStep
            icon={Phone}
            text="Verificación"
            status={
              verificationState.phase === 'initial' || verificationState.phase === 'fail'
                ? 'pending'
                : verificationState.phase === 'success' || verificationState.phase === 'verifying'
                  ? 'success'
                  : 'pending'
            }
          />
          <ArrowRight className="text-gray-300" size={24} />
          <TimelineStep
            icon={Shield}
            text="Activación"
            status={verificationState.phase === 'success' ? 'success' : 'pending'}
          />
        </div>

        {/* Dynamic State Display */}
        {verificationState.phase === 'initial' && (
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
              <Shield className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verificación Segura
            </h2>
            <p className="text-gray-600 text-sm mb-12">
              Por favor, introduce tu número para verificar tu identidad.
            </p>
          </div>
        )}

        {verificationState.phase === 'verifying' && (
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
              <RefreshCw className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {verificationState.message}
            </h2>
            <p className="text-gray-600 text-sm">
              Estamos verificando tu identidad de forma segura.
            </p>
          </div>
        )}

        {verificationState.phase === 'success' && (
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verificación Completa
            </h2>
            <p className="text-gray-600 text-sm">
              Tu identidad ha sido verificada con éxito.
            </p>
          </div>
        )}

        {verificationState.phase === 'fail' && (
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-wiggle">
              <XCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-red-700 mb-2">
              Verificación Fallida
            </h2>
            <p className="text-red-600 text-sm">
              {verificationState.message}
            </p>
          </div>
        )}
      </div>

      {/* Input and Action Button */}
      {verificationState.showInput && (
        <div className="w-full">
          <div className="flex items-center rounded-xl overflow-hidden mb-8">
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
            <Smartphone className="w-5 h-5 mr-2" />
            Verificar Número
          </Button>
        </div>
      )}

      {/* Security Footer */}
      <div className="bg-blue-50 rounded-xl p-4 mt-6 w-full">
        <div className="flex items-center justify-center">
          <Shield className="w-5 h-5 text-blue-600 mr-2" />
          <div>
            <p className="text-sm font-medium text-blue-800">
              Protegido por Open Gateway
            </p>
            <p className="text-xs text-blue-700">
              Verificación de operador + análisis de riesgo
            </p>
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

  const handleVerificationComplete = () => {
    setAppState(prev => ({
      ...prev,
      verification: {
        status: 'verified',
        trustLevel: 'high',
        securityProfile: { phoneVerified: true, simSwapRisk: false }
      },
      user: {
        verified: true,
        phone: '+34 6XX XXX XXX',
        securityLevel: 'high',
        joinDate: new Date().toISOString()
      },
      card: {
        ...prev.card,
        deviceBound: true,
        isGenerated: true
      },
      security: {
        lastVerification: new Date().toISOString(),
        alertLevel: 'normal'
      }
    }));
    setCurrentScreen(2);
  };

  const screens = ["Presentación", "Verificación", "Tarjeta", "Historial"];

  // Calcular balance actualizado
  const getCurrentBalance = () => {
    const totalSpent = appState.transactions.reduce((total, transaction) => {
      return total + parseFloat(transaction.amount.replace('€', ''));
    }, 0);
    return (appState.card.balance - totalSpent).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 flex flex-col items-center justify-center">
      {/* Navigation buttons */}
      <div className="flex justify-center w-full max-w-sm mb-8">
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
      <div className="flex flex-col items-center space-y-8">
        {/* Mobile Screen Container */}
        <IphoneMockup>
          {currentScreen === 0 && (
            <WelcomeScreen onStartDemo={() => setCurrentScreen(1)} />
          )}
          {currentScreen === 1 && (
            <EnhancedVerificationScreen onComplete={handleVerificationComplete} />
          )}
          {currentScreen === 2 && (
            <div className="bg-white h-full p-6 text-center overflow-auto">
              {/* Card Generated Screen */}
              <div className="pt-8">
                 <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-2">Tarjeta Generada con Éxito!</h2>
                <p className="text-gray-600 mb-8">Tu cheque de comida seguro está listo para usar.</p>

                <Card className="mb-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white border-0 shadow-xl relative overflow-hidden">
                  <CardContent className="p-6">
                     <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-gray-300 text-sm">Cheque de Comida</p>
                        <p className="text-white font-semibold">Beneficios Corporativos</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white rounded opacity-80"></div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-gray-300 text-xs mb-1">NÚMERO DE TARJETA</p>
                      <p className="text-white font-mono text-lg tracking-wider">•••• •••• •••• 8429</p>
                    </div>
                     <div className="flex justify-between items-end mb-4">
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

                <div className="bg-gray-50 rounded-xl p-4 mb-6 text-center">
                  <QrCode className="w-16 h-16 mx-auto text-gray-700 mb-2" />
                  <p className="text-sm text-gray-600">Escanea para pagar en restaurantes</p>
                </div>

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

                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">
                        Esta tarjeta es única para tu dispositivo
                      </p>
                    </div>
                  </div>
                </div>
                <Button onClick={() => setCurrentScreen(3)} className="mt-4 w-full">Ver Transacciones</Button>
              </div>
            </div>
          )}
          {currentScreen === 3 && (
            <div className="bg-white h-full p-6 text-center overflow-auto">
              {/* Transaction History Screen */}
              <div className="pt-8 flex flex-col">
                <h1 className="text-xl font-bold text-gray-900 mb-2">Historial de Transacciones</h1>
                <p className="text-gray-600 text-sm mb-4">Revisa tus gastos más recientes.</p>

                <div className="space-y-3">
                  {appState.transactions.map((transaction) => (
                    <Card key={transaction.id} className="border-l-4 border-blue-500 bg-blue-50 hover:bg-blue-100 transition-colors shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                              <MapPin className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{transaction.restaurant}</p>
                              <div className="flex items-center mt-1">
                                <Clock className="w-3 h-3 text-gray-400 mr-1" />
                                <p className="text-sm text-gray-500">{transaction.time}</p>
                              </div>
                            </div>
                          </div>
                          <p className="font-semibold text-gray-900">{transaction.amount}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </IphoneMockup>
      </div>
    </div>
  );
}
