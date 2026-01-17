import { Link, useLocation } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

export function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Briefcase className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              Assessment Matcher
            </span>
          </Link>

          <div className="flex space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Home
            </Link>
            <Link
              to="/analyze"
              className={`text-sm font-medium transition-colors ${
                isActive('/analyze') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Analyze
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              About
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
