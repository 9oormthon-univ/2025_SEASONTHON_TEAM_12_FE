import React, { useState } from 'react';
import { ArrowLeft, Camera, MapPin, Clock, Plus, X, Sparkles, Zap, Timer } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

interface CreateRequestProps {
  onSubmit: (request: RequestData) => void;
  onCancel: () => void;
}

interface RequestData {
  title: string;
  description: string;
  category: string;
  tags: string[];
  location?: string;
  urgency: 'low' | 'medium' | 'high';
  images: File[];
}

export function CreateRequest({ onSubmit, onCancel }: CreateRequestProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [location, setLocation] = useState('');
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high'>('medium');
  const [images, setImages] = useState<File[]>([]);

  const categories = [
    { 
      id: 'government', 
      label: '정부24', 
      icon: '🏛️',
      gradient: 'from-emerald-500 to-green-600',
      color: 'emerald'
    },
    { 
      id: 'insurance', 
      label: '건강보험공단', 
      icon: '🏥',
      gradient: 'from-blue-500 to-cyan-600',
      color: 'blue'
    },
    { 
      id: 'banking', 
      label: '은행 업무', 
      icon: '🏦',
      gradient: 'from-purple-500 to-indigo-600',
      color: 'purple'
    },
    { 
      id: 'other', 
      label: '기타', 
      icon: '📋',
      gradient: 'from-gray-500 to-slate-600',
      color: 'gray'
    }
  ];

  const urgencyLevels = [
    { 
      id: 'low', 
      label: '여유있게', 
      icon: Timer,
      color: 'from-green-50 to-emerald-50 border-green-200 text-green-700',
      badgeColor: 'bg-green-100 text-green-700 border-green-200',
      desc: '언제든 편한 시간에 도움받고 싶어요'
    },
    { 
      id: 'medium', 
      label: '보통', 
      icon: Clock,
      color: 'from-amber-50 to-yellow-50 border-amber-200 text-amber-700',
      badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
      desc: '며칠 내로 해결하고 싶어요'
    },
    { 
      id: 'high', 
      label: '급해요', 
      icon: Zap,
      color: 'from-red-50 to-rose-50 border-red-200 text-red-700',
      badgeColor: 'bg-red-100 text-red-700 border-red-200',
      desc: '오늘 중으로 꼭 해결해야 해요'
    }
  ];

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 5) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (images.length + files.length <= 5) {
      setImages([...images, ...files]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        category,
        tags,
        location: location.trim() || undefined,
        urgency,
        images
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const isValid = title.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4A90E2] via-[#5DADE2] to-[#6BB6FF] px-6 py-6 text-white relative flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        <div className="relative flex items-center justify-between">
          <button 
            onClick={onCancel} 
            className="p-2 -ml-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold">도움 요청하기</h1>
            <p className="text-blue-100 text-sm mt-1">어떤 도움이 필요하신가요?</p>
          </div>
          <button 
            onClick={handleSubmit}
            disabled={!isValid}
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
              isValid
                ? 'bg-white text-[#4A90E2] hover:bg-blue-50 hover:scale-105 shadow-lg'
                : 'bg-white/20 text-white/60 cursor-not-allowed'
            }`}
          >
            완료
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* 제목 */}
          <Card className="border-0 shadow-lg rounded-xl bg-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-br from-[#4A90E2] to-[#5DADE2] rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <label className="text-lg font-bold text-gray-800">제목 *</label>
              </div>
              <Input
                placeholder="어떤 도움이 필요하신지 간단히 적어주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-base h-12 rounded-lg border-gray-200 bg-white placeholder:text-gray-400 focus:bg-white transition-all"
              />
            </CardContent>
          </Card>

          {/* 카테고리 */}
          <Card className="border-0 shadow-lg rounded-xl bg-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">📂</span>
                </div>
                <label className="text-lg font-bold text-gray-800">카테고리</label>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(category === cat.id ? '' : cat.id)}
                    className={`group relative p-4 rounded-lg border-2 text-left transition-all duration-300 ${
                      category === cat.id
                        ? 'border-[#4A90E2] bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-lg shadow-sm`}>
                        {cat.icon}
                      </div>
                      <div>
                        <span className={`text-base font-bold ${
                          category === cat.id ? 'text-[#4A90E2]' : 'text-gray-800'
                        }`}>
                          {cat.label}
                        </span>
                        <p className={`text-xs mt-1 ${
                          category === cat.id ? 'text-blue-600' : 'text-gray-500'
                        }`}>
                          {cat.label} 관련 도움을 요청하세요
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>


          {/* 긴급도 */}
          <Card className="border-0 shadow-lg rounded-xl bg-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white" />
                </div>
                <label className="text-lg font-bold text-gray-800">긴급도</label>
              </div>
              <div className="space-y-2">
                {urgencyLevels.map((level) => {
                  const IconComponent = level.icon;
                  return (
                    <button
                      key={level.id}
                      onClick={() => setUrgency(level.id as any)}
                      className={`w-full p-3 rounded-lg border-2 text-left transition-all duration-300 ${
                        urgency === level.id
                          ? `bg-gradient-to-br ${level.color} shadow-md`
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          urgency === level.id ? level.badgeColor : 'bg-gray-100'
                        }`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <span className={`text-sm font-bold ${
                            urgency === level.id ? 'text-gray-800' : 'text-gray-600'
                          }`}>
                            {level.label}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">{level.desc}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* 안내 메시지 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#4A90E2] to-[#5DADE2] rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#4A90E2] mb-2">
                  💡 도움 요청 안내
                </p>
                <div className="space-y-1 text-xs text-gray-600">
                  <p>• 요청을 작성하시면 근처의 전문 도우미들에게 알림이 전송됩니다</p>
                  <p>• 도우미가 응답하면 채팅으로 세부사항을 논의할 수 있어요</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}