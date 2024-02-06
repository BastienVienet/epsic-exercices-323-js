// Malheureusement, votre délivrable n'a pas passé l'étape du code review.
// Votre team lead n'a en effet pas, mais alors pas du tout aimé votre approche procédurale.
// Il vous demande donc recommencer l'exercice en appliquant les bonnes pratiques de programmation fonctionnelle...

let jsonData = DATA.split("\n");

let headersFromJsonData = jsonData[0].split(";"); // ["Index", "Name", "Full Name", "Birth", "Death", "Birth City", "Birth Province", "Rise", "Reign Start", "Reign End", "Cause", "Killer", "Dynasty", "Era", "Notes", "Verification", "Image"]
const headersWanted = ["Index", "Name", "Cause", "Dynasty"];

// Loop through the jsonData and create an array of emperors with the wanted headers + Dynasty because we need it to group the emperors
let emperors = jsonData.slice(1).map((line) => {
  let currentline = line.split(";");
  let emperor = {};
  headersFromJsonData.forEach((header, index) => {
    if (headersWanted.includes(header)) {
      emperor[header] = currentline[index];
    }
  });
  return emperor;
});

// Sort the emperors by index
let sortedEmperors = emperors.toSorted((a, b) => a.Index - b.Index);

// Group emperors by dynasty
let groupedByDynasty = emperors.reduce((groups, emperor) => {
  let dynasty = emperor.Dynasty;
  delete emperor.Dynasty;

  if (!groups[dynasty]) {
    groups[dynasty] = [];
  }
  groups[dynasty].push(emperor);
  return groups;
}, {});

// Insert the json data into the html page
const container = document.getElementById("output");
container.innerHTML = JSON.stringify(groupedByDynasty, null, 2);
