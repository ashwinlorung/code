const throttle = (fn, wait) => {
  let lastInvokedOn;
  return function(...args){
    let time = Date.now();
    if(lastInvokedOn && time - lastInvokedOn < wait) {
      return;
    }
    
    lastInvokedOn = time;
    fn(...args);
  }
}

const logger = (i) => console.log("Logging: " + i);
const throttledLogger = throttle(logger, 100);

let i = 0;
const timer = setInterval(() => {
  throttledLogger(i++);
}, 50);

setTimeout(() => {
  clearInterval(timer);
}, 2000);
