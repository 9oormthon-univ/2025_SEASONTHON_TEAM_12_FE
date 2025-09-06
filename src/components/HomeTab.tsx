import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { HelperProfileCard } from './HelperProfileCard';
import { 
  Smartphone, 
  Shield, 
  CreditCard, 
  MoreHorizontal,
  Clock,
  Star,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

interface HomeTabProps {
  userType: string;
}

const mockRequests = [
  {
    id: 1,
    title: '카카오뱅크 앱 설치하고 계좌 개설해주세요',
    category: '설치/로그인',
    payment: '15,000원',
    urgent: true,
    tags: ['앱설치', '계좌개설', '본인인증']
  },
  {
    id: 2,
    title: '토스로 공과금 자동이체 설정 도와주세요',
    category: '공과금',
    payment: '20,000원',
    urgent: false,
    tags: ['자동이체', '공과금', '토스']
  },
  {
    id: 3,
    title: '네이버 인증서로 정부24 본인인증 해주세요',
    category: '본인인증',
    payment: '10,000원',
    urgent: true,
    tags: ['본인인증', '정부24', '네이버인증서']
  }
];

export function HomeTab({ userType }: HomeTabProps) {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = [
    { id: '전체', label: '전체', icon: MoreHorizontal },
    { id: '설치/로그인', label: '설치/로그인', icon: Smartphone },
    { id: '본인인증', label: '본인인증', icon: Shield },
    { id: '공과금', label: '공과금', icon: CreditCard },
    { id: '기타', label: '기타', icon: MoreHorizontal }
  ];

  const filteredRequests = selectedCategory === '전체' 
    ? mockRequests 
    : mockRequests.filter(req => req.category === selectedCategory);



  // 추천 도우미 데이터
  const recommendedHelpers = [
    {
      id: '1',
      name: '김전문가',
      title: '모바일 전문 도우미',
      description: '10년 경력의 IT 전문가입니다. 어떤 문제든 친절하게 해결해드려요!',
      rating: 4.9,
      totalReviews: 127,
      completedTasks: 89,
      completionRate: 99,
      specialties: ['앱 설치', '본인인증', '인터넷뱅킹', '공과금'],
      isVerified: true,
      isSuper: true,
      badges: ['신속대응', '친절'],
      recentWork: '카카오뱅크 계좌개설부터 체크카드 발급까지 한번에!',
      avatar: undefined
    },
    {
      id: '2',
      name: '이도우미',
      title: '시니어 친화 전문가',
      description: '어르신들을 위한 맞춤 서비스로 천천히 알려드려요.',
      rating: 4.8,
      totalReviews: 85,
      completedTasks: 156,
      completionRate: 97,
      specialties: ['기초사용법', '안전설정', '가족연락'],
      isVerified: true,
      isSuper: false,
      badges: ['시니어전문', '인내심'],
      recentWork: '처음 스마트폰 사용하시는 분들을 위한 기초 교육',
      avatar: undefined
    }
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-[#4A90E2] to-[#5BA0F2] rounded-xl p-4 text-white">
        <h2 className="text-lg mb-1">
          {userType === 'helper' ? '도움을 기다리는 분들이 있어요!' : '안녕하세요!'}
        </h2>
        <p className="text-sm opacity-90">
          {userType === 'helper' 
            ? '새로운 요청을 확인해보세요' 
            : '어떤 도움이 필요하신가요?'
          }
        </p>
      </div>

      {/* Quick Stats for Helper */}
      {userType === 'helper' && (
        <div className="grid grid-cols-3 gap-3">
          <Card className="text-center p-3">
            <CardContent className="p-0">
              <div className="text-lg font-semibold text-[#4A90E2]">12</div>
              <div className="text-xs text-gray-600">완료</div>
            </CardContent>
          </Card>
          <Card className="text-center p-3">
            <CardContent className="p-0">
              <div className="text-lg font-semibold text-[#4A90E2]">4.8</div>
              <div className="text-xs text-gray-600">평점</div>
            </CardContent>
          </Card>
          <Card className="text-center p-3">
            <CardContent className="p-0">
              <div className="text-lg font-semibold text-[#4A90E2]">2</div>
              <div className="text-xs text-gray-600">진행중</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="w-full h-auto p-1 bg-gray-100">
          <div className="flex overflow-x-auto gap-1 w-full">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center gap-1 whitespace-nowrap text-xs px-3 py-2"
                >
                  <Icon className="w-3 h-3" />
                  {category.label}
                </TabsTrigger>
              );
            })}
          </div>
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-4">
          {userType === 'user' && selectedCategory === '전체' && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-[#4A90E2]" />
                <h3 className="font-semibold text-gray-900">추천 도우미</h3>
              </div>
              <div className="space-y-3">
                {recommendedHelpers.map((helper) => (
                  <HelperProfileCard
                    key={helper.id}
                    profile={helper}
                    onContact={() => console.log('Contact', helper.name)}
                    onBookmark={() => console.log('Bookmark', helper.name)}
                  />
                ))}
              </div>
              
              <div className="border-t pt-4 mt-6">
                <h3 className="font-semibold text-gray-900 mb-3">최근 요청들</h3>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            {filteredRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      {request.urgent && (
                        <div className="mb-2">
                          <Badge variant="destructive" className="text-xs">급함</Badge>
                        </div>
                      )}
                      <h3 className="font-medium text-gray-900 mb-2 leading-5">
                        {request.title}
                      </h3>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {request.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-end text-sm text-gray-600">
                    <div className="font-semibold text-[#4A90E2]">
                      {request.payment}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredRequests.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>해당 카테고리에 요청이 없습니다.</p>
        </div>
      )}
    </div>
  );
}