import 'styled-components';
import colors from 'client/UI/colors';

type ProjectTheme = {
  darkColor: string;
  lightColor: string;
  accentColor: string;
  invert?: boolean;
  invertHero?: boolean;
  backgroundColor: string;
  gradient: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {

    colors: typeof colors;

    /* Available on projects */
    project?: ProjectTheme;
  }
}