# 🔐 The Password Game
## 📝 Application Description
### Overview
My Password Game application is an engaging and challenging game designed to test users' skills in creating secure and compliant passwords. The game progressively introduces rules that the user's password must satisfy. Utilizing advanced pattern matching algorithms such as regex, Knuth-Morris-Pratt (KMP), and Boyer-Moore (BM), this game provides a comprehensive and educational experience in password creation.

### Game Mechanics
1. <b>Incremental Rule Application:</b> Each rule is introduced one after the other as the player meets the previous rule. If a password does not comply with the active rules, a message is displayed highlighting the specific error.
2. <b>Error Highlighting:</b> Incorrect characters in the password are highlighted in red to indicate the exact location of the mistake.

### Rules
1. <b>Minimum Length:</b> The password must be at least X characters long.
2. <b>Numeric Inclusion:</b> The password must include at least one number.
3. <b>Uppercase Letter:</b> The password must include at least one uppercase letter.
4. <b>Special Character:</b> The password must include at least one special character.
5. <b>Digit Sum:</b> The digits in the password must add up to X.
6. <b>Month Inclusion:</b> The password must include the name of a month.
7. <b>Roman Numeral:</b> The password must include a Roman numeral.
8. <b>Country Flag:</b> The password must include one of the displayed country flags (10 flags in total, X displayed per session).
9. <b>Roman Numeral Product:</b> The Roman numerals in the password should multiply to X.
10. <b>Fire Emoji:</b> A fire emoji will burn (delete) one letter every X seconds starting from the end until all are replaced by fire emojis. Random reappearance of fire emojis requires the player to remove them continuously.
11. <b>Egg Emoji:</b> An egg emoji must be included and remain un-deleted in the password. Deleting it results in a loss.
12. <b>CAPTCHA Inclusion:</b> The password must include a correct CAPTCHA image from a set of seven, refreshed upon request.
13. <b>Leap Year:</b> The password must include a leap year.
14. <b>Chicken Emoji:</b> The egg emoji hatches into a chicken emoji, and the player must include at least Y worm emojis every X seconds. Failing to do so results in a loss.
15. <b>Letter Sacrifice:</b> The player must choose X letters that cannot be used in the password.
16. <b>Specific Phrases:</b> The password must contain one of the following phrases: "I want IRK," "I need IRK," or "I love IRK."
17. <b>Digit Percentage:</b> At least X% of the password must be digits.
18. <b>Password Length:</b> The password must include its own length.
19. <b>Prime Length:</b> The length of the password must be a prime number.
20. <b>Current Time:</b> The password must include the current time.


### Special Features
- <b>Cheat Command:</b> Typing "cheat" provides an automatic correct solution for all active rules, continuing the existing password.
- <b>Scoring System:</b> Scores are based on time, password quality, or a combination. Scores are updated in real-time and the final score is displayed along with the highest score achieved.
- <b>Difficulty Levels:</b> Three difficulty levels (easy, medium, hard) with distinct and significant differences in challenges. Variable parameters like X and Y are adjusted to increase difficulty.

### Winning and Losing Condition
Players win by satisfying all 20 rules. They lose if they fail to meet the criteria of any rule, especially unique ones like the egg/chicken emoji conditions. This Password Game application is designed to provide an educational yet entertaining experience, helping users understand the importance of secure password practices while engaging in a fun challenge.

## 💻 Tech Stacks
### Programming Language
- Python
- Javascript

### Front-End
- Node.js
- React
- Next.js
- Axios (Fetch API)
- CSS / Tailwind CSS
- React Hooks

### Back-End
- Flask
- Flask-CORS
- MySQL (MariaDB)
- OS Environment Variables

## 🗂️ Program Structure
```bash
PasswordGame/
├── backend/
│   ├── app.py
│   ├── passwordgame.sql
│   └── requirement.txt
├── frontend/
│   ├── .next/
│   ├── app/
│   │   ├── easy/
│   │   │   └── page.js
│   │   ├── hard/
│   │   │   └── page.js
│   │   ├── normal/
│   │   │   └── page.js
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   ├── node_modules/
│   ├── public/
│   └── utils/
│       ├── BM.js
│       ├── currentTime.js
│       ├── KMP.js
│       ├── passwordrule.js
│       ├── passwordruleEasy.js
│       ├── passwordruleHard.js
│       ├── prime.js
│       └── romantodecimal.js
└── README.md
```

