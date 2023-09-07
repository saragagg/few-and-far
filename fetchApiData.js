const fs = require("fs");

function getSupporters() {
  return fetch("https://www.few-far.co/api/techtest/v1/supporters")
    .then((response) => response.json())
    .then((body) => {
      fs.writeFileSync(
        "supportersList.json",
        JSON.stringify(body.data, null, 2)
      );
      console.log("Data ready to view in supportersList.json");
      return body.data;
    })
    .catch((err) => console.log(err));
}

// Returns a list of supporters objects

function getAllDonations() {
  let allDonations = [];
  let page = 1;
  let hasMore = true;

  function getNextPageDonations() {
    return fetch(
      `https://www.few-far.co/api/techtest/v1/donations?page=${page}`
    )
      .then((response) => response.json())
      .then((body) => {
        if (body.data && body.data.length > 0) {
          let donations = body.data;
          allDonations = allDonations.concat(donations);
          page++;
          hasMore = body.has_more;
          if (hasMore) {
            return getNextPageDonations(); // recursion until has_more is false
          } else {
            fs.writeFileSync(
              "donationsList.json",
              JSON.stringify(allDonations, null, 2)
            );
            console.log("Data ready to view in donationsList.json");
            return allDonations;
          }
        }
      });
  }

  return getNextPageDonations();
}

// returns a list of donations objects


module.exports = { getSupporters, getAllDonations }