import '@emotion/react'; // it's important to use ThemeProvider

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      red: string;
      yellow: string;
      green: string;
      blue: string;
      black: string;
      white: string;
      gray050: string;
      gray100: string;
      gray200: string;
      gray300: string;
      gray400: string;
      gray500: string;
      gray600: string;
      gray700: string;
      gray800: string;
      gray900: string;
    };
    fonts: {
      body16Regular: string;
      body16Bold: string;
      body14Regular: string;
      body14Bold: string;
    };
  }
}
