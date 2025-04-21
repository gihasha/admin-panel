const ADMIN_USERNAME = "anjana";
const ADMIN_PASSWORD = "anjana970";

// Dummy data - replace with real DB fetch in backend
let users = [
  { username: "user1", accessKey: "abc123" },
  { username: "user2", accessKey: "def456" }
];

let currentAccessKey = "initial-key";

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("admin-section").style.display = "block";
  } else {
    alert("වැරදි Login විස්තර!");
  }
}

function showUsers() {
  const container = document.getElementById("panel-content");
  container.innerHTML = `<h3>Users Using Access Key</h3>
    <ul>
      ${users.map(u => `<li>${u.username} - <strong>${u.accessKey}</strong></li>`).join("")}
    </ul>`;
}

function showSendUpdate() {
  const container = document.getElementById("panel-content");
  container.innerHTML = `
    <h3>Send Update</h3>
    <textarea id="update-message" placeholder="Update message here..." rows="5" style="width: 90%;"></textarea>
    <br>
    <button onclick="sendUpdate()">Send Update</button>
  `;
}

function sendUpdate() {
  const msg = document.getElementById("update-message").value;
  alert("Update Sent: " + msg);
  // You can trigger backend or DB update here to notify all users
}

function showKeyChanger() {
  const container = document.getElementById("panel-content");
  container.innerHTML = `
    <h3>Change Access Key</h3>
    <input type="text" id="new-key" placeholder="Enter new Access Key">
    <br>
    <button onclick="changeKey()">Change Key</button>
    <p>Current Key: <strong>${currentAccessKey}</strong></p>
  `;
}

function changeKey() {
  const newKey = document.getElementById("new-key").value;
  if (newKey.trim()) {
    currentAccessKey = newKey;
    alert("Access Key Changed to: " + newKey);
    showKeyChanger(); // Refresh
  } else {
    alert("ඇතුළත් කරලා තියෙන්න ඕනෙ key එකක්");
  }
}
