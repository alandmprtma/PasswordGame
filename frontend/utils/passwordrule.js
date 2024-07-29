import { value, romanToDecimal } from './romantodecimal.js';
import {isPrime} from './prime.js';
import {getCurrentTimeFromAPI} from './currentTime.js';
import {containKMP} from './KMP.js';
import {containBM} from './BM.js';
import axios from 'axios';

export async function checkPasswordRules(countrule, setCountrule, password, setPassword, setRule1, setRule2, setRule3, setRule4, setRule5, setRule6, setRule7, setRule8, setRule9, setRule10, setRule11, Rule11, setRule12, setRule13, setRule14, setRule15, setRule16, setRule17, setRule18, setRule19, setRule20, setCurrentScore, currentScore, highestScore, setHighestScore, restrictedLetter1, restrictedLetter2, setRestrictedLetter1, setRestrictedLetter2, setIsGameOver, setWin, idBendera, countries, idCaptcha, captcha, IRK, setIsBurning, IsBurning, firstBurn, setFirstBurn, setDigitPercentage, setCountdownFire, countdownFire, setWormCount) {    
    let check = true;
    for(let i=1; i <= countrule; i++){

        // Rule 1: Password must be at least 5 characters
        if (i === 1) {
            if (password.length >= 5) {
                setRule1(true);
            } else {
                setRule1(false);
                check = false;
            }
        }

        // Rule 2: Password must include a number
        if (i === 2) {
            if (/\d/.test(password)) {
                setRule2(true);
            } else {
                if (containKMP(password, "cheat")){
                    setPassword(password.replace("cheat", "1"));
                }
                else{
                    setRule2(false);
                    check = false;
                }
            }
        }

        // Rule 3: Password must include an uppercase letter
        if (i === 3) {
            if (/[A-Z]/.test(password)) {
                setRule3(true);
            } else {
                if (containKMP(password, "cheat")){
                    setPassword(password.replace("cheat", "A"));
                }
                else{
                    setRule3(false);
                    check = false;
                }
            }
        }

        // Rule 4: Password must include a special character
        if (i === 4) {
            if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                setRule4(true);
            } else {
                if (containKMP(password, "cheat")){
                    setPassword(password.replace("cheat", "!"));
                }
                else{
                    setRule4(false);
                    check = false;
                }
            }
        }

        // Rule 5: Digits must add up to 25
        if (i === 5) {
            // const digitSum = password
            //     .split('')
            //     .filter(char => /\d/.test(char))
            //     .reduce((sum, digit) => sum + parseInt(digit), 0);

            const digitsInPassword = password.split('').filter(char => /\d/.test(char));
            const digitSum = digitsInPassword.reduce((sum, digit) => sum + parseInt(digit), 0);

            if (digitSum === 25) {
                setRule5(true);
            } else {
                if (containKMP(password, "cheat")) {
                    let newPassword = password;
        
                    // Hitung jumlah digit yang perlu diubah
                    let digitsNeeded = 25 - digitSum;
        
                    if (digitsNeeded > 0) {
                        // Menambahkan digit jika kurang dari 25
                        let additionalDigits = '';
                        while (digitsNeeded > 0) {
                            if (digitsNeeded >= 9) {
                                additionalDigits += '9';
                                digitsNeeded -= 9;
                            } else {
                                additionalDigits += digitsNeeded.toString();
                                digitsNeeded = 0;
                            }
                        }
                        newPassword = newPassword.replace("cheat", additionalDigits);
                    } else if (digitsNeeded < 0) {
                        // Mengurangi digit jika lebih dari 25
                        const digitsToRemove = -digitsNeeded;
                        const digitsToKeep = digitsInPassword.slice(0, digitsInPassword.length - digitsToRemove);
                        newPassword = newPassword.split('').filter(char => !/\d/.test(char))
                                                .concat(digitsToKeep)
                                                .join('');
                    }
        
                    setPassword(newPassword);
                    setRule5(true); // Anggap cheat sudah memperbaiki password
                } else {
                    setRule5(false);
                    check = false;
                }
            }
        }

        // Rule 6: Password must include a month of the year
        if (i === 6) {
            const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
            const lowerCasePassword = password.toLowerCase();
            if (months.some(month => containBM(lowerCasePassword, month))) {
                setRule6(true);
            } else {
                if (containKMP(password, "cheat")) {
                    setPassword(password.replace("cheat", "january"));
                }
                else{
                    setRule6(false);
                    check = false;
                }
            }
        }

        // Rule 7: Password must include a Roman numeral
        if (i === 7) {
            const romanNumerals = ["I", "V", "X", "L", "C", "D", "M"];
            if (romanNumerals.some(numeral => containKMP(password, numeral))) {
                setRule7(true);
            } else {
                if (containKMP(password, "cheat")) {
                    setPassword(password.replace("cheat", "I"));
                }
                else{
                    setRule7(false);
                    check = false;
                }
            }
        }

        // Rule 8: Password must include one of the countries (this part will need a database or hardcoded values)
        if (i === 8) {
            const lowerCasePassword = password.toLowerCase();
            const countryMatch = idBendera.some(id => {
                const country = countries.find(country => country.id === id);
                return country && containKMP(lowerCasePassword, country.nama_negara.toLowerCase());
            });

            if (countryMatch) {
                setRule8(true);
            } else {
                if (containKMP(password, "cheat")) {
                    // Ambil nama negara dari salah satu idBendera
                    const countryToUse = countries.find(country => country.id === idBendera[0]);
                    if (countryToUse) {
                        const countryName = countryToUse.nama_negara;
                        // Ganti "cheat" dengan nama negara
                        const newPassword = password.replace("cheat", countryName);
                        setPassword(newPassword);
                    }
                }
                else {
                    setRule8(false);
                    check = false;
                }
            }
        }
        // Rule 9: Roman numerals must multiply to 35
        if (i === 9) {
            const romanNumerals = password.split('').filter(char => value(char) !== -1);
            const isValid = romanNumerals.some((numeral, index) => {
                let substring = numeral;
                let decimalValue = value(numeral);

                for (let j = index + 1; j < romanNumerals.length; j++) {
                    substring += romanNumerals[j];
                    decimalValue = romanToDecimal(substring);
                    if (decimalValue % 35 === 0) {
                        return true;
                    }
                }
                return false;
            });

            if (isValid) {
                setRule9(true);
            } else {
                if (containKMP(password, "cheat")) {
                    setPassword(password.replace("cheat", "XXXV"));
                }
                else{
                    setRule9(false);
                    check = false;
                }
            }
        }

        // Rule 10: Password is on fire
        if (i === 10 && countrule >= 10) {
            setCountdownFire(countdownFire + 1);
            
            if ((countdownFire >= 15 || countrule === 10) && !IsBurning) {
                setIsBurning(true);
                setRule10(false);
                setCountdownFire(0);
            } else {
                if (firstBurn && IsBurning) {
                    setFirstBurn(false);
                } else if (!containKMP(password, '🔥') && IsBurning) {
                    setIsBurning(false);
                    setRule10(true);
                }
            }
        
            // Implementasi cheat
            if (containKMP(password, "cheat")) {
                // Ganti "cheat" dengan password tanpa emoji api
                const newPassword = password.replace(/🔥/g, '').replace("cheat", '');
                setPassword(newPassword);
                setIsBurning(false);
                setRule10(true); // Asumsikan cheat sudah memperbaiki password
                setCountdownFire(0);
            }
        
            console.log(countrule);
            console.log(countdownFire);
        }

        if (i === 11) {
            if (containBM(password, '🥚')) {
              setRule11(true);
            }
            else if (Rule11  && countrule < 14) {
                setIsGameOver(true);
            }
            else {
              if (countrule >= 14)
              {
                setRule11(true);
              }
              else{
                if (containBM(password, 'cheat')) {
                    setPassword(password.replace("cheat", "🥚"));
                }
                else{
                    setRule11(false);
                    check = false;
                }
              }
            }
          }
          if (i === 12) {
            const captchaMatch = captcha.find(c => c.id === idCaptcha);
            console.log(captchaMatch)
            if (password.includes(captchaMatch.text_captcha)) {
                setRule12(true);
            } else {
                if (password.includes("cheat")) {
                    setPassword(password.replace("cheat", captchaMatch.text_captcha));
                }
                else{
                    setRule12(false);
                    check = false;
                }
            }
          }
          if (i === 13) {
            const leapYearRegex = /\d+/g;

            const matches = password.match(leapYearRegex);
            console.log(matches)
            let isLeapYear = false;

            if (matches) {
                for (const match of matches) {
                    const year = parseInt(match, 10);
                    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
                        isLeapYear = true;
                        break;
                    }
                }
            }

            if (isLeapYear) {
                setRule13(true);
            } else {
                if (containKMP(password, "cheat")) {
                    setPassword(password.replace("cheat", "2024"));
                    console.log("masuk");
                }
                else{
                    setRule13(false);
                    check = false;
                }
            }
        }
        if (i === 14) {
            const initialWormCount = (password.match(/🐛/g) || []).length;
            setWormCount(initialWormCount);
            if (containBM(password, "cheat") && initialWormCount <= 5) {
                const updatedPassword = password.replace("cheat", "🐛🐛🐛🐛🐛");
                setPassword(updatedPassword);
                setRule14(true);
            }
            if (countrule === 14){
                const updatedPassword = password.replace(/🥚/g, '🐔');
                setPassword(updatedPassword);
                setRule14(true);
            }
            else if (password.includes('🐔')) {
                setRule14(true);
            }
            else{
                setRule14(false);
                setIsGameOver(true);
                check = false;
            }
        }
        if (i === 15) {
          if(restrictedLetter1.length != 0 && restrictedLetter2.length != 0){
            setRule15(true);
          } else {
            if (containBM(password, "cheat")) {
                // Temukan dua huruf yang tidak ada dalam password
                const alphabet = 'abcdefghijklmnopqrstuvwxyz';
                const passwordLower = password.toLowerCase();
                let letter1 = '';
                let letter2 = '';
                console.log("masuk")
    
                for (let char of alphabet) {
                    if (!containBM(passwordLower,char)) {
                        if (!letter1) {
                            letter1 = char;
                        } else if (!letter2) {
                            letter2 = char;
                            break;
                        }
                    }
                }
    
                if (letter1 && letter2) {
                    // Ganti "cheat" dengan string kosong
                    const newPassword = password.replace("cheat", '');
                    setPassword(newPassword);
    
                    // Atur restrictedLetter1 dan restrictedLetter2
                    setRestrictedLetter1(letter1);
                    setRestrictedLetter2(letter2);
                    setRule15(true);
                } else {
                    setRule15(false);
                    check = false;
                }
            } else {
                setRule15(false);
                check = false;
            }
          }
        }
        if (i === 16) {
            for (let i = 1; i <= 3; i++) {
                const irk = IRK.find(c => c.id === i);
                if (containBM(password,irk.text_irk)) {
                    setRule16(true);
                    break;
                }
                else 
                {
                    if (containBM(password,"cheat")) {
                        setPassword(password.replace("cheat", "I want IRK"));
                    }
                    else{
                        setRule16(false);
                        check = false;
                    }
                }
            }
        }
        if (i === 17) {
            const totalLength = password.length;
            const digitCount = password.split('').filter(char => /\d/.test(char)).length;
            const digitPercentage = ((digitCount / totalLength) * 100).toFixed(2);
            setDigitPercentage(digitPercentage);
            if (digitPercentage >= 10) {
              setRule17(true);
            } else {
                if (containBM(password, "cheat")) {
                    // Hitung jumlah digit yang diperlukan untuk mencapai 10%
                    const requiredDigitsCount = Math.ceil((0.10 * totalLength - digitCount) / (1 - 0.10));
                    let digitsToAdd = '';
                    
                    // Tambahkan digit yang diperlukan
                    for (let j = 0; j < requiredDigitsCount; j++) {
                        digitsToAdd += '0'; // Menggunakan angka 9
                    }
                    
                    // Ganti "cheat" dengan angka-angka yang diperlukan
                    const newPassword = password.replace("cheat", digitsToAdd);
                    setPassword(newPassword);
                    
                    // Hitung ulang persentase digit
                    const newTotalLength = newPassword.length;
                    const newDigitCount = newPassword.split('').filter(char => /\d/.test(char)).length;
                    const newDigitPercentage = ((newDigitCount / newTotalLength) * 100).toFixed(2);
                    setDigitPercentage(newDigitPercentage);
                    
                    if (newDigitPercentage >= 10) {
                        setRule17(true);
                    } else {
                        setRule17(false);
                        check = false;
                    }
                } else {
                    setRule17(false);
                    check = false;
                }
            }
          }
          if (i === 18) {
            const passwordLength = password.length.toString();
      
            if (password.includes(passwordLength)) {
              setRule18(true);
            } else {
                if (password.includes("cheat")) {
                    // Ganti "cheat" dengan panjang password setelah penggantian
                    const cheatLength = "cheat".length;
                    const newPasswordLength = password.length - cheatLength + passwordLength.length;
                    const newPasswordLengthStr = newPasswordLength.toString();
        
                    const newPassword = password.replace("cheat", newPasswordLengthStr);
                    setPassword(newPassword);
        
                    // Cek ulang apakah panjang password sekarang termasuk dalam password
                    if (containBM(newPassword,newPasswordLengthStr)) {
                        setRule18(true);
                    } else {
                        setRule18(false);
                        check = false;
                    }
                } else {
                    setRule18(false);
                    check = false;
                }
            }
          }
        // Rule 19: The length of your password must be a prime number
        if (i === 19) {
            const passwordLength = password.length;
            
            if (isPrime(passwordLength)) {
                console.log("masuk")
                setRule19(true);
            } else {
                if (containBM(password, "cheat")) {
                    let newPassword = password.replace("cheat", "");
                    let newLength = newPassword.length;
        
                    // Tambahkan atau kurangi karakter untuk mencapai panjang prima
                    while (!isPrime(newLength)) {
                        if (newLength < 25) {
                            newPassword += 'x'; // Tambahkan karakter untuk mencapai panjang prima
                        } else {
                            newPassword = newPassword.slice(0, -1); // Kurangi karakter untuk mencapai panjang prima
                        }
                        newLength = newPassword.length;
                    }
        
                    // Atur password baru dan cek ulang panjangnya
                    setPassword(newPassword);
                    if (isPrime(newPassword.length)) {
                        setRule19(true);
                    } else {
                        setRule19(false);
                        check = false;
                    }
                } else {
                    setRule19(false);
                    check = false;
                }
            }
        }
        if (i === 20) {
            const currentTime = await getCurrentTimeFromAPI();
            if (!currentTime) {
                console.error('Failed to get current time from API.');
                return;
            }
            else{
                console.log(currentTime)
                if ( containBM(password,currentTime)) {
                setRule20(true);
                } else {
                if (containBM(password, "cheat")) {
                    const newPassword = password.replace("cheat", currentTime);
                    setPassword(newPassword);
                    setRule20(true);
                } else {
                    setRule20(false);
                    check = false;
                }
                }
            }
          }
        if(i === 21){
            if (check){
                setWin(true);
                try {
                    await axios.post('http://127.0.0.1:5000/update-score', { score: currentScore + 100 });
                    if (currentScore + 100 > highestScore) {
                        setHighestScore(currentScore + 100);
                    }
                } catch (error) {
                    console.error('Failed to send score to backend:', error);
                }
            }
            else{
                check = false;
            }
        }
    }
    if (check){
        setCountrule(countrule + 1);
        setCurrentScore(currentScore+100);
    }
  }

