class Student {
  constructor(id, name, age, course) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.course = course;
  }

  info() {
    return `${this.name} (${this.age}) - ${this.course}`;
  }
}

class Instructor {
  constructor(id, name, subject) {
    this.id = id;
    this.name = name;
    this.subject = subject;
  }

  info() {
    return `${this.name} - ${this.subject}`;
  }
}

async function loadData() {
  try {
    const response = await fetch("data/students.json");
    const data = await response.json();
    displayData(data);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

function displayData(data) {
  const output = document.getElementById("output");
  output.innerHTML = "";

  const sections = [
    { title: "Students", items: data.students.map(s => new Student(s.id, s.name, s.age, s.course).info()) },
    { title: "Courses", items: data.courses },
    { title: "Instructors", items: data.instructors.map(i => new Instructor(i.id, i.name, i.subject).info()) }
  ];

  sections.forEach(section => {
    const container = document.createElement("div");
    container.classList.add("section");

    const header = document.createElement("h2");
    header.textContent = section.title;
    container.appendChild(header);

    const ul = document.createElement("ul");
    section.items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });

    container.appendChild(ul);
    output.appendChild(container);
  });
}

loadData();
