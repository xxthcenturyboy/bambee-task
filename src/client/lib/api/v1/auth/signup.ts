import getCSRFToken from 'client/lib/getCSRFToken';
import { ProfileState } from 'shared/types/preload.interface';
import { handleNon200Response, handleFetchError } from 'client/lib/api/v1/errorHandlers';

export async function fetchSignup(email: string, password: string, passwordConfirm: string): Promise<ProfileState> {
  try {
    if (password !== passwordConfirm) {
      throw new Error('Passwords must match.');
    }

    const url = '/api/v1/auth/signup';
    const opts: RequestInit = {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': getCSRFToken()
      },
      body: JSON.stringify({ email, password, passwordConfirm }),
    };
    const res = await fetch(url, opts);
    if (res.status !== 200) {
      await handleNon200Response(res);
    }
    const json: ProfileState = await res.json();

    return json;
  } catch (err) {
    throw handleFetchError(err);
  }
}
