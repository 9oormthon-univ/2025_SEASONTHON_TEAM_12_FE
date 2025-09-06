import React, { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { SignupFlow } from './components/SignupFlow';
import { MainLayout } from './components/MainLayout';

type AppStep = 'splash' | 'login' | 'signup' | 'main';

export default function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>('splash');
  const [userType, setUserType] = useState<string>('');

  const handleSplashComplete = () => {
    setCurrentStep('signup');
  };

  const handleSplashLogin = () => {
    setCurrentStep('login');
  };

  const handleLogin = (selectedUserType: string) => {
    setUserType(selectedUserType);
    setCurrentStep('main');
  };

  const handleSignup = () => {
    setCurrentStep('signup');
  };

  const handleSignupComplete = (selectedUserType: string) => {
    setUserType(selectedUserType);
    setCurrentStep('main');
  };

  const handleBackToSplash = () => {
    setCurrentStep('splash');
  };

  const handleBackToLogin = () => {
    setCurrentStep('login');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} onLogin={handleSplashLogin} />;
      case 'login':
        return <LoginScreen onLogin={handleLogin} onSignup={handleSignup} onBack={() => {}} />;
      case 'signup':
        return <SignupFlow onComplete={handleSignupComplete} onBack={handleBackToLogin} />;
      case 'main':
        return <MainLayout userType={userType} />;
      default:
        return <SplashScreen onComplete={handleSplashComplete} onLogin={handleSplashLogin} />;
    }
  };

  return (
    <div>
      {renderCurrentStep()}
    </div>
  );
}