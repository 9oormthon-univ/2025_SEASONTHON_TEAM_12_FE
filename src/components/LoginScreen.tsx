import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Eye, EyeOff, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { setStatusBarForApp } from '../utils/capacitor';

interface LoginScreenProps {
  onLogin: (userType: string) => void;
  onSignup: () => void;
  onBack: () => void;
}

export function LoginScreen({ onLogin, onSignup, onBack }: LoginScreenProps) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 앱 화면용 상태바 설정
    setStatusBarForApp();
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    
    // 하드코딩된 로그인 처리
    setTimeout(() => {
      setIsLoading(false);
      
      // 도우미 계정
      if (phone === '010-1111-1111' && password === '12345678') {
        onLogin('helper');
        return;
      }
      
      // 사용자 계정
      if (phone === '010-2222-2222' && password === '12345678') {
        onLogin('user');
        return;
      }
      
      // 잘못된 계정
      alert('잘못된 전화번호 또는 비밀번호입니다.');
    }, 1000);
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // 소셜 로그인은 기본적으로 사용자로 설정
      onLogin('user');
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col safe-area-top safe-area-bottom safe-area-left safe-area-right">
      {/* Status Bar Spacer */}
      <div className="status-bar-height bg-white"></div>
      

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 pb-6">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-16">
            <div className="inline-block">
              <div className="bg-gradient-to-r from-[#4A90E2] to-[#5DADE2] bg-clip-text text-transparent">
                <div className="text-4xl font-bold tracking-wide">함께ON</div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
                {/* Login Form */}
                <div className="space-y-4 mb-6">
                  {/* Phone Number */}
                  <div className="space-y-2">
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
                        onKeyPress={handleKeyPress}
                        className="h-12 bg-gray-100 border-0 rounded-l-none placeholder:text-gray-500 flex-1"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
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
                  </div>

                  {/* Forgot Password */}
                  <div className="py-2">
                    <button className="text-sm text-gray-600 hover:text-gray-800 transition-colors">
                      비밀번호를 잊어버리셨나요?
                    </button>
                  </div>

                  {/* Login Button */}
                  <Button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="w-full h-12 bg-[#4A90E2] hover:bg-[#3A7BC8] text-white font-medium rounded-lg mt-6"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        로그인 중...
                      </div>
                    ) : (
                      '로그인'
                    )}
                  </Button>
                </div>

                {/* Divider */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">또는</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="space-y-6">
                  <div className="flex justify-center space-x-8">
                    {/* 카카오 */}
                    <button
                      onClick={() => handleSocialLogin('kakao')}
                      disabled={isLoading}
                      className="w-12 h-12 bg-[#FEE500] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
                      title="카카오로 로그인"
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="#181600" d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3Z"/>
                      </svg>
                    </button>

                    {/* 네이버 */}
                    <button
                      onClick={() => handleSocialLogin('naver')}
                      disabled={isLoading}
                      className="w-12 h-12 bg-[#03C75A] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
                      title="네이버로 로그인"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z"/>
                      </svg>
                    </button>

                    {/* 구글 */}
                    <button
                      onClick={() => handleSocialLogin('google')}
                      disabled={isLoading}
                      className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                      title="구글로 로그인"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </button>
                  </div>

                  {/* Sign Up Link */}
                  <div className="text-center pt-6">
                    <p className="text-gray-600 text-sm">
                      아직 계정이 없으신가요?{' '}
                      <button 
                        onClick={onSignup}
                        className="text-[#4A90E2] font-medium hover:text-[#3A7BC8] transition-colors"
                      >
                        회원가입
                      </button>
                    </p>
                  </div>
                </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}