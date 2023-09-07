const { getSupporterId } = require("./getAllDonations");
const fs = require("fs");
const supporterName = process.argv[2]; //supporter name as a string



function getSupporterDonations(supporterId) {
  return new Promise((resolve, reject) => {
    fs.readFile("donationsList.json", "utf8", (err, donationData) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      const totalDonation = JSON.parse(donationData)
      const supporterDonation = totalDonation.filter(
        (donation) => donation.supporter_id === supporterId
      );

      const sum = supporterDonation.reduce((acc, obj) => acc + obj.amount, 0);

      const singleSupporter = {
        name: supporterName,
        total_donated: `£${sum / 100}`,
        donations: supporterDonation
      };

      fs.writeFileSync(
        `${supporterName}Donation.json`,
        JSON.stringify(singleSupporter, null, 2)
      );
      console.log(`Data ready to view in ${supporterName}Donation.json`);
      resolve(singleSupporter);
    });
  });
}


getSupporterId(supporterName)
  .then((supporterId) => {
    return getSupporterDonations(supporterId);
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

