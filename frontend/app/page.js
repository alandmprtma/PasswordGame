"use client"
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Head from 'next/head';
import { checkPasswordRules } from '../utils/passwordrule.js';

export default function Home() {
  const [password, setPassword] = useState('');
  const [countrule, setCountrule] = useState(0);
  const [rule1, setRule1] = useState(false);
  const [rule2, setRule2] = useState(false);
  const [rule3, setRule3] = useState(false);
  const [rule4, setRule4] = useState(false);
  const [rule5, setRule5] = useState(false);
  const [rule6, setRule6] = useState(false);
  const [rule7, setRule7] = useState(false);
  const [rule8, setRule8] = useState(false);
  const [rule9, setRule9] = useState(false);
  const [rule10, setRule10] = useState(false);
  const [isBurning, setIsBurning] = useState(false);
  const [firstBurn, setFirstBurn] = useState(true);
  const [countdownFire, setCountdownFire] = useState(0);

  useEffect(() => {
    let prevCountrule = countrule;
    let intervalId;

    const checkRules = () => {
      checkPasswordRules(countrule, setCountrule, password, setRule1, setRule2, setRule3, setRule4, setRule5, setRule6, setRule7, setRule8, setRule9, setRule10, setIsBurning, isBurning, setCountdownFire, countdownFire);
      if (prevCountrule !== countrule) {
        prevCountrule = countrule;
      } else {
        clearInterval(intervalId);
      }
    };

    intervalId = setInterval(checkRules, 100);

    return () => clearInterval(intervalId);
  }, [password, countrule]);

  const handleChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    if (countrule === 0) {
      setCountrule(1);
    }
  };

  const replaceAt = (string, index, replacement) => {
    return string.substring(0, index-1) + replacement + string.substring(index + 1);
  };

  useEffect(() => {
      if (isBurning) {
          setFirstBurn(true);
          const burnInterval = setInterval(() => {
              setPassword((prevPassword) => {
                  if (prevPassword.includes('🔥')) {
                      let lastIndex = prevPassword.lastIndexOf('🔥');
                      let newPassword = replaceAt(prevPassword, lastIndex, '🔥');
                      return newPassword.slice(0, -1);
                  } else if (prevPassword.length > 0) {
                      return prevPassword.slice(0, -1) + '🔥';
                  } else {
                      setIsBurning(false);
                      setRule10(true);
                      clearInterval(burnInterval);
                      return prevPassword;
                  }
              });
          }, 3000); // Set your desired interval here

          return () => clearInterval(burnInterval);
      }
  }, [isBurning]);

  useEffect(() => {
    if (firstBurn && isBurning) {
        setFirstBurn(false);
    } else if (!password.includes('🔥') && isBurning) {
        setIsBurning(false);
        setRule10(true);
        console.log("konyol")
    }
}, [firstBurn, isBurning, password]);


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

        <div className=" relative w-full max-w-sm">
          <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
            Please choose a password
          </label>
          <input
            id="password"
            value={password}
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
           <span className="absolute right-3 top-12 text-gray-500">{password.length}</span>
        </div>
        <div>
          {countrule >= 1 && (
            <div
                className={`mt-4 p-4 border rounded text-black w-[600px] ${
                  rule1 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                }`}
            >
              <h5 className="text-lg font-semibold">Rule 1</h5>
              <p>Your password must be at least 5 characters.</p>
            </div>
          )}

            {countrule >= 2 && (
              <div
                  className={`mt-4 p-4 border rounded text-black w-[600px] ${
                    rule2 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                  }`}
              >
                <h5 className="text-lg font-semibold">Rule 2</h5>
                <p>Your password must include a number.</p>
              </div>
            )}
            {countrule >= 3 && (
              <div
                  className={`mt-4 p-4 border rounded text-black w-[600px] ${
                    rule3 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                  }`}
              >
                <h5 className="text-lg font-semibold">Rule 3</h5>
                <p>Your password must include an uppercase letter.</p>
              </div>
            )}
            {countrule >= 4 && (
              <div
                  className={`mt-4 p-4 border rounded text-black w-[600px] ${
                    rule4 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                  }`}
              >
                <h5 className="text-lg font-semibold">Rule 4</h5>
                <p>Your password must include a special character.</p>
              </div>
            )}

            {countrule >= 5 && (
              <div
                  className={`mt-4 p-4 border rounded text-black w-[600px] ${
                    rule5 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                  }`}
              >
                <h5 className="text-lg font-semibold">Rule 5</h5>
                <p>Digits must add up to 25.</p>
              </div>
            )}
            {countrule >= 6 && (
              <div
                  className={`mt-4 p-4 border rounded text-black w-[600px] ${
                    rule6 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                  }`}
              >
                <h5 className="text-lg font-semibold">Rule 6</h5>
                <p>Your password must include a month of the year.</p>
              </div>
            )}
            {countrule >= 7 && (
              <div
                  className={`mt-4 p-4 border rounded text-black w-[600px] ${
                    rule7 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                  }`}
              >
                <h5 className="text-lg font-semibold">Rule 7</h5>
                <p>Your password must include a Roman numeral.</p>
              </div>
            )}
            {countrule >= 8 && (
              <div
                  className={`mt-4 p-4 border rounded text-black w-[600px] ${
                    rule8 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                  }`}
              >
                <h5 className="text-lg font-semibold">Rule 8</h5>
                <p>Your password must include one of this country.</p>
              </div>
            )}
            {countrule >= 9 && (
              <div
                  className={`mt-4 p-4 border rounded text-black w-[600px] ${
                    rule9 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                  }`}
              >
                <h5 className="text-lg font-semibold">Rule 9</h5>
                <p>The Roman numerals in your password should multiply to 35.</p>
              </div>
            )}
            {countrule >= 10 && (
              <div
                  className={`mt-4 p-4 border rounded text-black w-[600px] ${
                    rule10 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                  }`}
              >
                <h5 className="text-lg font-semibold">Rule 10</h5>
                <p>Oh no! Your password is on fire 🔥. Quick, put it out!</p>
              </div>
            )}
        </div>
      </main>
    </div>
  );
}