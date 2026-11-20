const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

function createWindow() {
  Menu.setApplicationMenu(null);

  const win = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 380,
    minHeight: 600,
    title: 'VisionDesk',
    icon: path.join(__dirname, 'Logo2.png'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile('index.html');

  // Open external links in default system browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});