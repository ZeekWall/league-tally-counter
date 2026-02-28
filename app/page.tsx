"use client";

import { useState } from "react";

type PersonResult = Record<string, any>;

export default function Home() {
  const [result, setResult] = useState<PersonResult>({});

  async function handleClick(person: string) {
    const res = await fetch(`/api/matches?player=${person.toLowerCase()}`);
    const data = await res.json();
    setResult((prev) => ({
      ...prev,
      [person]: data,
    }));
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold underline">Matches</h1>
      {["Zach", "Ben", "Kevin", "Dustin"].map((person) => (
        <div key={person} className="flex flex-row items-center gap-2">
          <button onClick={() => handleClick(person)}>
            Get {person}&apos;s Matches
          </button>
          <h2>{JSON.stringify(result[person]?.matchIds[0], null, 2)}</h2>
        </div>
      ))}
    </div>
  );
}
