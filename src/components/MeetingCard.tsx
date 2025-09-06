import React from 'react';
import { Calendar, Clock, Phone, Video, Check, X } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface MeetingCardProps {
  meeting: {
    id: string;
    date: string;
    time: string;
    title: string;
    note?: string;
    type: 'call' | 'video';
    status: 'pending' | 'accepted' | 'rejected' | 'completed';
    creator: 'user' | 'helper';
    timestamp: string;
  };
  currentUser: 'user' | 'helper';
  onAccept?: (meetingId: string) => void;
  onReject?: (meetingId: string) => void;
}

export function MeetingCard({ meeting, currentUser, onAccept, onReject }: MeetingCardProps) {
  const isMyMeeting = meeting.creator === currentUser;
  const canRespond = !isMyMeeting && meeting.status === 'pending';

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekDay = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
    return `${month}월 ${day}일 (${weekDay})`;
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? '오후' : '오전';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${period} ${displayHour}:${minutes}`;
  };

  const getStatusText = () => {
    switch (meeting.status) {
      case 'pending':
        return isMyMeeting ? '응답 대기 중' : '응답해주세요';
      case 'accepted':
        return '약속 확정됨';
      case 'rejected':
        return '약속이 거절됨';
      case 'completed':
        return '완료된 약속';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (meeting.status) {
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'accepted':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'completed':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className={`flex ${isMyMeeting ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className="max-w-sm">
        <Card className={`${getStatusColor()}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-orange-100 rounded-full">
                <Calendar className="w-4 h-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium">{formatDate(meeting.date)} {formatTime(meeting.time)}</div>
                <div className="text-sm text-gray-600">{meeting.title}</div>
              </div>
            </div>

            {meeting.note && (
              <div className="text-sm text-gray-600 mb-3 bg-white bg-opacity-50 p-2 rounded">
                {meeting.note}
              </div>
            )}

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {meeting.type === 'call' ? (
                  <Phone className="w-4 h-4" />
                ) : (
                  <Video className="w-4 h-4" />
                )}
                <span className="text-sm">
                  {meeting.type === 'call' ? '음성통화' : '화상통화'}
                </span>
              </div>
              <Badge variant="outline" className="text-xs">
                {getStatusText()}
              </Badge>
            </div>

            {meeting.status === 'accepted' && (
              <div className="text-xs text-gray-500 mb-3 bg-blue-50 p-2 rounded">
                💡 약속 시간 30분 전에 알림이 올 거예요.
              </div>
            )}

            {canRespond && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onReject?.(meeting.id)}
                  className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                >
                  <X className="w-3 h-3 mr-1" />
                  거절
                </Button>
                <Button
                  size="sm"
                  onClick={() => onAccept?.(meeting.id)}
                  className="flex-1 bg-[#4A90E2] hover:bg-[#3A7BC8]"
                >
                  <Check className="w-3 h-3 mr-1" />
                  수락
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        <div className="text-xs text-gray-400 text-right mt-1">
          {meeting.timestamp}
        </div>
      </div>
    </div>
  );
}