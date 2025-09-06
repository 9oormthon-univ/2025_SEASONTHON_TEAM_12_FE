import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
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
  Search,
  Star,
  ChevronRight
} from 'lucide-react';

interface MyRequestsTabProps {
  userType: string;
}

// 내가 작성한 요청들 (취약 계층용)
const mockMyRequests = [
  {
    id: 1,
    title: '카카오뱅크 앱 설치하고 계좌 개설해주세요',
    description: '카카오뱅크 앱을 다운로드받고 계좌개설까지 도와주세요',
    status: 'progress', // waiting, progress, completed
    applications: 3,
    selectedHelper: '김전문가',
    helperRating: 4.9,
    createdAt: '2024-01-15',
    platforms: ['카카오뱅크'],
    tags: ['앱설치', '계좌개설', '본인인증']
  },
  {
    id: 2,
    title: '토스로 공과금 자동이체 설정해주세요',
    description: '매달 전기세, 가스비 자동으로 나가도록 설정해주세요',
    status: 'completed',
    applications: 5,
    selectedHelper: '이도우미',
    helperRating: 5.0,
    createdAt: '2024-01-10',
    platforms: ['토스'],
    tags: ['자동이체', '공과금']
  },
  {
    id: 3,
    title: '건강보험공단 앱에서 건강검진 예약',
    description: '국민건강보험 앱에서 건강검진 예약하는 방법 알려주세요',
    status: 'waiting',
    applications: 1,
    selectedHelper: null,
    helperRating: null,
    createdAt: '2024-01-20',
    platforms: ['건강보험공단'],
    tags: ['건강검진', '예약']
  }
];

// 나에게 온 요청들 (도우미용)
const mockIncomingRequests = [
  {
    id: 1,
    title: '네이버 페이 설정 도움 요청',
    description: '네이버 페이 처음 설정하는 방법 알려주세요',
    user: '박고객',
    userAge: '60대',
    status: 'waiting',
    createdAt: '1시간 전',
    platforms: ['네이버'],
    tags: ['네이버페이', '설정'],
    urgent: false
  },
  {
    id: 2,
    title: '카카오뱅크 체크카드 발급받기',
    description: '카카오뱅크 체크카드 신청하고 받는 방법 도와주세요',
    user: '최사용자',
    userAge: '50대',
    status: 'progress',
    createdAt: '3시간 전',
    platforms: ['카카오뱅크'],
    tags: ['체크카드', '신청'],
    urgent: true
  },
  {
    id: 3,
    title: '정부24에서 주민등록등본 발급',
    description: '정부24 사이트에서 주민등록등본 인터넷으로 발급받는 방법',
    user: '김시민',
    userAge: '70대',
    status: 'completed',
    createdAt: '어제',
    platforms: ['정부24'],
    tags: ['주민등록등본', '인터넷발급'],
    urgent: false
  }
];

export function MyRequestsTab({ userType }: MyRequestsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');

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
      case 'waiting': return userType === 'user' ? '도우미 대기중' : '응답 대기중';
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

  const getPlatformStyle = (platform: string) => {
    switch (platform) {
      case '정부24':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case '건강보험공단':
        return 'bg-green-100 text-green-700 hover:bg-green-100';
      case '카카오뱅크':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case '토스':
        return 'bg-indigo-100 text-indigo-700 hover:bg-indigo-100';
      case '네이버':
        return 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100';
      case '국민은행':
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
      default:
        return 'bg-gray-100 text-gray-600 hover:bg-gray-100';
    }
  };

  const requestsToShow = userType === 'user' ? mockMyRequests : mockIncomingRequests;

  const filteredRequests = requestsToShow.filter(req =>
    req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#4A90E2] to-[#5DADE2] px-6 py-6 text-white">
        <h1 className="text-xl font-semibold">
          {userType === 'user' ? '내 요청' : '받은 요청'}
        </h1>
        <p className="text-blue-100 text-sm mt-1">
          {userType === 'user' ? '내가 작성한 도움 요청들을 확인하세요' : '고객들이 요청한 도움을 확인하세요'}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Search */}
        {filteredRequests.length > 0 && (
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder={userType === 'user' ? '내 요청 검색...' : '받은 요청 검색...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-3 text-base rounded-xl border-gray-200"
            />
          </div>
        )}

        {/* Request List */}
        {filteredRequests.length > 0 ? (
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow cursor-pointer rounded-xl border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {request.urgent && (
                          <Badge variant="destructive" className="text-xs">급함</Badge>
                        )}
                        <Badge className={`${getStatusColor(request.status)} text-xs`}>
                          {getStatusIcon(request.status)}
                          <span className="ml-1">{getStatusText(request.status)}</span>
                        </Badge>
                        {request.platforms.map((platform, index) => (
                          <Badge 
                            key={index}
                            className={`text-xs ${getPlatformStyle(platform)}`}
                          >
                            {platform}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {request.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {request.description}
                      </p>

                      {/* User-specific info */}
                      {userType === 'user' ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">신청자 {request.applications}명</span>
                            {request.selectedHelper && (
                              <>
                                <span className="text-gray-300">•</span>
                                <div className="flex items-center gap-1">
                                  <Avatar className="w-5 h-5">
                                    <AvatarFallback className="bg-[#4A90E2] text-white text-xs">
                                      {request.selectedHelper.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm text-gray-700">{request.selectedHelper}</span>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs text-yellow-600">{request.helperRating}</span>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{request.createdAt}</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                                {(request as any).user.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-700">{(request as any).user}</span>
                            <span className="text-xs text-gray-500">({(request as any).userAge})</span>
                          </div>
                          <span className="text-sm text-gray-500">{request.createdAt}</span>
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {request.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
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
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {userType === 'user' ? '아직 요청이 없어요' : '받은 요청이 없어요'}
            </h3>
            <p className="text-gray-600 mb-6">
              {userType === 'user' 
                ? '어떤 도움이 필요하신지 알려주세요!' 
                : '새로운 도움 요청을 기다려주세요!'
              }
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
            {userType === 'user' ? '💡 요청 관리 팁' : '💡 도우미 팁'}
          </h3>
          <p className="text-blue-700 text-sm leading-relaxed mb-4">
            {userType === 'user' 
              ? '요청 상태를 확인하고 도우미와 원활히 소통해보세요. 구체적인 설명일수록 더 좋은 도움을 받을 수 있어요.'
              : '고객의 요청을 자세히 읽고 친절하게 응답해주세요. 명확한 가이드로 더 효과적으로 도움을 줄 수 있어요.'
            }
          </p>
          <Button variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-50">
            {userType === 'user' ? '요청 작성 가이드' : '도우미 가이드 보기'}
          </Button>
        </div>
      </div>
    </div>
  );
}