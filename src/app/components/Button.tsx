import React from 'react'

interface ButtonProps {
  desc: string;
  onClick?: () => void;
  color?: 'dark' | 'failure' | 'gray' | 'info' | 'light' | 'purple' | 'success' | 'warning' | string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
}

const Buttons = ({ 
  desc, 
  onClick, 
  color = 'info',
  size = 'md',
  disabled = false 
}: ButtonProps) => {
  
  const getColorClasses = () => {
    const baseClasses = 'font-medium rounded-lg focus:ring-4 focus:outline-none'
    switch(color) {
      case 'dark':
        return `${baseClasses} text-white bg-gray-800 hover:bg-gray-900 focus:ring-gray-300`
      case 'failure':
        return `${baseClasses} text-white bg-red-700 hover:bg-red-800 focus:ring-red-300`
      case 'gray':
        return `${baseClasses} text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-gray-200`
      case 'info':
        return `${baseClasses} text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300`
      case 'light':
        return `${baseClasses} text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-200`
      case 'purple':
        return `${baseClasses} text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-300`
      case 'success':
        return `${baseClasses} text-white bg-green-700 hover:bg-green-800 focus:ring-green-300`
      case 'warning':
        return `${baseClasses} text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-yellow-300`
      default:
        return `${baseClasses} text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300`
    }
  }

  const getSizeClasses = () => {
    switch(size) {
      case 'xs':
        return 'px-3 py-2 text-xs'
      case 'sm':
        return 'px-3 py-2 text-sm'
      case 'md':
        return 'px-5 py-2.5 text-sm'
      case 'lg':
        return 'px-5 py-3 text-base'
      case 'xl':
        return 'px-6 py-3.5 text-base'
      default:
        return 'px-5 py-2.5 text-sm'
    }
  }

  return (
    <button
      onClick={onClick}
      className={`${getColorClasses()} ${getSizeClasses()} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
    >
      {desc}
    </button>
  )
}

export default Buttons
