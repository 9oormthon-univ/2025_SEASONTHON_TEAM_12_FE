import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Camera, CheckCircle2, Eye, EyeOff, ArrowLeft, ChevronDown, Smartphone, MessageCircle, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SignupFlowProps {
  onComplete: (userType: string) => void;
  onBack: () => void;
}

export function SignupFlow({ onComplete, onBack }: SignupFlowProps) {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState('user');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const handleRoleSelection = (value: string) => {
    setUserType(value);
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleSendCode = () => {
    setIsCodeSent(true);
    setTimeLeft(180); // 3분
    
    // 타이머 시작
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else {
      handleSignup();
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      onComplete(userType);
    }, 2000);
  };

  const stepTitles = [
    '휴대폰 번호 인증',
    '인증번호 확인',
    '기본정보 입력',
    '역할 선택'
  ];

  const stepIcons = [
    <Smartphone className="w-6 h-6 text-[#4A90E2]" />,
    <MessageCircle className="w-6 h-6 text-[#4A90E2]" />,
    <User className="w-6 h-6 text-[#4A90E2]" />,
    <CheckCircle2 className="w-6 h-6 text-[#4A90E2]" />
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4">
        <div className="flex items-center">
          <button 
            onClick={() => {
              if (step === 1) {
                onBack();
              } else {
                setStep(step - 1);
              }
            }}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 pb-6">
        <div className="w-full max-w-sm">
          {/* Logo & Progress */}
          <div className="text-center mb-12">
            <div className="inline-block">
              <div className="bg-gradient-to-r from-[#4A90E2] to-[#5DADE2] bg-clip-text text-transparent">
                <div className="text-4xl font-bold tracking-wide">함께ON</div>
              </div>
            </div>
            
            {/* Progress Indicator */}
            <div className="flex justify-center gap-2 mt-6 mb-4">
              {[1, 2, 3, 4].map((stepNum) => (
                <div
                  key={stepNum}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    step >= stepNum ? 'w-6 bg-[#4A90E2]' : 'w-4 bg-gray-200'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex items-center justify-center gap-2">
              {stepIcons[step - 1]}
              <p className="text-gray-900 font-medium">{stepTitles[step - 1]}</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: 휴대폰 번호 입력 */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <p className="text-gray-600 text-sm">
                    서비스 이용을 위해 휴대폰 번호를 인증해주세요
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex items-center px-4 bg-gray-100 border-r border-gray-200 rounded-l-lg">
                      <span className="text-sm text-gray-700 mr-1">+82</span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </div>
                    <Input
                      type="tel"
                      placeholder="휴대폰 번호"
                      value={phone}
                      onChange={(e) => {
                        const formatted = formatPhoneNumber(e.target.value);
                        setPhone(formatted);
                      }}
                      className="h-12 bg-gray-100 border-0 rounded-l-none placeholder:text-gray-500 flex-1"
                    />
                  </div>

                  <Button
                    onClick={handleNext}
                    className="w-full h-12 bg-[#4A90E2] hover:bg-[#3A7BC8] text-white font-medium rounded-lg"
                  >
                    인증번호 받기
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: 인증번호 확인 */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <p className="text-gray-600 text-sm">
                    {phone}로 전송된<br />
                    인증번호 6자리를 입력해주세요
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="인증번호 6자리"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="h-12 bg-gray-100 border-0 placeholder:text-gray-500 rounded-lg text-center tracking-wider"
                      maxLength={6}
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      남은 시간: <span className="text-[#4A90E2] font-medium">{formatTime(timeLeft || 180)}</span>
                    </span>
                    <button 
                      onClick={handleSendCode}
                      className="text-[#4A90E2] hover:text-[#3A7BC8] font-medium"
                    >
                      재전송
                    </button>
                  </div>

                  <Button
                    onClick={handleNext}
                    className="w-full h-12 bg-[#4A90E2] hover:bg-[#3A7BC8] text-white font-medium rounded-lg"
                  >
                    확인
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: 기본정보 입력 */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <p className="text-gray-600 text-sm">
                    서비스 이용을 위한 기본 정보를 입력해주세요
                  </p>
                </div>

                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 bg-gray-100 border-0 placeholder:text-gray-500 rounded-lg"
                  />

                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="비밀번호"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 bg-gray-100 border-0 placeholder:text-gray-500 rounded-lg pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="비밀번호 확인"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-12 bg-gray-100 border-0 placeholder:text-gray-500 rounded-lg pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <Button
                    onClick={handleNext}
                    className="w-full h-12 bg-[#4A90E2] hover:bg-[#3A7BC8] text-white font-medium rounded-lg mt-6"
                  >
                    다음
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4: 역할 선택 */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <p className="text-gray-600 text-sm">
                    함께ON에서 어떤 활동을 하고 싶으신지 선택해주세요
                  </p>
                </div>

                <RadioGroup value={userType} onValueChange={handleRoleSelection} className="space-y-4">
                  <div
                    className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                      userType === 'user' 
                        ? 'border-[#4A90E2] bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <RadioGroupItem 
                        value="user" 
                        id="user" 
                        className="mt-1 data-[state=checked]:bg-[#4A90E2] data-[state=checked]:border-[#4A90E2]" 
                      />
                      <Label htmlFor="user" className="flex-1 cursor-pointer">
                        <p className="text-gray-600 text-sm">
                          모바일 앱 사용이 어려워서 도움을 받고 싶어요
                        </p>
                      </Label>
                    </div>
                    {userType === 'user' && (
                      <div className="absolute top-4 right-4">
                        <CheckCircle2 className="w-5 h-5 text-[#4A90E2]" />
                      </div>
                    )}
                  </div>
                  
                  <div
                    className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                      userType === 'helper' 
                        ? 'border-[#4A90E2] bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <RadioGroupItem 
                        value="helper" 
                        id="helper" 
                        className="mt-1 data-[state=checked]:bg-[#4A90E2] data-[state=checked]:border-[#4A90E2]" 
                      />
                      <Label htmlFor="helper" className="flex-1 cursor-pointer">
                        <p className="text-gray-600 text-sm">
                          모바일 앱에 익숙해서 다른 분들을 도와드리고 싶어요
                        </p>
                      </Label>
                    </div>
                    {userType === 'helper' && (
                      <div className="absolute top-4 right-4">
                        <CheckCircle2 className="w-5 h-5 text-[#4A90E2]" />
                      </div>
                    )}
                  </div>
                </RadioGroup>

                <Button
                  onClick={handleSignup}
                  disabled={isLoading}
                  className="w-full h-12 bg-[#4A90E2] hover:bg-[#3A7BC8] text-white font-medium rounded-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      가입 중...
                    </div>
                  ) : (
                    '가입 완료'
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}