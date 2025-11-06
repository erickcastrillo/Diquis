import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';

interface FlashMessage {
  type: 'notice' | 'alert' | 'error';
  message: string;
  id: string;
}

export default function FlashMessages() {
  const { flash } = usePage<PageProps>().props;
  const [messages, setMessages] = useState<FlashMessage[]>([]);

  useEffect(() => {
    const newMessages: FlashMessage[] = [];
    
    if (flash?.notice) {
      newMessages.push({
        type: 'notice',
        message: flash.notice,
        id: `notice-${Date.now()}`
      });
    }
    
    if (flash?.alert) {
      newMessages.push({
        type: 'alert',
        message: flash.alert,
        id: `alert-${Date.now()}`
      });
    }
    
    if (flash?.error) {
      newMessages.push({
        type: 'error',
        message: flash.error,
        id: `error-${Date.now()}`
      });
    }
    
    if (newMessages.length > 0) {
      setMessages(newMessages);
      
      // Auto-dismiss after 5 seconds
      const timers = newMessages.map((msg) =>
        setTimeout(() => {
          setMessages((current) => current.filter((m) => m.id !== msg.id));
        }, 5000)
      );
      
      return () => {
        timers.forEach((timer) => clearTimeout(timer));
      };
    }
  }, [flash]);

  const dismissMessage = (id: string) => {
    setMessages((current) => current.filter((msg) => msg.id !== id));
  };

  if (messages.length === 0) return null;

  const getAlertClass = (type: 'notice' | 'alert' | 'error') => {
    switch (type) {
      case 'notice':
        return 'alert-success';
      case 'alert':
        return 'alert-warning';
      case 'error':
        return 'alert-error';
      default:
        return 'alert-info';
    }
  };

  const getIcon = (type: 'notice' | 'alert' | 'error') => {
    switch (type) {
      case 'notice':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'alert':
      case 'error':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
    }
  };

  return (
    <div className="fixed top-4 right-4 z-9999 flex flex-col gap-2 max-w-md">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`alert ${getAlertClass(msg.type)} shadow-lg animate-in slide-in-from-right-full duration-300`}
          role="alert"
        >
          <div className="flex items-center gap-2">
            {getIcon(msg.type)}
            <span className="flex-1">{msg.message}</span>
            <button
              onClick={() => dismissMessage(msg.id)}
              className="btn btn-sm btn-circle btn-ghost"
              aria-label="Dismiss"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
