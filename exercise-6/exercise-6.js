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

// Custom pipe function, see : https://wavelop.com/en/story/javascript-pipe-function/
const pipe =
  (...functions) =>
  (x) =>
    functions.reduce((v, f) => f(v), x);

// Unary functions necessary to calculate federal ladder grades
const calculateRatio = (totalPoint) => (points) => points / totalPoint;
const multiplyBy5 = (ratio) => ratio * 5;
const addOne = (grade) => grade + 1;
const round05 = (grade) => Math.round(grade * 2) / 2;
// Grouping functions to calculate grade according to the federal ladder
const calculateGrade = (totalPoints) =>
  pipe(calculateRatio(totalPoints), multiplyBy5, addOne, round05);
// Creating a closure to calculate grades for this specific exam
const calculateGradeForThisExam = calculateGrade(examTotalPoints);

// Computing grades and average
const studentsGrades = studentExams.map((student) => {
  return {
    ...student,
    grade: calculateGradeForThisExam(student.points),
  };
});

// Functions
const sumGrades = (grades) =>
  grades.reduce((acc, student) => acc + student.grade, 0);
const divideByCount = (count) => (sum) => sum / count;
const roundToTenth = (number) => Math.round(number * 10) / 10;

const calculateAverage = (numberOfStudentsGrades) =>
  pipe(sumGrades, divideByCount(numberOfStudentsGrades), roundToTenth);

const calculateForThisExam = calculateAverage(studentsGrades.length);

const average = calculateForThisExam(studentsGrades);

display(studentsGrades, average);
