import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';

interface CallRequestProps {
  caller: {
    name: string;
    avatar?: string;
  };
  type: 'call' | 'video';
  onAccept: () => void;
  onReject: () => void;
  isIncoming?: boolean;
}

interface InCallProps {
  participant: {
    name: string;
    avatar?: string;
  };
  type: 'call' | 'video';
  onEndCall: () => void;
  duration: number;
  onStartScreenShare?: () => void;
}

export function CallRequest({ caller, type, onAccept, onReject, isIncoming = true }: CallRequestProps) {
  const [isRinging, setIsRinging] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRinging(prev => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isIncoming) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-sm text-center">
        <CardContent className="p-6">
          <div className="mb-6">
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarFallback className="bg-[#4A90E2] text-white text-xl">
                {caller.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-medium mb-1">{caller.name}</h3>
            <p className="text-gray-500">
              {type === 'call' ? '음성통화' : '화상통화'} 요청이 도착했어요
            </p>
          </div>

          <div className={`mb-6 ${isRinging ? 'animate-pulse' : ''}`}>
            {type === 'call' ? (
              <Phone className="w-8 h-8 mx-auto text-[#4A90E2]" />
            ) : (
              <Video className="w-8 h-8 mx-auto text-[#4A90E2]" />
            )}
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={onReject}
              className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white"
            >
              <PhoneOff className="w-6 h-6" />
            </Button>
            <Button
              onClick={onAccept}
              className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white"
            >
              {type === 'call' ? (
                <Phone className="w-6 h-6" />
              ) : (
                <Video className="w-6 h-6" />
              )}
            </Button>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            수락하시겠습니까?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function InCallScreen({ participant, type, onEndCall, duration, onStartScreenShare }: InCallProps) {
  const [isMuted, setIsMuted] = useState(false);
  
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center text-white z-50">
      <div className="flex-1 flex flex-col items-center justify-center">
        <Avatar className="w-32 h-32 mb-6">
          <AvatarFallback className="bg-[#4A90E2] text-white text-4xl">
            {participant.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <h2 className="text-2xl font-medium mb-2">{participant.name}</h2>
        <p className="text-gray-300 mb-4">
          {type === 'call' ? '음성통화' : '화상통화'} 중
        </p>
        
        <div className="bg-black bg-opacity-30 px-4 py-2 rounded-full">
          <span className="text-lg">{formatDuration(duration)}</span>
        </div>
      </div>

      <div className="pb-8">
        <div className="flex gap-6 justify-center">
          <Button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-full ${
              isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>
          
          {onStartScreenShare && (
            <Button
              onClick={onStartScreenShare}
              className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600"
            >
              <Share2 className="w-6 h-6" />
            </Button>
          )}
          
          <Button
            onClick={onEndCall}
            className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600"
          >
            <PhoneOff className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}