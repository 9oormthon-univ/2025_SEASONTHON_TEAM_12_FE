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
  ChevronRight,
  XCircle,
  Timer,
  Trophy,
  ArrowLeft,
  User,
  Calendar,
  MapPin
} from 'lucide-react';

interface MyRequestsTabProps {
  userType: string;
  onNavigateToChat?: (chatId: number, partnerName: string, partnerRating: number) => void;
}

// 내가 작성한 요청들 (취약 계층용)
const mockMyRequests = [
  {
    id: 1,
    title: '정부 24 사실 조사 좀 도와주세요',
    description: '',
    status: 'progress', // waiting, progress, completed
    applications: 3,
    selectedHelper: '김전문가',
    helperRating: 4.9,
    createdAt: '2024-01-15',
    platform: '정부24',
    tags: ['정부24', '사실조사', '비대면', '신청'],
    applicants: [
      {
        id: 1,
        name: '김전문가',
        rating: 4.9,
        completedTasks: 127,
        responseTime: '평균 5분',
        specialties: ['카카오뱅크', '앱설치', '계좌개설'],
        introduction: '카카오뱅크 전문 도우미입니다. 100번 이상의 계좌개설을 도와드렸어요.',
        isSelected: true,
        appliedAt: '2시간 전'
      },
      {
        id: 2,
        name: '박도우미',
        rating: 4.7,
        completedTasks: 89,
        responseTime: '평균 3분',
        specialties: ['모바일뱅킹', '본인인증'],
        introduction: '친절하고 차근차근 설명해드려요. 어르신들께 특히 인기가 많습니다.',
        isSelected: false,
        appliedAt: '1시간 전'
      },
      {
        id: 3,
        name: '최전문',
        rating: 4.8,
        completedTasks: 156,
        responseTime: '평균 7분',
        specialties: ['카카오뱅크', '토스', '국민은행'],
        introduction: '모든 은행 앱에 능통합니다. 복잡한 절차도 쉽게 설명해드려요.',
        isSelected: false,
        appliedAt: '30분 전'
      }
    ]
  }
];

// 내가 지원한 요청들 (도우미용)
const mockMyApplications = [
  {
    id: 1,
    title: '네이버 페이 설정 도움 요청',
    description: '네이버 페이를 처음 사용해보려고 하는데 어떻게 설정하는지 모르겠어요. 카드 등록하는 방법과 결제할 때 어떻게 사용하는지 차근차근 알려주세요. 온라인 쇼핑할 때 편하게 사용하고 싶어서요.',
    user: '박고객',
    userAge: '60대',
    applicationStatus: 'pending', // pending(대기중), selected(선택됨), rejected(거절됨)
    appliedAt: '1시간 전',
    platform: '네이버',
    tags: ['네이버페이', '설정', '카드등록', '온라인결제'],
    urgent: false,
    totalApplicants: 3,
    myRank: 2
  }
];

