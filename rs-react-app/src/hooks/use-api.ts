import dataFetch from '@/api/api-request';
import { useEffect, useState } from 'react';
import type { FetchResult } from '@/types/types';

const cache = new Map<string, FetchResult>();

const useApi = (generatedError: Error | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchResult, setFetchResult] = useState<FetchResult>();
  const [fetchError, setFetchError] = useState<Error | null>(generatedError);
  const [requestUrl, setRequestUrl] = useState('');

  useEffect(() => {
    const dataRequest = async () => {
      if (cache.has(requestUrl)) {
        setFetchResult(cache.get(requestUrl));
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setFetchError(null);
        const result = await dataFetch(requestUrl);
        cache.set(requestUrl, result);
        setFetchResult(result);
      } catch (error) {
        if (error instanceof Error) {
          setFetchError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (requestUrl) {
      dataRequest();
    }
  }, [requestUrl]);

  useEffect(() => {
    setFetchError(generatedError);
  }, [generatedError]);

  return { loading, fetchResult, fetchError, setRequestUrl, setFetchError };
};

export default useApi;
