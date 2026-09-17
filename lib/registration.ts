'use client';
import { useSyncExternalStore } from 'react';
import { registrationKey } from './event';
const changeEvent = 'nikon-fip-registration-change';
function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(changeEvent, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(changeEvent, callback);
  };
}
function snapshot() {
  try {
    return localStorage.getItem(registrationKey) === 'complete'
      ? 'registered'
      : 'unregistered';
  } catch {
    return 'unregistered';
  }
}
function serverSnapshot() {
  return 'loading' as const;
}
export function useRegistration() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
export function setRegistration(registered: boolean) {
  if (registered) localStorage.setItem(registrationKey, 'complete');
  else localStorage.removeItem(registrationKey);
  window.dispatchEvent(new Event(changeEvent));
}
