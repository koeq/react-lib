import { useRef, useState, useEffect } from "react";

interface FetchedStatusData {
  status: string;
  data: unknown;
}

interface Cache {
  [key: string]: any;
}
// useState version
export const useFetch = (url: string | undefined): FetchedStatusData => {
  const cache = useRef<Cache>({});
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState();

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setStatus("loading");

      if (cache.current[url]) {
        setData(cache.current[url]);
        setStatus("fetched");
      } else {
        try {
          const res = await fetch(url);
          const result = await res.json();
          cache.current[url] = data;
          setData(result);
          setStatus("fetched");
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchData();
  }, [url]);
  return { data, status };
};

// useReducer version
