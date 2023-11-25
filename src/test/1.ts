let promise = new Promise((res, rej) => {
  res(13);
})
  .then((data) => {
    console.log(data);

    new Promise((res, rej) => {
      res(7);
    }).then((data) => {
      console.log(data);
      return 1;
    });
  })
  .then((res) => {
    console.log(res);
  });
