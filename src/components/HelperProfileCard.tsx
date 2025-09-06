import React from 'react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Star, 
  Shield, 
  Award, 
  Clock, 
  ThumbsUp,
  MessageCircle,
  Bookmark
} from 'lucide-react';

interface HelperProfile {
  id: string;
  name: string;
  title: string;
  description: string;
  avatar?: string;
  rating: number;
  totalReviews: number;
  completedTasks: number;
  completionRate: number;
  specialties: string[];
  isVerified: boolean;
  isSuper: boolean;
  badges: string[];
  recentWork: string;
}

interface HelperProfileCardProps {
  profile: HelperProfile;
  onContact?: () => void;
  onBookmark?: () => void;
  isBookmarked?: boolean;
}

export function HelperProfileCard({ 
  profile, 
  onContact, 
  onBookmark, 
  isBookmarked = false 
}: HelperProfileCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-[#4A90E2]">
      <CardContent className="p-6">
        {/* Header with bookmark */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            {profile.isSuper && (
              <div className="bg-[#4A90E2] text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Shield className="w-3 h-3" />
                슈퍼파트너
              </div>
            )}
            <span className="text-sm text-gray-600">{profile.title}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onBookmark}
            className="p-2"
          >
            <Bookmark 
              className={`w-4 h-4 ${isBookmarked ? 'fill-[#4A90E2] text-[#4A90E2]' : 'text-gray-400'}`} 
            />
          </Button>
        </div>

        {/* Profile info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <Avatar className="w-16 h-16">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback className="bg-[#4A90E2] text-white text-lg font-semibold">
                {profile.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {profile.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg text-gray-900">{profile.name}</h3>
              {profile.badges.map((badge, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {badge}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-2">{profile.description}</p>
            <p className="text-sm text-[#4A90E2] font-medium">{profile.recentWork}</p>
          </div>
        </div>

        {/* Specialties */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {profile.specialties.map((specialty, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs border-[#4A90E2] text-[#4A90E2]"
              >
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="font-semibold text-lg text-[#4A90E2]">
                {profile.completedTasks}
              </span>
              <span className="text-xs text-gray-600">회</span>
            </div>
            <div className="text-xs text-gray-500">완료</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-lg text-[#4A90E2]">
                {profile.rating}
              </span>
            </div>
            <div className="text-xs text-gray-500">평점</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="font-semibold text-lg text-[#4A90E2]">
                {profile.completionRate}%
              </span>
            </div>
            <div className="text-xs text-gray-500">완료율</div>
          </div>
        </div>

        {/* Additional info */}
        <div className="flex items-center justify-center text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            <span>{profile.totalReviews}개 리뷰</span>
          </div>
        </div>

        {/* Action button */}
        <Button
          onClick={onContact}
          className="w-full bg-[#4A90E2] hover:bg-[#3A7BC8] text-white font-medium"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          도움 요청하기
        </Button>
      </CardContent>
    </Card>
  );
}

// Example usage component
export function HelperProfileList() {
  const mockHelpers: HelperProfile[] = [
    {
      id: '1',
      name: 'idreamer',
      title: '리인클리스',
      description: '프로덕트 디자이너 | 시니어(9~12)',
      rating: 4.9,
      totalReviews: 75,
      completedTasks: 39,
      completionRate: 99,
      specialties: ['앱 설치', '본인인증', '인터넷뱅킹'],
      isVerified: true,
      isSuper: true,
      badges: ['전문가'],
      recentWork: '나를 돕보인 수 있는 포트폴리오 스토리텔링 전략',
      avatar: undefined
    },
    {
      id: '2',
      name: '그라데이션',
      title: '토스',
      description: 'PM | 주니어(1~4)',
      rating: 4.8,
      totalReviews: 34,
      completedTasks: 69,
      completionRate: 92,
      specialties: ['공과금 납부', '토스 사용법', '송금'],
      isVerified: true,
      isSuper: true,
      badges: ['신뢰'],
      recentWork: '눈에 띄는 스펙 없어도 눈에 띄는 포트폴리오',
      avatar: undefined
    }
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">포트폴리오 리뷰</h2>
        <p className="text-gray-600 text-sm">
          1:1 커피챗으로 나의 포트폴리오 방향성부터 디테일까지 리뷰를 받아 보세요.
        </p>
      </div>
      
      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {['전체보기', '디자인', '서비스기획', '마케팅'].map((filter, index) => (
          <Button
            key={filter}
            variant={index === 0 ? "default" : "outline"}
            size="sm"
            className={index === 0 ? "bg-[#4A90E2] hover:bg-[#3A7BC8]" : ""}
          >
            {filter}
          </Button>
        ))}
      </div>

      {mockHelpers.map((helper) => (
        <HelperProfileCard
          key={helper.id}
          profile={helper}
          onContact={() => console.log('Contact', helper.name)}
          onBookmark={() => console.log('Bookmark', helper.name)}
        />
      ))}
    </div>
  );
}