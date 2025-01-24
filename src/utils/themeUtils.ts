export const getPageBackground = (isCyberpunk: boolean) => 
  isCyberpunk 
    ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white'
    : 'bg-gray-50 dark:bg-gray-900';

export const getCardBackground = (isCyberpunk: boolean) =>
  isCyberpunk
    ? 'bg-gray-900/90 backdrop-blur-xl border border-purple-500/20'
    : 'bg-white dark:bg-gray-800';

export const getPrimaryButtonStyle = (isCyberpunk: boolean) =>
  isCyberpunk
    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/25'
    : 'bg-primary-500 hover:bg-primary-600 text-white'; 