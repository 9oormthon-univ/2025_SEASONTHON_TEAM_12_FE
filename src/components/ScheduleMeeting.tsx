import React, { useState } from 'react';
import { Calendar, Clock, X, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

interface ScheduleMeetingProps {
  onSchedule: (meeting: MeetingData) => void;
  onCancel: () => void;
}

interface MeetingData {
  date: string;
  time: string;
  title: string;
  note?: string;
  type: 'call' | 'video';
}

export function ScheduleMeeting({ onSchedule, onCancel }: ScheduleMeetingProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSubmit = () => {
    if (selectedDate && selectedTime) {
      onSchedule({
        date: selectedDate,
        time: selectedTime,
        title: '일정 약속',
        type: 'call'
      });
    }
  };

  // 오늘부터 14일 후까지의 날짜 옵션 생성
  const getDateOptions = () => {
    const options = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dateStr = date.toISOString().split('T')[0];
      const weekDay = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
      const month = date.getMonth() + 1;
      const day = date.getDate();
      
      let label;
      if (i === 0) {
        label = `오늘 (${month}/${day})`;
      } else if (i === 1) {
        label = `내일 (${month}/${day})`;
      } else {
        label = `${month}/${day} (${weekDay})`;
      }
      
      options.push({ value: dateStr, label });
    }
    
    return options;
  };

  // 시간 옵션 생성 (9시부터 21시까지 30분 단위)
  const getTimeOptions = () => {
    const options = [];
    
    for (let hour = 9; hour <= 21; hour++) {
      // 정시
      const timeStr = `${hour.toString().padStart(2, '0')}:00`;
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const period = hour >= 12 ? '오후' : '오전';
      const displayTime = `${period} ${displayHour}시`;
      options.push({ 
        value: timeStr, 
        label: displayTime
      });

      // 30분
      const timeStr30 = `${hour.toString().padStart(2, '0')}:30`;
      const displayTime30 = `${period} ${displayHour}시 30분`;
      options.push({ 
        value: timeStr30, 
        label: displayTime30
      });
    }
    
    return options;
  };

  const dateOptions = getDateOptions();
  const timeOptions = getTimeOptions();

  const getSelectedDateLabel = () => {
    const selected = dateOptions.find(option => option.value === selectedDate);
    return selected ? selected.label : '날짜 선택';
  };

  const getSelectedTimeLabel = () => {
    const selected = timeOptions.find(option => option.value === selectedTime);
    return selected ? selected.label : '시간 선택';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 sm:items-center sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 duration-300">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#4A90E2] to-[#5DADE2] px-6 py-6 text-white">
          <button 
            onClick={onCancel}
            className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold">일정 약속 잡기</h2>
          </div>
          <p className="text-blue-100 text-sm">
            편한 시간을 선택해주세요
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* 날짜 선택 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-[#4A90E2]" />
              <h3 className="font-medium text-gray-800">날짜</h3>
            </div>
            
            <button
              type="button"
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="w-full p-4 bg-gray-50 rounded-xl flex items-center justify-between hover:bg-gray-100 transition-colors"
            >
              <span className={selectedDate ? 'text-gray-800' : 'text-gray-500'}>
                {getSelectedDateLabel()}
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showDatePicker ? 'rotate-180' : ''}`} />
            </button>

            {showDatePicker && (
              <div className="bg-white border rounded-xl p-2 shadow-lg max-h-48 overflow-y-auto">
                {dateOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setSelectedDate(option.value);
                      setShowDatePicker(false);
                    }}
                    className={`w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors ${
                      selectedDate === option.value ? 'bg-[#4A90E2] text-white hover:bg-[#3A7BC8]' : ''
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 시간 선택 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-[#4A90E2]" />
              <h3 className="font-medium text-gray-800">시간</h3>
            </div>

            <button
              type="button"
              onClick={() => setShowTimePicker(!showTimePicker)}
              className="w-full p-4 bg-gray-50 rounded-xl flex items-center justify-between hover:bg-gray-100 transition-colors"
            >
              <span className={selectedTime ? 'text-gray-800' : 'text-gray-500'}>
                {getSelectedTimeLabel()}
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showTimePicker ? 'rotate-180' : ''}`} />
            </button>

            {showTimePicker && (
              <div className="bg-white border rounded-xl p-2 shadow-lg">
                <div className="grid grid-cols-2 gap-1 max-h-60 overflow-y-auto">
                  {timeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setSelectedTime(option.value);
                        setShowTimePicker(false);
                      }}
                      className={`w-full p-2 text-sm text-left rounded-lg hover:bg-gray-50 transition-colors ${
                        selectedTime === option.value ? 'bg-[#4A90E2] text-white hover:bg-[#3A7BC8]' : ''
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 선택된 내용 미리보기 */}
          {selectedDate && selectedTime && (
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-[#4A90E2] rounded-full flex items-center justify-center">
                  <Calendar className="w-3 h-3 text-white" />
                </div>
                <span className="font-medium text-[#4A90E2]">약속 확인</span>
              </div>
              <p className="text-gray-700">
                {getSelectedDateLabel()} {getSelectedTimeLabel()}에 약속이 잡힙니다.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
          <div className="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel} 
              className="flex-1 py-4 text-base rounded-xl border-gray-300"
            >
              취소
            </Button>
            <Button 
              onClick={handleSubmit}
              className="flex-1 py-4 text-base rounded-xl bg-[#4A90E2] hover:bg-[#3A7BC8] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedDate || !selectedTime}
            >
              약속 제안하기
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}