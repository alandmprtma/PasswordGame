export function value(r) {
    switch (r) {
      case 'I': return 1;
      case 'V': return 5;
      case 'X': return 10;
      case 'L': return 50;
      case 'C': return 100;
      case 'D': return 500;
      case 'M': return 1000;
      default: return -1;
    }
  }
  
  export function romanToDecimal(str) {
    let res = 0;
    for (let i = 0; i < str.length; i++) {
      const s1 = value(str[i]);
      if (i + 1 < str.length) {
        const s2 = value(str[i + 1]);
        if (s1 >= s2) {
          res = res + s1;
        } else {
          res = res + s2 - s1;
          i++;
        }
      } else {
        res = res + s1;
      }
    }
    return res;
  }