import React, { useEffect, useState } from 'react';
import { Bell, X, Phone, Calendar } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface Notification {
  id: string;
  type: 'meeting-reminder' | 'call-incoming' | 'meeting-accepted';
  title: string;
  message: string;
  timestamp: Date;
  meetingId?: string;
  actionable?: boolean;
}

interface NotificationManagerProps {
  meetings: any[];
  onCallRequest?: () => void;
}

export function NotificationManager({ meetings, onCallRequest }: NotificationManagerProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const checkMeetingReminders = () => {
      const now = new Date();
      
      meetings.forEach(meeting => {
        if (meeting.status === 'accepted') {
          const meetingDateTime = new Date(`${meeting.date}T${meeting.time}`);
          const timeDiff = meetingDateTime.getTime() - now.getTime();
          
          // 30분 전 알림 (1800000ms = 30분)
          if (timeDiff <= 1800000 && timeDiff > 1790000) {
            const notification: Notification = {
              id: `reminder-${meeting.id}`,
              type: 'meeting-reminder',
              title: '약속 알림',
              message: `30분 후 "${meeting.title}" 약속이 있어요.`,
              timestamp: now,
              meetingId: meeting.id
            };
            
            addNotification(notification);
          }
          
          // 약속 시간 도달 (데모용: 10초 후)
          if (timeDiff <= 10000 && timeDiff > 5000) {
            const notification: Notification = {
              id: `call-${meeting.id}`,
              type: 'call-incoming',
              title: '통화 시간',
              message: `"${meeting.title}" 약속 시간이에요. 통화를 시작하시겠습니까?`,
              timestamp: now,
              meetingId: meeting.id,
              actionable: true
            };
            
            addNotification(notification);
          }
        }
      });
    };

    const interval = setInterval(checkMeetingReminders, 5000);
    return () => clearInterval(interval);
  }, [meetings]);

  const addNotification = (notification: Notification) => {
    // 중복 알림 방지
    if (notifications.some(n => n.id === notification.id)) return;
    
    setNotifications(prev => [notification, ...prev]);
    setShowNotification(true);
    
    // 일반 알림은 5초 후 자동 사라짐
    if (!notification.actionable) {
      setTimeout(() => {
        removeNotification(notification.id);
      }, 5000);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (notifications.length <= 1) {
      setShowNotification(false);
    }
  };

  const handleCallAction = (notificationId: string) => {
    onCallRequest?.();
    removeNotification(notificationId);
  };

  if (!showNotification || notifications.length === 0) return null;

  const currentNotification = notifications[0];

  return (
    <div className="fixed top-4 left-4 right-4 z-50">
      <Card className="bg-white shadow-lg border-l-4 border-l-[#4A90E2]">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              {currentNotification.type === 'meeting-reminder' && (
                <Calendar className="w-5 h-5 text-[#4A90E2]" />
              )}
              {currentNotification.type === 'call-incoming' && (
                <Phone className="w-5 h-5 text-green-500" />
              )}
              {currentNotification.type === 'meeting-accepted' && (
                <Bell className="w-5 h-5 text-green-500" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-sm">{currentNotification.title}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeNotification(currentNotification.id)}
                  className="h-auto p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">
                {currentNotification.message}
              </p>
              
              {currentNotification.actionable && currentNotification.type === 'call-incoming' && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleCallAction(currentNotification.id)}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Phone className="w-3 h-3 mr-1" />
                    통화 시작
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeNotification(currentNotification.id)}
                  >
                    나중에
                  </Button>
                </div>
              )}
              
              <p className="text-xs text-gray-400 mt-2">
                {currentNotification.timestamp.toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
          
          {notifications.length > 1 && (
            <div className="mt-2 pt-2 border-t">
              <p className="text-xs text-gray-500">
                +{notifications.length - 1}개의 알림이 더 있습니다
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}