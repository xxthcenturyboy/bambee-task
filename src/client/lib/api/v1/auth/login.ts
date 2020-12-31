import getCSRFToken from 'client/lib/getCSRFToken';
import { ProfileState } from 'shared/types/preload.interface';
import { handleNon200Response, handleFetchError } from 'client/lib/api/v1/errorHandlers';

export async function fetchLogin(email: string, password: string): Promise<ProfileState> {
  try {
    if (!email && !password) {
      throw new Error('No credentials supplied.');
    }

    const url = '/api/v1/auth/login';
    const opts: RequestInit = {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': getCSRFToken()
      },
      body: JSON.stringify({ email, password }),
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
