"use client"
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Head from 'next/head';
import { checkPasswordRules } from '../../utils/passwordruleHard.js';

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
  const [rule11, setRule11] = useState(false);
  const [rule12, setRule12] = useState(false);
  const [rule13, setRule13] = useState(false);
  const [rule14, setRule14] = useState(false);
  const [rule15, setRule15] = useState(false);
  const [rule16, setRule16] = useState(false);
  const [rule17, setRule17] = useState(false);
  const [rule18, setRule18] = useState(false);
  const [rule19, setRule19] = useState(false);
  const [rule20, setRule20] = useState(false);
  const [isBurning, setIsBurning] = useState(false);
  const [firstBurn, setFirstBurn] = useState(true);
  const [countdownFire, setCountdownFire] = useState(0);
  const [idBendera, setIdBendera] = useState([]);
  const [checkBendera, setCheckBendera] = useState(false);
  const [countries, setCountries] = useState([]);
  const [captcha, setCaptcha] = useState([]);
  const [IRK, setIRK] = useState([]);
  const [idCaptcha, setIdCaptcha] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [wormCount, setWormCount] = useState(0);
  const [digitPercentage, setDigitPercentage] = useState(0);
  const [isFeeding, setIsFeeding] = useState(false);
  const [restrictedLetter1, setRestrictedLetter1] = useState('');
  const [restrictedLetter2, setRestrictedLetter2] = useState('');
  const [currentScore, setCurrentScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);

  const removeWorms = (password, count) => {
    let newPassword = password;
    for (let i = 0; i < count; i++) {
      const wormIndex = newPassword.indexOf('🐛');
      if (wormIndex !== -1) {
        newPassword = newPassword.slice(0, wormIndex) + newPassword.slice(wormIndex + 2);
        console.log(newPassword.slice(0, wormIndex))
        console.log(newPassword.slice(wormIndex + 1))
      }
    }
    return newPassword;
  };

  useEffect(() => {
    fetch('http://127.0.0.1:5000/country')
      .then(response => response.json())
      .then(data => {
        console.log('Countries fetched:', data);
        setCountries(data);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/textcaptcha')
      .then(response => response.json())
      .then(data => {
        console.log('captcha fetched:', data); 
        setCaptcha(data);
      })
      .catch(error => {
        console.error('Error fetching captcha:', error);
      });
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/irk')
      .then(response => response.json())
      .then(data => {
        console.log('irk fetched:', data);
        setIRK(data);
      })
      .catch(error => {
        console.error('Error fetching irk:', error);
      });
  }, []);

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


  useEffect(() => {
    let scoreInterval;
  
    if (!isGameOver && !win) {
      scoreInterval = setInterval(() => {
        setCurrentScore(prevScore => {
          const newScore = prevScore - 10;
          return newScore < 0 ? 0 : newScore; // Pastikan skor tidak negatif
        });
      }, 8000); // 8 detik
    }
  
    return () => {
      if (scoreInterval) {
        clearInterval(scoreInterval); // Bersihkan interval saat komponen unmount
      }
    };
  }, [isGameOver, win]); // Tambahkan `isGameOver` dan `win` ke dalam dependensi


  useEffect(() => {
    let wormInterval;
  
    if (rule14) {
      setIsFeeding(true); // Start feeding (removal of worms)
  
      wormInterval = setInterval(() => {
        setWormCount(prevWormCount => {
          const newWormCount = prevWormCount - 3;
          if (newWormCount < 0) {
            setIsGameOver(true);
            setRule14(false);
            clearInterval(wormInterval); // Stop interval if game is over
          }
          return newWormCount;
        });
        
        // The state update happens here in the next render cycle
        setPassword(prevPassword => removeWorms(prevPassword, 3));
        
      }, 10000); // Every 10 seconds
  
    } else {
      setIsFeeding(false); // Stop feeding when Rule 14 is not active
      if (wormInterval) {
        clearInterval(wormInterval);
      }
    }
  
    return () => {
      if (wormInterval) {
        clearInterval(wormInterval);
      }
    };
  }, [rule14, password]);


  useEffect(() => {
    let prevCountrule = countrule;
    let intervalId;

    const checkRules = async () => {
      await checkPasswordRules(countrule, setCountrule, password, setPassword, setRule1, setRule2, setRule3, setRule4, setRule5, setRule6, setRule7, setRule8, setRule9, setRule10, setRule11, rule11, setRule12, setRule13, setRule14, setRule15, setRule16, setRule17, setRule18, setRule19, setRule20, setCurrentScore, currentScore, highestScore, setHighestScore, restrictedLetter1, restrictedLetter2, setRestrictedLetter1, setRestrictedLetter2, setIsGameOver, setWin, idBendera, countries, idCaptcha, captcha, IRK, setIsBurning, isBurning, firstBurn, setFirstBurn, setDigitPercentage, setCountdownFire, countdownFire, setWormCount);
      if (prevCountrule !== countrule) {
        prevCountrule = countrule;
      } else {
        if(countrule === 8 && !checkBendera) {
          console.log(idBendera);
          // Memasukan tiga bilangan bulat acak antara 1 dan 10 ke dalam idBendera menggunakan setIdBendera
          const randomIdsSet = new Set();
          while (randomIdsSet.size < 3) {
              randomIdsSet.add(Math.floor(Math.random() * 10) + 1);
          }

          const randomIds = Array.from(randomIdsSet);
          setIdBendera(randomIds);
          console.log(randomIds);
          setCheckBendera(true);
        }
        clearInterval(intervalId);
      }
    };

    intervalId = setInterval(checkRules, 100);

    return () => clearInterval(intervalId);
  }, [password, countrule]);

  const handleChange = (event) => {
    const newPassword = event.target.value;
  
    if (countrule >= 15 && restrictedLetter1.length !== 0 && restrictedLetter2.length !== 0) {
      // Filter out restricted letters from the new password
      const filteredPassword = newPassword.split('').filter(char => char !== restrictedLetter1 && char !== restrictedLetter2).join('');
  
      setPassword(filteredPassword);
    } else {
      setPassword(newPassword);
    }
  
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
          }, 2000); // Set your desired interval here

          return () => clearInterval(burnInterval);
      }
  }, [isBurning]);

