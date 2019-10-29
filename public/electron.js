const path = require("path");
const electron = require("electron");
const isDevelopment = require("electron-is-dev");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createMainWindow() {
    const window = new BrowserWindow({
        width: 1200,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
            webSecurity: false
        }
    });

    if (isDevelopment) {
        window.webContents.openDevTools();
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

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        mainWindow = createMainWindow();
    }
});

app.on("ready", () => {
    mainWindow = createMainWindow();
});
