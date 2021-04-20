import { useCallback } from 'react';

export const useEmailCaptureSignIn = () => {

    const handleBlur = useCallback(
        async inputValue => {
            // Tracking - requires @dotdigital/pwa-studio-tracking
            if (typeof window.dmPt !== 'undefined') {
                window.dmPt('identify', inputValue.target.value);
            }
        }
    );

    return {
        handleBlur
    };
};
