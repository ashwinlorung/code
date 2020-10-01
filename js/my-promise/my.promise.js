function MyPromise(executorFn) {
  Object.defineProperty(this, "_status", {
    get: function () {
      return "pending";
    },
    configurable: true
  });
  Object.defineProperty(this, "_result", {
    get: function () {
      return void 0;
    },
    configurable: true
  });
  Object.defineProperty(this, "_onFulfillQueue", { value: [] });
  Object.defineProperty(this, "_onFailureQueue", { value: [] });

  executorFn(this._resolve.bind(this), this._reject.bind(this));
}

MyPromise.prototype = Object.assign(MyPromise.prototype, {
  _resolve: function (value) {
    Object.defineProperty(this, "_result", { value: value });
    Object.defineProperty(this, "_status", { value: "fulfilled"});
    console.log(this._result);

    this._onFulfillQueue.forEach(function (onFulfill) {
      onFulfill(this._result);
    }.bind(this));
  },

  _reject: function (reason) {
    Object.defineProperty(this, "_status", "failure");
  },

  then: function (handleSuccess, handleFailure) {
    this._onFulfillQueue.push(handleSuccess);
    this._onFailureQueue.push(handleFailure);

    if(this._status === 'fulfilled') {
      this._onFulfillQueue.forEach(function(onFulfill) {
        onFulfill(this._result);
      });
    }
  },

  catch: function () {}
});

module.exports = MyPromise;