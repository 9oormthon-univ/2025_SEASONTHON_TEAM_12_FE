import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { buttonPress, screenTransition } from './utils/haptic';
import { setStatusBarForSplash } from '../utils/capacitor';

interface SplashScreenProps {
  onComplete: () => void;
  onLogin?: () => void;
}

export function SplashScreen({ onComplete, onLogin }: SplashScreenProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // 스플래시 화면용 상태바 설정
    setStatusBarForSplash();
    
    // 간단한 애니메이션 시퀀스
    setTimeout(() => {
      setShowContent(true);
      buttonPress();
    }, 300);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A90E2] via-[#5DADE2] to-[#4ECDC4] flex flex-col relative overflow-hidden">
      {/* 연결 테마 배경 효과 */}
      <div className="absolute inset-0">
        {/* 떠다니는 연결 신호들 */}
        <motion.div
          className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-32 right-16 w-3 h-3 bg-white/25 rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* 추가 연결 신호 효과 */}
        <motion.div
          className="absolute bottom-32 left-8 w-2 h-2 bg-white/30 rounded-full"
          animate={{
            x: [0, 15, 0],
            y: [0, -10, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-40 right-8 w-1.5 h-1.5 bg-white/25 rounded-full"
          animate={{
            x: [0, -12, 0],
            y: [0, 8, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        
        {/* 로고 중앙 좌우 연결선 효과 */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ top: '35%' }}
        >
          {/* 왼쪽 연결선 */}
          <motion.div
            className="absolute right-20 top-1/2 -translate-y-1/2 w-22 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-white/20 rounded-full"
            animate={{
              opacity: [0, 0.8, 0],
              scaleX: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
          
          {/* 오른쪽 연결선 */}
          <motion.div
            className="absolute left-20 top-1/2 -translate-y-1/2 w-22 h-0.5 bg-gradient-to-l from-transparent via-white/50 to-white/20 rounded-full"
            animate={{
              opacity: [0, 0.8, 0],
              scaleX: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
        </motion.div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 flex flex-col items-center px-8 text-white relative z-10">
        {/* 상단 여백 */}
        <div className="flex-1 min-h-[200px]"></div>
        
        {/* 앱 아이콘 */}
        <motion.div
          className="mb-8 relative"
          initial={{ scale: 0, opacity: 0 }}
          animate={showContent ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative flex items-center justify-center">
            {/* 연결음 애니메이션 - 순차적 동심원 */}
            {/* 첫 번째 원 */}
            <motion.div
              className="absolute w-32 h-32 border-2 border-white/50 rounded-full"
              initial={{ scale: 1, opacity: 0 }}
              animate={showContent ? { 
                scale: [1, 1, 3.5, 3.5],
                opacity: [0, 0.8, 0, 0]
              } : {}}
              transition={{
                duration: 3.0,
                repeat: Infinity,
                delay: 0,
                times: [0, 0.1, 0.7, 1],
                ease: "easeOut"
              }}
            />
            {/* 두 번째 원 */}
            <motion.div
              className="absolute w-32 h-32 border-2 border-white/40 rounded-full"
              initial={{ scale: 1, opacity: 0 }}
              animate={showContent ? { 
                scale: [1, 1, 3.5, 3.5],
                opacity: [0, 0.6, 0, 0]
              } : {}}
              transition={{
                duration: 3.0,
                repeat: Infinity,
                delay: 0.4,
                times: [0, 0.1, 0.7, 1],
                ease: "easeOut"
              }}
            />
            
            {/* 펄스 효과 */}
            <motion.div
              className="absolute w-32 h-32 bg-white/10 rounded-3xl"
              animate={{
                scale: [1, 1.03, 1],
                opacity: [0.4, 0.1, 0.4]
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* 메인 로고 */}
            <div className="relative w-32 h-32 bg-white/95 rounded-3xl shadow-2xl flex items-center justify-center border border-white/20 z-10">
              <motion.div 
                className="flex items-center justify-center gap-1"
                animate={{
                  scale: [1, 1.015, 1]
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* "함께" 텍스트 */}
                <span className="text-[#4A90E2] text-2xl font-bold">함께</span>
                
                {/* 전원 버튼 아이콘 (O 대신) */}
                <motion.div
                  className="relative w-7 h-7 mx-1 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* 전원 버튼 SVG */}
                  <svg 
                    className="w-7 h-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4A90E2"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* 불완전한 원 (전원 버튼의 원형 부분) */}
                    <motion.path
                      d="M18.36 6.64a9 9 0 1 1-12.73 0"
                      animate={{
                        pathLength: [0.8, 1, 0.8],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    {/* 전원 버튼의 중앙 라인 */}
                    <motion.path
                      d="M12 2v6"
                      animate={{
                        opacity: [0.8, 1, 0.8],
                        strokeWidth: [2.5, 3, 2.5]
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </svg>
                </motion.div>
                
                {/* "N" 텍스트 */}
                <span className="text-[#4A90E2] text-2xl font-bold">N</span>
              </motion.div>
            </div>
            

            

            
            {/* 연결 신호 점들 - 원형으로 배치 */}
            {[0, 1, 2, 3].map((dot) => {
              const angle = (dot * 90) * (Math.PI / 180); // 90도씩 배치
              const radius = 90;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <motion.div
                  key={`signal-${dot}`}
                  className="absolute w-1.5 h-1.5 bg-white/60 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    delay: dot * 0.3,
                    repeatDelay: 0.4,
                    ease: "easeOut"
                  }}
                />
              );
            })}
            
            {/* 중심에서 퍼져나가는 추가 효과 */}
            <motion.div
              className="absolute w-40 h-40 border border-white/15 rounded-full"
              animate={{
                scale: [0.8, 2.8],
                opacity: [0.3, 0]
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 0.8,
                ease: "easeOut"
              }}
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          </div>
        </motion.div>

        {/* 앱 이름과 태그라인 */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={showContent ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold mb-4 tracking-wide">함께ON</h1>
          <p className="text-white/90 text-lg">복잡한 모바일 업무, 함께 바로 해결해요</p>
        </motion.div>

        {/* 중간 여백 */}
        <div className="h-32"></div>

        {/* 버튼들 */}
        <motion.div
          className="w-full max-w-xs space-y-4 mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={showContent ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          {/* 회원가입 버튼 */}
          <Button
            onClick={() => {
              buttonPress();
              screenTransition();
              setTimeout(onComplete, 100);
            }}
            className="w-full bg-white text-[#4A90E2] hover:bg-white/95 py-4 text-lg font-semibold shadow-lg hover:shadow-xl rounded-xl transition-all duration-200"
            size="lg"
          >
            회원가입
          </Button>
          
          {/* 로그인 버튼 */}
          <Button
            onClick={() => {
              buttonPress();
              if (onLogin) {
                setTimeout(onLogin, 100);
              }
            }}
            variant="outline"
            className="w-full border-2 border-white/60 text-white hover:bg-white/10 hover:border-white/80 py-4 text-lg font-medium rounded-xl bg-transparent transition-all duration-200"
            size="lg"
          >
            로그인
          </Button>
        </motion.div>
      </div>

      {/* 하단 텍스트 */}
      <motion.div
        className="pb-12 text-center"
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <p className="text-white/60 text-sm">누구나 쉽게, 서로 도우며 ✨</p>
      </motion.div>
    </div>
  );
}