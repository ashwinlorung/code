function MyPromise(fn) {
  const states = {
    PENDING: "PENDING",
    FULFILLED: "FULFILLED",
    REJECTED: "REJECTED"
  }
  let state;
  let result;
  let error;
  let onFulfilled;
  let onFailure;

  function handleCallback(state) {
    if(state === states.FULFILLED) {
      onFUlfilled(result);
    } else if(state === states.REJECTED) {
      onFailure(error);
    }
  }
  
  this.then = function(handleSuccess, handleFailure) {
    onFulfilled = handleSuccess;
    onFailure = onFailure;
    handleCallback(state);
  }

  this.catch = function() {

  }

  function resolve(value) {
    result = value;
    state = "fulfilled";
    if(onFulfilled) {
      onFulfilled(result);
    }
  }
  
  function reject(err) {
    error = err;
    if(onFailure){
      onFailure(error);
    }
  }
  
  fn(resolve, reject);
}

const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 1000);
}).then((result) => {
  console.log(result);
});