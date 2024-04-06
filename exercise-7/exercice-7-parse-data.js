// Used to parse the data of data-ecg.js and data-tpis.js
const parseCSVSmallData = (data) => {
  return data
    .split("\n")
    .slice(1, -1)
    .map((line) => line.split(";"))
    .map((columns) => ({
      name: columns[0],
      grade: parseFloat(columns[1]),
    }));
};

// Used to parse the data of data-modules.js
const parseCSVBigData = (data) => {
  return (
    data
      .split("\n")
      .slice(1, -1)
      .map((line) => line.split(";"))
      .map((columns) => ({
        name: columns[0],
        module: parseInt(columns[1]),
        area: columns[2],
        success: columns[3],
        grade: parseFloat(columns[4]),
      }))
      .toSorted((a, b) => a.module - b.module)
      // We group the data by student name
      .reduce((students, row) => {
        const student = students.find((student) => student.name === row.name);
        student
          ? student.modules.push({
              module: row.module,
              area: row.area,
              success: row.success,
              grade: row.grade,
            })
          : students.push({
              name: row.name,
              modules: [
                {
                  module: row.module,
                  area: row.area,
                  success: row.success,
                  grade: row.grade,
                },
              ],
            });
        return students;
      }, [])
  );
};
