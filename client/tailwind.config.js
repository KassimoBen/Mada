/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f0',
          100: '#f9eddb',
          200: '#f2d8b0',
          300: '#e9be7c',
          400: '#e0a34e',
          500: '#d98c2b',
          600: '#c77722',
          700: '#a65d1f',
          800: '#854b20',
          900: '#6c3e1d',
          950: '#3a1f0d',
        },
        ocean: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        gradient: {
          'sunset': '#ff6b6b',
          'dawn': '#ffd93d',
          'forest': '#6bcf7f',
          'sky': '#4d96ff',
        }
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': "linear-gradient(135deg, rgba(13, 110, 253, 0.1) 0%, rgba(13, 180, 240, 0.1) 100%)",
        'shine': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounce 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(217, 140, 43, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(217, 140, 43, 0.8)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      boxShadow: {
        'glow-primary': '0 0 30px rgba(217, 140, 43, 0.3)',
        'glow-ocean': '0 0 30px rgba(14, 165, 233, 0.3)',
        'glow-lg': '0 20px 50px rgba(0, 0, 0, 0.2)',
        'inner-glow': 'inset 0 0 20px rgba(217, 140, 43, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
      },
      transitionDuration: {
        DEFAULT: '300ms',
        'slow': '700ms',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.gradient-text': {
          'background': 'linear-gradient(135deg, #d98c2b 0%, #0ea5e9 100%)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          'color': 'transparent',
        },
        '.gradient-border': {
          'position': 'relative',
          '&::before': {
            'content': '""',
            'position': 'absolute',
            'inset': '0',
            'padding': '2px',
            'background': 'linear-gradient(135deg, #d98c2b 0%, #0ea5e9 100%)',
            'borderRadius': 'calc(0.5rem - 2px)',
            '-z-index': '1',
          },
        },
        '.backdrop-blur-xl': {
          'backdropFilter': 'blur(32px)',
        },
      })
    }
  ],
}

