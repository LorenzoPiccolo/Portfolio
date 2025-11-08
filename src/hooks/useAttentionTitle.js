import { useEffect } from 'react';

export default function useAttentionTitle(message = 'Come back pls!') {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const originalTitle = document.title;

    const handleBlur = () => {
      document.title = message;
    };

    const handleFocus = () => {
      document.title = originalTitle;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleBlur();
      } else {
        handleFocus();
      }
    };

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      handleFocus();
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [message]);
}
