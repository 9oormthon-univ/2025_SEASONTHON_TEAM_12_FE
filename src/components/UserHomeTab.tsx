import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CreateRequest } from './CreateRequest';
import { 
  Smartphone, 
  CreditCard, 
  FileCheck, 
  Calculator,
  MessageCircle,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle,
  Star,
  Users
} from 'lucide-react';

const categories = [
  {
    id: 'install-login',
    title: '앱 설치/로그인',
    icon: Smartphone,
    color: 'bg-blue-50 text-blue-600 border-blue-200',
    description: '앱 다운로드부터 계정 생성까지',
    popular: true,
    examples: ['카카오뱅크 계좌 개설', '토스 앱 설치하기', '네이버페이 가입']
  },
  {
    id: 'identity-verification',
    title: '본인인증',
    icon: FileCheck,
    color: 'bg-green-50 text-green-600 border-green-200',
    description: '안전한 본인확인 도움',
    examples: ['휴대폰 본인인증', '공동인증서 발급', '간편인증 설정']
  },
  {
    id: 'payment',
    title: '결제/송금',
    icon: CreditCard,
    color: 'bg-purple-50 text-purple-600 border-purple-200',
    description: '안전한 금융 거래 지원',
    examples: ['카드 등록하기', '계좌이체 방법', '온라인 결제']
  },
  {
    id: 'bills',
    title: '공과금/세금',
    icon: Calculator,
    color: 'bg-orange-50 text-orange-600 border-orange-200',
    description: '각종 요금 납부 도움',
    examples: ['전기요금 자동납부', '세금 납부하기', '보험료 납부']
  }
];

const recentRequests = [
  {
    id: 1,
    title: '카카오뱅크 앱 설치하고 계좌 개설',
    helper: '김도우미',
    status: 'progress',
    rating: 4.9,
    time: '진행중',
    image: null
  },
  {
    id: 2,
    title: '토스 공과금 자동이체 설정',
    helper: '이전문가',
    status: 'completed',
    rating: 5.0,
    time: '어제 완료',
    image: null
  }
];

const popularHelpers = [
  {
    id: 1,
    name: '김전문가',
    rating: 4.9,
    reviews: 234,
    specialties: ['앱 설치', '계좌 개설'],
    online: true
  },
  {
    id: 2,
    name: '박도우미',
    rating: 4.8,
    reviews: 189,
    specialties: ['본인인증', '결제 설정'],
    online: true
  },
  {
    id: 3,
    name: '이헬퍼',
    rating: 5.0,
    reviews: 156,
    specialties: ['공과금', '세금 납부'],
    online: false
  }
];

export function UserHomeTab() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCreateRequest, setShowCreateRequest] = useState(false);

  const handleCreateRequest = (requestData: any) => {
    console.log('새 요청 생성:', requestData);
    setShowCreateRequest(false);
    // TODO: 실제 요청 생성 로직 구현
  };

  // CreateRequest 화면이 활성화된 경우
  if (showCreateRequest) {
    return (
      <CreateRequest
        onSubmit={handleCreateRequest}
        onCancel={() => setShowCreateRequest(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-[#4A90E2] to-[#5DADE2] px-6 py-8 text-white">
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold mb-2">
              안녕하세요! 김지민님
            </h1>
            <p className="text-blue-100 text-lg">
              복잡한 모바일 업무,<br />
              함께 바로 해결해요
            </p>
          </div>
          
          <Button 
            onClick={() => setShowCreateRequest(true)}
            className="w-full bg-white text-[#4A90E2] hover:bg-gray-50 py-4 text-lg font-medium rounded-xl shadow-lg"
          >
            새로운 도움 요청하기
          </Button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-8">
        {/* Quick Categories */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            어떤 도움이 필요하세요?
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card 
                  key={category.id}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 border-2 ${
                    selectedCategory === category.id ? 'ring-2 ring-[#4A90E2] border-[#4A90E2]' : ''
                  }`}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                >
                  <CardContent className="p-5">
                    <div className="space-y-3">
                      <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {category.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {category.description}
                        </p>
                      </div>

                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Category Examples */}
          {selectedCategory && (
            <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-3">이런 도움을 받을 수 있어요:</h4>
              <div className="space-y-2">
                {categories.find(c => c.id === selectedCategory)?.examples.map((example, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <ArrowRight className="w-4 h-4 text-[#4A90E2]" />
                    <span className="text-sm">{example}</span>
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => setShowCreateRequest(true)}
                className="w-full mt-4 bg-[#4A90E2] hover:bg-[#3A7BC8] text-white py-3 rounded-lg"
              >
                이 분야 도움 요청하기
              </Button>
            </div>
          )}
        </section>



        {/* Trust & Safety */}
        <section className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">안전하고 믿을 수 있어요</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                모든 도우미는 신원 확인을 거쳤으며,<br />
                실시간 채팅으로 안전하게 도움을 받을 수 있습니다.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="text-center">
                <div className="font-semibold text-[#4A90E2]">1,000+</div>
                <div className="text-xs text-gray-500">검증된 도우미</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-[#4A90E2]">4.9</div>
                <div className="text-xs text-gray-500">평균 만족도</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-[#4A90E2]">98%</div>
                <div className="text-xs text-gray-500">해결 성공률</div>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}