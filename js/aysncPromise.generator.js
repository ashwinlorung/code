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

function spawn(generatorFunc) {
  function continuer(verb, arg) {
    var result;
    try {
      result = generator[verb](arg);
    } catch (err) {
      return Promise.reject(err);
    }
    if (result.done) {
      return result.value;
    } else {
      return Promise.resolve(result.value).then(onFulfilled, onRejected);
    }
  }
  var generator = generatorFunc();
  var onFulfilled = continuer.bind(continuer, "next");
  var onRejected = continuer.bind(continuer, "throw");
  return onFulfilled();
}

spawn(function* () {
  const result = yield mockFetch("/fetch/data");

  const promises = urls.map(mockFetch);
  for (let promise of promises) {
    const res = yield promise;
    console.log(res);
  }
});
