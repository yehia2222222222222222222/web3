<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Render API Diagnostic & Admin Panel</title>
<style>
body { font-family: monospace; background: #1e1e2f; color: #fff; padding: 20px; }
.box { background: #2a2a40; padding: 20px; border-radius: 8px; max-width: 700px; margin: 0 auto 20px; }
input, select, button { width: 100%; padding: 10px; margin-top: 8px; margin-bottom: 15px; border-radius: 4px; border: 1px solid #444; background: #151521; color: #fff; box-sizing: border-box; }
button { background: #e63946; border: none; font-weight: bold; cursor: pointer; }
button.test-btn { background: #2a9d8f; }
#log { background: #000; color: #0f0; padding: 15px; border-radius: 5px; height: 220px; overflow-y: auto; white-space: pre-wrap; font-size: 13px; }
label { font-size: 12px; color: #aaa; }
</style>
</head>
<body>

<div class="box">
<h2>1. Test Connection to Render</h2>
<label>Your Render URL:</label>
<input type="text" id="baseUrl" value="https://yehia-pizza-app-latest.onrender.com">
<button class="test-btn" onclick="pingServer()">Ping / Wake Up Render Server</button>
</div>

<div class="box">
<h2>2. Custom Ban Request</h2>
<label>Exact Backend Route for Banning (Change this to match your backend code):</label>
<input type="text" id="endpoint" value="/api/users/ban" placeholder="e.g., /api/admin/ban or /users/ban">

<label>HTTP Method:</label>
<select id="method">
<option value="POST">POST</option>
<option value="PUT">PUT</option>
<option value="PATCH">PATCH</option>
<option value="DELETE">DELETE</option>
</select>

<label>User ID or Email to Ban:</label>
<input type="text" id="targetUser" placeholder="Enter User ID or Email">

<label>Admin Token (Optional - leave blank if your backend doesn't use tokens):</label>
<input type="text" id="token" placeholder="Bearer token...">

<button onclick="sendBanRequest()">Send Ban Request</button>
</div>

<div class="box">
<h3>Live Error & Diagnostic Log:</h3>
<div id="log">Waiting for action...\n</div>
</div>

<script>
function log(msg) {
const logBox = document.getElementById('log');
const time = new Date().toLocaleTimeString();
logBox.textContent += [${time}] ${msg}\n;
logBox.scrollTop = logBox.scrollHeight;
}

async function pingServer() {
const url = document.getElementById('baseUrl').value.replace(//{url} ... (If server is asleep, wait up to 60 seconds)); try { const res = await fetch(url); log(SUCCESS! Server responded with HTTP Status: latex
{res.status}`); } catch (err) { log(`PING FAILED: 

{err.message}); log(-> Reason 1: Your Render server is still waking up. Try again in 30 seconds.); log(-> Reason 2: CORS is blocking the browser. Look at the browser F12 Console.`);
}
}

async function sendBanRequest() {
const baseUrl = document.getElementById('baseUrl').value.replace(//$`/, "");
const endpoint = document.getElementById('endpoint').value;
const method = document.getElementById('method').value;
const targetUser = document.getElementById('targetUser').value;
const token = document.getElementById('token').value;

const fullUrl = ``${baseUrl}{endpoint}; log(Sending {fullUrl}`);

const headers = { 'Content-Type': '