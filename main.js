const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  try {
    console.log("Creating browser window...");

    const win = new BrowserWindow({
      width: 1000,
      height: 700,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        webviewTag: true
      }
    });

    console.log("Loading index.html...");
    win.loadFile('index.html');

    win.webContents.on('did-finish-load', () => {
      console.log("Webview / index.html loaded successfully.");
    });

    win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
      console.error(`Failed to load: ${errorDescription} (${errorCode})`);
    });

  } catch (err) {
    console.error("Error creating window:", err);
  }
}

app.whenReady().then(() => {
  console.log("App is ready.");
  createWindow();
}).catch((err) => {
  console.error("App failed to become ready:", err);
});

app.on('window-all-closed', () => {
  console.log("All windows closed.");
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  console.log("App activated.");
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
