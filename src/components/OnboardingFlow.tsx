import React, { useState } from 'react';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Camera, User, Users, Smartphone, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OnboardingFlowProps {
  onComplete: (userType: string) => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState('user');
  const [experience, setExperience] = useState('');
  const [helpAreas, setHelpAreas] = useState<string[]>([]);

  const handleRoleSelection = (value: string) => {
    setUserType(value);
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      onComplete(userType);
    }
  };

  const toggleHelpArea = (area: string) => {
    setHelpAreas(prev => 
      prev.includes(area) 
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    }
  };

  const optionVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 * index,
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1]
      }
    })
  };

  const IconIllustration = ({ step }: { step: number }) => {
    if (step === 1) {
      return (
        <motion.div 
          className="w-20 h-20 bg-[#4A90E2] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
        >
          <Users className="w-10 h-10 text-white" />
        </motion.div>
      );
    } else if (step === 2) {
      return (
        <motion.div 
          className="w-20 h-20 bg-[#4A90E2] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
        >
          <Smartphone className="w-10 h-10 text-white" />
        </motion.div>
      );
    } else {
      return (
        <motion.div 
          className="w-20 h-20 bg-[#4A90E2] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
        >
          <User className="w-10 h-10 text-white" />
        </motion.div>
      );
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 flex flex-col"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* 헤더 */}
      <div className="flex-none px-6 pt-16 pb-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div 
            className="flex justify-center gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {[1, 2, 3].map((stepNum) => (
              <motion.div
                key={stepNum}
                className={`h-1 rounded-full transition-all duration-500 ${
                  step >= stepNum ? 'w-8 bg-[#4A90E2]' : 'w-6 bg-gray-300'
                }`}
                initial={{ width: 24 }}
                animate={{ 
                  width: step >= stepNum ? 32 : 24,
                  backgroundColor: step >= stepNum ? '#4A90E2' : '#d1d5db'
                }}
                transition={{ duration: 0.5 }}
              />
            ))}
          </motion.div>
          <motion.p 
            className="text-gray-600 text-lg font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {step === 1 ? '첫 번째 단계' : 
             step === 2 ? '두 번째 단계' : 
             '세 번째 단계'}
          </motion.p>
        </motion.div>
      </div>
      
      {/* 콘텐츠 */}
      <div className="flex-1 px-6 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto text-center">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-white rounded-3xl p-6 shadow-2xl border border-white/20 backdrop-blur-sm"
              >
                <div className="text-center mb-8">
                  <IconIllustration step={step} />
                  <motion.h1 
                    className="text-xl font-bold text-gray-900 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    어떤 역할로 참여하시나요?
                  </motion.h1>
                  <motion.p 
                    className="text-sm text-gray-600 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    함께ON에서 어떤 활동을 하고&nbsp;싶으신지 선택해주세요
                  </motion.p>
                </div>

                <RadioGroup value={userType} onValueChange={handleRoleSelection} className="space-y-3 mb-6">
                  <motion.div
                    custom={0}
                    variants={optionVariants}
                    initial="initial"
                    animate="animate"
                    className={`relative p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                      userType === 'user' 
                        ? 'border-[#4A90E2] bg-blue-50 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem 
                        value="user" 
                        id="user" 
                        className="mt-0.5 data-[state=checked]:bg-[#4A90E2] data-[state=checked]:border-[#4A90E2]" 
                      />
                      <Label htmlFor="user" className="flex-1 cursor-pointer">
                        <div className="flex items-center mb-1">
                          <span className="text-base mr-2">🙋‍♀️</span>
                          <span className="font-medium text-gray-900">도움이 필요해요</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">모바일 업무가 어려워서 도움을&nbsp;받고&nbsp;싶어요</p>
                      </Label>
                    </div>
                    {userType === 'user' && (
                      <motion.div
                        className="absolute top-4 right-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#4A90E2]" />
                      </motion.div>
                    )}
                  </motion.div>
                  
                  <motion.div
                    custom={1}
                    variants={optionVariants}
                    initial="initial"
                    animate="animate"
                    className={`relative p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                      userType === 'helper' 
                        ? 'border-[#4A90E2] bg-blue-50 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem 
                        value="helper" 
                        id="helper" 
                        className="mt-0.5 data-[state=checked]:bg-[#4A90E2] data-[state=checked]:border-[#4A90E2]" 
                      />
                      <Label htmlFor="helper" className="flex-1 cursor-pointer">
                        <div className="flex items-center mb-1">
                          <span className="text-base mr-2">🤝</span>
                          <span className="font-medium text-gray-900">도움을 드릴게요</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">모바일 업무에 익숙해서 다른&nbsp;분을&nbsp;도와드리고&nbsp;싶어요</p>
                      </Label>
                    </div>
                    {userType === 'helper' && (
                      <motion.div
                        className="absolute top-4 right-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#4A90E2]" />
                      </motion.div>
                    )}
                  </motion.div>
                </RadioGroup>
              </motion.div>
            )}

            {step === 2 && userType === 'user' && (
              <motion.div
                key="step2-user"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-white rounded-3xl p-6 shadow-2xl border border-white/20 backdrop-blur-sm"
              >
                <div className="text-center mb-8">
                  <IconIllustration step={step} />
                  <motion.h1 
                    className="text-xl font-bold text-gray-900 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    스마트폰 사용 경험은?
                  </motion.h1>
                  <motion.p 
                    className="text-sm text-gray-600 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    더 나은 도움을 위해 경험&nbsp;수준을&nbsp;알려주세요
                  </motion.p>
                </div>

                <RadioGroup value={experience} onValueChange={setExperience} className="space-y-3 mb-6">
                  {[
                     { value: 'beginner', label: '기본적인 통화, 문자만&nbsp;사용해요', icon: '📱' },
                     { value: 'intermediate', label: '앱 설치는 할 수 있지만 복잡한&nbsp;건&nbsp;어려워요', icon: '📲' },
                     { value: 'advanced', label: '웬만한 건 할 수 있지만&nbsp;가끔&nbsp;막혀요', icon: '📞' }
                   ].map((option, index) => (
                     <motion.div
                       key={option.value}
                       custom={index}
                       variants={optionVariants}
                       initial="initial"
                       animate="animate"
                       className={`relative p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                         experience === option.value 
                           ? 'border-[#4A90E2] bg-blue-50 shadow-md' 
                           : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                       }`}
                     >
                       <div className="flex items-center space-x-3">
                         <RadioGroupItem 
                           value={option.value} 
                           id={option.value} 
                           className="data-[state=checked]:bg-[#4A90E2] data-[state=checked]:border-[#4A90E2]" 
                         />
                         <Label htmlFor={option.value} className="flex-1 cursor-pointer flex items-center">
                           <span className="text-base mr-2">{option.icon}</span>
                           <span 
                             className="font-medium text-sm leading-relaxed" 
                             dangerouslySetInnerHTML={{ __html: option.label }}
                           />
                         </Label>
                       </div>
                       {experience === option.value && (
                         <motion.div
                           className="absolute top-4 right-4"
                           initial={{ scale: 0 }}
                           animate={{ scale: 1 }}
                           transition={{ type: "spring", stiffness: 500, damping: 30 }}
                         >
                           <CheckCircle2 className="w-4 h-4 text-[#4A90E2]" />
                         </motion.div>
                       )}
                     </motion.div>
                   ))}
                </RadioGroup>
              </motion.div>
            )}

            {step === 2 && userType === 'helper' && (
              <motion.div
                key="step2-helper"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-white rounded-3xl p-6 shadow-2xl border border-white/20 backdrop-blur-sm"
              >
                <div className="text-center mb-8">
                  <IconIllustration step={step} />
                  <motion.h1 
                    className="text-xl font-bold text-gray-900 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    어떤 분야를 도와드릴까요?
                  </motion.h1>
                  <motion.p 
                    className="text-sm text-gray-600 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    도움드릴 수 있는 분야를&nbsp;선택해주세요&nbsp;(복수&nbsp;선택&nbsp;가능)
                  </motion.p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6 justify-center">
                  {['앱 설치/로그인', '본인인증', '공과금 납부', '인터넷뱅킹', '쇼핑몰 이용', '기타'].map((area, index) => (
                     <motion.button
                       key={area}
                       custom={index}
                       variants={optionVariants}
                       initial="initial"
                       animate="animate"
                       onClick={() => toggleHelpArea(area)}
                       className={`relative p-4 border-2 rounded-2xl transition-all duration-300 font-medium text-sm min-h-[48px] whitespace-nowrap text-center ${
                         helpAreas.includes(area) 
                           ? 'bg-[#4A90E2] text-white border-[#4A90E2] shadow-lg' 
                           : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                       }`}
                       whileTap={{ scale: 0.95 }}
                     >
                       {area}
                       {helpAreas.includes(area) && (
                         <motion.div
                           className="absolute -top-1 -right-1"
                           initial={{ scale: 0 }}
                           animate={{ scale: 1 }}
                           transition={{ type: "spring", stiffness: 500, damping: 30 }}
                         >
                           <CheckCircle2 className="w-4 h-4 text-white bg-[#4A90E2] rounded-full" />
                         </motion.div>
                       )}
                     </motion.button>
                   ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-white rounded-3xl p-6 shadow-2xl border border-white/20 backdrop-blur-sm"
              >
                <div className="text-center mb-8">
                  <IconIllustration step={step} />
                  <motion.h1 
                    className="text-xl font-bold text-gray-900 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    프로필 사진 설정
                  </motion.h1>
                  <motion.p 
                    className="text-sm text-gray-600 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    나중에 설정하셔도 됩니다
                  </motion.p>
                </div>

                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 20 }}
                >
                  <Avatar className="w-24 h-24 mx-auto mb-6 border-4 border-blue-100">
                    <AvatarFallback className="bg-blue-50">
                      <Camera className="w-8 h-8 text-[#4A90E2]" />
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    variant="outline" 
                    className="mb-6 border-2 border-dashed border-blue-300 hover:border-[#4A90E2] hover:bg-blue-50 h-12 text-[#4A90E2]"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    사진 선택하기
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* 하단 버튼 영역 */}
      <motion.div 
        className="flex-none p-6 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="max-w-md mx-auto space-y-3">
          <div className="flex gap-3">
            {step > 1 && (
              <Button 
                variant="outline" 
                onClick={() => setStep(step - 1)} 
                className="flex-1 h-12 border-2 border-gray-200 hover:border-gray-300 rounded-2xl bg-white text-center"
              >
                이전
              </Button>
            )}
            <motion.button
              onClick={handleNext} 
              className={`${step > 1 ? 'flex-1' : 'w-full'} h-12 bg-gradient-to-r from-[#4A90E2] to-[#5DADE2] hover:from-[#3A7BC8] hover:to-[#4A90E2] rounded-2xl font-medium text-white shadow-lg shadow-blue-200 text-center border-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={step === 1 && !userType || step === 2 && userType === 'user' && !experience}
              whileTap={{ scale: 0.98 }}
            >
              {step === 3 ? '시작하기' : '다음'}
            </motion.button>
          </div>
          
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button 
                variant="ghost" 
                onClick={() => onComplete(userType)} 
                className="w-full h-12 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-2xl text-center"
              >
                나중에 설정하기
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}