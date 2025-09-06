import React, { useState } from 'react';
import { ArrowLeft, Clock, MapPin, User, Star, Phone, MessageCircle, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

interface Helper {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  profileImage?: string;
  completedTasks: number;
  appliedAt: string;
}

interface RequestDetailProps {
  request: {
    id: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    location?: string;
    urgency: 'low' | 'medium' | 'high';
    createdAt: string;
    budget?: number;
    status: 'pending' | 'matched' | 'completed';
  };
  helpers: Helper[];
  onBack: () => void;
  onSelectHelper: (helperId: string) => void;
  onContactHelper: (helperId: string) => void;
}

const urgencyColors = {
  low: 'bg-green-50 text-green-700 border-green-200',
  medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  high: 'bg-red-50 text-red-700 border-red-200'
};

const urgencyLabels = {
  low: '여유있게',
  medium: '보통',
  high: '급해요'
};

export function RequestDetail({ request, helpers, onBack, onSelectHelper, onContactHelper }: RequestDetailProps) {
  const [selectedHelper, setSelectedHelper] = useState<string | null>(null);

  const handleSelectHelper = (helperId: string) => {
    setSelectedHelper(helperId);
  };

  const handleConfirmSelection = () => {
    if (selectedHelper) {
      onSelectHelper(selectedHelper);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4A90E2] to-[#5DADE2] px-6 py-6 text-white">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-semibold">요청 상세</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Request Details */}
          <Card className="border-0 shadow-lg rounded-xl">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-semibold text-gray-800 flex-1">{request.title}</h2>
                  <Badge className={`${urgencyColors[request.urgency]} px-3 py-1`}>
                    {urgencyLabels[request.urgency]}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{request.createdAt}</span>
                  </div>
                  {request.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{request.location}</span>
                    </div>
                  )}
                </div>

                {request.description && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">{request.description}</p>
                  </div>
                )}

                {request.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {request.tags.map((tag) => (
                      <Badge key={tag} className="bg-blue-100 text-blue-800 text-sm">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {request.budget && (
                  <div className="text-right">
                    <span className="text-2xl font-semibold text-[#4A90E2]">
                      {request.budget.toLocaleString()}원
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Helpers Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                신청한 도우미 ({helpers.length}명)
              </h3>
              {selectedHelper && (
                <Button 
                  onClick={handleConfirmSelection}
                  className="bg-[#4A90E2] hover:bg-[#3A7BC8] text-white px-6 py-2 rounded-lg"
                >
                  <Check className="w-4 h-4 mr-2" />
                  선택 확정
                </Button>
              )}
            </div>

            {helpers.length === 0 ? (
              <Card className="border-0 shadow-lg rounded-xl">
                <CardContent className="p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <User className="w-12 h-12 mx-auto" />
                  </div>
                  <p className="text-gray-600">아직 신청한 도우미가 없습니다.</p>
                  <p className="text-sm text-gray-500 mt-2">곧 도우미들이 응답할 예정입니다.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {helpers.map((helper) => (
                  <Card 
                    key={helper.id} 
                    className={`border-0 shadow-lg rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedHelper === helper.id 
                        ? 'ring-2 ring-[#4A90E2] bg-blue-50' 
                        : 'hover:shadow-xl'
                    }`}
                    onClick={() => handleSelectHelper(helper.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-16 h-16 border-2 border-white shadow-lg">
                          <AvatarImage src={helper.profileImage} alt={helper.name} />
                          <AvatarFallback className="bg-[#4A90E2] text-white font-semibold">
                            {helper.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-800">{helper.name}</h4>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span>{helper.rating}</span>
                                <span>({helper.reviewCount})</span>
                              </div>
                            </div>
                            {selectedHelper === helper.id && (
                              <div className="w-6 h-6 bg-[#4A90E2] rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
                            <div>완료한 작업: {helper.completedTasks}건</div>
                            <div>신청시간: {helper.appliedAt}</div>
                          </div>

                          {helper.specialties.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {helper.specialties.map((specialty) => (
                                <Badge 
                                  key={specialty} 
                                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1"
                                >
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          )}

                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                onContactHelper(helper.id);
                              }}
                              className="flex-1 border-[#4A90E2] text-[#4A90E2] hover:bg-blue-50"
                            >
                              <MessageCircle className="w-4 h-4 mr-2" />
                              채팅
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={(e) => e.stopPropagation()}
                              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                              <Phone className="w-4 h-4 mr-2" />
                              전화
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Info Message */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#4A90E2] rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-[#4A90E2] mb-2">💡 도우미 선택 가이드</p>
                <div className="text-gray-700 text-sm space-y-1">
                  <p>• 평점과 리뷰를 참고하여 신뢰할 수 있는 도우미를 선택하세요</p>
                  <p>• 채팅으로 미리 소통해보고 일정을 조율할 수 있습니다</p>
                  <p>• 선택 확정 후에는 변경이 어려우니 신중히 선택해주세요</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}