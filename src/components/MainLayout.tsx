import React, { useState, useEffect } from 'react';
import { Home, FileText, MessageCircle, User, Bell } from 'lucide-react';
import { UserHomeTab } from './UserHomeTab';
import { HelperHomeTab } from './HelperHomeTab';
import { MyRequestsTab } from './MyRequestsTab';
import { ChatTab } from './ChatTab';
import { ProfileTab } from './ProfileTab';
import { IndividualChat } from './IndividualChat';
import { setStatusBarForApp } from '../utils/capacitor';

interface MainLayoutProps {
  userType: string;
}

export function MainLayout({ userType }: MainLayoutProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [individualChat, setIndividualChat] = useState<{
    chatId: number;
    partnerName: string;
    partnerRating: number;
  } | null>(null);

  useEffect(() => {
    // 앱 화면용 상태바 설정
    setStatusBarForApp();

    // 채팅으로 이동하는 이벤트 리스너
    const handleNavigateToChat = (event: any) => {
      setActiveTab('chat');
    };

    window.addEventListener('navigateToChat', handleNavigateToChat);
    
    return () => {
      window.removeEventListener('navigateToChat', handleNavigateToChat);
    };
  }, []);

  const tabs = [
    { id: 'home', label: '홈', icon: Home },
    { id: 'myRequests', label: userType === 'helper' ? '지원 현황' : '나의 요청', icon: FileText },
    { id: 'chat', label: '채팅', icon: MessageCircle },
    { id: 'profile', label: '내정보', icon: User },
  ];

  const handleNavigateToChat = (chatId: number, partnerName: string, partnerRating: number) => {
    setIndividualChat({ chatId, partnerName, partnerRating });
  };

  const handleBackFromChat = () => {
    setIndividualChat(null);
  };

  const renderContent = () => {
    // 개별 채팅창이 활성화된 경우
    if (individualChat) {
      return (
        <IndividualChat
          chatId={individualChat.chatId}
          partnerName={individualChat.partnerName}
          partnerRating={individualChat.partnerRating}
          onBack={handleBackFromChat}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return userType === 'helper' ? <HelperHomeTab /> : <UserHomeTab />;
      case 'myRequests':
        return <MyRequestsTab userType={userType} onNavigateToChat={handleNavigateToChat} />;
      case 'chat':
        return <ChatTab userType={userType} />;
      case 'profile':
        return <ProfileTab userType={userType} />;
      default:
        return userType === 'helper' ? <HelperHomeTab /> : <UserHomeTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto">
      {/* Status Bar Spacer - 개별 채팅창에서는 숨김 */}
      {!individualChat && (
        <div className="status-bar-height bg-[#4A90E2]"></div>
      )}
      
      {/* Header - 개별 채팅창에서는 숨김 */}
      {!individualChat && (
        <div className="bg-white shadow-sm px-4 py-3 flex items-center justify-between safe-area-left safe-area-right">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#4A90E2] to-[#5DADE2] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">함</span>
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-[#4A90E2] to-[#5DADE2] bg-clip-text text-transparent">함께ON</span>
          </div>
          <Bell className="w-6 h-6 text-gray-600" />
        </div>
      )}

      {/* Content */}
      <div className={individualChat ? "" : "pb-20"}>
        {renderContent()}
      </div>

      {/* Bottom Navigation - 개별 채팅창에서는 숨김 */}
      {!individualChat && (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 safe-area-bottom">
          <div className="flex safe-area-left safe-area-right">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 flex flex-col items-center gap-1 transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'text-[#4A90E2] scale-105'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}