// Use the Supporter API to find out how much each supporter has donated

const supporter = process.argv[2]

console.log(supporter)


fetch("https://www.few-far.co/api/techtest/v1/supporters")
  .then((response) => response.json())
  .then((body) => console.log(body));
