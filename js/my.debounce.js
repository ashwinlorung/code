const debounce = (fn, time) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, time);
  };
};

const logger = debounce((val) => console.log("I am called: " + val), 500);

logger("Ashwin");
logger("Rai");

