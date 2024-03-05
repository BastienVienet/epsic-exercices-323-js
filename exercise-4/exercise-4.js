// Constants and functions from exercise-3.js file are available from here...
// You can use the  "jsonData" and "onFilterChange" constants for example.
const emperorsList = document.getElementById("emperorsList");
const emperorWithLongestReignContainer = document.getElementById(
  "emperorWithLongestReign"
);

let filteredData = [];

const storeData = (data) => {
  filteredData = data;

  const emperorNames = filteredData
    .flatMap((dynasty) => dynasty.emperors)
    .reduce((names, emperor) => [...names, emperor.name], [])
    .join(", ");

  const longestReign = filteredData
    .flatMap((dynasty) => dynasty.emperors)
    .reduce(
      (longestReign, emperor) =>
        emperor.reignDuration > longestReign.reignDuration
          ? { ...emperor }
          : longestReign,
      { reignDuration: 0 }
    );

  emperorsList.innerHTML = `Empereurs correspondant aux filtres : ${emperorNames}`;
  emperorWithLongestReignContainer.innerHTML = `Empereur ayant reigné le plus longtemps : ${longestReign.name}, ${longestReign.reignDuration} years`;
};
onFilterChange.push(storeData);

// We manually trigger the first filter change to display initial data
filterChanged();
