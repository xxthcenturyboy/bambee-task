import getCSRFToken from 'client/lib/getCSRFToken';
import { handleNon200Response, handleFetchError } from 'client/lib/api/v1/errorHandlers';
import { Task } from 'client/Task/types';

export async function createTask(name?: string, description?: string, dueDate?: Date): Promise<Task> {
  try {
    const url = `/api/v1/task/`;
    const opts: RequestInit = {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': getCSRFToken()
      },
      body: JSON.stringify({ name, description, dueDate })
    };
    const res = await fetch(url, opts);
    if (res.status !== 200) {
      await handleNon200Response(res);
    }
    const json: Task = await res.json();

    return json;
  } catch (err) {
    throw handleFetchError(err);
  }
}
