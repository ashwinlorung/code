const { onFinish } = require("tape");

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
  _runOnFulfillHandlers: function () {
    while (this._onFulfillQueue.length > 0) {
      var onFulfill = this._onFulfillQueue.shift();
      try {
        var returnValue = onFulfill.handleSuccess(this._result);
      } catch(e) {
        onFulfill.promise._reject(e);
      }

      // can use result.constructor.name or result.hasOwnProperty('then')
      if (returnValue && returnValue instanceof MyPromise) {
        returnValue
          .then(function (r) {
            onFulfill.promise._resolve(r);
          })
          .catch(function (e) {
            onFulfill.promise._reject(e);
          });
      } else {
        onFulfill.promise._resolve(returnValue);
      }
    }
  },

  _runOnFailureHandlers: function () {
    while (this._onFailureQueue.length > 0) {
      var onFailure = this._onFailureQueue.shift();

      try {
        var returnValue = onFailure.handleFailure(this._reason);
      } catch (e) {
        onFailure.promise._reject(e);
      }

      if (returnValue && returnValue instanceof MyPromise) {
        returnValue
          .then(function (r) {
            onFailure.promise._resolve(r);
          })
          .catch(function (e) {
            onFailure.promise._reject(e);
          });
      } else {
        onFailure.promise._reject(returnValue);
      }
    }
  },

  _resolve: function (value) {
    if (this._status === "pending") {
      Object.defineProperty(this, "_result", { value: value });
      Object.defineProperty(this, "_status", { value: "fulfilled" });

      this._runOnFulfillHandlers();
    }
  },

  _reject: function (reason) {
    if (this._status === "pending") {
      Object.defineProperty(this, "_reason", { value: reason });
      Object.defineProperty(this, "_status", { value: "failure" });

      this._runOnFailureHandlers();

      while (this._onFailureQueue.length > 0) {
        onFailure = this._onFailureQueue.shift();
        onFailure.promise._reject(this._reason);
      }
    }
  },

  then: function (handleSuccess, handleFailure) {
    var newPromise = new MyPromise(function () {});
    this._onFulfillQueue.push({
      promise: newPromise,
      handleSuccess: handleSuccess,
    });
    if (typeof handleFailure === "function") {
      this._onFailureQueue.push({
        promise: newPromise,
        handleFailure: handleFailure,
      });
    }

    if (this._status === "fulfilled") {
      this._runOnFulfillHandlers();
    } else if (this._status === "failure") {
      newPromise._reject(this._reason);
    }

    return newPromise;
  },

  catch: function (handleFailure) {
    var newPromise = new MyPromise(function () {});
    this._onFailureQueue.push({
      promise: newPromise,
      handleFailure: handleFailure,
    });

    if (this._status === "failure") {
      this._runOnFailureHandlers();
    }

    return newPromise;
  },
});

module.exports = MyPromise;
