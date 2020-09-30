const MyPromise = (function(){
  function MyPromise(fn) {
    let status;
    let result;
    let error;
    const onFulfillQueue = [];
    const onFailureQueue =[];
  
    function resolve(value) {
      result = value;
      status = "fulfilled";
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

  MyPromise.prototype.then = function(handleSuccess, handleFailure) {
    onFulfilledQueue.push(handleSuccess);
    onFailureQueue.push(handleFailure);
    handleCallback(status);
  }

  MyPromise.prototype.catch = function() {

  }

  return MyPromise;
}());

const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 1000);
}).then((result) => {
  console.log(result);
});