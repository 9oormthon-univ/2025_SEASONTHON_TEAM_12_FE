import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Phone, Video, MoreVertical, Send, Calendar, Monitor } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { motion, AnimatePresence } from 'motion/react';
import { CallRequest, InCallScreen } from './CallRequest';
import { ScheduleMeeting } from './ScheduleMeeting';
import { ScreenShare } from './ScreenShare';
import { buttonPress } from './utils/haptic';

interface Message {
  id: number;
  sender: 'user' | 'helper';
  content: string;
  timestamp: string;
  type: 'text' | 'call_request';
}

interface IndividualChatProps {
  chatId: number;
  partnerName: string;
  partnerRating: number;
  onBack: () => void;
}

export function IndividualChat({ chatId, partnerName, partnerRating, onBack }: IndividualChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showCallRequest, setShowCallRequest] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // 초기 메시지 설정
    const initialMessage: Message = {
      id: 1,
      sender: 'helper',
      content: '안녕하세요! 정부24 비대면 사실조사 도와드리겠습니다',
      timestamp: new Date().toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      type: 'text'
    };
    setMessages([initialMessage]);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        sender: 'user',
        content: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        type: 'text'
      };

      setMessages(prev => [...prev, userMessage]);
      const currentMessage = newMessage.trim();
      setNewMessage('');

      // 타이핑 효과 표시
      setIsTyping(true);

      // 특정 메시지에 대한 응답 처리
      setTimeout(() => {
        setIsTyping(false);
        
        let responseContent = '';
        let shouldShowCallRequest = false;
        
        if (currentMessage.includes('통화') || currentMessage.includes('전화') || currentMessage.includes('가능') || currentMessage.includes('도와주실')) {
          responseContent = '네, 알겠습니다.';
          shouldShowCallRequest = true;
        } else if (currentMessage.includes('안녕') || currentMessage.includes('하세요')) {
          responseContent = '안녕하세요! 정부24 비대면 사실조사 도와드리겠습니다';
        } else {
          responseContent = '네, 도와드리겠습니다. 어떤 부분이 궁금하신가요?';
        }

        const helperResponse: Message = {
          id: messages.length + 2,
          sender: 'helper',
          content: responseContent,
          timestamp: new Date().toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }),
          type: 'text'
        };
        setMessages(prev => [...prev, helperResponse]);

        // 통화 관련 메시지인 경우 통화 요청 메시지 추가
        if (shouldShowCallRequest) {
          setTimeout(() => {
            const callRequestMessage: Message = {
              id: messages.length + 3,
              sender: 'helper',
              content: '',
              timestamp: new Date().toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              }),
              type: 'call_request'
            };
            setMessages(prev => [...prev, callRequestMessage]);
          }, 1500);
        }
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleCallRequest = () => {
    buttonPress();
    setShowCallRequest(true);
  };

  const handleAcceptCall = () => {
    buttonPress();
    setShowCallRequest(false);
    setIsScreenSharing(true);
  };

  const handleEndCall = () => {
    buttonPress();
    setIsInCall(false);
  };

  const handleScheduleMeeting = () => {
    buttonPress();
    setShowScheduleModal(true);
  };

  const handleStartScreenShare = () => {
    buttonPress();
    setIsScreenSharing(true);
  };

  const handleStopScreenShare = () => {
    buttonPress();
    setIsScreenSharing(false);
  };

  // 화면 공유 중 화면
  if (isScreenSharing) {
    return (
      <ScreenShare
        partnerName={partnerName}
        onEndCall={handleEndCall}
        onStopShare={handleStopScreenShare}
      />
    );
  }

  // 통화 중 화면
  if (isInCall) {
    return (
      <InCallScreen
        participant={{ name: partnerName }}
        type="call"
        duration={0}
        onEndCall={handleEndCall}
        onStartScreenShare={handleStartScreenShare}
      />
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-[#4A90E2] text-white">
              {partnerName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-gray-900">{partnerName}</h2>
            <p className="text-sm text-gray-500">⭐ {partnerRating}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleScheduleMeeting}
            size="sm"
            variant="ghost"
            className="p-2 hover:bg-gray-100"
          >
            <Calendar className="w-4 h-4 text-gray-600" />
          </Button>
          <Button
            onClick={handleCallRequest}
            size="sm"
            variant="ghost"
            className="p-2 hover:bg-gray-100"
          >
            <Phone className="w-4 h-4 text-gray-600" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="p-2 hover:bg-gray-100"
          >
            <Video className="w-4 h-4 text-gray-600" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="p-2 hover:bg-gray-100"
          >
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => {
            if (message.type === 'call_request') {
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-xs lg:max-w-md bg-white border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">음성통화 요청</h4>
                        <p className="text-sm text-gray-600">
                          {message.sender === 'user' ? '음성통화를 요청했습니다' : '음성통화 요청을 받았습니다'}
                        </p>
                      </div>
                    </div>
                    
                    {message.sender !== 'user' && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 text-white flex-1"
                          onClick={handleAcceptCall}
                        >
                          수락
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-gray-600 border-gray-300 flex-1"
                          onClick={() => {
                            buttonPress();
                            // 거절 메시지 추가
                            const declineMessage: Message = {
                              id: messages.length + 1,
                              sender: 'user',
                              content: '통화를 거절했습니다.',
                              timestamp: new Date().toLocaleTimeString('ko-KR', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                              }),
                              type: 'text'
                            };
                            setMessages(prev => [...prev, declineMessage]);
                          }}
                        >
                          거절
                        </Button>
                      </div>
                    )}
                    
                    <p className="text-xs text-gray-500 mt-2">
                      {message.timestamp}
                    </p>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-[#4A90E2] text-white'
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요..."
            className="flex-1 rounded-full border-gray-200 focus:border-[#4A90E2] focus:ring-[#4A90E2]"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-[#4A90E2] hover:bg-[#3A7BC8] rounded-full p-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Call Request Modal */}
      {showCallRequest && (
        <CallRequest
          partnerName={partnerName}
          onAccept={handleAcceptCall}
          onDecline={() => setShowCallRequest(false)}
        />
      )}

      {/* Schedule Meeting Modal */}
      {showScheduleModal && (
        <ScheduleMeeting
          partnerName={partnerName}
          onClose={() => setShowScheduleModal(false)}
          onSchedule={(meetingData) => {
            console.log('일정 예약:', meetingData);
            setShowScheduleModal(false);
          }}
        />
      )}
    </div>
  );
}