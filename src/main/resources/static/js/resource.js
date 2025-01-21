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
                <p class="resource-description">${resource.description || "No description provided"}</p>
            `;

            if (resource.link) {
                listItem.innerHTML += `
                    <p><a href="${resource.link}" target="_blank">Open Link</a></p>
                `;
            }
            if (resource.filePath) {
                listItem.innerHTML += `
                    <p><a href="${resource.filePath}" target="_blank">View PDF</a></p>
                `;
            }

            listItem.innerHTML += `
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
    const description = document.getElementById("resourceDescription").value.trim();
    const link = document.getElementById("resourceLink").value.trim();
    const fileInput = document.getElementById("resourceFile");
    const file = fileInput.files[0];
  
    if (!title) {
      alert("Title is required.");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    if (description) formData.append("description", description);
    if (link) formData.append("link", link);
    if (file) formData.append("file", file);
  
    try {
      const response = await fetch(resourceApiUrl, {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        alert("Resource added successfully!");
        document.getElementById("resourceTitle").value = "";
        document.getElementById("resourceDescription").value = "";
        document.getElementById("resourceLink").value = "";
        fileInput.value = ""; // Clear file input
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
    const query = document.getElementById("searchQuery").value.trim(); // Trim to avoid unnecessary spaces
  
    try {
      const response = await fetch(`${resourceApiUrl}/search/title?title=${query}`);
      const resources = await response.json();
  
      const resourceList = document.getElementById("resources");
      resourceList.innerHTML = ""; // Clear the list before appending results
  
      resources.forEach((resource) => {
        const listItem = document.createElement("li");
        listItem.id = `resource-${resource.id}`;
        listItem.className = "resource-item"; // Optional: Add a class for consistent styling
  
        listItem.innerHTML = `
          <strong class="resource-title">${resource.title}</strong>
          <p class="resource-description">${resource.description || "No description provided"}</p>
        `;
  
        // Check the resource type and append appropriate link or file
        if (resource.type === "Link" && resource.link) {
          listItem.innerHTML += `
            <p><a href="${resource.link}" target="_blank">Open Link</a></p>
          `;
        } else if (resource.type === "Document" && resource.filePath) {
          listItem.innerHTML += `
            <p><a href="${resource.filePath}" target="_blank">View PDF</a></p>
          `;
        }
  
        // Add edit and delete buttons
        listItem.innerHTML += `
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
    const descriptionElement = listItem.querySelector(".resource-description");
    
    // Correctly identify links and file paths
    const linkElement = listItem.querySelector("a[href^='http']")?.href || ""; // Fetch only valid links
    const fileLinkElement = listItem.querySelector("a[href$='.pdf']")?.href || ""; // Fetch only PDF file links

    const currentTitle = titleElement.textContent;
    const currentDescription = descriptionElement.textContent;

    listItem.innerHTML = `
        <input type="text" id="editTitle-${id}" value="${currentTitle}" placeholder="Title" />
        <textarea id="editDescription-${id}" placeholder="Description">${currentDescription}</textarea>
        <input type="text" id="editLink-${id}" value="${linkElement}" placeholder="Link (optional)" />
        <p>Current File: ${fileLinkElement ? `<a href="${fileLinkElement}" target="_blank">View PDF</a>` : "No file uploaded"}</p>
        <input type="file" id="editFile-${id}" />
        <button onclick="saveResource(${id})">Save</button>
        <button onclick="fetchResources()">Cancel</button>
    `;
}

async function saveResource(id) {
    const updatedTitle = document.getElementById(`editTitle-${id}`).value.trim();
    const updatedDescription = document.getElementById(`editDescription-${id}`).value.trim();
    const updatedLink = document.getElementById(`editLink-${id}`).value.trim();
    const updatedFile = document.getElementById(`editFile-${id}`).files[0];

    if (!updatedTitle) {
        alert("Title is required.");
        return;
    }

    const formData = new FormData();
    formData.append("title", updatedTitle);
    formData.append("description", updatedDescription);
    if (updatedLink) formData.append("link", updatedLink);
    if (updatedFile) formData.append("file", updatedFile);

    try {
        const response = await fetch(`${resourceApiUrl}/${id}`, {
            method: "PUT",
            body: formData,
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

function removeFile() {
    const fileInput = document.getElementById("resourceFile");
    fileInput.value = ""; // Clear the file input
    alert("File removed successfully.");
  }
  

fetchResources(); // Fetch resources when the page loads
