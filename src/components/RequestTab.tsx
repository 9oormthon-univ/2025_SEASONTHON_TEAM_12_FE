import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Plus, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  MessageSquare,
  Video,
  Star,
  Send,
  Phone,
  Calendar,
  MoreVertical,
  Search,
  ArrowLeft
} from 'lucide-react';
import { ScheduleMeeting } from './ScheduleMeeting';
import { MeetingCard } from './MeetingCard';
import { CallRequest, InCallScreen } from './CallRequest';
import { NotificationManager } from './NotificationManager';
import { RequestDetail } from './RequestDetail';

interface RequestTabProps {
  userType: string;
}

const mockUserRequests = [
  {
    id: 1,
    title: '카카오뱅크 앱 설치하고 계좌 개설',
    status: 'progress',
    helper: '김도우미',
    helperRating: 4.9,
    createdAt: '2024-01-15',
    payment: '15,000원',
    lastMessage: '네, 카카오뱅크 앱 설치 도와드리겠습니다!',
    timestamp: '2분 전',
    unread: 2,
    online: true
  },
  {
    id: 2,
    title: '토스 공과금 자동이체 설정',
    status: 'completed',
    helper: '이전문가',
    helperRating: 5.0,
    createdAt: '2024-01-10',
    payment: '20,000원',
    lastMessage: '공과금 자동이체 설정이 완료되었습니다.',
    timestamp: '어제',
    unread: 0,
    online: true
  }
];

const mockHelperMatches = [
  {
    id: 1,
    title: '네이버 페이 설정 도움 요청',
    user: '박고객',
    status: 'waiting',
    difficulty: '초급',
    payment: '12,000원',
    timeEstimate: '25분',
    createdAt: '1시간 전'
  },
  {
    id: 2,
    title: '카카오뱅크 체크카드 발급',
    user: '최사용자',
    status: 'progress',
    difficulty: '중급',
    payment: '18,000원',
    timeEstimate: '40분',
    createdAt: '3시간 전',
    lastMessage: '토스 사용법을 알려주셔서 감사합니다.',
    timestamp: '1시간 전',
    unread: 0,
    online: false
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
    note: '님이 일정 약속을 만들었어요.',
    type: 'call' as const,
    status: 'accepted' as const,
    creator: 'helper' as const,
    timestamp: '오후 2:56'
  }
];

// 도우미 신청자 목록 데이터
const mockHelperApplications = {
  1: [ // 요청 ID 1에 대한 신청자들
    {
      id: 'helper-1',
      name: '김전문가',
      rating: 4.9,
      reviewCount: 127,
      specialties: ['모바일뱅킹', '앱 설치'],
      profileImage: undefined,
      completedTasks: 89,
      appliedAt: '30분 전'
    },
    {
      id: 'helper-2', 
      name: '박도우미',
      rating: 4.7,
      reviewCount: 84,
      specialties: ['카카오뱅킹', '앱 사용법'],
      profileImage: undefined,
      completedTasks: 156,
      appliedAt: '1시간 전'
    },
    {
      id: 'helper-3',
      name: '최베테랑',
      rating: 5.0,
      reviewCount: 203,
      specialties: ['모바일뱅킹', '계좌개설', '공인인증서'],
      profileImage: undefined,
      completedTasks: 301,
      appliedAt: '2시간 전'
    }
  ],
  2: [ // 요청 ID 2에 대한 신청자들
    {
      id: 'helper-4',
      name: '정마스터',
      rating: 4.8,
      reviewCount: 95,
      specialties: ['토스', '자동이체'],
      profileImage: undefined,
      completedTasks: 78,
      appliedAt: '45분 전'
    }
  ]
};

