tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            oled: '#0A0A0C',
            surface: {
              DEFAULT: '#121216',
              soft: '#16161A',
              elevated: '#1C1C22',
              border: 'rgba(255, 255, 255, 0.08)'
            },
            accent: {
              DEFAULT: '#FFD400',
              hover: '#FFE033',
              glow: 'rgba(255, 212, 0, 0.18)'
            }
          },
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace']
          },
          animation: {
            'spin-slow': 'spin 35s linear infinite',
            'spin-reverse': 'spin-reverse 45s linear infinite',
            'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          },
          keyframes: {
            'spin-reverse': {
              '0%': { transform: 'rotate(360deg)' },
              '100%': { transform: 'rotate(0deg)' }
            }
          }
        }
      }
    }