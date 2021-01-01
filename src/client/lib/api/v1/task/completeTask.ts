import getCSRFToken from 'client/lib/getCSRFToken';
import { handleNon200Response, handleFetchError } from 'client/lib/api/v1/errorHandlers';
import { Task } from 'client/Task/types';

export async function completeTask(taskId: string): Promise<Task> {
  try {
    const url = `/api/v1/task/complete`;
    const opts: RequestInit = {
      method: 'PUT',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': getCSRFToken()
      },
      body: JSON.stringify({ id: taskId })
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
