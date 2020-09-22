// multiple cases with promise
const asyncDivide = (dividend, divisor) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (divisor === 0) {
        reject(new Error("Cannot divide by 0"));
        return;
      }

      try {
        if (divisor > dividend) {
          throw new Error("Divisor cannot be greater than dividend");
        }
        resolve(dividend / divisor);
      } catch (e) {
        reject(new Error(`Error while dividing: ${e.message}`));
      }
    }, 200);
  });
};

const roundOff = (number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Number.isInteger()) {
        resolve(number);
        return;
      }

      try {
        if (number < 5) {
          resolve(Math.ceil(number));
        } else {
          resolve(Math.floor(number));
        }
      } catch (e) {
        reject(new Error(`Error while rounding off: ${number}`));
      }
    }, 200);
  });
};

asyncDivide(16, 3)
  .then(roundOff, (error) => {
    console.log(error.message);
    throw error;
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error.message);
  })
  .finally(() => {
    console.log(`Done dividing`);
  });
