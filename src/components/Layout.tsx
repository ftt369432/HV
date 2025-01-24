import { useTheme } from '../contexts/ThemeContext';
import { getPageBackground } from '../utils/themeUtils';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isCyberpunk } = useTheme();

  return (
    <div className={`min-h-screen ${getPageBackground(isCyberpunk)}`}>
      {/* Existing layout content */}
      <main className="flex-1 transition-colors duration-200">
        {children}
      </main>
    </div>
  );
} 