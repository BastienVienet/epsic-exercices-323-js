const tableElem = document.querySelector("table");

const display = (students) => {
  students.forEach((item) => {
    const row = document.createElement("tr");
    const img = document.createElement("img");
    img.src = item.avatar;
    img.style.width = "128px";
    row.appendChild(document.createElement("td")).appendChild(img);
    row.appendChild(document.createElement("td")).textContent = item.name;
    row.appendChild(document.createElement("td")).textContent = item.tpi;
    row.appendChild(document.createElement("td")).textContent = item.modules;
    row.appendChild(document.createElement("td")).textContent = item.base;
    row.appendChild(document.createElement("td")).textContent = item.ecg;
    row.appendChild(document.createElement("td")).textContent = item.overall;
    row.appendChild(document.createElement("td")).style.backgroundColor =
      item.isPromoted ? "green" : "red";
    tableElem.appendChild(row);
  });
};
