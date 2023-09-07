// Use the Supporter API to find out how much each supporter has donated

const supporterName = process.argv[2]; //supporter name as a string

function getSupporterId(supporter) {
  return fetch("https://www.few-far.co/api/techtest/v1/supporters")
    .then((response) => response.json())
    .then((body) => {
      const supporterData = body.data.find((supp) => supp.name === supporter);
      if (supporterData) {
        return supporterData.id;
      } else {
        throw new Error("Supporter not found");
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

function getSupporterDonations(supporterId) {
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
          let supporterDonations = body.data.filter(
            (donation) => donation.supporter_id === supporterId
          );
          allDonations = allDonations.concat(supporterDonations);
          page++;
          hasMore = body.has_more;
          if (hasMore) {
            return getNextPageDonations(); // recursion until has_more is false
          } else {
            return allDonations;
          }
        }
      });
  }

  return getNextPageDonations();
}

function getTotalDonation(donationsArr) {
  const total = donationsArr.reduce((acc, obj) => acc + obj.amount, 0);
  return total / 100;
}

getSupporterId(supporterName)
  .then((supporterId) => {
    return getSupporterDonations(supporterId);
  })
  .then((supporterDonations) => {
    totalDonated = getTotalDonation(supporterDonations);
    console.log(supporterDonations);
    console.log(`${supporterName} has donated a total of £${totalDonated}`);
  })
  .catch((error) => {
    console.error(error, "error3");
  });

// supporter has donated a total of xxx since xxx
