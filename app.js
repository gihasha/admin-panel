// Fetch current Access Key from API and display it
function fetchCurrentKey() {
  fetch("http://localhost:3000/api/access-key")
    .then(response => response.json())
    .then(data => {
      document.getElementById("current-key").innerText = `Current Access Key: ${data.key}`;
    })
    .catch(err => console.log("Error fetching key", err));
}

// Update the Access Key using API
function changeKey() {
  const newKey = document.getElementById("new-key").value;
  if (newKey.trim()) {
    fetch("http://localhost:3000/api/access-key", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newKey }),
    })
      .then(response => response.json())
      .then(data => {
        alert("Access Key Updated!");
        fetchCurrentKey();  // Refresh current key
      })
      .catch(err => {
        alert("Failed to update key!");
        console.log("Error:", err);
      });
  } else {
    alert("Please enter a valid key.");
  }
}

// Initialize fetch
fetchCurrentKey();
