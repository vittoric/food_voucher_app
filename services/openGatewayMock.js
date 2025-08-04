// services/openGatewayMock.js
export const OpenGatewayAPI = {
  // Simulación de Number Verification
  verifyNumber: async (phoneNumber) => {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simula latencia
    
    return {
      verified: true,
      confidence: Math.random() > 0.1 ? 'high' : 'medium',
      timestamp: new Date().toISOString(),
      deviceFingerprint: `device_${Math.random().toString(36).substr(2, 9)}`,
      risk_assessment: {
        fraud_probability: Math.random() * 0.2, // 0-20% fraude
        sim_swap_detected: Math.random() > 0.95,
        device_change_detected: false
      }
    };
  },

  // Simulación de SIM Swap Detection
  checkSimSwap: async (phoneNumber) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      sim_swapped: Math.random() > 0.9, // 10% probabilidad
      last_sim_change: Math.random() > 0.5 ? 
        new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) : null,
      risk_level: Math.random() > 0.8 ? 'high' : 'low'
    };
  },



  // Simulación de verificación en tiempo real durante pago
  realTimeVerification: async (phoneNumber, amount, location) => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const riskFactors = {
      unusual_location: Math.random() > 0.8,
      unusual_amount: amount > 50 && Math.random() > 0.7,
      unusual_time: new Date().getHours() < 6 || new Date().getHours() > 23,
      sim_swap_risk: Math.random() > 0.95
    };

    const totalRisk = Object.values(riskFactors).filter(Boolean).length;
    
    return {
      verification_required: totalRisk > 0,
      risk_level: totalRisk > 2 ? 'high' : totalRisk > 0 ? 'medium' : 'low',
      risk_factors: riskFactors,
      verification_method: totalRisk > 1 ? 'biometric_plus_sms' : 'sms_only',
      approved: totalRisk < 3
    };
  }
};

// Hook personalizado para usar las APIs
export const useOpenGateway = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const verify = async (type, data) => {
    setLoading(true);
    setError(null);
    
    try {
      let result;
      switch(type) {
        case 'number':
          result = await OpenGatewayAPI.verifyNumber(data);
          break;
        case 'sim_swap':
          result = await OpenGatewayAPI.checkSimSwap(data);
          break;
        case 'realtime':
          result = await OpenGatewayAPI.realTimeVerification(data.phone, data.amount, data.location);
          break;
        default:
          throw new Error('Tipo de verificación no válido');
      }
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { verify, loading, error };
};