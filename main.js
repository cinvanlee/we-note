"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var updater = require("electron-updater");
var path = require("path");
var url = require("url");
var win;
var serve;
var autoUpdater = updater.autoUpdater;
var args = process.argv.slice(1);
serve = args.some(function (val) { return val === "--serve"; });
function createWindow() {
    // Create the browser window.
    win = new electron_1.BrowserWindow({
        x: 0,
        y: 0,
        width: 1200,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
            webSecurity: false
        }
    });
    if (serve) {
        require("electron-reload")(__dirname, {
            electron: require(__dirname + "/node_modules/electron")
        });
        win.loadURL("http://localhost:4200");
    }
    else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, "dist/index.html"),
            protocol: "file:",
            slashes: true
        }));
    }
    if (serve) {
        win.webContents.openDevTools();
    }
    // Emitted when the window is closed.
    win.on("closed", function () {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}
try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    electron_1.app.on("ready", function () {
        createWindow();
        autoUpdater.checkForUpdatesAndNotify();
    });
    // Quit when all windows are closed.
    electron_1.app.on("window-all-closed", function () {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== "darwin") {
            electron_1.app.quit();
        }
    });
    electron_1.app.on("activate", function () {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
    electron_1.ipcMain.on("quitAndInstall", function (event, arg) {
        autoUpdater.quitAndInstall();
    });
}
catch (e) {
    // Catch Error
    // throw e;
}
//# sourceMappingURL=main.js.map