const parseCSV = (data, columnsMapping) => {
  let parsedData = [];
  let rows = data.split("\n");
  for (let i = 1; i < rows.length - 1; i++) {
    let cells = rows[i].split(";");
    let parsedRow = {};
    for (let j = 0; j < columnsMapping.length; j++) {
      parsedRow[columnsMapping[j][1]] = cells[columnsMapping[j][0]];
    }
    parsedData.push(parsedRow);
  }

  return parsedData;
};

const flattenBaseGrades = (data) => {
  let grades = [];
  for (let i = 0; i < data.length; i++) {
    let semester = data[i];
    for (let field in semester) {
      for (let j = 0; j < semester[field].length; j++) {
        let grade = semester[field][j];
        grades.push({ ...grade, field });
      }
    }
  }

  return grades;
};

const getStudentGrade = (student, grades) => {
  for (let i = 0; i < grades.length; i++) {
    if (grades[i].name === student) {
      return parseFloat(grades[i].grade);
    }
  }
};

const getStudentFieldGrades = (student, field, grades) => {
  const fieldGrades = [];
  for (let i = 0; i < grades.length; i++) {
    if (grades[i].field === field && grades[i].name === student) {
      fieldGrades.push(parseFloat(grades[i].grade));
    }
  }

  return fieldGrades;
};

const roundTo = (value, step) => {
  let rounded = Math.round(value / step) * step;
  return parseFloat(rounded.toFixed(1));
};

const computeAverage = (roundStep, grades, weights = undefined) => {
  let weightSum = 0;
  let sum = 0;
  for (let i = 0; i < grades.length; i++) {
    let itemWeight = weights ? weights[i] : 1;
    weightSum += itemWeight;
    sum += grades[i] * itemWeight;
  }

  let average = sum / weightSum;
  return roundTo(average, roundStep);
};

const averageGradeOfMultipleFields = (
  grades,
  student,
  fields,
  weights,
  roundToGrades,
  roundToAverage
) => {
  let fieldAverages = [];
  for (let i = 0; i < fields.length; i++) {
    let fieldGrades = getStudentFieldGrades(student, fields[i], grades);
    let fieldAverage = computeAverage(roundToGrades, fieldGrades);
    fieldAverages.push(fieldAverage);
  }

  return computeAverage(roundToAverage, fieldAverages, weights);
};

const computeBaseGrade = (student) => {
  return averageGradeOfMultipleFields(
    dataParsedBase,
    student,
    ["maths", "english"],
    [1, 1],
    0.5,
    0.5
  );
};

const computeModuleGrade = (student) => {
  return averageGradeOfMultipleFields(
    dataParsedModules,
    student,
    ["Ecole", "CIE"],
    [80, 20],
    0.5,
    0.1
  );
};

const computeOverallGrade = (student, domainGrades) => {
  return averageGradeOfMultipleFields(
    domainGrades,
    student,
    ["tpi", "base", "modules", "ecg"],
    [30, 20, 30, 20],
    0.1,
    0.1
  );
};

const meetsRequirements = (eliminatoryFields, grades) => {
  for (let i = 0; i < eliminatoryFields.length; i++) {
    if (grades[eliminatoryFields[i]] < 4) {
      return false;
    }
  }

  return true;
};

const dataParsedTPIs = parseCSV(dataTPIs, [
  [0, "name"],
  [1, "grade"],
]);
const dataParsedModules = parseCSV(dataModules, [
  [0, "name"],
  [1, "module"],
  [2, "field"],
  [4, "grade"],
]);
const dataParsedECG = parseCSV(dataECG, [
  [0, "name"],
  [1, "grade"],
]);
const dataParsedBase = flattenBaseGrades(dataFormationDeBase);

const data = [];
for (let i = 0; i < students.length; i++) {
  let student = students[i];
  let tpi = getStudentGrade(student.name, dataParsedTPIs);
  let base = computeBaseGrade(student.name);
  let modules = computeModuleGrade(student.name);
  let ecg = getStudentGrade(student.name, dataParsedECG);
  let overall = computeOverallGrade(student.name, [
    { name: student.name, field: "tpi", grade: tpi },
    { name: student.name, field: "base", grade: base },
    { name: student.name, field: "modules", grade: modules },
    { name: student.name, field: "ecg", grade: ecg },
  ]);
  let studentData = { ...student, tpi, base, modules, ecg, overall };
  studentData.isPromoted = meetsRequirements(
    ["tpi", "modules", "overall"],
    studentData
  );
  data.push(studentData);
}

display(data);
