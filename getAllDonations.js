const fs = require("fs");

function getSupporterId(supporter) {
  return new Promise((resolve, reject) => {
    fs.readFile("supportersList.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      const supporters = JSON.parse(data);
      const supporterData = supporters.find((supp) => supp.name === supporter);
      if (supporterData) {
        resolve(supporterData.id);
      } else {
        reject(new Error("Supporter not found"));
      }
    });
  });
}

function getTotalDonationsBySupporters() {
  return new Promise((resolve, reject) => {
    fs.readFile("supportersList.json", "utf8", (err, supporterData) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      const supporters = JSON.parse(supporterData);

      const promises = supporters.map((supp) => {
        return new Promise((resolve, reject) => {
          fs.readFile("donationsList.json", "utf8", (err, donationData) => {
            if (err) {
              console.log(err);
              reject(err);
              return;
            }
            const totalDonation = JSON.parse(donationData).filter(
              (donation) => donation.supporter_id === supp.id
            );
            const sum = totalDonation.reduce((acc, obj) => acc + obj.amount, 0);
            const singleSupporter = {
              name: supp.name,
              total_donated: `£${sum/100}`,
            };

            resolve(singleSupporter);
          });
        });
      });

      Promise.all(promises)
        .then((donationsBySupporter) => {
          fs.writeFileSync(
            "totalDonatedBySupporters.json",
            JSON.stringify(donationsBySupporter, null, 2)
          );
          console.log("Data ready to view in totalDonatedBySupporters.json");
          resolve(donationsBySupporter);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  });
}


getTotalDonationsBySupporters();

module.exports = { getSupporterId };


