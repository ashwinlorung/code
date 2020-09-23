const getRandomNumber = (upperLimit) => {
  return Math.round(Math.random() * upperLimit);
}

const mockFetch = (url) => {
  return new Promise((resolve, reject) => {
    const number = getRandomNumber(100);
    setTimeout(() => {
      console.log("Number: " + number)
      if(number%2) {
        reject(`"${url}" rejected: ${number}`);
        return;
      }

      resolve(`"${url}" returned: ${number}`);
    }, number);
  });
}

const urls = ["/api/1", "/api/2", "/api/3", "/api/4", "/api/5", "/api/6", "/api/7"];

Promise.all(urls.map(mockFetch)).then(value => {
  console.log("All: " + value);
}).catch(error => {
  console.log("All: " + error.message);
})

for(let i = 0; i<1; i++) {
  setTimeout(() => {
    Promise.race(urls.map(mockFetch)).then(value => {
      console.log("Race: " + value);
    }).catch(error => {
      console.log("Race: " + error.message);
    });
  }, 2000);
}
