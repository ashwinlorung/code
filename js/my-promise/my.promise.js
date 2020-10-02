function MyPromise(executorFn) {
  Object.defineProperty(this, "_status", {
    get: function () {
      return "pending";
    },
    configurable: true,
  });
  Object.defineProperty(this, "_result", {
    get: function () {
      return void 0;
    },
    configurable: true,
  });
  Object.defineProperty(this, "_onFulfillQueue", { value: [] });
  Object.defineProperty(this, "_onFailureQueue", { value: [] });

  executorFn(this._resolve.bind(this), this._reject.bind(this));
}

MyPromise.prototype = Object.assign(MyPromise.prototype, {
  _runOnFulfillQueue: function () {
    var onFulfill;
    while (this._onFulfillQueue.length > 0) {
      onFulfill = this._onFulfillQueue.shift();
      onFulfill.promise._resolve(onFulfill.handleSuccess(this._result));
    }
  },

  _resolve: function (value) {
    Object.defineProperty(this, "_result", { value: value });
    Object.defineProperty(this, "_status", { value: "fulfilled" });
    console.log(this._result);

    this._runOnFulfillQueue();
  },

  _reject: function (reason) {
    Object.defineProperty(this, "_status", "failure");
  },

  then: function (handleSuccess, handleFailure) {
    var newPromise = new MyPromise(function () {});
    this._onFulfillQueue.push({
      promise: newPromise,
      handleSuccess: handleSuccess,
    });
    this._onFailureQueue.push(handleFailure);

    if (this._status === "fulfilled") {
      this._runOnFulfillQueue();
    }

    return newPromise;
  },

  catch: function () {},
});

module.exports = MyPromise;
