import '@emotion/react'; // it's important to use ThemeProvider

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      red050: string;
      red100: string;
      red200: string;
      red300: string;
      red400: string;
      red500: string;
      red600: string;
      red700: string;
      red800: string;
      red900: string;
      yellow500: string;
      green050: string;
      green100: string;
      green200: string;
      green300: string;
      green400: string;
      green500: string;
      green600: string;
      green700: string;
      green800: string;
      green900: string;
      blue500: string;
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
      heading24Regular: string;
      heading24Bold: string;
      heading20Regular: string;
      heading20Bold: string;
      body16Regular: string;
      body16Bold: string;
      body14Regular: string;
      body14Bold: string;
      caption12Regular: string;
      caption12Bold: string;
    };
    shadow: {
      boxShadow: string;
    };
  }
}
