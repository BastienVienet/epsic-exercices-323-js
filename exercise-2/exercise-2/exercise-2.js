let jsonData = {};
// Raw data is stored in the constant named DATA as a string
// console.log(DATA); // Uncomment this line to have a look at it
// TODO add parse logic here ...

const container = document.getElementById("output");
container.innerHTML = JSON.stringify(jsonData, null, 2);
