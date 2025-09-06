import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, Send, Phone, Video, MoreVertical, Calendar, Plus } from 'lucide-react';
import { ScheduleMeeting } from './ScheduleMeeting';
import { MeetingCard } from './MeetingCard';
import { CallRequest, InCallScreen } from './CallRequest';
import { NotificationManager } from './NotificationManager';

interface MessageTabProps {
  userType: string;
}

const mockConversations = [
  {
    id: 1,
    name: '김도우미',
    role: 'helper',
    lastMessage: '네, 카카오뱅크 앱 설치 도와드리겠습니다!',
    timestamp: '2분 전',
    unread: 2,
    online: true,
    avatar: null,
    requestTitle: '카카오뱅크 앱 설치하고 계좌 개설'
  },
  {
    id: 2,
    name: '박고객',
    role: 'user',
    lastMessage: '토스 사용법을 알려주셔서 감사합니다.',
    timestamp: '1시간 전',
    unread: 0,
    online: false,
    avatar: null,
    requestTitle: '토스 송금 방법 알려주세요'
  },
  {
    id: 3,
    name: '이전문가',
    role: 'helper',
    lastMessage: '공과금 자동이체 설정이 완료되었습니다.',
    timestamp: '어제',
    unread: 0,
    online: true,
    avatar: null,
    requestTitle: '토스 공과금 자동이체 설정'
  }
];

const mockMessages = [
  {
    id: 1,
    sender: 'helper',
    content: '안녕하세요! 카카오뱅크 앱 설치 도움을 드리겠습니다.',
    timestamp: '오후 2:30',
    type: 'text'
  },
  {
    id: 2,
    sender: 'user',
    content: '네, 감사합니다. 어떻게 시작하면 될까요?',
    timestamp: '오후 2:32',
    type: 'text'
  },
  {
    id: 3,
    sender: 'helper',
    content: '먼저 앱스토어에서 "카카오뱅크"를 검색해주세요. 스크린샷을 보내드릴게요.',
    timestamp: '오후 2:33',
    type: 'text'
  },
  {
    id: 4,
    sender: 'helper',
    content: '화상통화로 실시간으로 도와드릴까요?',
    timestamp: '오후 2:35',
    type: 'text'
  },
  {
    id: 5,
    sender: 'user',
    content: '어머 정말 감사합니다!',
    timestamp: '오후 2:55',
    type: 'text'
  }
];

const mockMeetings = [
  {
    id: 'meeting-1',
    date: '2025-03-08',
    time: '16:00',
    title: '카카오뱅크 앱 설치 도움',
    note: '님이 거래 약속을 만들었어요.',
    type: 'call' as const,
    status: 'accepted' as const,
    creator: 'helper' as const,
    timestamp: '오후 2:56'
  }
];

export function MessageTab({ userType }: MessageTabProps) {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [meetings, setMeetings] = useState(mockMeetings);
  const [messages, setMessages] = useState(mockMessages);
  const [showCallRequest, setShowCallRequest] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const filteredConversations = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.requestTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    setShowCallRequest(true);
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

  // 약속 시간 체크 (데모용 - 실제로는 30분 전 알림)
  useEffect(() => {
    const checkMeetingTime = () => {
      const now = new Date();
      meetings.forEach(meeting => {
        if (meeting.status === 'accepted') {
          const meetingDateTime = new Date(`${meeting.date}T${meeting.time}`);
          const timeDiff = meetingDateTime.getTime() - now.getTime();
          
          // 데모용: 30초 후 전화 요청 (실제로는 약속 시간에)
          if (timeDiff <= 30000 && timeDiff > 25000) {
            setTimeout(() => {
              setShowCallRequest(true);
            }, 2000);
          }
        }
      });
    };

    const interval = setInterval(checkMeetingTime, 5000);
    return () => clearInterval(interval);
  }, [meetings]);

  if (selectedChat) {
    const currentChat = mockConversations.find(conv => conv.id === selectedChat);
    
    return (
      <div className="h-screen flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSelectedChat(null)}
              className="text-[#4A90E2]"
            >
              ←
            </button>
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-[#4A90E2] text-white">
                {currentChat?.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{currentChat?.name}</div>
              <div className="text-xs text-gray-500">{currentChat?.requestTitle}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" className="p-2">
              <Phone className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="p-2">
              <Video className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="p-2">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
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
          ))}
          
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
            <Button
              onClick={() => setShowScheduleModal(true)}
              size="sm"
              variant="outline"
              className="text-[#4A90E2] border-[#4A90E2]"
            >
              <Calendar className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleCallRequest}
              size="sm"
              variant="outline" 
              className="text-[#4A90E2] border-[#4A90E2]"
            >
              <Phone className="w-4 h-4" />
            </Button>
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
            caller={{ name: currentChat?.name || '사용자' }}
            type="call"
            onAccept={handleAcceptCall}
            onReject={() => setShowCallRequest(false)}
            isIncoming={true}
          />
        )}
        
        {inCall && (
          <InCallScreen
            participant={{ name: currentChat?.name || '사용자' }}
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

  return (
    <div className="p-4 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="대화방 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Conversations List */}
      <div className="space-y-2">
        {filteredConversations.map((conversation) => (
          <Card
            key={conversation.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedChat(conversation.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-[#4A90E2] text-white">
                      {conversation.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{conversation.name}</span>
                      {conversation.role === 'helper' && (
                        <Badge variant="secondary" className="text-xs">도우미</Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-1 truncate">
                    {conversation.requestTitle}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage}
                    </span>
                    {conversation.unread > 0 && (
                      <Badge className="bg-[#4A90E2] text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredConversations.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>메시지가 없습니다.</p>
          <p className="text-sm mt-1">새로운 요청을 생성하거나 도움을 제공해보세요.</p>
        </div>
      )}
    </div>
  );
}