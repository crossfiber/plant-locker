/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette: fresh leafy green primary, soft mint surfaces,
        // one warm peach/coral accent used sparingly for highlights + active states.
        leaf: {
          400: '#57B274',
          500: '#3E9B5F',
          600: '#2F8050',
          700: '#256B42',
          800: '#1C5233',
        },
        mint: {
          50: '#F3FAF5',
          100: '#E6F4EB',
          200: '#D3ECDC',
          300: '#B9DFC7',
        },
        peach: {
          100: '#FDEDE4',
          300: '#F6BEA1',
          400: '#F0A17D',
          500: '#E98B62',
        },
        ink: '#1D3527',
        moss: '#5F7A6A',
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['"Hanken Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 12px rgba(29, 53, 39, 0.07)',
        lift: '0 6px 24px rgba(29, 53, 39, 0.10)',
        glass: '0 8px 32px rgba(29, 53, 39, 0.08)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
