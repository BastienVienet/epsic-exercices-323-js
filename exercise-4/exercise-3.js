const container = document.getElementById("output");
const dynastyFilter = document.getElementById("dynastyFilter");
const deathCauseFilter = document.getElementById("deathCauseFilter");
const minReignDurationFilter = document.getElementById(
  "minReignDurationFilter"
);
const maxReignDurationFilter = document.getElementById(
  "maxReignDurationFilter"
);

// Helper function creating an object containing all available filters with current values
const getFilters = () => ({
  dynasty: dynastyFilter.value || undefined,
  deathCause: deathCauseFilter.value || undefined,
  minReignDuration: parseInt(minReignDurationFilter.value),
  maxReignDuration: parseInt(maxReignDurationFilter.value),
});

// Helper function to extract the year from a date string (exercise 3+)
const yearOf = (date) =>
  date.startsWith("-")
    ? parseInt(date.split("-")[1]) * -1
    : parseInt(date.split("-")[0]);

// Raw data is stored in the constant named DATA as a string
const jsonData = DATA.split("\n")
  .slice(1, -1) // We skip the header line and the last empty line
  .map((line) => line.split(";"))
  .map((columns) => ({
    number: parseInt(columns[0]),
    name: columns[1],
    deathCause: columns[10],
    dynasty: columns[12],
    reignDuration: yearOf(columns[9]) - yearOf(columns[8]), //  (exercise 3+)
  }))
  .toSorted((a, b) => a.number - b.number)
  // We group emperors by dynasty
  .reduce((dynasties, emperor) => {
    const dynasty = dynasties.find(
      (element) => element.dynasty === emperor.dynasty
    );
    dynasty
      ? dynasty.emperors.push(emperor)
      : dynasties.push({ dynasty: emperor.dynasty, emperors: [emperor] });
    // We remove the dynasty property from each emperor
    delete emperor.dynasty;

    return dynasties;
  }, [])
  // We calculate the total reign duration for each dynasty
  .reduce((dynasties, dynasty) => {
    dynasty.reignDuration = dynasty.emperors.reduce(
      (total, emperor) => total + emperor.reignDuration,
      0
    );
    dynasties.push({
      dynasty: dynasty.dynasty,
      reignDuration: dynasty.reignDuration,
      emperors: dynasty.emperors,
    });
    return dynasties;
  }, []);

// We create an option for each unique dynasty  (exercise 3+)
jsonData.forEach((element) => {
  const option = document.createElement("option");
  option.value = element.dynasty;
  option.textContent = element.dynasty;
  dynastyFilter.appendChild(option);
});

// We create an option for each unique death cause  (exercise 3+)
// We use a Set to remove death cause duplicates, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
[
  ...new Set(
    jsonData.reduce(
      (deathCauses, element) =>
        deathCauses.concat(
          element.emperors.map((emperor) => emperor.deathCause)
        ),
      []
    )
  ),
].forEach((deathCause) => {
  const option = document.createElement("option");
  option.value = deathCause;
  option.textContent = deathCause;
  deathCauseFilter.appendChild(option);
});

const filterData = (data, filters) =>
  data
    .filter(
      (dynasty) => !filters.dynasty || dynasty.dynasty === filters.dynasty
    )
    .map((dynasty) => ({
      ...dynasty,
      emperors: dynasty.emperors
        .filter(
          (emperor) =>
            !filters.deathCause || emperor.deathCause === filters.deathCause
        )
        //  (exercise 3+)
        .filter(
          (emperor) =>
            !filters.minReignDuration ||
            emperor.reignDuration >= filters.minReignDuration
        )
        .filter(
          (emperor) =>
            !filters.maxReignDuration ||
            emperor.reignDuration <= filters.maxReignDuration
        ),
    }));

// We store all listener functions for filter changes in an array
// They will be called when the filters change with the filtered data and the current filters as arguments
const onFilterChange = [];
const filterChanged = () => {
  const filters = getFilters();
  const filteredData = filterData(jsonData, filters);
  // We provide filtered data and current filters to all listeners
  onFilterChange.forEach((callback) => callback(filteredData, filters));
};
// We define an utility function that will be called on any filter change to refresh data
const refreshData = (filteredData) =>
  (container.innerHTML = JSON.stringify(filteredData, null, 2));
onFilterChange.push(refreshData);
