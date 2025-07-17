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
} from "lucide-react"

export default function Component() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [isVerifying, setIsVerifying] = useState(false)

  const screens = ["Welcome & Onboarding", "Phone Verification", "Virtual Card Generated", "Transaction History"]

  const handleVerification = () => {
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      setCurrentScreen(2)
    }, 3000)
  }

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
          <div className="w-full max-w-sm">
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
                    Your personal food voucher, protected by advanced API's
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

            {/* Screen 2: Phone Verification Process */}
            {currentScreen === 1 && (
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="px-6 pt-12 pb-8">
                  {/* Progress Indicator */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Step 2 of 3</span>
                      <span className="text-sm font-medium text-blue-600">67%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: "67%" }}
                      ></div>
                    </div>
                  </div>

                  {/* Central Verification Element */}
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <div
                        className={`w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center transition-all duration-1000 ${isVerifying ? "animate-pulse" : ""}`}
                      >
                        <Smartphone className="w-16 h-16 text-white" />
                      </div>
                      {/* Animated verification waves */}
                      <div className="absolute inset-0 rounded-full border-4 border-blue-300 animate-ping opacity-30"></div>
                      <div
                        className="absolute inset-0 rounded-full border-4 border-blue-400 animate-ping opacity-20"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                    </div>
                  </div>

                  {/* Status Text */}
                  <div className="text-center mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {isVerifying ? "Verifying your identity..." : "Ready to Verify"}
                    </h2>
                    <p className="text-gray-600">
                      {isVerifying ? "We're confirming this is really you" : "Tap below to start secure verification"}
                    </p>
                  </div>

                  {/* Action Button */}
                  {!isVerifying ? (
                    <Button
                      onClick={handleVerification}
                      className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg"
                    >
                      Start Verification
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  ) : (
                    <div className="w-full h-14 bg-gray-100 rounded-xl flex items-center justify-center">
                      <RefreshCw className="w-5 h-5 text-gray-500 animate-spin mr-2" />
                      <span className="text-gray-600 font-medium">Processing...</span>
                    </div>
                  )}

                  {/* Security Reassurance */}
                  <div className="bg-blue-50 rounded-xl p-4 mt-6">
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 text-blue-600 mr-2" />
                      <p className="text-sm text-blue-800">Your data is encrypted and never stored</p>
                    </div>
                  </div>
                </div>
              </div>
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

                  {/* Virtual Card Display */}
                  <Card className="mb-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white border-0 shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="text-gray-300 text-sm">Food Voucher</p>
                          <p className="text-white font-semibold">Corporate Benefits</p>
                        </div>
                        <div className="w-8 h-8 bg-white rounded opacity-80"></div>
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
                          <p className="text-white font-semibold">€250.00</p>
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
                      <Lock className="w-5 h-5 text-blue-600 mr-2" />
                      <p className="text-sm text-blue-800">This card is unique to your device</p>
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
                      <p className="text-2xl font-bold">€186.50</p>
                      <p className="text-blue-100 text-sm mt-1">Spent this month: €63.50</p>
                    </div>
                  </div>

                  {/* Security Status */}
                  <div className="bg-green-50 rounded-xl p-3 mb-6">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <p className="text-sm text-green-800">Last verified: Today at 12:30 PM</p>
                    </div>
                  </div>

                  {/* Transaction List */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 mb-3">Recent Transactions</h3>

                    {[
                      { restaurant: "Subway Downtown", amount: "€12.50", time: "2:30 PM", verified: true },
                      { restaurant: "Starbucks Coffee", amount: "€8.75", time: "10:15 AM", verified: true },
                      { restaurant: "Pizza Palace", amount: "€18.25", time: "Yesterday", verified: true },
                      { restaurant: "Green Salad Co.", amount: "€14.00", time: "2 days ago", verified: true },
                      { restaurant: "Burger King", amount: "€10.00", time: "3 days ago", verified: true },
                    ].map((transaction, index) => (
                      <Card key={index} className="border border-gray-100 hover:shadow-md transition-shadow">
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
