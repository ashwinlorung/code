const promiseIsAsync = new Promise((resolve, reject) => {
  resolve("resolve value");
});
console.log("promise has resolved");

promiseIsAsync.then((value) => {
  console.log(value);
});

console.log("code ended");

// chaining of Promise
const promiseChain = new Promise((resolve, reject) => {
  resolve(10);
}).then((value) => {
  return value + 1;
});

promiseChain
  .then((value) => {
    return value + 1;
  })
  .then((value) => {
    return value + 1;
  })
  .then((value) => {
    console.log(value);
  });