import getCSRFToken from 'client/lib/getCSRFToken';
import { handleNon200Response, handleFetchError } from 'client/lib/api/v1/errorHandlers';
import { TaskListResponse, TaskStatus } from 'shared/types/tasks';

export async function getTaskList(
  status: TaskStatus,
  sortField: string,
  sortDir: string,
  limit: number,
  offset: number
): Promise<TaskListResponse> {
  try {
    const url = `/api/v1/task/list/${status}/${sortField}/${sortDir}/${limit}/${offset}`;
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
    const json: TaskListResponse = await res.json();

    return json;
  } catch (err) {
    throw handleFetchError(err);
  }
}
