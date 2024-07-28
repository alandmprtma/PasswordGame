"use client"
import React, { useEffect,  useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const [highestScore, setHighestScore] = useState(0);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get-score')
      .then(response => response.json())
      .then(data => {
        console.log('score fetched:', data);
        setHighestScore(data);
      })
      .catch(error => {
        console.error('Error fetching score:', error);
      });
  }, []);
  
  return (
    
    
    <div className="flex flex-col justify-center pt-[30px] min-h-screen bg-yellow-50">
      <img src="/security.png" alt="Logo" className="ml-12 mb-8 w-24 h-24" />
      <Head>
        <title>The Password Game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold mb-8">
          The Password Game
        </h1>
        <div className='bg-yellow-200 p-1 px-10 rounded border border-yellow-500 text-black w-fit'>
            <h2 className="text-2xl font-bold mb-2">Highest Score</h2>
            <p className="text-xl font-bold">{highestScore.score}</p>
          </div>
            <div className="flex space-x-[200px] mt-[80px]">
            <Link href="/easy" className="bg-green-200 border-green-500 text-green-700 font-bold text-2xl p-2 px-[30px] rounded border-[2px] hover:bg-green-300 hover:border-green-600">
            EASY
          </Link>
          <Link href="/normal" className="bg-blue-200 border-blue-500 text-blue-700 font-bold text-2xl p-2 px-[30px] rounded border-[2px] hover:bg-blue-300 hover:border-blue-600">
            NORMAL
          </Link>
          <Link href="/hard" className="bg-red-200 border-red-500 text-red-700 font-bold text-2xl p-2 px-[30px] rounded border-[2px] hover:bg-red-300 hover:border-red-600">
            HARD
          </Link>
        </div>

      </main>
    </div>
  );
}