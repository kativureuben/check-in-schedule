const students = {};

function addStudent() {
  const name = document.getElementById("studentName").value;
  if (name && !students[name]) {
    students[name] = { assignments: Array(10).fill(null), midCourseTest: null, mockFinal: null };
    updateStudentList();
    alert(`Added student: ${name}`);
  } else {
    alert("Student already exists or no name entered.");
  }
  document.getElementById("studentName").value = "";
}

function recordAssignment() {
  const name = document.getElementById("studentName").value;
  const assignmentNum = parseInt(document.getElementById("assignmentNumber").value, 10);
  const score = parseFloat(document.getElementById("assignmentScore").value);

  if (students[name] && assignmentNum >= 1 && assignmentNum <= 10) {
    students[name].assignments[assignmentNum - 1] = score;
    alert(`Recorded assignment ${assignmentNum} score ${score} for ${name}`);
  } else {
    alert("Invalid student name or assignment number.");
  }
  clearInputs();
}

function recordMidCourseTest() {
  const name = document.getElementById("studentName").value;
  const score = parseFloat(document.getElementById("midCourseScore").value);
  if (students[name]) {
    students[name].midCourseTest = score;
    alert(`Recorded mid-course test score ${score} for ${name}`);
  } else {
    alert("Invalid student name.");
  }
  clearInputs();
}

function recordMockFinal() {
  const name = document.getElementById("studentName").value;
  const score = parseFloat(document.getElementById("mockFinalScore").value);
  if (students[name]) {
    students[name].mockFinal = score;
    alert(`Recorded mock final score ${score} for ${name}`);
  } else {
    alert("Invalid student name.");
  }
  clearInputs();
}

function updateStudentList() {
  const studentList = document.getElementById("studentList");
  studentList.innerHTML = "";
  for (const name in students) {
    const li = document.createElement("li");
    li.textContent = name;
    li.onclick = () => showProgress(name);
    studentList.appendChild(li);
  }
}

function showProgress(name) {
  const student = students[name];
  if (student) {
    const assignmentScores = student.assignments.filter((score) => score !== null);
    const averageAssignments = assignmentScores.length
      ? (assignmentScores.reduce((a, b) => a + b, 0) / assignmentScores.length).toFixed(2)
      : 0;
    const allScores = [...assignmentScores, student.midCourseTest, student.mockFinal].filter((s) => s !== null);
    const overallAverage = allScores.length
      ? (allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(2)
      : 0;

    document.getElementById("progressReport").textContent = `
      Progress for ${name}:
      - Average Assignment Score: ${averageAssignments}
      - Overall Average Score: ${overallAverage}
    `;
  }
}

function clearInputs() {
  document.getElementById("assignmentNumber").value = "";
  document.getElementById("assignmentScore").value = "";
  document.getElementById("midCourseScore").value = "";
  document.getElementById("mockFinalScore").value = "";
}
