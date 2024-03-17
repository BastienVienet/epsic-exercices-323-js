const examTotalPoints = 52;
const studentExams = [
  { name: "Chase", points: 48 },
  { name: "Ruben", points: 35 },
  { name: "Stella", points: 42 },
  { name: "Marcus", points: 31 },
  { name: "Rocky", points: 42 },
  { name: "Zuma", points: 35 },
  { name: "Everest", points: 29 },
  { name: "Ryder", points: 50 },
  { name: "Capitaine Turbot", points: 20 },
  { name: "Mme La Maire Goodway", points: 49 },
  { name: "Gallinetta", points: 1 },
  { name: "Jake", points: 39 },
  { name: "M. Le Maire Hollinger", points: 41 },
  { name: "La fermière Yumi", points: 44 },
  { name: "Maurice", points: 17 },
];

const divideByTotalPoints = (total) => (base) => base / total;
const divideByExamTotalPoints = divideByTotalPoints(examTotalPoints);
const multiplyByFive = (n) => n * 5;
const addOne = (n) => n + 1;
const roundToHalf = (n) => Math.round(n * 2) / 2;

const pipe =
  (...fns) =>
  (x) => {
    return fns.reduce((v, f) => f(v), x);
  };

const federalScaleGrade = pipe(
  divideByExamTotalPoints,
  multiplyByFive,
  addOne,
  roundToHalf
);

const studentsGrades = studentExams.map((student) => {
  const grade = federalScaleGrade(student.points);
  return { ...student, grade };
});

display(studentsGrades);
