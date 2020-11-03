const getRandomNumber = (upperLimit) => {
  return Math.round(Math.random() * upperLimit);
};

const mockFetch = (url, { body }) => {
  return new Promise((resolve, reject) => {
    const number = getRandomNumber(5000);
    console.log("Request made : " + number);
    setTimeout(() => {
      console.log("Response received : " + number);
      const usersInfo = body.ids.map((id) => {
        return {
          userId: id,
          name: getRandomNumber(5000).toString(36),
        };
      });
      resolve(usersInfo);
    }, number);
  });
};

//fetchUsers
const fetchUser = batchFetchUser((ids) => {
  return mockFetch("asssets/ids", {
    method: "POST",
    body: { type: "USER", ids },
  });
});

function batchFetchUser(callback) {
  const threshold = 5;
  let userIds = [];
  const userPromiseResolvers = {};
  let count = 0;
  let timer;

  function triggerFetch() {
    callback(userIds).then((response) => {
      response.forEach((user) => {
        userPromiseResolvers[user.userId](user);
      });
    });
    count = 0;
    userIds = [];
  }

  return function (userId) {
    let resolver;
    const newPromise = new Promise((resolve) => {
      resolver = resolve;
    });
    if (count >= threshold) {
      triggerFetch();
    }

    if (count < threshold) {
      userIds.push(userId);
      userPromiseResolvers[userId] = resolver;
      count++;

      clearTimeout(timer);
      timer = setTimeout(triggerFetch, 1000);
    }

    return newPromise;
  };
}

function printUserInfo({ userId, name }) {
  console.log(`user id: ${userId}, username: ${name}`);
}

const userIds = [1, 2, 3, 4, 5, 6, 7, 8];

userIds.forEach((id) => {
  fetchUser(id).then(printUserInfo);
});

setTimeout(() => {
  fetchUser(9).then(printUserInfo);
}, 600);

setTimeout(() => {
  fetchUser(10).then(printUserInfo);
}, 5000);