import { useState, useEffect } from 'react';


export function useFetch(method, resourcePath, requestBody, delay=1) {
  const [response, setResponse] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const url = `${process.env.REACT_APP_API_URL}${resourcePath}`;
    const options = {
      method: method,
      credentials: 'include',
      signal: abortController.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: method !== 'get'? JSON.stringify(requestBody): undefined
    }


    setTimeout(() => {
      fetch(url, options)
        .then(res => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          setResponse(data);
          setIsPending(false);
        })
        .catch((error) => {
          if (error.name === 'AbortError') {
            console.log('Request aborted');
          } else {
            setError(error.message);
            setIsPending(false);
          }
        });
    }, 1000 * delay);

    return () => abortController.abort();
  }, [resourcePath]);

  return [response, isPending, error];
}
