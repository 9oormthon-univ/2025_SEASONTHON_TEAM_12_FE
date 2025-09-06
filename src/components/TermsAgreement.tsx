import React, { useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Card, CardContent } from './ui/card';
import { ChevronRight, Shield, FileText, Eye, Bell, Gift } from 'lucide-react';

interface TermsAgreementProps {
  onComplete: () => void;
}

const termsItems = [
  {
    id: 'age',
    title: '(필수) 만 14세 이상입니다.',
    required: true,
    icon: Shield,
    description: '만 14세 미만은 서비스를 이용할 수 없습니다.'
  },
  {
    id: 'service',
    title: '(필수) 서비스 이용약관 동의',
    required: true,
    icon: FileText,
    description: '함께ON 서비스 이용에 관한 기본 약관입니다.',
    hasDetail: true
  },
  {
    id: 'privacy',
    title: '(필수) 개인정보 처리방침 동의',
    required: true,
    icon: Eye,
    description: '개인정보 수집 및 이용에 관한 동의입니다.',
    hasDetail: true
  },
  {
    id: 'sensitive',
    title: '(필수) 민감정보 수집 및 이용 동의',
    required: true,
    icon: Shield,
    description: '서비스 제공을 위한 필수 정보 수집입니다.',
    hasDetail: true
  },
  {
    id: 'marketing',
    title: '(선택) 마케팅 수신 동의',
    required: false,
    icon: Bell,
    description: '이벤트, 혜택 정보를 받아보실 수 있습니다.',
    hasDetail: true
  }
];

export function TermsAgreement({ onComplete }: TermsAgreementProps) {
  const [agreements, setAgreements] = useState<Record<string, boolean>>({});
  const [allAgreed, setAllAgreed] = useState(false);

  const handleItemToggle = (id: string) => {
    const newAgreements = {
      ...agreements,
      [id]: !agreements[id]
    };
    setAgreements(newAgreements);
    
    // 전체 동의 상태 업데이트
    const requiredItems = termsItems.filter(item => item.required);
    const allRequiredChecked = requiredItems.every(item => newAgreements[item.id]);
    setAllAgreed(allRequiredChecked);
  };

  const handleAllToggle = () => {
    const newAllAgreed = !allAgreed;
    const newAgreements: Record<string, boolean> = {};
    
    termsItems.forEach(item => {
      if (newAllAgreed) {
        newAgreements[item.id] = true;
      } else {
        newAgreements[item.id] = false;
      }
    });
    
    setAgreements(newAgreements);
    setAllAgreed(newAllAgreed);
  };

  const canProceed = termsItems
    .filter(item => item.required)
    .every(item => agreements[item.id]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-4">
        <h1 className="text-xl font-semibold text-gray-900">약관에 동의해주세요</h1>
        <p className="text-sm text-gray-600 mt-1">
          여러분의 개인정보와 서비스 이용 권리를 지켜드릴게요
        </p>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {/* All agreement */}
        <Card className="border-[#4A90E2] bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="all"
                checked={allAgreed}
                onCheckedChange={handleAllToggle}
                className="w-5 h-5 data-[state=checked]:bg-[#4A90E2] data-[state=checked]:border-[#4A90E2]"
              />
              <div className="flex-1">
                <label 
                  htmlFor="all"
                  className="text-base font-semibold text-gray-900 cursor-pointer"
                >
                  모두 동의
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  서비스 이용을 위해 아래 약관에 모두 동의합니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Individual agreements */}
        <div className="space-y-3">
          {termsItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={item.id}
                      checked={agreements[item.id] || false}
                      onCheckedChange={() => handleItemToggle(item.id)}
                      className="w-5 h-5 data-[state=checked]:bg-[#4A90E2] data-[state=checked]:border-[#4A90E2] flex-shrink-0"
                    />
                    <Icon className="w-5 h-5 text-[#4A90E2] flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <label 
                        htmlFor={item.id}
                        className="text-sm font-medium text-gray-900 cursor-pointer block"
                      >
                        {item.title}
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.description}
                      </p>
                    </div>
                    {item.hasDetail && (
                      <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                        <span className="text-xs mr-1">보기</span>
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Benefits notice */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Gift className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-800">
                  마케팅 동의 시 특별 혜택
                </p>
                <p className="text-xs text-green-600 mt-1">
                  신규 회원 할인 쿠폰과 이벤트 정보를 가장 먼저 받아보세요!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom button */}
      <div className="p-4 bg-white border-t">
        <Button
          onClick={onComplete}
          disabled={!canProceed}
          className="w-full bg-[#4A90E2] hover:bg-[#3A7BC8] disabled:bg-gray-300 py-4 text-lg font-semibold"
          size="lg"
        >
          다음 단계로
        </Button>
        
        {!canProceed && (
          <p className="text-center text-sm text-gray-500 mt-2">
            필수 약관에 모두 동의해주세요
          </p>
        )}
      </div>
    </div>
  );
}