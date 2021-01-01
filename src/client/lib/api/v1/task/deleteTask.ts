import getCSRFToken from 'client/lib/getCSRFToken';
import { handleNon200Response, handleFetchError } from 'client/lib/api/v1/errorHandlers';
import { Task } from 'client/Task/types';

export async function deleteTask(taskId: string): Promise<Task> {
  try {
    const url = `/api/v1/task/${taskId}`;
    const opts: RequestInit = {
      method: 'DELETE',
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
    const json: Task = await res.json();

    return json;
  } catch (err) {
    throw handleFetchError(err);
  }
}
