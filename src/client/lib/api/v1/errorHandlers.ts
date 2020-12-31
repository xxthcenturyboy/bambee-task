export type Non200Response = {
  description: string;
  message: string;
  status: number;
  url: string;
};

export const handleFetchError = (err: Error): Error => {
  if (err.message && err.message === 'Failed to fetch') {
    return new Error('Could not reach the server.');
  }

  return err;
};

export const handleNon200Response = async (res: Response): Promise<void> => {
  const data: Non200Response = await res.json();
  throw new Error(data.message);
};
