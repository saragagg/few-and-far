const { getSupporters, getAllDonations } = require("./fetchApiData.js");

getSupporters().then(getAllDonations()).then(() => {
    console.log("Data is ready to fetch, run the command node getAllDonations.js")
})

// run this program to make a call to the API and fetch the supporters and donations data. This will allow the local files to be updated in case of any changes. 