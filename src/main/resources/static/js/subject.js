const apiUrl = "http://localhost:8080/api/subjects";

// Add Subject
async function addSubject() {
  const name = document.getElementById("subjectName").value.trim(); // Ensure no leading/trailing spaces
  const description = document.getElementById("subjectDescription").value.trim();
  const difficulty = document.getElementById("subjectDifficulty").value.trim();

  if (!name) {
    alert("Subject name is required.");
    return;
  }

  const subject = { name, description, difficulty };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subject),
    });

    if (response.ok) {
      alert("Subject added successfully!");

      // Clear the form
      document.getElementById("subjectName").value = "";
      document.getElementById("subjectDescription").value = "";
      document.getElementById("subjectDifficulty").value = "";

      fetchSubjects(); // Refresh the subject list
    } else {
      const error = await response.json();
      console.error("Error adding subject:", error);
      alert("Failed to add subject: " + (error.message || "Unknown error"));
    }
  } catch (error) {
    console.error("Error adding subject:", error);
  }
}


// Fetch All Subjects
async function fetchSubjects() {
  try {
    const response = await fetch(apiUrl);
    const subjects = await response.json();

    const subjectList = document.getElementById("subjects");
    subjectList.innerHTML = "";

    subjects.forEach((subject) => {
      const listItem = document.createElement("li");
      listItem.id = `subject-${subject.id}`; // Unique ID for the card
      listItem.innerHTML = `
        <strong class="subject-name">${subject.name}</strong> 
        <div class="info-div"><p class="subt">Difficulty</p> 
        <p class="subject-difficulty">${subject.difficulty}</p></div>
        <div class="info-div"><p class="subt">Description</p>
        <p class="subject-description">${subject.description}</p></div>
        <button onclick="editSubject(${subject.id})">Edit</button>
        <button onclick="deleteSubject(${subject.id})">Delete</button>
      `;
      subjectList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching subjects:", error);
  }
}

// Search Subjects
async function searchSubjects() {
  const query = document.getElementById("searchQuery").value;

  try {
    const response = await fetch(`${apiUrl}/search?name=${query}`);
    const subjects = await response.json();

    const subjectList = document.getElementById("subjects");
    subjectList.innerHTML = "";

    subjects.forEach((subject) => {
      const listItem = document.createElement("li");
      listItem.id = `subject-${subject.id}`; // Unique ID for the card
      listItem.innerHTML = `
        <strong class="subject-name">${subject.name}</strong> 
        <div class="info-div"><p class="subt">Difficulty</p> 
        <p class="subject-difficulty">${subject.difficulty}</p></div>
        <div class="info-div"><p class="subt">Description</p>
        <p class="subject-description">${subject.description}</p></div>
        <button onclick="editSubject(${subject.id})">Edit</button>
        <button onclick="deleteSubject(${subject.id})">Delete</button>
      `;
      subjectList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error searching subjects:", error);
  }
}

// delete subject
async function deleteSubject(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Subject deleted successfully!");
      fetchSubjects(); // Refresh the list
    } else {
      alert("Failed to delete subject.");
    }
  } catch (error) {
    console.error("Error deleting subject:", error);
  }
}

// Edit Subject
function editSubject(id) {
  const listItem = document.querySelector(`#subject-${id}`);
  const nameElement = listItem.querySelector(".subject-name");
  const descriptionElement = listItem.querySelector(".subject-description");
  const difficultyElement = listItem.querySelector(".subject-difficulty");

  const currentName = nameElement.textContent;
  const currentDescription = descriptionElement.textContent;
  const currentDifficulty = difficultyElement.textContent;

  listItem.innerHTML = `
    <input type="text" id="editName-${id}" value="${currentName}" />
    <textarea id="editDescription-${id}">${currentDescription}</textarea>
    <input type="text" id="editDifficulty-${id}" value="${currentDifficulty}" />
    <button onclick="saveSubject(${id})">Save</button>
    <button onclick="fetchSubjects()">Cancel</button>
  `;
}

// save subject
async function saveSubject(id) {
  const updatedName = document.getElementById(`editName-${id}`).value.trim();
  const updatedDescription = document.getElementById(`editDescription-${id}`).value.trim();
  const updatedDifficulty = document.getElementById(`editDifficulty-${id}`).value.trim();

  if (!updatedName) {
    alert("Subject name is required.");
    return;
  }

  const updatedSubject = {
    name: updatedName,
    description: updatedDescription,
    difficulty: updatedDifficulty,
  };

  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSubject),
    });

    if (response.ok) {
      alert("Subject updated successfully!");
      fetchSubjects(); // Refresh the list
    } else {
      alert("Failed to update subject.");
    }
  } catch (error) {
    console.error("Error updating subject:", error);
  }
}

function cancelEdit(id, name, description, difficulty) {
  const listItem = document.querySelector(`#subject-${id}`);

  listItem.innerHTML = `
    <strong class="subject-name">${name}</strong> 
    <span class="subject-difficulty">${difficulty}</span> 
    <p class="subject-description">${description.replace(/\\n/g, '\n')}</p>
    <button onclick="editSubject(${id})">Edit</button>
    <button onclick="deleteSubject(${id})">Delete</button>
  `;
}


// Fetch subjects on page load
fetchSubjects();