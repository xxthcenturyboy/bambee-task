export interface PreloadedState {
  app: AppState;
  user: ProfileState | {};
}
export interface AppState {
  csrfToken: any;
  APP_HOST: string;
  esId: string;
}
export interface SettingsState {
  RECAPTCHA_SITE_KEY: string;
}
export interface ProfileState {
  id: string;
  email: string;
  isEmailVerified: boolean;
  firstName: string;
  lastName: string;
}
