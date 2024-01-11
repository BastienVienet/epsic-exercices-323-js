// Transformez le contenu de la constante DATA de façon à produire un
// fichier JSON contenant les empereurs romains
// • Ne conservez que les informations suivantes pour chaque empereur :
// • Numéro de l’empereur
// • Nom
// • Cause de la mort
// • Les empereurs doivent être classés dans l’ordre chronologique
// • Les empereurs doivent être groupés par dynastie

// Le programme produit doit être purement procédural, interdiction
// d’utiliser des concepts de programmation fonctionnel.

let jsonData = {};
jsonData = DATA.split("\n");

let headersFromJsonData = DATA.split("\n")[0].split(";"); // ["Index", "Name", "Full Name", "Birth", "Death", "Birth City", "Birth Province", "Rise", "Reign Start", "Reign End", "Cause", "Killer", "Dynasty", "Era", "Notes", "Verification", "Image"]
const headersWanted = ["Index", "Name", "Cause", "Dynasty"];

// Loop through the jsonData and create an array of emperors with the wanted headers + Dynasty because we need it to group the emperors
let emperors = [];
for (let i = 1; i < jsonData.length - 1; i++) {
  let emperor = {};
  let currentline = jsonData[i].split(";"); // ["1", "Augustus", "Imperator Caesar Divi Filius Augustus", "63 BC", "14 AD", "Rome", "Italia", "27 BC", "16 January 27 BC", "19 August 14 AD", "Illness", "", "Julio-Claudian", "Principate", "First Roman Emperor", "Confirmed", "Augustus.jpg"]

  for (let j = 0; j < headersFromJsonData.length; j++) {
    for (let k = 0; k < headersWanted.length; k++) {
      if (headersFromJsonData[j] === headersWanted[k]) {
        emperor[headersFromJsonData[j]] = currentline[j];
        break;
      }
    }
  }
  emperors.push(emperor);
}

// Sort the emperors by index without using the sort method
for (let i = 0; i < emperors.length; i++) {
  for (let j = 0; j < emperors.length - i - 1; j++) {
    if (parseInt(emperors[j].Index) > parseInt(emperors[j + 1].Index)) {
      let temp = emperors[j];
      emperors[j] = emperors[j + 1];
      emperors[j + 1] = temp;
    }
  }
}

// Group emperors by dynasty
let groupedByDynasty = {};
for (let emperor of emperors) {
  let dynasty = emperor.Dynasty;
  delete emperor.Dynasty;

  if (!groupedByDynasty[dynasty]) {
    groupedByDynasty[dynasty] = [];
  }
  groupedByDynasty[dynasty].push(emperor);
}

// Insert the json data into the html page
const container = document.getElementById("output");
container.innerHTML = JSON.stringify(groupedByDynasty, null, 2);
