import { value, romanToDecimal } from './romantodecimal.js';

export function checkPasswordRules(countrule, setCountrule, password, setRule1, setRule2, setRule3, setRule4, setRule5, setRule6, setRule7, setRule8, setRule9, setRule10, setIsBurning, IsBurning, setCountdownFire, countdownFire) {
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
                setRule2(false);
                check = false;
            }
        }

        // Rule 3: Password must include an uppercase letter
        if (i === 3) {
            if (/[A-Z]/.test(password)) {
                setRule3(true);
            } else {
                setRule3(false);
                check = false;
            }
        }

        // Rule 4: Password must include a special character
        if (i === 4) {
            if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                setRule4(true);
            } else {
                setRule4(false);
                check = false;
            }
        }

        // Rule 5: Digits must add up to 25
        if (i === 5) {
            const digitSum = password
                .split('')
                .filter(char => /\d/.test(char))
                .reduce((sum, digit) => sum + parseInt(digit), 0);

            if (digitSum === 25) {
                setRule5(true);
            } else {
                setRule5(false);
                check = false;
            }
        }

        // Rule 6: Password must include a month of the year
        if (i === 6) {
            const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
            const lowerCasePassword = password.toLowerCase();
            if (months.some(month => lowerCasePassword.includes(month))) {
                setRule6(true);
            } else {
                setRule6(false);
                check = false;
            }
        }

        // Rule 7: Password must include a Roman numeral
        if (i === 7) {
            const romanNumerals = ["I", "V", "X", "L", "C", "D", "M"];
            if (romanNumerals.some(numeral => password.includes(numeral))) {
                setRule7(true);
            } else {
                setRule7(false);
                check = false;
            }
        }

        // Rule 8: Password must include one of the countries (this part will need a database or hardcoded values)
        if (i === 8) {
            const countries = ["Country1", "Country2", "Country3", /* add more countries here */];
            if (countries.some(country => password.includes(country))) {
                setRule8(true);
            } else {
                setRule8(false);
                check = false;
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
                setRule9(false);
                check = false;
            }
        }

        // Rule 10: Password is on fire
        if (i === 10 && countrule >= 10) {
            setCountdownFire(countdownFire+1);
            if ((countdownFire >= 15 || countrule === 10) && !IsBurning) {
              setIsBurning(true);
              setRule10(false);
              setCountdownFire(0);
            }
            console.log(countrule)
            console.log(countdownFire)
            
        }

        if (i === 11){
            check = false;
        }
    }
    if (check){
        setCountrule(countrule + 1);
    }
  }