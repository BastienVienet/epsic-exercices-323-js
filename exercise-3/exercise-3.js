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

// Raw data is stored in the constant named DATA as a string
const jsonData = DATA.split("\n")
  .slice(1, -1) // We skip the header line and the last empty line
  .map((line) => line.split(";"))
  .map((columns) => ({
    number: parseInt(columns[0]),
    name: columns[1],
    deathCause: columns[10],
    dynasty: columns[12],
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
  }, []);

const refreshData = () => {
  // We get the current filters
  const filters = getFilters();
  // We display the filtered data
  container.innerHTML = JSON.stringify(
    jsonData
      // We filter the dynasties
      .filter((element) => {
        return filters.dynasty === "All" || filters.dynasty === element.dynasty;
      })
      // We map each dynasty to a new object where the emperors array is filtered by death cause
      .map((element) => ({
        ...element, // Create a new object with the same properties as the current dynasty
        emperors: element.emperors.filter((emperor) => {
          return (
            filters.deathCause === "All" ||
            filters.deathCause === emperor.deathCause
          );
        }),
      })),
    null,
    2
  );
};

// Function to populate filter options
const populateFilterOptions = () => {
  // Get unique dynasties and death causes
  const dynasties = [];
  const deathCauses = [];

  jsonData.forEach((item) => {
    if (!dynasties.includes(item.dynasty)) {
      dynasties.push(item.dynasty);
    }

    item.emperors.forEach((emperor) => {
      if (!deathCauses.includes(emperor.deathCause)) {
        deathCauses.push(emperor.deathCause);
      }
    });
  });

  // Create options for each filter
  dynasties.forEach((dynasty) => {
    const option = document.createElement("option");
    option.value = option.text = dynasty;
    dynastyFilter.appendChild(option);
  });

  deathCauses.forEach((cause) => {
    const option = document.createElement("option");
    option.value = option.text = cause;
    deathCauseFilter.appendChild(option);
  });
};

// Call the function to populate filter options
populateFilterOptions();

// Call the function to refresh data
refreshData();
