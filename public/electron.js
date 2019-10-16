const path = require("path");
const electron = require("electron");
const isDevelopment = require("electron-is-dev");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createMainWindow() {
    const window = new BrowserWindow({
        webPreferences: { nodeIntegration: true }
    });

    if (isDevelopment) {
        window.webContents.openDevTools();
    }

    if (isDevelopment) {
        window.loadURL("http://localhost:1024");
    } else {
        window.loadURL(`file://${path.join(__dirname, "../build/index.html")}`);
    }

    window.on("closed", () => {
        mainWindow = null;
    });

    window.webContents.on("devtools-opened", () => {
        window.focus();
        setImmediate(() => {
            window.focus();
        });
    });

    return window;
}

// quit application when all windows are closed
app.on("window-all-closed", () => {
    // on macOS it is common for applications to stay open until the user explicitly quits
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // on macOS it is common to re-create a window even after all windows have been closed
    if (mainWindow === null) {
        mainWindow = createMainWindow();
    }
});

// create main BrowserWindow when electron is ready
app.on("ready", () => {
    mainWindow = createMainWindow();
});
