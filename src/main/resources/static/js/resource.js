const resourceApiUrl = "http://localhost:8080/api/resources"; // Base API URL

// Fetch All Resources
async function fetchResources() {
  try {
    const response = await fetch(resourceApiUrl);
    const resources = await response.json();

    const resourceList = document.getElementById("resources");
    resourceList.innerHTML = "";

    resources.forEach((resource) => {
      const listItem = document.createElement("li");
      listItem.id = `resource-${resource.id}`;
      listItem.innerHTML = `
        <strong class="resource-title">${resource.title}</strong>
        <div class="info-div"><p class="subt">Type</p> 
        <p class="resource-type">${resource.type}</p></div>
        <div class="info-div"><p class="subt">Description</p>
        <p class="resource-description">${resource.description}</p></div>
        <button onclick="editResource(${resource.id})">Edit</button>
        <button onclick="deleteResource(${resource.id})">Delete</button>
      `;
      resourceList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching resources:", error);
  }
}

// Add a New Resource
async function addResource() {
  const title = document.getElementById("resourceTitle").value.trim();
  const type = document.getElementById("resourceType").value.trim();
  const description = document.getElementById("resourceDescription").value.trim();

  if (!title || !type) {
    alert("Title and Type are required.");
    return;
  }

  const resource = { title, type, description };

  try {
    const response = await fetch(resourceApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resource),
    });

    if (response.ok) {
      alert("Resource added successfully!");
      document.getElementById("resourceTitle").value = "";
      document.getElementById("resourceType").value = "";
      document.getElementById("resourceDescription").value = "";
      fetchResources(); // Refresh the list
    } else {
      alert("Failed to add resource.");
    }
  } catch (error) {
    console.error("Error adding resource:", error);
  }
}

// Delete a Resource
async function deleteResource(id) {
  try {
    const response = await fetch(`${resourceApiUrl}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Resource deleted successfully!");
      fetchResources(); // Refresh the list
    } else {
      alert("Failed to delete resource.");
    }
  } catch (error) {
    console.error("Error deleting resource:", error);
  }
}

// Search Resources
async function searchResources() {
  const query = document.getElementById("searchQuery").value;

  try {
    const response = await fetch(`${resourceApiUrl}/search/title?title=${query}`);
    const resources = await response.json();

    const resourceList = document.getElementById("resources");
    resourceList.innerHTML = "";

    resources.forEach((resource) => {
      const listItem = document.createElement("li");
      listItem.id = `resource-${resource.id}`;
      listItem.innerHTML = `
        <strong class="resource-title">${resource.title}</strong>
        <div class="info-div"><p class="subt">Type</p> 
        <p class="resource-type">${resource.type}</p></div>
        <div class="info-div"><p class="subt">Description</p>
        <p class="resource-description">${resource.description}</p></div>
        <button onclick="editResource(${resource.id})">Edit</button>
        <button onclick="deleteResource(${resource.id})">Delete</button>
      `;
      resourceList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error searching resources:", error);
  }
}

// Edit and Save Resource
async function editResource(id) {
  const listItem = document.querySelector(`#resource-${id}`);
  const titleElement = listItem.querySelector(".resource-title");
  const typeElement = listItem.querySelector(".resource-type");
  const descriptionElement = listItem.querySelector(".resource-description");

  const currentTitle = titleElement.textContent;
  const currentType = typeElement.textContent;
  const currentDescription = descriptionElement.textContent;

  listItem.innerHTML = `
    <input type="text" id="editTitle-${id}" value="${currentTitle}" />
    <input type="text" id="editType-${id}" value="${currentType}" />
    <textarea id="editDescription-${id}">${currentDescription}</textarea>
    <button onclick="saveResource(${id})">Save</button>
    <button onclick="fetchResources()">Cancel</button>
  `;
}

async function saveResource(id) {
  const updatedTitle = document.getElementById(`editTitle-${id}`).value.trim();
  const updatedType = document.getElementById(`editType-${id}`).value.trim();
  const updatedDescription = document.getElementById(`editDescription-${id}`).value.trim();

  if (!updatedTitle || !updatedType) {
    alert("Title and Type are required.");
    return;
  }

  const updatedResource = { title: updatedTitle, type: updatedType, description: updatedDescription };

  try {
    const response = await fetch(`${resourceApiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedResource),
    });

    if (response.ok) {
      alert("Resource updated successfully!");
      fetchResources(); // Refresh the list
    } else {
      alert("Failed to update resource.");
    }
  } catch (error) {
    console.error("Error updating resource:", error);
  }
}

fetchResources(); // Fetch resources when the page loads
