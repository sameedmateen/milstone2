"use client";

import { useEffect, useState } from "react";

interface CoinData {
  rates?: {
    BTC?: number;
    BNB?: number;
  };
}

export default function CoinMarket() {
  const apikey = "48742b0644bafb78ae2bd972e7a36c1c";
  const [data, setData] = useState<CoinData>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://api.coinlayer.com/live?access_key=${apikey}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API error: ${res.statusText}`);
        }
        return res.json();
      })
      .then((j) => {
        console.log(`JSON Converted Data:`, j);
        setData(j);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to fetch coin data. Please try again later.");
      });
  }, []);

  return (
    <div>
      {error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <>
          <div>BTC: {data?.rates?.BTC || "Loading..."}</div>
          <div>BNB: {data?.rates?.BNB || "Loading..."}</div>
        </>
      )}
    </div>
  );
}
