import getCSRFToken from 'client/lib/getCSRFToken';
import { ProfileState } from 'shared/types/preload.interface';
import { handleNon200Response, handleFetchError } from 'client/lib/api/v1/errorHandlers';

export async function getProfile(): Promise<ProfileState> {
  try {
    const url = '/api/v1/user/profile';
    const opts: RequestInit = {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': getCSRFToken()
      },
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
