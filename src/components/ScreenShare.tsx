import React, { useState } from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Phone, Mic, MicOff, Video, VideoOff, Share2, X, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { buttonPress } from './utils/haptic';

interface ScreenShareProps {
  partnerName: string;
  onEndCall: () => void;
  onStopShare: () => void;
}

export function ScreenShare({ partnerName, onEndCall, onStopShare }: ScreenShareProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const handleMuteToggle = () => {
    buttonPress();
    setIsMuted(!isMuted);
  };

  const handleVideoToggle = () => {
    buttonPress();
    setIsVideoOff(!isVideoOff);
  };

  const handleEndCall = () => {
    buttonPress();
    onEndCall();
  };

  const handleStopShare = () => {
    buttonPress();
    onStopShare();
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* 정부24 사이트 배경 */}
      <div className="flex-1 relative overflow-hidden">
        {/* 정부24 사이트 모방 배경 */}
        <div className="absolute inset-0 bg-gray-50">
          {/* 정부24 헤더 */}
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-md mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">정</span>
                  </div>
                  <span className="text-lg font-bold text-gray-800">정부24</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs">👤</span>
                  </div>
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs">☰</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 공지사항 */}
          <div className="bg-yellow-50 border-b">
            <div className="max-w-md mx-auto px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="text-yellow-600">🔔</span>
                <span className="text-sm text-gray-700">새로운 공지사항 확인하기</span>
                <span className="text-gray-400">→</span>
              </div>
            </div>
          </div>

          {/* 검색바 */}
          <div className="bg-white p-4">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 rounded-full px-4 py-3 flex items-center gap-2">
                <span className="text-gray-400">🔍</span>
                <span className="text-gray-500 text-sm">정부 서비스를 쉽게 검색하세요.</span>
              </div>
            </div>
          </div>

          {/* 자주 찾는 서비스 */}
          <div className="bg-white p-4">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">자주 찾는 서비스</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-lg p-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs">💻</span>
                  </div>
                  <span className="text-sm text-gray-700">인감증명서</span>
                </div>
                <div className="bg-red-50 rounded-lg p-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs">📄</span>
                  </div>
                  <span className="text-sm text-gray-700">토지(임야)대장</span>
                </div>
                <div className="bg-red-50 rounded-lg p-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs">📄</span>
                  </div>
                  <span className="text-sm text-gray-700">주민등록등본</span>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs">🚗</span>
                  </div>
                  <span className="text-sm text-gray-700">자동차등록원부</span>
                </div>
              </div>
            </div>
          </div>

          {/* 혜택/보조금 */}
          <div className="bg-white p-4">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">지금 봐야 할 혜택/보조금</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">유아학비</p>
                      <p className="text-xs text-gray-600">현금(감면) 지급</p>
                    </div>
                    <span className="text-lg">🎓</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">전세보증금반환</p>
                      <p className="text-xs text-gray-600">현금 지급</p>
                    </div>
                    <span className="text-lg">💰</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 진행 상황 표시 */}
          <div className="bg-blue-50 p-4 mt-4">
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-800">사실조사 진행 중</span>
                </div>
                <p className="text-xs text-gray-600">현재: 신청서 작성 완료</p>
                <p className="text-xs text-blue-600">다음: 본인인증 진행</p>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 버튼들 - 전송 버튼과 종료 버튼 */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex items-center gap-4">
            {/* 전송 버튼 */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <Button
                onClick={() => {
                  buttonPress();
                  console.log('전송 버튼 클릭');
                }}
                className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
              >
                <Send className="w-5 h-5 text-white" />
              </Button>
            </motion.div>

            {/* 종료 버튼 */}
            <Button
              onClick={handleEndCall}
              className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 shadow-lg"
            >
              <Phone className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