## 🧙 Algorithms
### Regular Expressions (Regex)
- <b>Usage:</b> Regex is used to check for patterns in strings, such as the presence of numbers, uppercase letters, lowercase letters, or special characters in a password. 
- <b>Reason:</b> Regex is very efficient and straightforward in checking for the presence or specific patterns in a string, making it ideal for validating simple rules in passwords.

### Knuth-Morris-Pratt (KMP)
- <b>Usage:</b> The KMP algorithm is used to check for the presence of a specific substring in a password, especially for rules such as the presence of the word "cheat".
- <b>Reason:</b> KMP is an efficient string matching algorithm with a time complexity of O(n + m), where n is the length of the text and m is the length of the pattern. It avoids repeated searches, making it faster for repeated string matching.

### Boyer-Moore (BM)
- <b>Usage:</b> The BM algorithm is used for string searching, such as checking for the presence of months, Roman numerals, or CAPTCHA text in passwords.
- <b>Reason:</b> BM is very efficient for string matching on large texts with an average time complexity of O(n/m), where n is the length of the text and m is the length of the pattern. This makes it ideal for searching long substrings.

### Roman Numeral Conversion
- <b>Usage:</b> The `romanToDecimal` function is used to convert Roman numerals in a password to decimal numbers. 
- <b>Reason:</b> To check rules involving Roman numerals (such as the rule that Roman numerals must be multiples of 35), this conversion is necessary.

### Prime Number Check
- <b>Usage:</b> The `isPrime` function is used to check whether the password length is a prime number.
- Reason: </b> The rule requires the password length to be a prime number, so an efficient function is needed to check primeness.

## 🛠️ Configuration Guide
### Front-End Configuration
1. Clone the repository to your local files. Access the repository [here](repository-link).
2. Open the terminal and ensure that the directory is set to `PasswordGame/frontend`.
3. Make sure to install Node.js. You can access the Node.js Installer [here](https://nodejs.org/en/download/package-manager). Make sure to add PATH during installation on your device.
4. Run `npm install` to activate the React-JS framework and any dependencies needed by the website locally.
5. Execute `npm run dev`.

### Database Configuration
1. Access MariaDB by executing `mysql -u root -p` on command prompt.
2. Create the database by running `create database passwordgame;` on MariaDB Server.
3. Exit MariaDB by execute `exit;` and import the dump file by run the following `mysql -u root -p passwordgame < passwordgame.sql`.
4. There are python file named `app.py` in `PasswordGame/backend` directory, set the host, user, password, and port compatible with your device.

### Back-End Configuration
1. Make sure to install Python Programming Language. You can access the Python Programming Language Installer [here](https://www.python.org/downloads/). Make sure to add PATH during installation on your device.
2. change the directory to `PasswordGame/backend`.
3. After the Python Programming Language is successfully installed, execute `pip install -r requirements.txt`.
4. After dependencies are successfully installed, run the backend by executing `python app.py` on the terminal.

## 🏃‍♂️ How To Run
1. Access The Password Game website page at http://localhost:3000.
2. You can choose the game difficulty mode start from EASY, NORMAL, and HARD.
4. Once you click the game difficulty mode that you desire, you can start the game and see the current score at the top side of the website.

## 📸 Screenshots
<div align="center">
  <img src="./home.png" alt="Home Page" width="250"/>
  <p><i>Home Page</i></p>
</div>
<div align="center">
  <img src="./easy.png" alt="Easy Mode" width="250"/>
  <p><i>Easy Mode</i></p>
</div>
<div align="center">
  <img src="./normal.png" alt="Normal Mode" width="250"/>
  <p><i>Normal Mode</i></p>
</div>
<div align="center">
  <img src="./hard.png" alt="Hard Mode" width="250"/>
  <p><i>Hard Mode</i></p>
</div>
<div align="center">
  <img src="./win.png" alt="Win Condition" width="250"/>
  <p><i>Win Condition</i></p>
</div>
<div align="center">
  <img src="./gameover.png" alt="Lose Condition" width="250"/>
  <p><i>Lose Condition</i></p>
</div>

## 📚 Reference
- https://neal.fun/password-game/
- https://informatika.stei.itb.ac.id/~rinaldi.munir/Stmik/2023-2024/stima23-24.htm#SlideKuliah
- https://fakecaptcha.com/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
- https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/
- https://www.geeksforgeeks.org/boyer-moore-algorithm-for-pattern-searching/
- https://www.geeksforgeeks.org/roman-number-to-integer/