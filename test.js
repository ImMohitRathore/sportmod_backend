const findAnagrams = function (s, p) {
  let i = 0;
  let j = p.length;
  let str = "";
  let final = [];
  while (j <= s.length) {
    while (i < j) {
      str = str + s[i];
      i++;
    }
    if (i == j) {
      j++;
      i = j - p.length;
    }
    let match = matchval(str, p);

    console.log("math", str, p, match);
    str = "";

    if (match) {
      final.push(i - 1);
    }
    // j++;
  }

  return final;
};

const matchval = (str, mainstr) => {
  // If the lengths of the strings are not equal, they cannot be permutations of each other
  if (str.length !== mainstr.length) {
    return false;
  }

  // Create frequency counters for both strings
  let frequencyCounter1 = {};
  let frequencyCounter2 = {};

  // Count the frequency of each character in mainstr
  for (let i = 0; i < mainstr.length; i++) {
    let char = mainstr[i];
    if (frequencyCounter1[char]) {
      frequencyCounter1[char]++;
    } else {
      frequencyCounter1[char] = 1;
    }
  }

  // Count the frequency of each character in str
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (frequencyCounter2[char]) {
      frequencyCounter2[char]++;
    } else {
      frequencyCounter2[char] = 1;
    }
  }

  // Compare the frequency counters
  for (let char in frequencyCounter1) {
    if (frequencyCounter1[char] !== frequencyCounter2[char]) {
      return false;
    }
  }

  return true;
};

// Test cases
console.log(matchval("abc", "bca")); // true
console.log(matchval("abc", "bda")); // false

let s = "baa";
let p = "aa";

// findAnagrams(s, p);

function characterReplacement(s, k) {
  // Your code goes here
  let frequencyCounter1 = {};
  for (let i = 0; i < s.length; i++) {
    let char = s[i];
    if (frequencyCounter1[char]) {
      frequencyCounter1[char]++;
    } else {
      frequencyCounter1[char] = 1;
    }
  }

  let max = 0;
  for (let char in frequencyCounter1) {
    if (max < frequencyCounter1[char]) {
      max = frequencyCounter1[char];
    }
    console.log("ccc", frequencyCounter1[char], max);
  }

  return max + k;
  console.log("frequencyCounter1", frequencyCounter1);
}

let sl = "AABABBA";
let k = 1;

console.log(characterReplacement(sl, k));