export function MyRequestsTab({ userType, onNavigateToChat }: MyRequestsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const getStatusIcon = (status: string, applicationStatus?: string) => {
    if (userType === 'helper' && applicationStatus) {
      switch (applicationStatus) {
        case 'pending': return <Timer className="w-4 h-4 text-orange-500" />;
        case 'selected': return <CheckCircle className="w-4 h-4 text-green-500" />;
        case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
        default: return <Clock className="w-4 h-4 text-gray-500" />;
      }
    }
    
    switch (status) {
      case 'waiting': return <Clock className="w-4 h-4 text-orange-500" />;
      case 'progress': return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string, applicationStatus?: string) => {
    if (userType === 'helper' && applicationStatus) {
      switch (applicationStatus) {
        case 'pending': return '대기중';
        case 'selected': return '선택됨';
        case 'rejected': return '거절됨';
        default: return '알 수 없음';
      }
    }
    
    switch (status) {
      case 'waiting': return userType === 'user' ? '도우미 대기중' : '응답 대기중';
      case 'progress': return '진행중';
      case 'completed': return '완료';
      default: return '알 수 없음';
    }
  };

  const getStatusColor = (status: string, applicationStatus?: string) => {
    if (userType === 'helper' && applicationStatus) {
      switch (applicationStatus) {
        case 'pending': return 'bg-orange-100 text-orange-800';
        case 'selected': return 'bg-green-100 text-green-800';
        case 'rejected': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }
    
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

  const requestsToShow = userType === 'user' ? mockMyRequests : mockMyApplications;

  const filteredRequests = requestsToShow.filter(req =>
    req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedRequest) {
    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#4A90E2] to-[#5DADE2] px-6 py-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedRequest(null)}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold">요청 상세</h1>
          </div>
        </div>

        <div className="p-6">
          <Card className="mb-6">
            <CardContent className="p-6">
              {/* 상태 뱃지 */}
              <div className="flex gap-2 mb-4">
                {selectedRequest.urgent && (
                  <Badge variant="destructive" className="text-xs">급함</Badge>
                )}
                <Badge className={`text-xs ${getPlatformStyle(selectedRequest.platform)}`}>
                  {selectedRequest.platform}
                </Badge>
                <Badge className={`${getStatusColor(selectedRequest.status, selectedRequest.applicationStatus)} text-xs`}>
                  {getStatusIcon(selectedRequest.status, selectedRequest.applicationStatus)}
                  <span className="ml-1">{getStatusText(selectedRequest.status, selectedRequest.applicationStatus)}</span>
                </Badge>
              </div>

              {/* 제목과 설명 */}
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                {selectedRequest.title}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {selectedRequest.description}
              </p>

              {/* 도우미용 추가 정보 */}
              {userType === 'helper' && (
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">요청자 정보</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-blue-700">
                      <Trophy className="w-4 h-4" />
                      <span>{selectedRequest.myRank}/{selectedRequest.totalApplicants}번째 지원</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-800">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-blue-200 text-blue-700 text-xs">
                        {selectedRequest.user?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span>{selectedRequest.user}</span>
                    <span className="text-blue-600">({selectedRequest.userAge})</span>
                  </div>
                </div>
              )}

              {/* 사용자용 지원자 리스트 */}
              {userType === 'user' && selectedRequest.applicants && (
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">
                      지원한 도우미 ({selectedRequest.applicants.length}명)
                    </span>
                  </div>
                  
                  {selectedRequest.applicants.map((applicant: any) => (
                    <Card 
                      key={applicant.id} 
                      className={`cursor-pointer transition-all ${
                        applicant.isSelected 
                          ? 'ring-2 ring-blue-500 bg-blue-50' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => {
                        // 도우미 선택 로직
                        const updatedRequest = {
                          ...selectedRequest,
                          applicants: selectedRequest.applicants.map((app: any) => ({
                            ...app,
                            isSelected: app.id === applicant.id
                          })),
                          selectedHelper: applicant.name,
                          helperRating: applicant.rating
                        };
                        setSelectedRequest(updatedRequest);
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className={`${
                                applicant.isSelected 
                                  ? 'bg-blue-200 text-blue-700' 
                                  : 'bg-gray-200 text-gray-700'
                              } text-sm`}>
                                {applicant.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-gray-900">{applicant.name}</h4>
                                {applicant.isSelected && (
                                  <Badge className="bg-blue-100 text-blue-800 text-xs">선택됨</Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm text-gray-700">{applicant.rating}</span>
                                <span className="text-gray-300">•</span>
                                <span className="text-sm text-gray-600">{applicant.completedTasks}건 완료</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-500 mb-1">{applicant.appliedAt}</div>
                            <div className="text-xs text-green-600">{applicant.responseTime}</div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-3">{applicant.introduction}</p>
                        
                        <div className="flex flex-wrap gap-1">
                          {applicant.specialties.map((specialty: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* 요청 정보 */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>요청일: {selectedRequest.createdAt || selectedRequest.appliedAt}</span>
                </div>
                {userType === 'user' && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MessageSquare className="w-4 h-4" />
                    <span>지원자 수: {selectedRequest.applications}명</span>
                  </div>
                )}
              </div>

              {/* 태그 */}
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedRequest.tags?.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 액션 버튼들 */}
          <div className="flex gap-3">
            {userType === 'helper' && selectedRequest.applicationStatus === 'selected' && (
              <Button className="flex-1 bg-[#4A90E2] hover:bg-[#3A7BC8]">
                <MessageSquare className="w-4 h-4 mr-2" />
                채팅하기
              </Button>
            )}
            {userType === 'user' && selectedRequest.applicants && selectedRequest.applicants.some((app: any) => app.isSelected) && (
              <Button 
                className="flex-1 bg-[#4A90E2] hover:bg-[#3A7BC8]"
                onClick={() => {
                  if (onNavigateToChat) {
                    onNavigateToChat(selectedRequest.id, selectedRequest.selectedHelper, selectedRequest.helperRating);
                  }
                }}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                선택한 도우미와 채팅
              </Button>
            )}
            {userType === 'user' && selectedRequest.status === 'waiting' && (!selectedRequest.applicants || !selectedRequest.applicants.some((app: any) => app.isSelected)) && (
              <Button variant="outline" className="flex-1" disabled>
                도우미를 선택해주세요
              </Button>
            )}
            {userType === 'helper' && selectedRequest.applicationStatus === 'rejected' && (
              <Button variant="outline" className="flex-1">
                다시 지원하기
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#4A90E2] to-[#5DADE2] px-6 py-6 text-white">
        <h1 className="text-xl font-semibold">
          {userType === 'user' ? '내 요청' : '지원한 요청'}
        </h1>
        <p className="text-blue-100 text-sm mt-1">
          {userType === 'user' ? '내가 작성한 도움 요청들을 확인하세요' : '내가 지원한 요청들의 결과를 확인하세요'}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Search */}
        {filteredRequests.length > 0 && (
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder={userType === 'user' ? '내 요청 검색...' : '지원한 요청 검색...'}
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
              <Card 
                key={request.id} 
                className="hover:shadow-md transition-shadow cursor-pointer rounded-xl border-0 shadow-sm"
                onClick={() => setSelectedRequest(request)}
              >
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {request.urgent && (
                          <Badge variant="destructive" className="text-xs">급함</Badge>
                        )}
                        <Badge className={`${getStatusColor(request.status, (request as any).applicationStatus)} text-xs`}>
                          {getStatusIcon(request.status, (request as any).applicationStatus)}
                          <span className="ml-1">{getStatusText(request.status, (request as any).applicationStatus)}</span>
                        </Badge>
                        <Badge 
                          className={`text-xs ${getPlatformStyle(request.platform)}`}
                        >
                          {request.platform}
                        </Badge>
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
                            <span className="text-gray-300">•</span>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Trophy className="w-3 h-3" />
                              <span>{(request as any).myRank}/{(request as any).totalApplicants}번째</span>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{(request as any).appliedAt}</span>
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
              {userType === 'user' ? '아직 요청이 없어요' : '지원한 요청이 없어요'}
            </h3>
            <p className="text-gray-600 mb-6">
              {userType === 'user' 
                ? '어떤 도움이 필요하신지 알려주세요!' 
                : '홈에서 도움 요청을 찾아 지원해보세요!'
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
            {userType === 'user' ? '💡 요청 관리 팁' : '💡 지원 결과 안내'}
          </h3>
          <p className="text-blue-700 text-sm leading-relaxed mb-4">
            {userType === 'user' 
              ? '요청 상태를 확인하고 도우미와 원활히 소통해보세요. 구체적인 설명일수록 더 좋은 도움을 받을 수 있어요.'
              : '선택된 요청은 채팅탭에서 고객과 대화할 수 있습니다. 대기중인 요청은 고객의 선택을 기다려주세요.'
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