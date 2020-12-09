/**
 * Input : abaabbabb
 * Palindrome substrings : a, b, aa, bb, aba, bab, baab, abba, bbabb
 * Output : 9
 */

function countPalindromeSubstrings(string) {
  const chars = string.split("");
  const palindromes = {};
  return chars.reduce((count, char, index) => {
    let i = index - 1;
    let j = index + 1;
    let step = 0;
    // palindromes[char] = palindromes[char] ? palindromes[char] + 1 : 1;
    while (i >= 0 && j < chars.length && chars[i] === chars[j]) {
      count++;
      i--;
      j++;
    }
    return count;
  }, 0);
}

// bb, abba
console.log(countPalindromeSubstrings('baab'));


