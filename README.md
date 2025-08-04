# 🍽️ Secure Food Voucher System

A revolutionary food voucher application that eliminates fraud using **Open Gateway Number Verification APIs**. Built with modern React and Next.js, this demo showcases how telecommunication APIs can transform corporate benefits security.

## 🚀 Live Demo

**[View Live Application](https://food-voucher-app.vercel.app/)**

*Experience the full demo in your browser - no installation required!*

## 📱 What is?

Replaces traditional, insecure email/password registration with robust phone verification, creating non-transferable virtual cards tied to specific devices. This innovative approach prevents fraud and ensures that only legitimate employees can use their food benefits.

### 🔒 Key Security Features

- **Open Gateway Number Verification**: Carrier-level phone number authentication
- **SIM Swap Detection**: Real-time monitoring for SIM card fraud
- **Device Binding**: Cards locked to specific devices
- **Real-time Risk Analysis**: AI-powered fraud detection
- **Multi-factor Authentication**: Enhanced security for high-risk transactions

## 🎯 Demo Flow

1. **Onboarding**: Secure phone number verification using Open Gateway APIs
2. **Card Generation**: Create device-bound virtual food voucher
3. **Secure Payments**: Smart verification system for restaurant transactions
4. **Transaction History**: Real-time monitoring and security alerts

## 🛠️ Tech Stack

- **Frontend**: React 19, Next.js 15.2.4
- **Styling**: Tailwind CSS + shadcn/ui components
- **Icons**: Lucide React
- **APIs**: Simulated Open Gateway APIs (Number Verification, SIM Swap Detection)
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **pnpm**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/food-voucher-app.git
   cd food-voucher-app
   ```

2. **Install dependencies**
   ```bash
   # Using pnpm (recommended)
   pnpm install
   
   # Or using npm
   npm install
   ```

3. **Start the development server**
   ```bash
   # Using pnpm
   pnpm dev
   
   # Or using npm
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### 🔧 Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## 📂 Project Structure

```
food-voucher-app/
├── app/                          # Next.js 13+ app directory
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main page
├── components/
│   ├── ui/                      # shadcn/ui components
│   └── EnhancedVerificationScreen.jsx  # Custom verification component
├── services/
│   └── openGatewayMock.js       # Simulated Open Gateway APIs
├── food-voucher-app.tsx         # Main application component
├── tailwind.config.ts           # Tailwind configuration
├── components.json              # shadcn/ui configuration
└── package.json                 # Dependencies and scripts
```

## 🎮 How to Use the Demo

### Step 1: Welcome Screen
- Click **"Verify with Your Number"** to begin the secure onboarding process

### Step 2: Phone Verification
- Experience the **multi-factor authentication** flow
- Watch real-time **SIM Swap Detection** 
- See how **Open Gateway APIs** work in action

### Step 3: Virtual Card Generation
- Receive your **device-bound food voucher**
- Note the security indicators and trust levels
- Add to Apple Pay or Google Pay (simulated)

### Step 4: Transaction History
- View your transaction history with **verification badges**
- See real-time balance updates
- Monitor security status and alerts

## 🔐 Security Features Demonstrated

### Open Gateway API Simulations

- **Number Verification**: Carrier-level phone authentication
- **SIM Swap Detection**: Real-time fraud monitoring
- **Risk Assessment**: Intelligent scoring system
- **Device Fingerprinting**: Unique device identification

### Visual Security Indicators

- 🟢 **High Trust**: Fully verified user
- 🟡 **Medium Trust**: Some risk factors detected
- 🔴 **Enhanced Security**: Additional verification required

## 🧪 API Simulations

All Open Gateway APIs are simulated for demo purposes:

```javascript
// Example: Simulated Number Verification
const verificationResult = {
  verified: true,
  confidence: 'high',
  risk_assessment: {
    fraud_probability: 0.05,
    sim_swap_detected: false
  }
}
```

## 🎨 Design Philosophy

- **Security-First UX**: Every interaction reinforces trust and security
- **Mobile-First**: Optimized for smartphone usage
- **Professional Fintech Aesthetic**: Banking-grade visual design
- **Accessibility**: WCAG compliant components

## 🚀 Deployment

This project is configured for easy deployment on Vercel:

1. **Connect your GitHub repository** to Vercel
2. **Deploy automatically** on every push to main
3. **Environment variables** are managed through Vercel dashboard

### Build Configuration

```javascript
// next.config.mjs
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true }
}
```

## 🔮 Future Enhancements

- **Real Open Gateway Integration**: Connect to actual carrier APIs
- **Blockchain Integration**: Immutable transaction records
- **AI/ML Fraud Detection**: Advanced pattern recognition
- **Enterprise Dashboard**: Company administration portal
- **Multi-language Support**: International deployment ready

## 🤝 Contributing

This is a demonstration project showcasing Open Gateway API capabilities. For suggestions or improvements:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- **Live Demo**: [https://food-voucher-app.vercel.app/](https://food-voucher-app.vercel.app/)
- **Issues**: Use GitHub Issues for bug reports
- **Documentation**: Check the code comments for detailed explanations

## 🏆 Recognition

Built to demonstrate the transformative potential of **Open Gateway APIs** in eliminating fraud and creating secure, user-friendly corporate benefit systems.

---

**Made with ❤️ for the future of secure digital payments**

*Powered by Open Gateway • Built with React & Next.js • Deployed on Vercel*