import { ProfileState } from 'shared/types/preload.interface';

/**
 * Redux State
 */
export type State = {
  /**
   * User profile contains almost all info relevant to users
   */
  profile: ProfileState | null;
  isFetchingProfile: boolean;
  fetchProfileError: string;
  didInvalidateProfile: boolean;
};
