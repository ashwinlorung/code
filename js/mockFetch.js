const getRandomNumber = (upperLimit) => {
  return Math.round(Math.random() * upperLimit);
};

const mockFetch = (url) => {
  return new Promise((resolve, reject) => {
    const number = getRandomNumber(5000);
    console.log("Request made : " + number);
    setTimeout(() => {
      console.log("Response received : " + number);
      if (number % 10) {
        resolve(`"${url}" returned: ${number}`);
        return;
      }
      reject(`"${url}" rejected: ${number}`);
    }, number);
  });
};

module.exports = mockFetch;