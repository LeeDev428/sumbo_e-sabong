import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
    message: string;
    type: ToastType;
    duration?: number;
    onClose?: () => void;
}

export function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ',
    };

    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500',
    };

    return (
        <div className="fixed top-4 right-4 z-[9999] animate-slide-in">
            <div className={`${colors[type]} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[300px] max-w-md`}>
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xl">
                    {icons[type]}
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-sm leading-tight">{message}</p>
                </div>
                <button
                    onClick={onClose}
                    className="flex-shrink-0 text-white/80 hover:text-white transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

// Toast container management
let toastContainer: HTMLDivElement | null = null;
let toastRoot: any = null;

function getToastContainer() {
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        document.body.appendChild(toastContainer);
        toastRoot = createRoot(toastContainer);
    }
    return { container: toastContainer, root: toastRoot };
}

export function showToast(message: string, type: ToastType = 'info', duration = 3000) {
    const { root } = getToastContainer();
    
    const handleClose = () => {
        root.render(null);
    };

    root.render(
        <Toast 
            message={message} 
            type={type} 
            duration={duration}
            onClose={handleClose}
        />
    );
}

// Add animation styles
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slide-in {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .animate-slide-in {
            animation: slide-in 0.3s ease-out;
        }
    `;
    document.head.appendChild(style);
}
