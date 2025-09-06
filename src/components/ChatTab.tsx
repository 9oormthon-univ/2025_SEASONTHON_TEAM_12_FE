import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  MessageSquare,
  Search,
  Star,
  ArrowLeft,
  Send,
  Phone,
  Calendar,
  MoreVertical
} from 'lucide-react';
import { ScheduleMeeting } from './ScheduleMeeting';
import { MeetingCard } from './MeetingCard';
import { CallRequest, InCallScreen } from './CallRequest';
import { NotificationManager } from './NotificationManager';

interface ChatTabProps {
  userType: string;
}

const getMockChats = (userType: string) => [
  {
    id: 1,
    title: '정부 24 사실 조사 좀 도와주세요',
    partner: userType === 'user' ? '김전문가' : '박고객',
    partnerRating: 4.9,
    lastMessage: '안녕하세요! 정부24 비대면 사실조사 도와드리겠습니다',
    timestamp: '2분 전',
    unread: 2,
    online: true,
    status: 'progress'
  }
];

const mockMessages = [
  {
    id: 1,
    sender: 'helper',
    content: '안녕하세요! 정부24 비대면 사실조사 도와드리겠습니다',
    timestamp: '오후 2:30',
    type: 'text'
  },
  {
    id: 2,
    sender: 'user',
    content: '네, 혹시 지금 바로 통화 가능할까요?',
    timestamp: '오후 2:32',
    type: 'text'
  },
  {
    id: 3,
    sender: 'helper',
    content: '알겠습니다.',
    timestamp: '오후 2:33',
    type: 'text'
  }
];

const mockMeetings = [
  {
    id: 'meeting-1',
    date: '2025-03-08',
    time: '16:00',
    title: '카카오뱅크 앱 설치 도움',
    note: '님이 일정 약속을 만들었어요.',
    type: 'call' as const,
    status: 'accepted' as const,
    creator: 'helper' as const,
    timestamp: '오후 2:56'
  }
];

