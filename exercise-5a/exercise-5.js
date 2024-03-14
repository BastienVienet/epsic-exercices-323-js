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

const federalScaleGrade = (studentPoints, examTotalPoints) => {
  return Math.round(((studentPoints / examTotalPoints) * 5 + 1) * 2) / 2;
};

const studentsGrades = studentExams.map((student) => {
  const grade = federalScaleGrade(student.points, examTotalPoints);
  return { ...student, grade };
});

display(studentsGrades);
