/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'beginner': '#A5D16C',
        'beginner-light': '#C4D97E',
        'intermediate': '#6CC7D1',
        'intermediate-light': '#7ED8D9',
        'expert': '#B18ECF',
        'expert-light': '#C09AD6',
        'revealed-light': '#FFF1D8',
        'revealed-dark': '#F5DFBF',
        'error-dark': '#EE5B6D',
        'error-light': '#FF9D9F',
        'blue-one': '#2961F3',
        'green-two': '#43A553',
        'red-three': '#D73333',
        'purple-four': '#32179C',
        'magenta-five': '#9A0F6B',
        'turquoise-six': '#0DA086',
        'dark-gray-seven': '#303030',
        'light-gray-eight': '#7B7676'
      },
      fontFamily:{
        'numbers': ['Russo One', 'ui-sans-serif', 'system-ui']
      },
      gridTemplateColumns: {
        '9': 'repeat(9, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        '30': 'repeat(30, minmax(0, 1fr))',
      },
      aspectRatio: {
        'beginner': '9 / 11',
        'intermediate': '16 / 18',
        'expert': '30 / 18',
        'doubleSquare': '2/1'
      }
    },
  },
  plugins: [],
}