export function RequestTab({ userType }: RequestTabProps) {
  const [activeView, setActiveView] = useState('list'); // 'list', 'chat', or 'detail'
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [meetings, setMeetings] = useState(mockMeetings);
  const [showCallRequest, setShowCallRequest] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'waiting': return <Clock className="w-4 h-4 text-orange-500" />;
      case 'progress': return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'waiting': return '대기중';
      case 'progress': return '진행중';
      case 'completed': return '완료';
      default: return '알 수 없음';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'bg-orange-100 text-orange-800';
      case 'progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
    // 전화 연결 요청 메시지를 추가
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

  const handleChatClick = (requestId: number) => {
    setSelectedRequest(requestId);
    setActiveView('chat');
  };

  const handleRequestClick = (requestId: number) => {
    if (userType === 'user') {
      // 사용자는 요청 상세 페이지로 이동 (도우미 신청자 목록 보기)
      setSelectedRequest(requestId);
      setActiveView('detail');
    } else {
      // 도우미는 채팅으로 이동
      setSelectedRequest(requestId);
      setActiveView('chat');
    }
  };

  const handleSelectHelper = (helperId: string) => {
    // 도우미 선택 후 채팅으로 이동
    setActiveView('chat');
  };

  const handleContactHelper = (helperId: string) => {
    // 특정 도우미와 채팅 시작
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

  // 약속 시간 체크
  useEffect(() => {
    const checkMeetingTime = () => {
      const now = new Date();
      meetings.forEach(meeting => {
        if (meeting.status === 'accepted') {
          const meetingDateTime = new Date(`${meeting.date}T${meeting.time}`);
          const timeDiff = meetingDateTime.getTime() - now.getTime();
          
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

  // 요청 상세 화면 (도우미 신청자 목록)
  if (activeView === 'detail' && selectedRequest && userType === 'user') {
    const request = mockUserRequests.find(req => req.id === selectedRequest);
    const helpers = mockHelperApplications[selectedRequest as keyof typeof mockHelperApplications] || [];
    
    if (!request) return null;

    const requestDetail = {
      id: request.id.toString(),
      title: request.title,
      description: `${request.helper}님과 진행 중인 ${request.title} 요청입니다.`,
      category: 'banking',
      tags: ['모바일뱅킹', '앱설치'],
      location: '서울시 강남구',
      urgency: 'medium' as const,
      createdAt: request.createdAt,
      budget: parseInt(request.payment.replace(/[^0-9]/g, '')),
      status: 'pending' as const
    };

    return (
      <RequestDetail
        request={requestDetail}
        helpers={helpers}
        onBack={() => setActiveView('list')}
        onSelectHelper={handleSelectHelper}
        onContactHelper={handleContactHelper}
      />
    );
  }

  // 채팅 화면
  if (activeView === 'chat' && selectedRequest) {
    let currentRequest;
    if (userType === 'user') {
      currentRequest = mockUserRequests.find(req => req.id === selectedRequest);
    } else {
      const helperRequests = mockHelperMatches.map(match => ({
        ...match,
        helper: match.user
      }));
      currentRequest = helperRequests.find(req => req.id === selectedRequest);
    }
    
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
                {userType === 'user' 
                  ? (currentRequest as any)?.helper?.charAt(0)
                  : (currentRequest as any)?.user?.charAt(0)
                }
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">
                {userType === 'user' 
                  ? (currentRequest as any)?.helper
                  : (currentRequest as any)?.user
                }
              </div>
              <div className="text-xs text-gray-500">{currentRequest?.title}</div>
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
              name: userType === 'user' 
                ? (currentRequest as any)?.helper || '도우미'
                : (currentRequest as any)?.user || '사용자'
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
              name: userType === 'user' 
                ? (currentRequest as any)?.helper || '도우미'
                : (currentRequest as any)?.user || '사용자'
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

  // 도우미도 사용자와 동일한 UI 사용
  let requestsToShow;
  if (userType === 'user') {
    requestsToShow = mockUserRequests;
  } else {
    // 도우미용 데이터를 사용자 형식으로 변환
    requestsToShow = mockHelperMatches.map(match => ({
      id: match.id,
      title: match.title,
      status: match.status,
      helper: match.user, // 고객 이름을 helper 필드에 매핑
      helperRating: 4.8, // 기본값
      createdAt: match.createdAt,
      payment: match.payment,
      lastMessage: match.lastMessage || '새로운 매칭 요청입니다.',
      timestamp: '방금 전',
      unread: match.status === 'waiting' ? 1 : 0,
      online: true
    }));
  }

  const filteredRequests = requestsToShow.filter(req =>
    req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.helper.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#4A90E2] to-[#5DADE2] px-6 py-6 text-white">
        <h1 className="text-xl font-semibold">
          {userType === 'user' ? '나의 요청' : '매칭'}
        </h1>
        <p className="text-blue-100 text-sm mt-1">
          {userType === 'user' ? '도우미와의 대화를 확인하세요' : '고객과의 대화를 확인하세요'}
        </p>
      </div>

      <div className="p-6 space-y-6">

        {/* Search */}
        {filteredRequests.length > 0 && (
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder={userType === 'user' ? '요청 검색...' : '매칭 검색...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-3 text-base rounded-xl border-gray-200"
            />
          </div>
        )}

        {/* Request List */}
        {filteredRequests.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {userType === 'user' ? '최근 요청' : '최근 매칭'}
            </h3>
            {filteredRequests.map((request) => (
              <Card 
                key={request.id} 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-0 shadow-sm rounded-xl relative overflow-hidden"
                onClick={() => handleRequestClick(request.id)}
              >
                <div className="absolute top-4 right-4">
                  <Badge className={`${getStatusColor(request.status)} text-sm py-1 px-3`}>
                    {getStatusIcon(request.status)}
                    <span className="ml-2">{getStatusText(request.status)}</span>
                  </Badge>
                </div>
                
                <CardContent className="p-5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-gradient-to-br from-[#4A90E2] to-[#5DADE2] text-white text-lg font-semibold">
                          {request.helper.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {request.online && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-3 border-white rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0 pr-20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-lg text-gray-800">{request.helper}</span>
                          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium text-yellow-700">{request.helperRating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-base font-medium text-gray-700 mb-2">
                        {request.title}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 truncate max-w-[200px]">
                          {request.lastMessage}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">{request.timestamp}</span>
                          {request.unread > 0 && (
                            <Badge className="bg-red-500 hover:bg-red-500 text-white text-sm min-w-[24px] h-6 flex items-center justify-center rounded-full">
                              {request.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredRequests.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {userType === 'user' ? '아직 요청이 없어요' : '아직 매칭이 없어요'}
            </h3>
            <p className="text-gray-600 mb-6">
              {userType === 'user' ? '어떤 도움이 필요하신지 알려주세요!' : '새로운 매칭 요청을 기다려주세요!'}
            </p>
            {userType === 'user' && (
              <Button className="bg-[#4A90E2] hover:bg-[#3A7BC8] text-white px-8 py-3 rounded-xl">
                <Plus className="w-5 h-5 mr-2" />
                첫 번째 요청 만들기
              </Button>
            )}
          </div>
        )}

        {/* Help Section */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h3 className="font-semibold text-blue-800 mb-2">
            {userType === 'user' ? '💡 도움이 필요하시나요?' : '💡 도우미 팁'}
          </h3>
          <p className="text-blue-700 text-sm leading-relaxed mb-4">
            {userType === 'user' 
              ? '도우미와 대화할 때는 구체적으로 무엇을 도와달라고 말씀해주세요. 화면을 보여주거나 단계별로 설명해드릴 수 있어요.'
              : '고객과 대화할 때는 친절하고 이해하기 쉽게 설명해주세요. 화면 공유나 단계별 가이드로 더 효과적으로 도움을 줄 수 있어요.'
            }
          </p>
          <Button variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-50">
            {userType === 'user' ? '사용법 알아보기' : '도우미 가이드 보기'}
          </Button>
        </div>
      </div>
    </div>
  );
}