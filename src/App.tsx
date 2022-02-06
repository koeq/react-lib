import React, { useEffect, useState } from "react";
import "./App.css";
import { useFetch } from "./utils/useFetch";

const getData = async (
  url: string,
  setData: React.Dispatch<React.SetStateAction<undefined>>
) => {
  const res = await fetch(url);
  const result = await res.json();
  setData(result);
};

function App() {
  const url = "https://api.github.com/users/koeq";
  const { data, status } = useFetch(url);

  return (
    <div className="App">
      <h2>useFetch demo</h2>
      {status === "loading" ? (
        "loading..."
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;
