import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { App } from '@capacitor/app';

export const isNative = Capacitor.isNativePlatform();

export const initializeCapacitor = async () => {
  if (!isNative) return;

  try {
    // 스플래시 스크린 숨기기
    await SplashScreen.hide();

    // 키보드 설정
    await Keyboard.setResizeMode({ mode: KeyboardResize.Body });
    await Keyboard.setScroll({ isDisabled: false });
    await Keyboard.setAccessoryBarVisible({ isVisible: true });

    // 안전 영역 설정 (노치, 홈 인디케이터 대응)
    if (Capacitor.getPlatform() === 'ios') {
      document.documentElement.style.setProperty('--ion-safe-area-top', 'env(safe-area-inset-top)');
      document.documentElement.style.setProperty('--ion-safe-area-bottom', 'env(safe-area-inset-bottom)');
      document.documentElement.style.setProperty('--ion-safe-area-left', 'env(safe-area-inset-left)');
      document.documentElement.style.setProperty('--ion-safe-area-right', 'env(safe-area-inset-right)');
    }

    // 뒤로 가기 버튼 이벤트 리스너 설정
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back();
      } else {
        App.exitApp();
      }
    });

  } catch (error) {
    console.log('Capacitor 초기화 중 오류:', error);
  }
};

// 상태바 설정 함수들
export const setStatusBarForSplash = async () => {
  if (!isNative) return;
  
  try {
    await StatusBar.setStyle({ style: Style.Light });
    await StatusBar.setBackgroundColor({ color: '#4A90E2' });
    await StatusBar.setOverlaysWebView({ overlay: true });
  } catch (error) {
    console.log('스플래시 상태바 설정 오류:', error);
  }
};

export const setStatusBarForApp = async () => {
  if (!isNative) return;
  
  try {
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#ffffff' });
    await StatusBar.setOverlaysWebView({ overlay: false });
  } catch (error) {
    console.log('앱 상태바 설정 오류:', error);
  }
};

export const hapticFeedback = async (style: ImpactStyle = ImpactStyle.Light) => {
  if (!isNative) return;
  
  try {
    await Haptics.impact({ style });
  } catch (error) {
    console.log('햅틱 피드백 오류:', error);
  }
};

export const showKeyboard = async () => {
  if (!isNative) return;
  
  try {
    await Keyboard.show();
  } catch (error) {
    console.log('키보드 표시 오류:', error);
  }
};

export const hideKeyboard = async () => {
  if (!isNative) return;
  
  try {
    await Keyboard.hide();
  } catch (error) {
    console.log('키보드 숨기기 오류:', error);
  }
};
