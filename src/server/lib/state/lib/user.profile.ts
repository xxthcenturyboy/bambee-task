import User from 'server/models/User';
import * as I from 'shared/types/preload.interface';

export {
  getUserAndProfileStates
};

//////////////////////////

async function getUserAndProfileStates(user: User, isAuthenticated: boolean): Promise<I.ProfileState> {

  try {
    // common items
    const id = user.id;
    const email = await user.getVerifiedEmail();

    const profile: I.ProfileState = {
      id,
      email: email || '',
      isEmailVerified: true,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return profile;
  } catch (err) {
    console.error(`Error resolving user profile: ${err}`);
    throw new Error(`Error resolving user profile: ${err}`);
  }
}