export function ChatTab({ userType }: ChatTabProps) {
  const [activeView, setActiveView] = useState('list'); // 'list' or 'chat'
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [meetings, setMeetings] = useState(mockMeetings);
  const [showCallRequest, setShowCallRequest] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: userType === 'helper' ? 'helper' as const : 'user' as const,
        content: newMessage,
        timestamp: new Date().toLocaleTimeString('ko-KR', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
        type: 'text' as const
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const handleScheduleMeeting = (meetingData: any) => {
    const newMeeting = {
      id: `meeting-${meetings.length + 1}`,
      ...meetingData,
      status: 'pending' as const,
      creator: userType === 'helper' ? 'helper' as const : 'user' as const,
      timestamp: new Date().toLocaleTimeString('ko-KR', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    };
    setMeetings([...meetings, newMeeting]);
    setShowScheduleModal(false);
  };

  const handleAcceptMeeting = (meetingId: string) => {
    setMeetings(meetings.map(meeting => 
      meeting.id === meetingId 
        ? { ...meeting, status: 'accepted' as const }
        : meeting
    ));
  };

  const handleRejectMeeting = (meetingId: string) => {
    setMeetings(meetings.map(meeting => 
      meeting.id === meetingId 
        ? { ...meeting, status: 'rejected' as const }
        : meeting
    ));
  };

  const handleCallRequest = () => {
    const callRequestMessage = {
      id: messages.length + 1,
      sender: userType === 'helper' ? 'helper' as const : 'user' as const,
      content: '',
      timestamp: new Date().toLocaleTimeString('ko-KR', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      type: 'call_request' as const
    };
    setMessages([...messages, callRequestMessage]);
    
    // 3초 후 자동으로 통화 요청이 상대방에게 도착하도록 시뮬레이션
    setTimeout(() => {
      const incomingCallMessage = {
        id: messages.length + 2,
        sender: userType === 'helper' ? 'user' as const : 'helper' as const,
        content: '',
        timestamp: new Date().toLocaleTimeString('ko-KR', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
        type: 'call_request' as const
      };
      setMessages(prev => [...prev, incomingCallMessage]);
      setShowCallRequest(true);
    }, 3000);
  };

  const handleAcceptCall = () => {
    setShowCallRequest(false);
    setInCall(true);
    setCallDuration(0);
  };

  const handleEndCall = () => {
    setInCall(false);
    setCallDuration(0);
  };

  const handleChatClick = (chatId: number) => {
    setSelectedChat(chatId);
    setActiveView('chat');
  };

  // 통화 시간 카운터
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (inCall) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [inCall]);

  const chatsToShow = getMockChats(userType);

  const filteredChats = chatsToShow.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.partner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 채팅 상세 화면
  if (activeView === 'chat' && selectedChat) {
    const currentChat = chatsToShow.find(chat => chat.id === selectedChat);
    
    return (
      <div className="h-screen flex flex-col bg-white">
        {/* Chat Header */}
        <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveView('list')}
              className="text-[#4A90E2]"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-[#4A90E2] text-white">
                {currentChat?.partner?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{currentChat?.partner}</div>
              <div className="text-xs text-gray-500">{currentChat?.title}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowScheduleModal(true)}
              size="sm"
              variant="ghost"
              className="p-2"
            >
              <Calendar className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleCallRequest}
              size="sm"
              variant="ghost"
              className="p-2"
            >
              <Phone className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="p-2">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => {
            if (message.type === 'call_request') {
              return (
                <div
                  key={message.id}
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
                          onClick={() => setShowCallRequest(false)}
                        >
                          거절
                        </Button>
                      </div>
                    )}
                    
                    <p className="text-xs text-gray-500 mt-2">
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              );
            }
            
            return (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-[#4A90E2] text-white'
                    : 'bg-white border'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            );
          })}
          
          {/* Meeting Cards */}
          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
              currentUser={userType === 'helper' ? 'helper' : 'user'}
              onAccept={handleAcceptMeeting}
              onReject={handleRejectMeeting}
            />
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t p-4">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="메시지를 입력하세요..."
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button 
              onClick={handleSendMessage}
              className="bg-[#4A90E2] hover:bg-[#3A7BC8]"
              disabled={!newMessage.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Modals */}
        {showScheduleModal && (
          <ScheduleMeeting
            onSchedule={handleScheduleMeeting}
            onCancel={() => setShowScheduleModal(false)}
          />
        )}
        
        {showCallRequest && (
          <CallRequest
            caller={{ 
              name: currentChat?.partner || '상대방'
            }}
            type="call"
            onAccept={handleAcceptCall}
            onReject={() => setShowCallRequest(false)}
            isIncoming={true}
          />
        )}
        
        {inCall && (
          <InCallScreen
            participant={{ 
              name: currentChat?.partner || '상대방'
            }}
            type="call"
            onEndCall={handleEndCall}
            duration={callDuration}
          />
        )}
        
        <NotificationManager
          meetings={meetings}
          onCallRequest={() => setShowCallRequest(true)}
        />
      </div>
    );
  }

  // 채팅 목록 화면
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#4A90E2] to-[#5DADE2] px-6 py-6 text-white">
        <h1 className="text-xl font-semibold">채팅</h1>
        <p className="text-blue-100 text-sm mt-1">
          {userType === 'user' ? '도우미와의 대화를 확인하세요' : '고객과의 대화를 확인하세요'}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Search */}
        {filteredChats.length > 0 && (
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="채팅 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-3 text-base rounded-xl border-gray-200"
            />
          </div>
        )}

        {/* Chat List */}
        {filteredChats.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">진행 중인 채팅</h3>
            {filteredChats.map((chat) => (
              <Card 
                key={chat.id} 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-0 shadow-sm rounded-xl"
                onClick={() => handleChatClick(chat.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-br from-[#4A90E2] to-[#5DADE2] text-white font-semibold">
                          {chat.partner.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800">{chat.partner}</span>
                          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium text-yellow-700">{chat.partnerRating}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">{chat.timestamp}</span>
                          {chat.unread > 0 && (
                            <Badge className="bg-red-500 hover:bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                              {chat.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-sm font-medium text-gray-700 mb-2">
                        {chat.title}
                      </div>
                      
                      <span className="text-sm text-gray-600 truncate block">
                        {chat.lastMessage}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">아직 채팅이 없어요</h3>
            <p className="text-gray-600">
              {userType === 'user' ? '도우미와 대화를 시작해보세요!' : '고객과의 새로운 대화를 기다려주세요!'}
            </p>
          </div>
        )}

        {/* Help Section */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h3 className="font-semibold text-blue-800 mb-2">💬 채팅 팁</h3>
          <p className="text-blue-700 text-sm leading-relaxed">
            {userType === 'user' 
              ? '도우미와 대화할 때는 구체적으로 무엇을 도와달라고 말씀해주세요. 화면을 보여주거나 단계별로 설명해드릴 수 있어요.'
              : '고객과 대화할 때는 친절하고 이해하기 쉽게 설명해주세요. 화면 공유나 단계별 가이드로 더 효과적으로 도움을 줄 수 있어요.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}