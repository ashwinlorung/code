Function.prototype.myBind = function (thisArg, ...rest) {
  const that = this;
  return function (...customArgs) {
    that.call(thisArg, ...rest, ...customArgs);
  };
};

const foo = {
  fname: "Ashwin",
  lname: "rai",
  city: "darjeeling",
};

function details(phoneNumber, country) {
  console.log(this.fname, this.lname, this.city, phoneNumber, country);
}

const myFunc = details.myBind(foo, 7676404633);
myFunc("India");