//   useEffect(() => {
// }, [firstBurn, isBurning, password]);

  const handleCaptchaRefresh = () => {
    setIdCaptcha((prevIdCaptcha) => prevIdCaptcha + 1);
  };

  return (
    
    
    <div className="flex flex-col justify-center pt-[30px] min-h-screen bg-yellow-50">
      <a href="/">
      <img src="/security.png" alt="Logo" className="ml-12 mb-8 w-24 h-24"/>
      </a>
      <Head>
        <title>The Password Game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center w-full flex-1 px-20 text-center">
      {!win && (
        <div className='bg-violet-200 p-1 px-10 rounded border border-violet-500 text-black w-fit mb-[25px]'>
          <h2 className="text-2xl font-bold mb-2">Current Score</h2>
          <p className="text-xl font-bold">{currentScore}</p>
        </div>
      )}
      <div className="flex text-2xl justify-start font-bold mb-2 text-blue-500 py-[3px] px-[12px] border-black border-[5px]">
        <h2>NORMAL</h2>
      </div>
        <h1 className="text-4xl font-bold mb-8">
          The Password Game
        </h1>
      
        {win ? (
          <div className='flex flex-col items-center'>
          <div className='bg-green-100 p-4 rounded border border-green-500 text-black w-[600px]'>
            <h2 className="text-2xl font-bold mb-2">Congratulations! You have won the game!</h2>
            <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-blue-100 border-blue-500 font-semibold text-black rounded">
              Restart Game
            </button>
          </div>
          <img src="/trophy.png" alt="Logo" className=" w-[300px]" />
          <div className='bg-violet-200 p-1 px-10 rounded border border-violet-500 text-black w-fit mb-[25px]'>
          <h2 className="text-2xl font-bold mb-2">Final Score</h2>
          <p className="text-xl font-bold">{currentScore}</p>
          </div>
          <div className='bg-yellow-200 p-1 px-10 rounded border border-yellow-500 text-black w-fit'>
            <h2 className="text-2xl font-bold mb-2">Highest Score</h2>
            <p className="text-xl font-bold">{highestScore.score}</p>
        </div>
          </div>
        ) :isGameOver ? (
          <div className="bg-red-100 p-4 rounded border border-red-500 text-black w-[600px]">
            <h2 className="text-2xl font-bold mb-4">Game Over</h2>
            <p></p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-green-100 border-green-500 text-black rounded"
            >
              Restart Game
            </button>
          </div>
        ) : (
          <div className="relative w-full max-w-sm">
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
        )}
        <div>
          {countrule >= 1 && !isGameOver && !win && (
            <div
                className={`mt-4 mb-2 p-4 border rounded text-black w-[600px] ${
                  rule1 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                }`}
            >
              <h5 className="text-lg font-semibold">Rule 1</h5>
              <p>Your password must be at least 10 characters.</p>
            </div>
          )}

            {countrule >= 2 && !isGameOver && !win && (
              <div
                  className={`mt-2 mb-2 border rounded text-black w-[600px] ${
                    rule2 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                  }`}
              >
                <h5 className="text-lg font-semibold">Rule 2</h5>
                <p>Your password must include a number.</p>
              </div>
            )}
            {countrule >= 3 && !isGameOver && !win && (
              <div
                  className={`mt-2 mb-2 p-4 border rounded text-black w-[600px] ${
                    rule3 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                  }`}
              >
                <h5 className="text-lg font-semibold">Rule 3</h5>
                <p>Your password must include an uppercase letter.</p>
              </div>
            )}
            {countrule >= 4 && !isGameOver && !win && (
              <div
                  className={`mt-2 mb-2 p-4 border rounded text-black w-[600px] ${
                    rule4 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                  }`}
              >
                <h5 className="text-lg font-semibold">Rule 4</h5>
                <p>Your password must include a special character.</p>
              </div>
            )}

            {countrule >= 5 && !isGameOver && !win && (
              <div
                  className={`mt-2 mb-2 p-4 border rounded text-black w-[600px] ${
                    rule5 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                  }`}
              >
                <h5 className="text-lg font-semibold">Rule 5</h5>
                <p>Digits must add up to 18.</p>
              </div>
            )}
            {countrule >= 6 && !isGameOver && !win && (
              <div
                  className={`mt-2 mb-2 p-4 border rounded text-black w-[600px] ${
                    rule6 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                  }`}
              >
                <h5 className="text-lg font-semibold">Rule 6</h5>
                <p>Your password must include a month of the year.</p>
              </div>
            )}
            {countrule >= 7 && !isGameOver && !win && (
              <div
                  className={`mt-2 mb-2 p-4 border rounded text-black w-[600px] ${
                    rule7 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                  }`}
              >
                <h5 className="text-lg font-semibold">Rule 7</h5>
                <p>Your password must include a Roman numeral.</p>
              </div>
            )}
            {countrule >= 8 && !isGameOver && !win && (
              <div
                  className={`mt-2 mb-2 p-4 border rounded text-black w-[600px] ${
                    rule8 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                  }`}
              >
                <h5 className="text-lg font-semibold">Rule 8</h5>
                <p>Your password must include one of this country.</p>
                <div className="flex space-x-4 mt-4 justify-around">
                {idBendera.map((id) => (
                  <img
                    key={id}
                    src={`http://127.0.0.1:5000/flag/${id}`}
                    alt={`Flag ${id}`}
                    className="h-16 object-cover"
                  />
                ))}
              </div>
              </div>
            )}
            {countrule >= 9 && !isGameOver && !win && (
              <div
                  className={`mt-2 mb-2 p-4 border rounded text-black w-[600px] ${
                    rule9 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                  }`}
              >
                <h5 className="text-lg font-semibold">Rule 9</h5>
                <p>The Roman numerals in your password should multiply to 49.</p>
              </div>
            )}
            {countrule >= 10 && !isGameOver && !win && (
              <div
                  className={`mt-2 mb-2 p-4 border rounded text-black w-[600px] ${
                    rule10 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                  }`}
              >
                <h5 className="text-lg font-semibold">Rule 10</h5>
                <p>Oh no! Your password is on fire 🔥. Quick, put it out!</p>
              </div>
            )}
             {countrule >= 11 && !isGameOver && !win && (
              <div
                  className={`mt-2 mb-2 p-4 border rounded text-black w-[600px] ${
                    rule11 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                  }`}
              >
                <h5 className="text-lg font-semibold">Rule 11</h5>
                <p> 🥚 This is my chicken Paul. He hasn't hatched yet. Please put him in your password and keep him safe</p>
              </div>
            )}
            {countrule >= 12 && !isGameOver && !win && (
              <div
                  className={`mt-2 mb-2 p-4 border rounded text-black w-[600px] ${
                    rule12 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                  }`}
              >
                <h5 className="text-lg font-semibold">Rule 12</h5>
                <p>Your password must include this CAPTCHA</p>
                <div className="flex items-center space-x-4 mt-4 justify-around">
                <img
                    key={idCaptcha}
                    src={`http://127.0.0.1:5000/captcha/${idCaptcha}`}
                    alt={`Flag ${idCaptcha}`}
                    className="h-16 object-cover"
                  />
                   <button
                      onClick={handleCaptchaRefresh}
                      className="px-1 h-8 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Refresh
                    </button>
                </div>
              </div>
            )}
            {countrule >= 13 && !isGameOver && !win && (
              <div
                  className={`mt-2 mb-2 p-4 border rounded text-black w-[600px] ${
                    rule13 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                  }`}
              >
                <h5 className="text-lg font-semibold">Rule 13</h5>
                <p> Your password must include a leap year</p>
              </div>
            )}
            {countrule >= 14 && !isGameOver && !win && (
            <div
              className={`mt-2 mb-2 p-4 border rounded text-black w-[600px] ${
                rule14 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
              }`}
            >
              <h5 className="text-lg font-semibold">Rule 14</h5>
              <p>🐔 Paul has hatched! Please don't forget to feed him. He eats 3 🐛 every 10 seconds.</p>
              {rule14 && (
                <p>Current worm count: {wormCount}</p>
              )}
            </div>
          )}
          {countrule >= 15 && !isGameOver && !win && (
            <div
              className={`mt-2 mb-2 p-4 border rounded text-black w-[600px] ${
                rule15 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
              }`}
            >
              <h5 className="text-lg font-semibold">Rule 15</h5>
              <p>A sacrifice must be made. Pick 2 letters that you will no longer be able to use</p>
              <div className="flex items-center space-x-4 mt-4 justify-around">
              <label className="block mb-2 text-lg font-medium">
                  Restricted Letter 1:
                  <input
                    type="text"
                    value={restrictedLetter1}
                    onChange={(e) => setRestrictedLetter1(e.target.value)}
                    maxLength={1}
                    className="ml-2 border border-black px-2 py-1 rounded"
                  />
                </label>
                
                <label className="block mb-2 text-lg font-medium">
                  Restricted Letter 2:
                  <input
                    type="text"
                    value={restrictedLetter2}
                    onChange={(e) => setRestrictedLetter2(e.target.value)}
                    maxLength={1}
                    className="ml-2 border border-black px-2 py-1 rounded"
                  />
                </label>
              </div>
            </div>
          )}
           {countrule >= 16 && !isGameOver && !win && (
            <div
              className={`mt-2 mb-2 p-4 border rounded text-black w-[600px] ${
                rule16 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
              }`}
            >
              <h5 className="text-lg font-semibold">Rule 16</h5>
              <p>Your password must contain one of the following words: I want IRK | I need IRK | I love IRK</p>
            </div>
          )}
          {countrule >= 17 && !isGameOver && !win && (
            <div
              className={`mt-4 p-4 border rounded text-black w-[600px] ${
                rule17 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
              }`}
            >
              <h5 className="text-lg font-semibold">Rule 17</h5>
              <p>At least 15% of your password must be in digits</p>
              <p>Current digit percentage: {digitPercentage}%</p>
            </div>
          )}
          {countrule >= 18 && !isGameOver && !win && (
            <div
              className={`mt-2 mb-2 p-4 border rounded text-black w-[600px] ${
                rule18 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
              }`}
            >
              <h5 className="text-lg font-semibold">Rule 18</h5>
              <p>Your password must include the length of your password</p>
            </div>
          )}
          {countrule >= 19 && !isGameOver && !win && (
            <div
              className={`mt-2 mb-2 p-4 border rounded text-black w-[600px] ${
                rule19 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
              }`}
            >
              <h5 className="text-lg font-semibold">Rule 19</h5>
              <p>The length of your password must be a prime number</p>
            </div>
          )}
           {countrule >= 20 && !isGameOver && !win && (
            <div
              className={`mt-2 mb-4 p-4 border rounded text-black w-[600px] ${
                rule20 ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
              }`}
            >
              <h5 className="text-lg font-semibold">Rule 20</h5>
              <p> Your password must include the current time</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}