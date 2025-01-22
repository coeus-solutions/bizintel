import React from 'react';

interface ToastProps {
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

let toastTimeout: number;

export const toast = ({ type, title, message }: ToastProps) => {
  // Clear any existing toasts
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  // Remove existing toast if any
  const existingToast = document.getElementById('toast-container');
  if (existingToast) {
    existingToast.remove();
  }

  // Create toast container
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'fixed top-4 right-4 z-50 max-w-md animate-slide-left';

  // Create toast element
  const toast = document.createElement('div');
  toast.className = `rounded-lg p-4 ${
    type === 'error'
      ? 'bg-red-50 text-red-800 border border-red-200'
      : type === 'success'
      ? 'bg-green-50 text-green-800 border border-green-200'
      : 'bg-blue-50 text-blue-800 border border-blue-200'
  }`;

  // Create title
  const titleElement = document.createElement('h3');
  titleElement.className = 'font-semibold mb-1';
  titleElement.textContent = title;

  // Create message
  const messageElement = document.createElement('p');
  messageElement.className = 'text-sm';
  messageElement.textContent = message;

  // Assemble toast
  toast.appendChild(titleElement);
  toast.appendChild(messageElement);
  container.appendChild(toast);

  // Add to document
  document.body.appendChild(container);

  // Remove after 5 seconds
  toastTimeout = window.setTimeout(() => {
    container.classList.remove('animate-slide-left');
    container.classList.add('animate-slide-right');
    setTimeout(() => container.remove(), 300);
  }, 5000);
}; 