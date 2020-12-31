
import { AuthLookup } from 'client/Auth/types';
import getCSRFToken from 'client/lib/getCSRFToken';
import { handleNon200Response, handleFetchError } from 'client/lib/api/v1/errorHandlers';

export async function fetchLookup(email: string): Promise<AuthLookup> {
  try {
    if (!email) {
      throw new Error('No email to lookup!');
    }

    const url = '/api/v1/auth/lookup';
    const opts: RequestInit = {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': getCSRFToken()
      },
      body: JSON.stringify({ email })
    };
    const res = await fetch(url, opts);
    if (res.status !== 200) {
      await handleNon200Response(res);
    }
    const json: AuthLookup = await res.json();

    return json;
  } catch (err) {
    throw handleFetchError(err);
  }
}
