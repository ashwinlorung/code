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

const urls = [
  "/api/1",
  "/api/2",
  "/api/3",
  "/api/4",
  "/api/5",
  "/api/6",
  "/api/7",
];

urls.forEach((url) => {
  mockFetch(url).then((result) => {
    console.log(result);
  });
});

let sequence = Promise.resolve();
urls.forEach((url) => {
  const promise = mockFetch(url);
  sequence = sequence
    .then(() => {
      return promise;
    })
    .then((result) => {
      console.log(result);
    });
});

urls.map(mockFetch).reduce((sequence, promise) => {
  return sequence
    .then((result) => {
      return promise;
    })
    .then((result) => {
      console.log(result);
    });
}, Promise.resolve());

Promise.all(urls.map(mockFetch))
  .then((value) => {
    console.log("All: " + value);
  })
  .catch((error) => {
    console.log("All: " + error);
  })
  .finally(() => console.log("----------------------"));

Promise.race(urls.map(mockFetch))
  .then((value) => {
    console.log("Race: " + value);
  })
  .catch((error) => {
    console.log("Race: " + error);
  })
  .finally(() => console.log("*********************"));

Promise.allSettled(urls.map(mockFetch))
  .then((value) => {
    console.log("AllSettled: ");
    console.log(value);
  })
  .catch((error) => {
    console.log("AllSettled: " + error);
  })
  .finally(() => console.log("----------------------"));

// use if(!(number%10)) condition
Promise.any(urls.map(mockFetch))
  .then((value) => {
    console.log("Any: " + value);
  })
  .catch((error) => {
    console.log("Any: " + error);
  })
  .finally(() => console.log("----------------------"));
