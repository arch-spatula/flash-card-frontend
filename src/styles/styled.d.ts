import '@emotion/react'; // it's important to use ThemeProvider

declare module '@emotion/react' {
  export interface Theme {
    color: {
      red: string;
      black: string;
      white: string;
      'gray-050': string;
      'gray-100': string;
      'gray-200 ': string;
      'gray-300 ': string;
      'gray-400': string;
      'gray-500': string;
      'gray-600': string;
      'gray-700': string;
      'gray-800': string;
      'gray-900': string;
    };
    fonts: {};
  }
}
