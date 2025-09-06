import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Smartphone, 
  Shield, 
  CreditCard, 
  MoreHorizontal,
  Clock,
  Star,
  ChevronRight,
  Phone,
  Home,
  Monitor
} from 'lucide-react';

const mockRequests = [
  {
    id: 1,
    title: '카카오뱅크 앱 설치하고 계좌 개설해주세요',
    category: '설치/로그인',
    urgent: true,
    platform: '카카오뱅크',
    tags: ['앱설치', '계좌개설', '본인인증']
  },
  {
    id: 2,
    title: '토스로 공과금 자동이체 설정 도와주세요',
    category: '공과금',
    urgent: false,
    platform: '토스',
    tags: ['자동이체', '공과금']
  },
  {
    id: 3,
    title: '정부24에서 본인인증 도와주세요',
    category: '본인인증',
    urgent: true,
    platform: '정부24',
    tags: ['본인인증', '공인인증서']
  },
  {
    id: 4,
    title: '건강보험공단 앱에서 건강검진 예약해주세요',
    category: '본인인증',
    urgent: false,
    platform: '건강보험공단',
    tags: ['건강검진', '예약', '공공기관']
  },
  {
    id: 5,
    title: '국민은행 모바일뱅킹 처음 설정해주세요',
    category: '설치/로그인',
    urgent: false,
    platform: '국민은행',
    tags: ['모바일뱅킹', '초기설정', '은행']
  }
];

export function HelperHomeTab() {
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



  return (
    <div className="p-4 space-y-4">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-[#4A90E2] to-[#5BA0F2] rounded-xl p-4 text-white">
        <h2 className="text-lg mb-1">
          도움을 기다리는 분들이 있어요!
        </h2>
        <p className="text-sm opacity-90">
          새로운 요청을 확인해보세요
        </p>
      </div>

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
          <div className="space-y-3">
            {filteredRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {request.urgent && (
                          <Badge variant="destructive" className="text-xs">급함</Badge>
                        )}
                        {(() => {
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
                          
                          return (
                            <Badge 
                              className={`text-xs ${getPlatformStyle(request.platform)}`}
                            >
                              {request.platform}
                            </Badge>
                          );
                        })()}
                      </div>
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