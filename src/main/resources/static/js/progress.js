const progressApiUrl = "http://localhost:8080/api/progress";
const subjectApiUrl = "http://localhost:8080/api/subjects";

// Fetch and display progress logs
async function fetchProgressLogs() {
  try {
    const response = await fetch(progressApiUrl);
    const progressLogs = await response.json();

    const progressList = document.getElementById("progressLogs");
    progressList.innerHTML = "";

    progressLogs.forEach((log) => {
      const listItem = document.createElement("li");
      listItem.id = `progress-${log.id}`;
      listItem.innerHTML = `
        <strong style="width: 40%">${log.subject.name}</strong>
        <span style="width: 30%; white-space: pre-wrap;">${log.description}</span>
        <span style="width: 10%">${log.date}</span>
        <div class="actions">
        <button onclick="editProgress(${log.id})">Edit</button>
        <button onclick="deleteProgress(${log.id})">Delete</button>
        </div>
      `;
      progressList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching progress logs:", error);
  }
}

// Add a new progress log
async function addProgress() {
  const subjectId = document.getElementById("progressSubject").value;
  const description = document.getElementById("progressDescription").value.trim();
  const date = document.getElementById("progressDate").value;

  if (!subjectId || !description || !date) {
    alert("All fields are required.");
    return;
  }

  const progress = {
    description,
    date,
  };

  try {
    const response = await fetch(`${progressApiUrl}/${subjectId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(progress),
    });

    if (response.ok) {
      alert("Progress added successfully!");
      fetchProgressLogs();
      document.getElementById("progressDescription").value = "";
      document.getElementById("progressDate").value = "";
    } else {
      alert("Failed to add progress.");
    }
  } catch (error) {
    console.error("Error adding progress:", error);
  }
}

// Delete a progress log
async function deleteProgress(id) {
  try {
    const response = await fetch(`${progressApiUrl}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Progress deleted successfully!");
      fetchProgressLogs();
    } else {
      alert("Failed to delete progress.");
    }
  } catch (error) {
    console.error("Error deleting progress:", error);
  }
}

// Edit a progress log
async function editProgress(id) {
    // Get the list item where the progress log is displayed
    const listItem = document.getElementById(`progress-${id}`);
    const name = listItem.querySelector("strong").textContent;
    const description = listItem.querySelector("span:nth-child(2)").textContent;
    const date = listItem.querySelector("span:nth-child(3)").textContent;
  
    // Replace the content with editable inputs
    listItem.innerHTML = `
      <strong style="width: 40%">${name}</strong>
      <textarea id="editDescription-${id}" style="width: 30%; white-space: pre-wrap; margin-right: 1rem">${description}</textarea>
      <input type="date" id="editDate-${id}" value="${date}" style="width: 10%;">
      <div class="actions">
        <button onclick="saveProgress(${id})">Save</button>
        <button onclick="cancelEdit(${id}, '${description.replace(/'/g, "\\'")}', '${date}')">Cancel</button>
      </div>
    `;
}

async function saveProgress(id) {
    const description = document.getElementById(`editDescription-${id}`).value.trim();
    const date = document.getElementById(`editDate-${id}`).value;
  
    if (!description || !date) {
      alert("Both description and date are required.");
      return;
    }
  
    const updatedProgress = {
      description,
      date,
    };
  
    try {
      const response = await fetch(`${progressApiUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProgress),
      });
  
      if (response.ok) {
        alert("Progress updated successfully!");
        fetchProgressLogs(); // Refresh the list
      } else {
        alert("Failed to update progress.");
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
}

function cancelEdit(id, originalDescription, originalDate) {
    const listItem = document.getElementById(`progress-${id}`);
    const name = listItem.querySelector("strong").textContent;
  
    listItem.innerHTML = `
      <strong style="width: 40%">${name}</strong>
      <span style="width: 30%; white-space: pre-wrap;">${originalDescription}</span>
      <span style="width: 10%">${originalDate}</span>
      <div class="actions">
        <button onclick="editProgress(${id})">Edit</button>
        <button onclick="deleteProgress(${id})">Delete</button>
      </div>
    `;
}  

// Populate subject dropdown
// async function fetchSubjectsForDropdown() {
//   try {
//     const response = await fetch(subjectApiUrl);
//     const subjects = await response.json();

//     const dropdown = document.getElementById("progressSubject");
//     dropdown.innerHTML = ""; // Clear existing options

//     subjects.forEach((subject) => {
//       const option = document.createElement("option");
//       option.value = subject.id;
//       option.textContent = subject.name;
//       dropdown.appendChild(option);
//     });
//   } catch (error) {
//     console.error("Error fetching subjects for dropdown:", error);
//   }
// }

async function fetchSubjectsForDropdown() {
    try {
      const response = await fetch(subjectApiUrl);
      const subjects = await response.json();
  
      // Populate dropdown for adding progress
      const dropdown = document.getElementById("progressSubject");
      dropdown.innerHTML = ""; // Clear existing options
      subjects.forEach((subject) => {
        const option = document.createElement("option");
        option.value = subject.id;
        option.textContent = subject.name;
        dropdown.appendChild(option);
      });
  
      // Populate dropdown for filtering
      const filterDropdown = document.getElementById("filterSubject");
      subjects.forEach((subject) => {
        const filterOption = document.createElement("option");
        filterOption.value = subject.id;
        filterOption.textContent = subject.name;
        filterDropdown.appendChild(filterOption);
      });
    } catch (error) {
      console.error("Error fetching subjects for dropdown:", error);
    }
}

async function filterProgressBySubject() {
    const selectedSubjectId = document.getElementById("filterSubject").value;
  
    try {
      let response;
      if (selectedSubjectId === "all") {
        // Fetch all progress logs if "All Subjects" is selected
        response = await fetch(progressApiUrl);
      } else {
        // Fetch progress logs for a specific subject
        response = await fetch(`${progressApiUrl}/subject/${selectedSubjectId}`);
      }
  
      const progressLogs = await response.json();
  
      // Render filtered progress logs
      const progressList = document.getElementById("progressLogs");
      progressList.innerHTML = "";
  
      progressLogs.forEach((log) => {
        const listItem = document.createElement("li");
        listItem.id = `progress-${log.id}`;
        listItem.innerHTML = `
          <strong style="width: 40%">${log.subject.name}</strong>
          <span style="width: 30%; white-space: pre-wrap;">${log.description}</span>
          <span style="width: 10%">${log.date}</span>
          <div class="actions">
            <button onclick="editProgress(${log.id})">Edit</button>
            <button onclick="deleteProgress(${log.id})">Delete</button>
          </div>
        `;
        progressList.appendChild(listItem);
      });
    } catch (error) {
      console.error("Error filtering progress logs:", error);
    }
}
  
  

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  fetchSubjectsForDropdown();
  fetchProgressLogs();
});