import { useState, useEffect } from 'react';

export const useFetch = (url, verb = 'GET') => {
  const [result, setResult] = useState({data: null, loading: true});
  
  useEffect(() => {
    setResult(result => ({data: result.data, loading: true}));
    fetch(url, { method: verb })
        .then(x => x.json())
        .then(y => {
            console.log(y);
            setResult({data: y, loading: false});
        });
  }, [url, verb]);

  return result;
}