"use client";

import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<string>("");

  async function handleClick(person: string) {
    const res = await fetch(`/api/matches?player=${person}`);
    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold underline">Matches</h1>
      <div className="flex flex col items-center justify-center">
        <button onClick={() => handleClick("zach")}>Get Zach&apos;s Matches</button>
        <h2>{result}</h2>
      </div>
      <div className="flex flex col items-center justify-center">
        <button onClick={() => handleClick("ben")}>Get Ben&apos;s Matches</button>
        <h2>{result}</h2>
      </div>
      <div className="flex flex col items-center justify-center">
        <button onClick={() => handleClick("kevin")}>Get Kevin&apos;s Matches</button>
        <h2>{result}</h2>
      </div>
      <div className="flex flex col items-center justify-center">
        <button onClick={() => handleClick("dustin")}>Get Dustin&apos;s Matches</button>
        <h2>{result}</h2>
      </div>
    </div>
  );
}
