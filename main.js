const { app, BrowserWindow, Notification, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 440,
    height: 620,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
}

ipcMain.on("notify", (event, { title, body }) => {
  new Notification({ title, body }).show();
});

app.whenReady().then(createWindow);
