# Live Server with Hot Module Replacement (HMR) using Node.js & WebSockets

A lightweight Live Server built with Node.js that serves static files and enables Hot Module Replacement (HMR) using WebSockets. It automatically updates changes in the browser without requiring a manual refresh

## ✨ Features

* Serves HTML, CSS, JS, and other static files.
* Watches for file changes and updates the browser dynamically.
* Auto-refreshes the page for HTML & JS changes.
* Updates CSS without refreshing the page.

## 🚀 How to Run

### 1️⃣ Clone the Repository

```bash
git clone <repo-url>
cd live-server
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Start the Server
```bash
node liveServer.js
```
### 4️⃣ Open in Browser
Go to:
```bash
http://localhost:5000
```
Make edits to your files and see the changes live!

## 🛠 How It Works

1. Node.js HTTP Server serves static files.
2. WebSocket Server listens for file changes.
3. `fs.watch()` detects changes in files and notifies WebSocket clients.
4. Browser WebSocket Client receives the message:
    * If it's a CSS change, it reloads the stylesheet without a full refresh.
   * If it's an HTML or JS change, it reloads the page.

## 📌 Notes

* Works best for small projects and quick prototyping.
* For advanced setups, consider tools like Webpack + HMR.

🚀 Happy coding with Live Server! ✨
