/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'], // ① 클래스 탐색 대상
  darkMode: 'class', // ② 다크 모드 설정
  theme: {
    extend: {
      // ③ 기본 테마 확장
      colors: {
        primary: '#1e40af',
        'primary-dark': '#1e3a8a',
        secondary: '#64748b',
        'secondary-dark': '#475569',
        brand: '#f43f5e',
        'brand-dark': '#be123c',
      },
      fontFamily: {
        sans: ['Inter', 'Pretendard', ...defaultTheme.fontFamily.sans],
        heading: ['"Pretendard"', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      screens: {
        xs: '480px',
        ...defaultTheme.screens,
      },
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
  },
  safelist: [
    'text-red-500',
    'text-green-500',
    'text-blue-500',
    'bg-red-100',
    'bg-green-100',
    'bg-blue-100',
    'dark:text-red-400',
    'dark:text-green-400',
    'dark:text-blue-400',
  ],
  plugins: [
    require('@tailwindcss/forms'), // ④ 자주 쓰는 플러그인
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
} 