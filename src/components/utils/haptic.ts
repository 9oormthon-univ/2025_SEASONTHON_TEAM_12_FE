// 햅틱 피드백 및 앱 같은 인터랙션 효과들
import { hapticFeedback as nativeHaptic, isNative } from '../../utils/capacitor';
import { ImpactStyle } from '@capacitor/haptics';

export const hapticFeedback = {
  // 가벼운 탭 피드백
  light: async () => {
    if (isNative) {
      await nativeHaptic(ImpactStyle.Light);
    } else if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  },
  
  // 중간 강도 피드백
  medium: async () => {
    if (isNative) {
      await nativeHaptic(ImpactStyle.Medium);
    } else if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
  },
  
  // 강한 피드백
  heavy: async () => {
    if (isNative) {
      await nativeHaptic(ImpactStyle.Heavy);
    } else if ('vibrate' in navigator) {
      navigator.vibrate([30, 10, 30]);
    }
  },
  
  // 성공 피드백
  success: async () => {
    if (isNative) {
      await nativeHaptic(ImpactStyle.Medium);
    } else if ('vibrate' in navigator) {
      navigator.vibrate([50, 25, 50]);
    }
  },
  
  // 에러 피드백
  error: async () => {
    if (isNative) {
      await nativeHaptic(ImpactStyle.Heavy);
    } else if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100, 50, 100]);
    }
  }
};

// 버튼 클릭 시 시각적 + 햅틱 피드백
export const buttonPress = async () => {
  await hapticFeedback.light();
};

// 성공 액션 시 피드백
export const successAction = async () => {
  await hapticFeedback.success();
};

// 스크린 간 전환 시 피드백
export const screenTransition = async () => {
  await hapticFeedback.medium();
};