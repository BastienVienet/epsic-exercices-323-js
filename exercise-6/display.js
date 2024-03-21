const tableElem = document.querySelector('table');
const averageElem = document.querySelector('#average');

const display = (studentsGrades, average) => {
    studentsGrades.forEach(item => {
        const row = document.createElement('tr');
        row.appendChild(document.createElement('td')).textContent = item.name;
        row.appendChild(document.createElement('td')).textContent = item.points;
        row.appendChild(document.createElement('td')).textContent = item.grade;
        tableElem.appendChild(row);
    });
    averageElem.innerHTML = average;
}