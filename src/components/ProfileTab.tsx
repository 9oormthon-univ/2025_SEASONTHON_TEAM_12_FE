import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Settings, 
  Star, 
  Award, 
  HelpCircle, 
  Shield, 
  Bell,
  ChevronRight,
  LogOut,
  Edit
} from 'lucide-react';

interface ProfileTabProps {
  userType: string;
}

export function ProfileTab({ userType }: ProfileTabProps) {
  const userMenuItems = [
    { 
      icon: Settings, 
      label: '계정 설정', 
      description: '개인정보 및 보안' 
    },
    { 
      icon: Bell, 
      label: '알림 설정', 
      description: '도움 요청 알림 관리' 
    },
    { 
      icon: HelpCircle, 
      label: '사용법 도움말', 
      description: '앱 사용 가이드' 
    },
    { 
      icon: Shield, 
      label: '안전 정책', 
      description: '개인정보 보호 및 안전' 
    }
  ];

  const helperMenuItems = [
    { 
      icon: Settings, 
      label: '도우미 설정', 
      description: '프로필 및 전문분야 관리' 
    },
    { 
      icon: Bell, 
      label: '요청 알림', 
      description: '매칭 요청 알림 설정' 
    },
    { 
      icon: Award, 
      label: '성과 관리', 
      description: '리뷰 및 평점 확인' 
    },
    { 
      icon: HelpCircle, 
      label: '도우미 가이드', 
      description: '효과적인 도움 제공 방법' 
    },
    { 
      icon: Shield, 
      label: '정책 및 약관', 
      description: '도우미 운영 정책' 
    }
  ];

  const menuItems = userType === 'helper' ? helperMenuItems : userMenuItems;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4A90E2] to-[#5DADE2] px-6 py-6 text-white">
        <h1 className="text-xl font-semibold">내 정보</h1>
        <p className="text-blue-100 text-sm mt-1">
          {userType === 'helper' ? '도우미 프로필을 관리하세요' : '계정 정보를 확인하세요'}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Card */}
        <Card className="border-0 shadow-lg rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-gradient-to-br from-[#4A90E2] to-[#5DADE2] text-white text-2xl font-semibold">
                  {userType === 'helper' ? '김' : '박'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold text-gray-800">
                    {userType === 'helper' ? '김도우미' : '박이용자'}
                  </h2>
                  {userType === 'helper' && (
                    <Badge className="bg-gradient-to-r from-[#4A90E2] to-[#5DADE2] text-white px-3 py-1">
                      인증 도우미
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600 mb-3">
                  {userType === 'helper' ? '모바일 앱 전문 도우미' : '함께ON 회원'}
                </p>
                {userType === 'helper' && (
                  <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-lg w-fit">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-yellow-700">4.9</span>
                    <span className="text-yellow-600">(234개 리뷰)</span>
                  </div>
                )}
              </div>
              <Button className="bg-[#4A90E2] hover:bg-[#3A7BC8] text-white px-4 py-2">
                <Edit className="w-4 h-4 mr-2" />
                편집
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Card - 도우미와 사용자 동일한 구조 */}
        <Card className="border-0 shadow-lg rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-800">
              {userType === 'helper' ? '도우미 활동 현황' : '이용 현황'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userType === 'helper' ? (
              <>
                <div className="grid grid-cols-3 gap-6 text-center mb-6">
                  <div>
                    <div className="text-3xl font-bold text-[#4A90E2] mb-2">234</div>
                    <div className="text-sm text-gray-600">총 완료</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#4A90E2] mb-2">4.9</div>
                    <div className="text-sm text-gray-600">평균 평점</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#4A90E2] mb-2">98%</div>
                    <div className="text-sm text-gray-600">완료율</div>
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded-lg">
                    <Award className="w-6 h-6 text-yellow-600" />
                    <div>
                      <div className="font-medium text-yellow-800">우수 도우미 배지</div>
                      <div className="text-sm text-yellow-600">고객 만족도 우수</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-lg">
                    <Star className="w-6 h-6 text-purple-600" />
                    <div>
                      <div className="font-medium text-purple-800">전문가 인증</div>
                      <div className="text-sm text-purple-600">모바일 앱 전문가</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-6 text-center mb-4">
                  <div>
                    <div className="text-3xl font-bold text-[#4A90E2] mb-2">5</div>
                    <div className="text-sm text-gray-600">총 요청</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#4A90E2] mb-2">3</div>
                    <div className="text-sm text-gray-600">완료</div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="font-semibold text-green-800 mb-1">함께ON과 함께한 지</div>
                  <div className="text-2xl font-bold text-green-700">12일</div>
                </div>
              </>
            )}
          </CardContent>
        </Card>



        {/* Menu Items */}
        <Card className="border-0 shadow-lg rounded-xl">
          <CardContent className="p-0">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-5 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 mb-1">{item.label}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 py-3 text-base font-medium rounded-xl">
          <LogOut className="w-5 h-5 mr-2" />
          로그아웃
        </Button>

        {/* App Info */}
        <div className="text-center text-gray-500 space-y-2 pt-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#4A90E2] to-[#5DADE2] rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
            함
          </div>
          <p className="font-medium">함께ON v1.0.0</p>
          <p className="text-sm leading-relaxed">
            복잡한 모바일 업무,<br />
            함께 바로 해결해요
          </p>
        </div>
      </div>
    </div>
  );
}