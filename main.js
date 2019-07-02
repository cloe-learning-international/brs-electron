const {app, BrowserWindow, Tray, Menu} = require('electron');
const path = require('path');
const url = require('url');
require('electron-reload')(__dirname);
require('update-electron-app')()

class Main {

    constructor() {
        app.on('ready', this.createWindow)
    }

    createWindow() {
        this.browserWindow = new BrowserWindow({
          width: 1024,
          height: 768,
          minWidth: 640,
          minHeight: 480,
          icon: path.join(__dirname, '/assets/image/petit-logo.png')
        })
        this.browserWindow.loadURL(url.format({
            pathname: path.join(__dirname, './index.html'),
            protocol: 'file:',
            slashes: true
        }))
        this.browserWindow.on('closed', () => {
            this.browserWindow = null
        })
        // on ajoute le tray
        let tray = null
        var mainWindow = this.browserWindow;
        mainWindow.maximize();
        this.tray = new Tray(path.join(__dirname, '/assets/image/petit-logo.png'))
        var contextMenu = Menu.buildFromTemplate([
            { label: 'Afficher', click:  function(){
                mainWindow.show();
            } },
            { label: 'Quitter', click:  function(){
                app.isQuiting = true;
                app.quit();
            } }
        ])
        this.tray.setToolTip('Biorésonance et Santé')
        this.tray.setContextMenu(contextMenu)
        this.tray.on('double-click',()=>{
          mainWindow.show();
        })
    }
}

const main = new Main()
