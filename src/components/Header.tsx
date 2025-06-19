import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* 로고/브랜드 영역 */}
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-2 no-underline group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-brand rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-heading font-bold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                블로그
              </span>
            </Link>
          </div>

          {/* 네비게이션 메뉴 */}
          <nav className="flex items-center space-x-6">
            <Link 
              to="/posts" 
              className="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-all duration-200 group no-underline"
            >
              게시판
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary dark:bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link>
            
            {/* 추후 추가될 메뉴들을 위한 예시 */}
            {/* <Link 
              to="/about" 
              className="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-all duration-200 group no-underline"
            >
              소개
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary dark:bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link> */}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 