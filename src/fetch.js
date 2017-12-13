const {ADDRESS} = require("./const");
module.exports = {
  basicPost: (address,data,callback) => {
    data = JSON.stringify(data);
    fetch(`${ADDRESS}/${address}`, {
      method: "POST",
      headers: {
        "Content-Type": " application/json"
      },
      credentials: "include",
      mode: "cors",
      body: data
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        callback(data)
      })
      .catch(e => {
        console.log("@@@@@", e);
      });
  },
  basicGet: (address,callback) => {
    fetch(`${ADDRESS}/${address}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        callback(data)
      })
      .catch(e => {
        console.log("@@@@@", e);
      });
  }
};
