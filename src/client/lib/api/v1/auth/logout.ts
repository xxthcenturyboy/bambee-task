import getCSRFToken from 'client/lib/getCSRFToken';
import { handleNon200Response, handleFetchError } from 'client/lib/api/v1/errorHandlers';

export async function fetchLogout(): Promise<boolean> {
  try {
    const url = '/api/v1/auth/logout';
    const opts: RequestInit = {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': getCSRFToken()
      },
    };
    const res = await fetch(url, opts);
    if (res.status === 302) {
      // redirects on success;
      return true;
    }
    if (res.status !== 200) {
      await handleNon200Response(res);
    }

    return true;
  } catch (err) {
    throw handleFetchError(err);
  }
}
